export type Draft = 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';

export interface ValidatorAdapter {
  name: string;
  compile(
    schema: unknown,
    remotes?: Record<string, unknown>,
    draft?: Draft
  ): (data: unknown) => boolean;
}

export interface BenchmarkResult {
  validator: string;
  opsPerSec: number;
  totalValidations: number;
  durationMs: number;
  skipped: number;
  correctCount: number;
  incorrectCount: number;
  byKeyword: Record<string, number>;
}

export interface BenchmarkReport {
  timestamp: string;
  commit?: string;
  suite: string;
  testCount: number;
  results: BenchmarkResult[];
}
