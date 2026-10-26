import { createRoot } from 'react-dom/client';
import App from './App';
createRoot(document.getElementById('root')!).render(<App apiBase="/api/v1"/>);
