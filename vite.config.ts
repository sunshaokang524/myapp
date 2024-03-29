import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from 'postcss-pxtorem'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      transformAssetUrls: {
        'var-avatar': ['src']
      }
    }}), components({
    resolvers: [VarletUIResolver()],
   
  }),
  autoImport({
    resolvers: [VarletUIResolver({ autoImport: true })]
  }),

    

],
base:'./'
})
