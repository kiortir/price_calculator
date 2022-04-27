import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/src/estimation_edit/dist/estimation_edit/',
  build: {
    rollupOptions: {
      input: './src/main.ts',
      output: {
        assetFileNames: 'css/[name][extname]',
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      }
    },
    outDir: '../../../calculator/estimation/static/src/estimation_edit/dist/estimation_edit',
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
    }),
  ]
})
