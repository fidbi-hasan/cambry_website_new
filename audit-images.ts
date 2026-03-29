import { prisma } from './src/lib/prisma';
import * as https from 'https';

async function verifyAllImages() {
  const unis = await prisma.university.findMany({
    include: { country: true }
  });
  
  console.log(`Verifying ${unis.length} university images...`);
  
  const results = await Promise.all(unis.map(async (u) => {
    return new Promise((resolve) => {
      if (!u.imageUrl || !u.imageUrl.startsWith('http')) {
        resolve({ name: u.name, status: 'MISSING', url: u.imageUrl });
        return;
      }
      https.get(u.imageUrl, (res) => {
        resolve({ name: u.name, status: res.statusCode, url: u.imageUrl });
      }).on('error', () => {
        resolve({ name: u.name, status: 'ERROR', url: u.imageUrl });
      });
    });
  }));
  
  results.forEach((r: any) => {
    console.log(`[${r.status}] ${r.name}: ${r.url}`);
  });
}

verifyAllImages().catch(console.error).finally(() => process.exit(0));
