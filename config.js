
module.exports = {
  PG_CONFIG: {
    user: process.env.PG_CONFIG_USER,
    database: process.env.PG_CONFIG_DATABASE,
    password: process.env.PG_CONFIG_PASSWORD,
    host: process.env.PG_CONFIG_HOST,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  }
};