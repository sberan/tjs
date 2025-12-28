export interface ValidatorAdapter {
  name: string;
  compile(schema: unknown, remotes?: Record<string, unknown>): (data: unknown) => boolean;
}

export interface BenchmarkResult {
  validator: string;
  opsPerSec: number;
  totalValidations: number;
  durationMs: number;
  skipped: number;
  byKeyword: Record<string, number>;
}

export interface BenchmarkReport {
  timestamp: string;
  commit?: string;
  suite: string;
  testCount: number;
  results: BenchmarkResult[];
}
