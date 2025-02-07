import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional alias for cleaner imports
      '@ckeditor': path.resolve(__dirname, 'node_modules/@ckeditor')
    },
  },
  optimizeDeps: {
    include: ["@ckeditor/ckeditor5-watchdog"]
  },
  build: {
    rollupOptions: {
      external: ["@ckeditor/ckeditor5-watchdog"]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "bootstrap/scss/variables";
          @import "bootstrap/scss/mixins";
        `,
      },
    },
  },
});
