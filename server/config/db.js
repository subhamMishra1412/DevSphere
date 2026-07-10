const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "devsphere",
    password: "Subham@14",
    port: 5432,
});

module.exports = pool;