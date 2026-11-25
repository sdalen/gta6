import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/gta6/',
  plugins: [react(), tailwindcss()],
  // Fast port: fremdriften ligger i localStorage, som er knyttet til porten.
  // Bytter Vite port fordi en annen er opptatt, ser det ut som fremdriften er borte.
  server: { port: 5175, strictPort: true },
  preview: { port: 5175, strictPort: true },
})
