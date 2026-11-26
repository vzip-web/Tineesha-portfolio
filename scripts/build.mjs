import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { minify } from 'terser';

const root = fileURLToPath(new URL('../', import.meta.url));
for (const name of ['main', 'tiyo']) {
  const source = readFileSync(path.join(root, 'assets/js', name + '.js'), 'utf8');
  const result = await minify(source, { compress: true, mangle: true, format: { comments: false } });
  writeFileSync(path.join(root, 'assets/js', name + '.min.js'), result.code + '\n');
}
await import('./check.mjs');
const out = path.join(root, '_site');
mkdirSync(out, { recursive: true });
for (const item of ['index.html', '404.html', 'robots.txt', '.nojekyll', 'assets', 'doc']) {
  cpSync(path.join(root, item), path.join(out, item), { recursive: true });
}
console.log('Static deployment prepared in _site/');
