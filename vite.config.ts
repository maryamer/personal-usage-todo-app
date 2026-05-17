import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
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
  // build: {
  //   sourcemap: true, // easier debugging in production
  //   chunkSizeWarningLimit: 1000, // prevent warnings for big libs
  //   target: 'esnext', // modern build for React 19
  //   rollupOptions: {
  //     output: {
  //       // Add hash to chunk names for better cache busting
  //       entryFileNames: 'assets/[name]-[hash].js',
  //       chunkFileNames: 'assets/[name]-[hash].js',
  //       assetFileNames: 'assets/[name]-[hash].[ext]',
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           if (id.includes('react') || id.includes('react-dom'))
  //             return 'react';
  //           if (id.includes('react-router-dom')) return 'router';
  //           if (id.includes('@reduxjs/toolkit') || id.includes('react-redux'))
  //             return 'redux';
  //           if (id.includes('@tanstack/react-query')) return 'react-query';
  //           if (id.includes('i18next')) return 'i18n';
  //           if (id.includes('yup') || id.includes('@hookform')) return 'forms';
  //           if (id.includes('@dnd-kit')) return 'dnd';
  //           if (id.includes('axios')) return 'axios';

  //           // ✅ Keep chart libs separate to avoid bundling issues
  //           if (id.includes('echarts')) return 'echarts';
  //           if (id.includes('apexcharts')) return 'apexcharts';
  //           if (id.includes('react-apexcharts')) return 'react-apexcharts';

  //           return 'vendor'; // fallback for other node_modules
  //         }
  //       },
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // optimizeDeps: {
  //   include: [
  //     'react',
  //     'react-dom',
  //     'react-router-dom',
  //     '@reduxjs/toolkit',
  //     'react-redux',
  //     '@tanstack/react-query',

  //     // ✅ Force pre-bundling for stability
  //     'echarts',
  //     'apexcharts',
  //     'react-apexcharts',
  //   ],
  // },
  server: {
    // Enable HMR for better development experience
    hmr: {
      overlay: true,
    },
  },
});
