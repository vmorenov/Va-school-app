import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VQ_');
  return { base: env.VQ_BASE || "/", plugins: [react()],
    build: { target: 'es2022' },
    server: { port: 4176, strictPort: true, origin: 'http://localhost:4176', cors: { origin: 'http://localhost:4173' }, proxy: { '/api': 'http://localhost:8080', '/oauth2': 'http://localhost:8080', '/logout': 'http://localhost:8080' } },
    preview: { port: 4176, strictPort: true, cors: { origin: 'http://localhost:4173' } }
  };
});
