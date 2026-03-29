import { prisma } from './src/lib/prisma';

async function updateUniversityImages() {
  const updates = [
    {
      name: "University of Cyprus",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    },
    {
      name: "Korea University",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
    }
  ];

  for (const update of updates) {
    const uni = await prisma.university.findFirst({
      where: { name: { contains: update.name, mode: 'insensitive' } }
    });

    if (uni) {
      await prisma.university.update({
        where: { id: uni.id },
        data: { imageUrl: update.imageUrl }
      });
      console.log(`Updated ${uni.name} with URL: ${update.imageUrl}`);
    } else {
      console.log(`University not found: ${update.name}`);
    }
  }
}

updateUniversityImages()
  .catch(console.error)
  .finally(() => process.exit(0));
