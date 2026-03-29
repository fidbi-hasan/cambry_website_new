const fs = require('fs');
const https = require('https');

const seedContent = fs.readFileSync('./prisma/seed.ts', 'utf8');
const urls = [...seedContent.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\s"']*/g)].map(m => m[0]);

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: e.message });
        });
    });
}

async function main() {
    const uniqueUrls = [...new Set(urls)];
    const results = await Promise.all(uniqueUrls.map(checkUrl));
    console.log(JSON.stringify(results.filter(r => r.status !== 200), null, 2));
}

main();
