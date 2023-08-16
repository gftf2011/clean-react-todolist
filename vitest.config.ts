/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['**/tests/**/*.spec.ts', '**/tests/**/*.test.ts'],
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
      provider: 'istanbul',
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
    },
  },
});
