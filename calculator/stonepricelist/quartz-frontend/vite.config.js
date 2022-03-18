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
    outDir: '../static/src/pricelist/dist/quartz',
    emptyOutDir: true,
    manifest: true,
  },
  plugins: [vue()]
})
