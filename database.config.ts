// Database variables configuration
export default {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER || "user",
    password: process.env.DATABASE_PASSWORD || "1234",
    database: process.env.DATABASE || "testdb"
};