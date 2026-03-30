import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Updating University of Helsinki and Aalto University with local images...");

    await prisma.university.update({
        where: { slug: "university-of-helsinki" },
        data: {
            imageUrl: "/images/unis/helsinki.png"
        }
    });

    await prisma.university.update({
        where: { slug: "aalto-university" },
        data: {
            imageUrl: "/images/unis/aalto.png"
        }
    });

    console.log("Local images updated successfully!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
