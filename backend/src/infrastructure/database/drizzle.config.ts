import { defineConfig } from 'drizzle-kit';
import dotenv from "dotenv";


dotenv.config();


export default defineConfig({
    schema: './src/infrastructure/database/contact.schema.ts',
    out: './src/migrations',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
});
