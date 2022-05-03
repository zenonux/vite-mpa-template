const { defineConfig } = require('vite')
const { resolve } = require('path')
import nunjucks from 'vite-plugin-nunjucks'
import fs from 'fs'

function getPages() {
  const files = fs.readdirSync('./src')
  const pages = files.filter((v) => v.indexOf('.') == -1 && v !== 'inc')
  let map = {}
  pages.forEach((v) => {
    map[v] = `./src/${v}/${v}.html`
  })
  return map
}

function buildPages(pages) {
  let map = {}
  Object.keys(pages).forEach((key) => {
    map[key] = resolve(__dirname, pages[key])
  })
  return map
}

module.exports = defineConfig({
  base:'./',
  build: {
    manifest: false,
    rollupOptions: {
      input: buildPages(getPages()),
      output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        }
    },
  },
  plugins: [
    nunjucks({
      templatesDir: './src/inc',
    }),
  ],
})
