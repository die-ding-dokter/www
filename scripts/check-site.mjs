import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const root = resolve('.');
const pages = [
  'index.html', 'services/index.html', 'services/repairs/index.html',
  'shop/index.html', 'business/index.html', 'partners/index.html',
  'about/index.html', 'contact/index.html', 'privacy/index.html', '404.html'
];
const failures = [];
if (!existsSync(join(root, 'assets/ddd-logo.png'))) failures.push('Approved site logo is missing');
let inspectedLinks = 0;
for (const page of pages) {
  const path = join(root, page);
  if (!existsSync(path)) {failures.push('Missing page: ' + page); continue;}
  const html = readFileSync(path, 'utf8');
  for (const marker of ['<title>', '<main', '</main>', 'name="viewport"', '<nav', 'name="description"', '<link rel="canonical"']) {
    if (!html.includes(marker)) failures.push(page + ': missing ' + marker);
  }
  if (page !== '404.html' && !html.includes('Die Ding Dokter')) failures.push(page + ': missing brand name');
  const approvedLogo = 'ddd-logo.png';
  const favicon = [...html.matchAll(/<link\s+rel="icon"\s+href="([^"]+)"\s+type="image\/jpeg">/g)];
  if (favicon.length !== 1 || favicon[0][1] !== '/assets/' + approvedLogo) failures.push(page + ': favicon must use the approved logo');
  const brandImages = [...html.matchAll(/<span class="brand-icon"><img\s+src="([^"]+)"\s+alt=""[^>]*><\/span>/g)];
  if (brandImages.length !== 2 || brandImages.some(m => !m[1].endsWith('/assets/' + approvedLogo))) failures.push(page + ': header and footer must use the approved logo');
  if (!html.includes('https://www.diedingdokter.co.za/assets/' + approvedLogo)) failures.push(page + ': social preview must use approved logo');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) failures.push(page + ': duplicate element ids');
  const links = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const href of links) {
    inspectedLinks++;
    if (!href || href === '#' || href.startsWith('javascript:')) {
      failures.push(page + ': invalid destination ' + href);
      continue;
    }
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    const [urlPath] = href.split(/[?#]/);
    if (!urlPath) continue;
    const destination = urlPath.startsWith('/') ? resolve(root, '.' + urlPath) : resolve(dirname(path), urlPath);
    if (relative(root, destination).startsWith('..')) {
      failures.push(page + ': link escapes site root: ' + href);
      continue;
    }
    const resolved = urlPath.endsWith('/') ? join(destination, 'index.html') : destination;
    if (!existsSync(resolved)) failures.push(page + ': broken local link ' + href);
  }
  const externalTargets = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)];
  for (const match of externalTargets) {
    if (!/\brel="[^"]*noopener[^"]*"/.test(match[0])) failures.push(page + ': _blank link missing noopener');
  }
}
const js = readFileSync(join(root, 'assets/site.js'), 'utf8');
for(const marker of ['[data-menu-toggle]', '[data-enquiry-form]', '[data-filter]']){
  if (!js.includes(marker)) failures.push('Missing interactive handler: ' + marker);
}
if(failures.length){
  for(const failure of failures) console.error('FAIL ' + failure);
  console.error(failures.length + ' website validation error(s).');
  process.exitCode=1;
} else {
  console.log('PASS ' + pages.length + ' pages; ' + inspectedLinks + ' references checked; interactive handlers present.');
}
