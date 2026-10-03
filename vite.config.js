import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function inlineBuildAssets() {
  return {
    name: 'inline-build-assets',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        for (const [fileName, output] of Object.entries(bundle ?? {})) {
          const url = `/${fileName}`
          const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

          if (output.type === 'chunk') {
            const scriptTag = new RegExp(`<script\\b(?=[^>]*\\bsrc=(["'])${escapedUrl}\\1)[^>]*>\\s*<\\/script>`, 'g')
            const preloadTag = new RegExp(`<link\\b(?=[^>]*\\brel=(["'])modulepreload\\1)(?=[^>]*\\bhref=(["'])${escapedUrl}\\2)[^>]*>`, 'g')
            const code = output.code.replace(/<\/script/gi, '<\\/script')
            html = html.replace(scriptTag, () => `<script type="module">${code}</script>`)
            html = html.replace(preloadTag, '')
          } else if (output.type === 'asset' && fileName.endsWith('.css')) {
            const styleLink = new RegExp(`<link\\b(?=[^>]*\\brel=(["'])stylesheet\\1)(?=[^>]*\\bhref=(["'])${escapedUrl}\\2)[^>]*>`, 'g')
            const css = String(output.source).replace(/<\/style/gi, '<\\/style')
            html = html.replace(styleLink, () => `<style>${css}</style>`)
          }
        }

        return html
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineBuildAssets()],
  build: {
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
})
