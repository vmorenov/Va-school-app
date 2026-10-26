import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from "@module-federation/vite";
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VQ_');
  return { base: env.VQ_BASE || "http://localhost:4175/", plugins: [react(), federation({ name: 'learning', filename: 'remoteEntry.js', exposes: { './App': './src/App.tsx' }, shared: { react: { singleton: true, requiredVersion: '19.2.0' }, 'react-dom': { singleton: true, requiredVersion: '19.2.0' } }, dts: false })],
    build: { target: 'es2022' },
    server: { port: 4175, strictPort: true, origin: 'http://localhost:4175', cors: { origin: 'http://localhost:4173' }, proxy: { '/api': 'http://localhost:8080', '/oauth2': 'http://localhost:8080', '/logout': 'http://localhost:8080' } },
    preview: { port: 4175, strictPort: true, cors: { origin: 'http://localhost:4173' } }
  };
});
