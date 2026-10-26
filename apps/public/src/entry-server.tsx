import { renderToString } from 'react-dom/server';
import Content from './Content';
export function render() { return renderToString(<Content/>); }
