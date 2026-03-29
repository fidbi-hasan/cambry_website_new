import { prisma } from './src/lib/prisma';

async function applyAuthenticImages() {
  const updates = [
    // United Kingdom
    { name: "University of Oxford", url: "https://images.unsplash.com/photo-1732144762379-d1d7a94b0467?q=80&w=800" },
    { name: "University of Glasgow", url: "https://images.unsplash.com/photo-1589982334488-2ce2b65244ed?q=80&w=800" },
    { name: "University of Birmingham", url: "https://images.unsplash.com/photo-1638616122105-804db5fbef63?q=80&w=800" },
    { name: "Imperial College London", url: "https://images.unsplash.com/photo-1492538363662-ea6263b05f2b?q=80&w=800" },
    
    // Finland
    { name: "University of Helsinki", url: "https://images.unsplash.com/photo-1712701318228-6bbd523a7b64?q=80&w=800" },
    { name: "Aalto University", url: "https://images.unsplash.com/photo-1627389955609-7044230d700e?q=80&w=800" },
    
    // Cyprus & Malta
    { name: "University of Cyprus", url: "https://images.unsplash.com/photo-1637433496890-ee4eb1aecf4e?q=80&w=800" },
    { name: "Eastern Mediterranean University", url: "https://images.unsplash.com/photo-1763819128446-512435f2eabb?q=80&w=800" },
    { name: "University of Malta", url: "https://images.unsplash.com/photo-1686668409923-73b1bc63e927?q=80&w=800" },
    
    // Asia & Canada
    { name: "Korea University", url: "https://images.unsplash.com/photo-1702737832079-ed5864397f92?q=80&w=800" },
    { name: "Osaka University", url: "https://images.unsplash.com/photo-1759850395414-a051e3601115?q=80&w=800" },
    { name: "Conestoga College", url: "https://images.unsplash.com/photo-1747502064507-ed08d79802db?q=80&w=800" }
  ];

  console.log("Applying authentic image updates...");

  for (const update of updates) {
    const result = await prisma.university.updateMany({
      where: { name: update.name },
      data: { imageUrl: update.url }
    });
    console.log(`Updated ${update.name}: ${result.count} record(s)`);
  }
}

applyAuthenticImages()
  .catch(console.error)
  .finally(() => process.exit(0));
