import { prisma } from './src/lib/prisma';

async function checkImages() {
  const unis = await prisma.university.findMany({
    where: {
      OR: [
        { name: { contains: 'Cyprus', mode: 'insensitive' } },
        { name: { contains: 'Korea', mode: 'insensitive' } }
      ]
    }
  });
  unis.forEach(u => console.log(`${u.name}: ${u.imageUrl}`));
}

checkImages().catch(console.error).finally(() => process.exit(0));
