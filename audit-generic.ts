import { prisma } from './src/lib/prisma';

async function auditGenericImages() {
  const unis = await prisma.university.findMany({
    include: { country: true }
  });
  
  const generic = unis.filter(u => 
    !u.imageUrl || 
    u.imageUrl.includes('ui-avatars.com') || 
    u.imageUrl === ''
  );
  
  console.log(`GENERIC_AVATARS: ${generic.length}`);
  generic.forEach((u, i) => {
    console.log(`${i+1}. [${u.country?.name || '??'}] ${u.name}`);
  });
  
  const workingImages = unis.filter(u => u.imageUrl && !u.imageUrl.includes('ui-avatars.com'));
  console.log(`WORKING_IMAGES: ${workingImages.length}`);
  workingImages.forEach((u, i) => {
      console.log(`${i+1}. [${u.country?.name || '??'}] ${u.name}: ${u.imageUrl}`);
  });
}

auditGenericImages().catch(console.error).finally(() => process.exit(0));
