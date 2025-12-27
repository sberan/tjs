import { describe, it, expect } from 'vitest';
import { loadTestFiles } from './loader.js';
import { runTestSuite, formatReport } from './runner.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('JSON Schema Test Suite Compliance', () => {
  const files = loadTestFiles({ includeOptional: false });

  it('runs all required tests and generates report', () => {
    const failures: string[] = [];

    const report = runTestSuite(files, {
      skipUnimplemented: true,
      onResult: (result) => {
        if (!result.passed) {
          failures.push(`FAIL: ${result.file}/${result.group}/${result.test}`);
        }
      },
    });

    // Write report to file
    const reportPath = path.join(__dirname, '../../COMPLIANCE.md');
    fs.writeFileSync(reportPath, formatReport(report));

    // Log summary
    console.log(
      `\nCompliance: ${report.passed}/${report.total} (${((report.passed / report.total) * 100).toFixed(1)}%)`
    );
    console.log(`Skipped: ${report.skipped}`);
    console.log(`Failed: ${report.failed}`);

    // Log first 10 failures for debugging
    if (failures.length > 0) {
      console.log('\nFirst 10 failures:');
      for (const f of failures.slice(0, 10)) {
        console.log(`  ${f}`);
      }
    }

    // Verify we ran tests
    expect(report.total).toBeGreaterThan(0);

    // Assert high compliance rate (adjust as implementation improves)
    const passRate = report.passed / (report.total - report.skipped);
    expect(passRate).toBeGreaterThan(0.8); // Expect at least 80% pass rate
  });
});
