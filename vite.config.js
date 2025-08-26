import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    postcss: './postcss.config.js'
  }
})