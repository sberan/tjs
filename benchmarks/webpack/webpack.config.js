import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      // Minimal: simple string schema (runtime compilation)
      minimal: './src/minimal.js',
      // Medium: object with a few properties (runtime compilation)
      medium: './src/medium.js',
      // Complex: nested objects, arrays, refs (runtime compilation)
      complex: './src/complex.js',
      // Full: includes meta-schemas and all features (runtime compilation)
      full: './src/full.js',
      // Large: complex e-commerce order schema (runtime compilation)
      large: './src/large.js',
      // Pre-compiled: validator generated at build time (NO COMPILER)
      precompiled: './src/precompiled.js',
      // Pre-compiled large: complex schema without compiler
      'precompiled-large': './src/precompiled-large.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      library: {
        type: 'module',
      },
      clean: true,
    },
    experiments: {
      outputModule: true,
    },
    mode: isProduction ? 'production' : 'development',
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              passes: 2,
              pure_getters: true,
              unsafe: true,
            },
            mangle: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      usedExports: true,
      sideEffects: true,
    },
    resolve: {
      extensions: ['.js', '.mjs'],
      alias: {
        tjs: path.resolve(__dirname, '../../dist/index.js'),
      },
    },
    target: 'web',
    devtool: false,
    stats: {
      assets: true,
      modules: false,
      entrypoints: true,
    },
  };
};
