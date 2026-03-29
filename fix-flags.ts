import { prisma } from './src/lib/prisma';

const fallbackFlagMap: Record<string, string> = {
    "United Kingdom": "https://flagcdn.com/w80/gb.png",
    "Australia": "https://flagcdn.com/w80/au.png",
    "Canada": "https://flagcdn.com/w80/ca.png",
    "Malaysia": "https://flagcdn.com/w80/my.png",
    "New Zealand": "https://flagcdn.com/w80/nz.png",
    "USA": "https://flagcdn.com/w80/us.png",
    "Finland": "https://flagcdn.com/w80/fi.png",
    "Italy": "https://flagcdn.com/w80/it.png",
    "Germany": "https://flagcdn.com/w80/de.png",
};

async function fixFlags() {
    const countries = await prisma.country.findMany();
    for (const c of countries) {
        if (!c.flagUrl || !c.flagUrl.startsWith('http')) {
            let newFlag = fallbackFlagMap[c.name];
            if (!newFlag && c.slug) {
                // simple guess if not in map
                 newFlag = `https://flagcdn.com/w80/${c.slug.substring(0,2)}.png`;
            }
            if (newFlag) {
                console.log(`Updating flag for ${c.name} to ${newFlag}`);
                await prisma.country.update({
                    where: { id: c.id },
                    data: { flagUrl: newFlag }
                });
            }
        }
    }
}

fixFlags().catch(console.error).finally(() => process.exit(0));
