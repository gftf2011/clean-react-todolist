/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  css: {
    postcss: undefined,
    preprocessorOptions: {
      scss: {
        additionalData: `
          $primary: #1ca4c9;
          $secondary: #1ac888;
          $danger: #d32752;
          $info: #254fba;
          $light: #f0f0f0;
          $dark: #212121;
          $muted: #e9e9e9;

          $xxl-padding: 2rem;
          $xxl-margin: 2rem;
          $xl-padding: 1.5rem;
          $xl-margin: 1.5rem;
          $lg-padding: 1rem;
          $lg-margin: 1rem;
          $base-padding: 0.75rem;
          $base-margin: 0.75rem;
          $sm-padding: 0.5rem;
          $sm-margin: 0.5rem;
          $xs-padding: 0.25rem;
          $xs-margin: 0.25rem;

          $base-border-thickness: 1px;
          $base-border-radius: 4px;

          $base-font-size: 1rem;

          $xxs: 320px;
          $xs: 600px;
          $sm: 768px;
          $md: 900px;
          $lg: 1200px;
          $xl: 1536px;
        `,
      },
    },
  },
});
