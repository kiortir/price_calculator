import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/src/estimation/dist/estimation/',
  build: {
    rollupOptions: {
      input: './src/main.ts',
      output: {
        assetFileNames: 'css/[name][extname]',
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js'
      },
      manualChunks: {
        // lodash: ['lodash'],
        html2canvas: ['html2canvas'],
        // "element-plus": ['element-plus'],

      }
    },
    outDir: '../../../calculator/estimation/static/src/estimation/dist/estimation',
    emptyOutDir: true,
    manifest: true,
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),]
})
