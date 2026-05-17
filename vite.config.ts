// vite.config.js
import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // ✅ تغییر این خط:
  base: '/personal-usage-todo-app/',
  // ✅ بقیه تنظیمات شما...
  plugins: [
    react(),
    process.env.ANALYZE
      ? visualizer({
          filename: 'stats.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
          open: true,
        })
      : undefined,
  ].filter((p): p is NonNullable<typeof p> => Boolean(p)),
  // ... بقیه فایل
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
