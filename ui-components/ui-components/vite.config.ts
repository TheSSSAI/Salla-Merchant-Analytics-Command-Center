// This configuration is specific to the ui-components storybook environment or sub-package context.
// It inherits or overrides the root vite configuration as needed.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
});