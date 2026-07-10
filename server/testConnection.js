const pool = require("./config/db");

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Connected!");
        console.log(result.rows[0]);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

testConnection();