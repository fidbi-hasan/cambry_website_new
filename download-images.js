const fs = require('fs');
const https = require('https');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const imagesToDownload = [
    {
        name: "University of Cyprus",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ucy_campus_1.jpg/800px-Ucy_campus_1.jpg",
        filename: "cyprus-uni.jpg"
    },
    {
        name: "Korea University",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Korea_University_Main_Hall_and_Central_Plaza.jpg/800px-Korea_University_Main_Hall_and_Central_Plaza.jpg",
        filename: "korea-uni.jpg"
    }
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                const stream = fs.createWriteStream(filepath);
                res.pipe(stream);
                stream.on('finish', () => resolve());
            } else {
                reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function fixUnis() {
    const dir = path.join(__dirname, 'public', 'images', 'unis');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const item of imagesToDownload) {
        const filepath = path.join(dir, item.filename);
        try {
            console.log(`Downloading image for ${item.name}...`);
            await downloadImage(item.url, filepath);
            console.log(`Saved to ${filepath}`);

            const localUrl = `/images/unis/${item.filename}`;
            const uni = await prisma.university.findFirst({
                where: { name: { contains: item.name, mode: 'insensitive' } }
            });

            if (uni) {
                await prisma.university.update({
                    where: { id: uni.id },
                    data: { imageUrl: localUrl }
                });
                console.log(`Updated ${item.name} in DB to ${localUrl}`);
            }
        } catch (e) {
            console.error(`Error processing ${item.name}:`, e.message);
        }
    }
}

fixUnis().finally(() => prisma.$disconnect());
