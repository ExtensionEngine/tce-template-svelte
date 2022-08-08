'use strict';

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/preview/',
  plugins: [
    svelte({
      configFile: '../../svelte.config.js'
    })
  ],
  build: {
    lib: {
      entry: '../content-element/index.ts',
      name: 'TCE',
      fileName: 'tce-template'
    },
    rollupOptions: {
      output: {
        dir: './dist'
      }
    }
  }
});
