import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../src/config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(
    __dirname,
    "../migrations"
);

const runMigrations = async () => {
    const files = (
        await fs.readdir(migrationsPath)
    ).sort();
    for (const file of files) {
        console.log(`Running ${file}`)
        const sql = await fs.readFile(
            path.join(migrationsPath, file),
            "utf8"
        );
        await pool.query(sql);
    }
    console.log("✅ Database migrated");
    process.exit();
};

runMigrations().catch(err => {
    console.error(err);
    process.exit(1);
});