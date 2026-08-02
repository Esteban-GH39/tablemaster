import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../src/config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsPath = path.join(__dirname, "../migrations");

const baseline = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            filename TEXT PRIMARY KEY,
            applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `);

    const files = (await fs.readdir(migrationsPath)).sort();

    for (const file of files) {
        await pool.query(
            `INSERT INTO schema_migrations (filename)
             VALUES ($1)
             ON CONFLICT (filename) DO NOTHING`,
            [file]
        );
        console.log(`Marcada como aplicada: ${file}`);
    }

    console.log(`\nListo. ${files.length} migración(es) marcada(s) como aplicadas.`);
};

baseline()
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
