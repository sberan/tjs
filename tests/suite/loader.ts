import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { TestFile, TestGroup } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUITE_BASE = path.join(__dirname, '../../test-suite/tests');

type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

export function loadTestFiles(options?: {
  draft?: Draft;
  includeOptional?: boolean;
  filter?: (filename: string) => boolean;
}): TestFile[] {
  const draft = options?.draft ?? 'draft2020-12';
  const suitePath = path.join(SUITE_BASE, draft);
  const files: TestFile[] = [];

  // Load required tests
  files.push(...loadDirectory(suitePath, options?.filter));

  // Load optional tests if requested
  if (options?.includeOptional) {
    const optionalDir = path.join(suitePath, 'optional');
    if (fs.existsSync(optionalDir)) {
      files.push(...loadDirectory(optionalDir, options?.filter));
    }

    // Load format tests
    const formatDir = path.join(optionalDir, 'format');
    if (fs.existsSync(formatDir)) {
      files.push(...loadDirectory(formatDir, options?.filter));
    }
  }

  return files;
}

function loadDirectory(dir: string, filter?: (filename: string) => boolean): TestFile[] {
  const files: TestFile[] = [];

  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.json')) continue;
    if (filter && !filter(filename)) continue;

    const filepath = path.join(dir, filename);
    const stat = fs.statSync(filepath);
    if (!stat.isFile()) continue;

    const content = fs.readFileSync(filepath, 'utf-8');
    const groups: TestGroup[] = JSON.parse(content);

    files.push({
      name: filename.replace('.json', ''),
      path: filepath,
      groups,
    });
  }

  return files;
}

export function loadSingleFile(keyword: string, draft: Draft = 'draft2020-12'): TestFile | null {
  const suitePath = path.join(SUITE_BASE, draft);
  const filepath = path.join(suitePath, `${keyword}.json`);
  if (!fs.existsSync(filepath)) return null;

  const content = fs.readFileSync(filepath, 'utf-8');
  const groups: TestGroup[] = JSON.parse(content);

  return {
    name: keyword,
    path: filepath,
    groups,
  };
}
