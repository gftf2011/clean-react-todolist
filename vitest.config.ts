/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/tests/**/*.spec.ts',
      '**/tests/**/*.test.ts',
      '**/tests/**/*.spec.tsx',
      '**/tests/**/*.test.tsx',
    ],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 15000,
    watch: false,
    coverage: {
      all: true,
      include: ['src'],
      provider: 'v8',
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      exclude: [
        'src/custom.d.ts',
        'src/vite-env.d.ts',
        'src/main/**',
        'src/domain/models/**/*.ts',
        'src/domain/use-cases/**/*.ts',
        'src/presentation/assets/**',
        'src/presentation/styles/**',
      ],
    },
  },
});
