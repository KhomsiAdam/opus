import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
