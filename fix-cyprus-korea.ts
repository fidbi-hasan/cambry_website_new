import { prisma } from './src/lib/prisma';

const uniImages: Record<string, string> = {
    "University of Cyprus": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", // historic campus architecture
    "Korea University": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800", // vibrant campus lifestyle
};

async function fixUniImages() {
    console.log("Updating Cyprus and Korea universities...");
    
    for (const [name, imgUrl] of Object.entries(uniImages)) {
        const uni = await prisma.university.findFirst({
            where: { name: { contains: name, mode: 'insensitive' } }
        });

        if (uni) {
            await prisma.university.update({
                where: { id: uni.id },
                data: { imageUrl: imgUrl }
            });
            console.log(`Updated ${name} successfully!`);
        } else {
            console.log(`Could not find ${name} in database.`);
        }
    }
}

fixUniImages().catch(console.error).finally(() => process.exit(0));
