import vue from '@vitejs/plugin-vue'
import viteESLint from '@ehutch79/vite-eslint'
import path from 'path'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vue(),
    viteESLint()
  ],
  alias: {
    '/@': path.resolve(__dirname, './src')
  }
}
