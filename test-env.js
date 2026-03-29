require('dotenv').config();
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "UNDEFINED");
if (process.env.DATABASE_URL) {
    console.log("Starts with:", process.env.DATABASE_URL.split(':')[0]);
}
