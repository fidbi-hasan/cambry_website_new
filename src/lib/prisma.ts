import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    if (!connectionString) {
        console.warn("⚠️ DATABASE_URL is not defined in environment variables. Database features will be unavailable.");
        // Return a mock or handle as needed, but for now we let it attempt with driverAdapter
        // which might still crash, but the console.warn provides immediate feedback.
    }
    const pool = new pg.Pool({ connectionString: connectionString || "" });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
