import { Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
// import dotenv from "dotenv";

const dotenv = require('dotenv');
dotenv.config();


@Injectable()
export class DatabaseConfig {
    async get_db() {
        const connection = await createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        return drizzle({client: connection});
    }
}
