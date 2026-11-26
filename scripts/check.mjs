import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const main = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const tiyo = readFileSync(path.join(root, 'assets/js/tiyo.js'), 'utf8');
const errors = [];
for (const [name, source] of [['main.js', main], ['tiyo.js', tiyo], ...['main.min.js', 'tiyo.min.js'].map(name => [name, readFileSync(path.join(root, 'assets/js', name), 'utf8')])]) {
  try { new vm.Script(source, { filename: name }); } catch (e) { errors.push(e.message); }
}
for (const source of [html, main, tiyo]) {
  for (const match of source.matchAll(/\.\/assets\/[a-zA-Z0-9_./-]+/g)) {
    if (!existsSync(path.join(root, match[0]))) errors.push('Missing file: ' + match[0]);
  }
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) errors.push('Duplicate HTML ids');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1]) && !['work-designs', 'work-videos'].includes(match[1])) errors.push('Broken anchor: ' + match[1]);
}
for (const match of (main + tiyo).matchAll(/(?:getElementById|\$)\("([^"]+)"\)/g)) {
  if (!ids.includes(match[1])) errors.push('Missing DOM target: ' + match[1]);
}
if (html.includes('file:///') || html.includes('E:/') || /data:image\/[^;]+;base64/.test(html + main)) errors.push('Unportable source reference');
for (const item of ['404.html', '.nojekyll', 'robots.txt', 'assets/favicon.svg', 'doc/cv.pdf']) {
  if (!existsSync(path.join(root, item))) errors.push('Missing deployment file: ' + item);
}
const imageDir = path.join(root, 'assets/images');
if (existsSync(path.join(root, 'doc/cv.pdf')) && readFileSync(path.join(root, 'doc/cv.pdf')).subarray(0, 5).toString() !== '%PDF-') errors.push('Resume is not a PDF');
const images = readdirSync(imageDir);
if (images.length !== 40) errors.push('Expected 40 extracted images');
if (images.some(name => statSync(path.join(imageDir, name)).size === 0)) errors.push('An image is empty');
if (errors.length) { console.error([...new Set(errors)].join('\n')); process.exit(1); }
console.log('Passed: JavaScript syntax, local assets, anchors, DOM targets and 40 image files.');
