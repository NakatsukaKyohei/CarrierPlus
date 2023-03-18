import { Client } from 'pg';
// import { DBConfig } from '../models/database/DatabaseConfig';
import dbConfig from '../dbconfig';
import Proverb from '../models/Proverb';
import { Connection, createConnection, getRepository } from 'typeorm';

export class Postgre {
    private static connection: Connection;
    
    public static async createConnection() {
        if (!this.connection) {
            this.connection = await createConnection(dbConfig);
        }
        return this.connection;
    }
}
