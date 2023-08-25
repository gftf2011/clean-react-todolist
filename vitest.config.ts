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
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      './src/main/**',
      './src/presentation/assets/**',
      './src/presentation/styles/**',
    ],
    testTimeout: 15000,
    watch: false,
    coverage: {
      all: true,
      include: ['src'],
      provider: 'v8',
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
    },
  },
});
