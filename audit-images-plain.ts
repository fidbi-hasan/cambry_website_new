import { prisma } from './src/lib/prisma';

async function auditImages() {
  const unis = await prisma.university.findMany({
    include: { country: true }
  });
  
  const chunkIdx = parseInt(process.env.CHUNK_IDX || "0");
  const chunkSize = 5;
  const start = chunkIdx * chunkSize;
  const end = Math.min(start + chunkSize, unis.length);
  
  console.log(`CHUNK ${chunkIdx + 1} (${start} to ${end} of ${unis.length}):`);
  unis.slice(start, end).forEach((u, j) => {
      console.log(`${start + j + 1}. [${u.country?.name || '??'}] ${u.name}`);
      console.log(`   URL: ${u.imageUrl}`);
  });
}

auditImages().catch(console.error).finally(() => process.exit(0));
