import Word from 'classes/Word';
import { IDatabaseDriver } from 'interfaces/IDatabaseDriver';
import { IDatabaseInitArgs } from 'interfaces/IDatabaseInitArgs';
import IWord from 'interfaces/IWord';
import postgres, { RowList, Row, Options, Sql } from 'postgres'

/**
 * Driver for a Postgres database.
 * 
 * This class abstracts calls to the actual database driver (postgres).
 */
export default class PostgresDriver implements IDatabaseDriver{

    opts: Options<{}>;
    conn: Sql | undefined;

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
        this.conn = postgres(this.opts)
    }

    async query(sql: string): Promise<RowList<Row[]>>{
        if (!this.conn)
            throw new Error("Database connection not established");
        return this.conn`${sql}`
    }

    async close(){
        if (this.conn)
            await this.conn.end()
    }

    async getWords(length: number): Promise<Word[]>{
        const sql = `SELECT * FROM ${Word.TABLE_NAME} WHERE ${Word.W_LENGTH} = ${length}`
        const result = await this.query(sql)
        const objects = result.map(r => r as IWord)
        return objects.map(r => new Word(r))
    }

    async getWordRandom(length: number): Promise<Word[]>{
        const sql = `SELECT * FROM ${Word.TABLE_NAME} WHERE ${Word.W_LENGTH} = ${length} ORDER BY RAND() LIMIT 1`
        const result = await this.query(sql)
        const objects = result.map(r => r as IWord)
        return objects.map(w => new Word(w))
    }
    
    async getLengths(): Promise<number[]>{
        const sql = `SELECT w_length FROM ${Word.TABLE_NAME} GROUP BY ${Word.W_LENGTH}`
        const result = await this.query(sql)
        return result.map(r => r.w_length as number)
    }

}