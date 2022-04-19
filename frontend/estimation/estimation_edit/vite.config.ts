import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/main.ts',
      output: {
        assetFileNames: 'css/[name][extname]',
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js'
      }
    },
    outDir: '../../calculator/estimation/static/src/estimation_edit/dist/estimation_edit',
    emptyOutDir: true,
    manifest: true,
  },
  plugins: [vue()]
})