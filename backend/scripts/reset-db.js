import { pool } from "../src/config/database.js";

await pool.query(`
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
`);

console.log("Database cleaned");
process.exit();