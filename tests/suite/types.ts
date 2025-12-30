export interface TestCase {
  description: string;
  data: unknown;
  valid: boolean;
}

export interface TestGroup {
  description: string;
  schema: unknown;
  tests: TestCase[];
}

export interface TestFile {
  name: string;
  path: string;
  groups: TestGroup[];
  isFormatTest?: boolean;
}

export interface TestResult {
  file: string;
  group: string;
  test: string;
  expected: boolean;
  actual: boolean;
  passed: boolean;
  error?: string;
}

export interface ComplianceReport {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  byKeyword: Record<string, { passed: number; failed: number; skipped: number }>;
  failures: TestResult[];
}
