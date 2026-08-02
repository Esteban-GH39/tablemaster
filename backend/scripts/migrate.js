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

const asegurarTablaControl = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            filename TEXT PRIMARY KEY,
            applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export const runMigrations = async () => {
    await asegurarTablaControl();

    const { rows } = await pool.query("SELECT filename FROM schema_migrations");
    const yaAplicadas = new Set(rows.map((r) => r.filename));

    const files = (await fs.readdir(migrationsPath)).sort();
    let pendientes = 0;

    for (const file of files) {
        if (yaAplicadas.has(file)) continue;
        pendientes++;
        console.log(`Running ${file}`);
        const sql = await fs.readFile(path.join(migrationsPath, file), "utf8");

        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            await client.query(sql);
            await client.query(
                "INSERT INTO schema_migrations (filename) VALUES ($1)",
                [file]
            );
            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    if (pendientes === 0) {
        console.log("Base de datos ya estaba al día, no había migraciones pendientes");
    } else {
        console.log(`Base de datos migrada (${pendientes} migración(es) nueva(s) aplicada(s))`);
    }
};

const esEjecucionDirecta = process.argv[1] === __filename;
if (esEjecucionDirecta) {
    runMigrations()
        .then(() => process.exit())
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}