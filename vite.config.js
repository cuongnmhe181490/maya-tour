import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      three: 'three/src/Three.js',
    },
  },
  build: {
    modulePreload: {
      resolveDependencies(filename, dependencies) {
        const laTaiNguyenBaChieu = (duongDan) =>
          duongDan.includes('ImmersiveCanvas') || duongDan.includes('ba-chieu')

        if (filename === 'index.html' || filename.includes('/index-') || filename.includes('\\index-')) {
          return dependencies.filter((duongDan) => !laTaiNguyenBaChieu(duongDan))
        }

        return dependencies
      },
    },
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'loi-giao-dien',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 3,
            },
            {
              name: 'ba-chieu',
              test: /node_modules[\\/](three|@react-three[\\/]fiber|react-reconciler|react-use-measure|zustand|suspend-react)[\\/]/,
              priority: 2,
              entriesAware: true,
            },
          ],
        },
      },
    },
  },
})
