import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { TestFile, TestGroup } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUITE_PATH = path.join(__dirname, '../../test-suite/tests/draft2020-12');

export function loadTestFiles(options?: {
  includeOptional?: boolean;
  filter?: (filename: string) => boolean;
}): TestFile[] {
  const files: TestFile[] = [];

  // Load required tests
  files.push(...loadDirectory(SUITE_PATH, options?.filter));

  // Load optional tests if requested
  if (options?.includeOptional) {
    const optionalDir = path.join(SUITE_PATH, 'optional');
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

export function loadSingleFile(keyword: string): TestFile | null {
  const filepath = path.join(SUITE_PATH, `${keyword}.json`);
  if (!fs.existsSync(filepath)) return null;

  const content = fs.readFileSync(filepath, 'utf-8');
  const groups: TestGroup[] = JSON.parse(content);

  return {
    name: keyword,
    path: filepath,
    groups,
  };
}
