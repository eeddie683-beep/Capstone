import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fitmapApi } from './server/api.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  return { plugins: [react(), fitmapApi(env)], server: { proxy: { '/api/auth': env.AUTH_API_TARGET || 'http://localhost:8080' } } }
})
