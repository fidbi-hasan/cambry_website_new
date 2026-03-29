require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const https = require('https');

const prisma = new PrismaClient();
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800";

async function checkUrl(url) {
    if (!url || !url.startsWith('http')) return 200;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve(res.statusCode);
        }).on('error', (e) => {
            resolve(404);
        });
    });
}

async function fixBrokenImages() {
    console.log("Checking Countries...");
    const countries = await prisma.country.findMany();
    for (const c of countries) {
        if (c.imageUrl) {
            const status = await checkUrl(c.imageUrl);
            if (status !== 200) {
                console.log(`Fixing Country ${c.name} Image: ${c.imageUrl}`);
                await prisma.country.update({ where: { id: c.id }, data: { imageUrl: FALLBACK_IMAGE } });
            }
        }
        if (c.flagUrl && c.flagUrl.startsWith("http")) {
            const status = await checkUrl(c.flagUrl);
            if (status !== 200) {
                 console.log(`Fixing Country ${c.name} Flag: ${c.flagUrl}`);
                 // Emoji fallback based on standard
                 const fallbackFlagMap = { "United Kingdom": "🇬🇧", "Australia": "🇦🇺", "Canada": "🇨🇦", "Malaysia": "🇲🇾", "New Zealand": "🇳🇿", "USA": "🇺🇸" };
                 await prisma.country.update({ where: { id: c.id }, data: { flagUrl: fallbackFlagMap[c.name] || "🏳️" } });
            }
        }
    }

    console.log("Checking Universities...");
    const unis = await prisma.university.findMany();
    for (const u of unis) {
        const uStatus = await checkUrl(u.imageUrl);
        if (uStatus !== 200) {
            console.log(`Fixing University ${u.name} Image: ${u.imageUrl}`);
            await prisma.university.update({ 
                where: { id: u.id }, 
                data: { imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random&color=fff&size=512&font-size=0.4` } 
            });
        }
    }

    console.log("Done checking and fixing!");
}

fixBrokenImages().finally(() => prisma.$disconnect());
