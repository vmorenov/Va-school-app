import { readFile, writeFile } from 'node:fs/promises';
import { render } from './dist-server/entry-server.js';
const html=await readFile('dist/index.html','utf8');
if(!html.includes('<!--app-html-->')) throw new Error('Prerender placeholder missing');
await writeFile('dist/index.html',html.replace('<!--app-html-->',render()));
