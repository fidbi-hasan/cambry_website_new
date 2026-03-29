import { prisma } from './src/lib/prisma';

async function updateDbAvatars() {
    const unis = await prisma.university.findMany();
    for (const u of unis) {
        if (u.imageUrl && u.imageUrl.includes('ui-avatars.com')) {
            const newUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=f8fafc&color=0f172a&size=512&font-size=0.35&bold=true`;
            await prisma.university.update({
                where: { id: u.id },
                data: { imageUrl: newUrl }
            });
            console.log("Updated", u.name);
        }
    }
}

updateDbAvatars().catch(console.error).finally(() => process.exit(0));
