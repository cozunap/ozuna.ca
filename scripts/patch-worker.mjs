import fs from 'fs';
import path from 'path';

const workerPath = path.resolve('.vercel/output/static/_worker.js/index.js');
if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');
  if (content.includes('new Request(s,{headers:t})')) {
    content = content.replace(
      'new Request(s,{headers:t})',
      '(s.method==="GET"||s.method==="HEAD")?new Request(s.url,{method:s.method,headers:t}):new Request(s,{headers:t})'
    );
    fs.writeFileSync(workerPath, content, 'utf8');
    console.log('✓ Patched Cloudflare _worker.js for GET/HEAD body compliance.');
  } else {
    console.log('ℹ Worker already patched or pattern not found.');
  }
}
