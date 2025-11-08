import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        engineering: './engineering.html',
        arch: './arch.html',
        automation: './automation.html',
        maintenance: './maintenance.html'
      }
    }
  },
  server: {
    open: true,
    port: 3000
  },
  css: {
    postcss: './postcss.config.js'
  }
})