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
    modulePreload: false,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'ba-chieu-tai-nguyen',
              test: /three\/examples\/jsm\/(loaders|libs)\//,
            },
            {
              name: 'ba-chieu-webgl',
              test: /node_modules\/three\/src\/renderers\/webgl\//,
            },
            {
              name: 'ba-chieu-trinh-dien',
              test: /node_modules\/three\/src\/renderers\//,
            },
            {
              name: 'ba-chieu-cau-truc',
              test:
                /node_modules\/three\/src\/(cameras|core|extras|geometries|helpers|lights|materials|math|objects|scenes|textures)\//,
            },
            {
              name: 'ba-chieu-loi',
              test: /node_modules\/three\//,
            },
            {
              name: 'ba-chieu-khung',
              test: /@react-three\/fiber/,
            },
          ],
        },
      },
    },
  },
})
