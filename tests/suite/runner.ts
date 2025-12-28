import type { JsonSchema } from '../../src/types.js';
import { Validator } from '../../src/index';
import type { TestFile, TestResult, ComplianceReport } from './types.js';

export interface RunnerOptions {
  /** Skip tests for unimplemented features */
  skipUnimplemented?: boolean;
  /** Keywords to skip entirely */
  skipKeywords?: string[];
  /** Callback for each test result */
  onResult?: (result: TestResult) => void;
  /** Remote schemas to make available for $ref resolution */
  remotes?: Record<string, JsonSchema>;
}

// Keywords that are not yet implemented or have known issues
const UNIMPLEMENTED_KEYWORDS = [
  'unknownKeyword', // Meta-schema validation not implemented
];

export function runTestSuite(files: TestFile[], options: RunnerOptions = {}): ComplianceReport {
  const results: TestResult[] = [];
  const byKeyword: Record<string, { passed: number; failed: number; skipped: number }> = {};

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const file of files) {
    const keyword = file.name;

    // Initialize keyword stats
    if (!byKeyword[keyword]) {
      byKeyword[keyword] = { passed: 0, failed: 0, skipped: 0 };
    }

    // Skip unimplemented keywords
    if (options.skipUnimplemented && UNIMPLEMENTED_KEYWORDS.includes(keyword)) {
      for (const group of file.groups) {
        for (const _test of group.tests) {
          total++;
          skipped++;
          byKeyword[keyword].skipped++;
        }
      }
      continue;
    }

    if (options.skipKeywords?.includes(keyword)) {
      for (const group of file.groups) {
        for (const _test of group.tests) {
          total++;
          skipped++;
          byKeyword[keyword].skipped++;
        }
      }
      continue;
    }

    for (const group of file.groups) {
      let validator: Validator<unknown>;

      try {
        // Use formatAssertion: false for test suite compliance
        // (JSON Schema spec treats format as annotation-only by default)
        validator = Validator(group.schema as JsonSchema, {
          formatAssertion: false,
          remotes: options.remotes,
        });
      } catch (err) {
        // Schema construction failed - all tests in this group fail
        for (const test of group.tests) {
          total++;
          failed++;
          byKeyword[keyword].failed++;

          const result: TestResult = {
            file: file.name,
            group: group.description,
            test: test.description,
            expected: test.valid,
            actual: false,
            passed: false,
            error: `Schema construction failed: ${err}`,
          };

          results.push(result);
          options.onResult?.(result);
        }
        continue;
      }

      for (const test of group.tests) {
        total++;

        let actual: boolean;
        let error: string | undefined;

        try {
          actual = validator.validate(test.data);
        } catch (err) {
          actual = false;
          error = `Validation threw: ${err}`;
        }

        const testPassed = actual === test.valid;

        if (testPassed) {
          passed++;
          byKeyword[keyword].passed++;
        } else {
          failed++;
          byKeyword[keyword].failed++;
        }

        const result: TestResult = {
          file: file.name,
          group: group.description,
          test: test.description,
          expected: test.valid,
          actual,
          passed: testPassed,
          error,
        };

        if (!testPassed) {
          results.push(result);
        }

        options.onResult?.(result);
      }
    }
  }

  return {
    total,
    passed,
    failed,
    skipped,
    byKeyword,
    failures: results,
  };
}

export function formatReport(report: ComplianceReport): string {
  const lines: string[] = [];

  lines.push('# JSON Schema Test Suite Compliance Report');
  lines.push('');
  lines.push(`## Summary`);
  lines.push('');
  lines.push(`- **Total Tests**: ${report.total}`);
  lines.push(
    `- **Passed**: ${report.passed} (${((report.passed / report.total) * 100).toFixed(1)}%)`
  );
  lines.push(`- **Failed**: ${report.failed}`);
  lines.push(`- **Skipped**: ${report.skipped}`);
  lines.push('');

  lines.push('## By Keyword');
  lines.push('');
  lines.push('| Keyword | Passed | Failed | Skipped | Rate |');
  lines.push('|---------|--------|--------|---------|------|');

  for (const [keyword, stats] of Object.entries(report.byKeyword).sort()) {
    const keywordTotal = stats.passed + stats.failed + stats.skipped;
    const rate =
      keywordTotal > 0 && stats.skipped < keywordTotal
        ? ((stats.passed / (stats.passed + stats.failed)) * 100).toFixed(0) + '%'
        : 'N/A';
    lines.push(`| ${keyword} | ${stats.passed} | ${stats.failed} | ${stats.skipped} | ${rate} |`);
  }

  if (report.failures.length > 0) {
    lines.push('');
    lines.push('## Failures');
    lines.push('');

    for (const failure of report.failures.slice(0, 50)) {
      lines.push(`### ${failure.file} / ${failure.group}`);
      lines.push('');
      lines.push(`**Test**: ${failure.test}`);
      lines.push(`**Expected**: ${failure.expected ? 'valid' : 'invalid'}`);
      lines.push(`**Actual**: ${failure.actual ? 'valid' : 'invalid'}`);
      if (failure.error) {
        lines.push(`**Error**: ${failure.error}`);
      }
      lines.push('');
    }

    if (report.failures.length > 50) {
      lines.push(`... and ${report.failures.length - 50} more failures`);
    }
  }

  return lines.join('\n');
}
