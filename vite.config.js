import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    // outDir: '../../public/', // for TYPO3
    rollupOptions: {
      input: {
        indexHTML: resolve(__dirname, 'src/index.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    minify: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        keep_fnames: true,
      },
      mangle: {
        keep_fnames: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: port,
    strictPort: true,
    origin: origin,
  },
  plugins: [
    tailwindcss(),
    injectHTML({
      tagName: 'html-loader',
    }),
  ],
});
