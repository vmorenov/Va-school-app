import { hydrateRoot, createRoot } from 'react-dom/client';
import Content from './Content';
import './style.css';
const root=document.getElementById('root')!;
if(root.children.length) hydrateRoot(root,<Content/>); else createRoot(root).render(<Content/>);
