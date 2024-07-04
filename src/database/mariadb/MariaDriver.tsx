import Word from 'classes/Word';
import { IDatabaseInitArgs } from 'interfaces/IDatabaseInitArgs';
import { IDatabaseDriver } from 'interfaces/IDatabaseDriver';
import IWord from 'interfaces/IWord';
import mysql, { Connection, ConnectionOptions, RowDataPacket } from 'mysql2/promise';

/**
 * Driver for a MariaDB/MySQL database.
 * 
 * This class abstracts calls to the actual database driver (mysql2).
 */
export default class MariaDriver implements IDatabaseDriver{

    opts: ConnectionOptions;
    conn: Connection | undefined;

    constructor(args : IDatabaseInitArgs){
        const { username, database, password, host, port } = args
        this.opts = {
            user:username,
            database,
            password,
            host,
            port
        }
    }

    async connect(){
        this.conn = await mysql.createConnection(this.opts)
    }

    async query(sql: string, whereArgs: Array<any> = []): Promise<RowDataPacket[]>{
        if (!this.conn)
            throw new Error("Database connection not established");
        const [rows, fields] = await this.conn.execute<RowDataPacket[]>(sql, whereArgs)
        return rows
    }

    async close(){
        if (this.conn)
            await this.conn.end()
    }

    async getWords(length: number): Promise<Word[]>{
        const sql = `SELECT * FROM ${Word.TABLE_NAME} WHERE ${Word.W_LENGTH} = ?`
        const whereArgs = [length]
        const result = await this.query(sql, whereArgs)
        const objects = result.map(r => r as IWord)
        return objects.map(w => new Word(w))
    }

    async getWordRandom(length: number): Promise<Word[]>{
        const sql = `SELECT * FROM ${Word.TABLE_NAME} WHERE ${Word.W_LENGTH} = ? ORDER BY RAND() LIMIT 1`
        const whereArgs = [length]
        const result = await this.query(sql, whereArgs)
        const objects = result.map(r => r as IWord)
        return objects.map(w => new Word(w))
    }

    async getLengths(): Promise<number[]>{
        const sql = `SELECT w_length FROM ${Word.TABLE_NAME} GROUP BY ${Word.W_LENGTH}`
        const result = await this.query(sql)
        return result.map(r => r.w_length as number)
    }

}