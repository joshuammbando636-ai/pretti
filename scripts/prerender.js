import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROUTES = [
  '/',
  '/about',
  '/events', 
  '/gallery',
  '/contact',
  '/blog',
  '/blog/wedding-decoration-ideas-dar-es-salaam-2026',
  '/blog/wedding-color-trends-tanzania-2026',
  '/blog/bedroom-decoration-tips-budget-guide',
  '/blog/birthday-party-at-home-tips-guide'
];

async function prerender() {
  console.log('🚀 Starting prerendering...');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://localhost:3000${route}`;
    console.log(`📄 Prerendering: ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      const html = await page.content();
      
      const filePath = route === '/' 
        ? join(process.cwd(), 'dist', 'index.html')
        : join(process.cwd(), 'dist', route, 'index.html');
      
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html);
      console.log(`✅ Prerendered: ${route}`);
    } catch (error) {
      console.error(`❌ Failed: ${route}`, error.message);
    }
  }

  await browser.close();
  console.log('🎉 Prerendering complete!');
}

prerender();