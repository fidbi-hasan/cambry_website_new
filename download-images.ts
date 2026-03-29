import { prisma } from './src/lib/prisma';
import fs from 'fs';
import https from 'https';
import path from 'path';

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

function downloadImage(url: string, filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
            if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
                if (res.headers.location) {
                     return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                }
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
    const dir = path.join(process.cwd(), 'public', 'images', 'unis');
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
        } catch (e: any) {
            console.error(`Error processing ${item.name}:`, e.message);
        }
    }
}

fixUnis().catch(console.error).finally(() => process.exit(0));
