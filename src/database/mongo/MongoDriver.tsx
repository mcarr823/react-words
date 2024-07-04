import Word from 'classes/Word';
import { IDatabaseDriver } from 'interfaces/IDatabaseDriver';
import { IDatabaseInitArgs } from 'interfaces/IDatabaseInitArgs';
import IWord, { IWordArgs } from 'interfaces/IWord';
import { Collection, Db, Document, MongoClient } from 'mongodb';

/**
 * Driver for a MongoDB database.
 * 
 * This class abstracts calls to the actual database driver (mongodb).
 */
export default class MongoDriver implements IDatabaseDriver{

    client: MongoClient;
    database: string;
    conn: Db | undefined;

    constructor(args : IDatabaseInitArgs){
        const { username, database, password, host, port } = args

        // Connection URL
        const url = `mongodb://${host}:${port}`
        this.client = new MongoClient(url)
        this.database = database
    }

    async connect(){
        await this.client.connect();
        this.conn = this.client.db(this.database)
    }

    private async getTable(table: string): Promise<Collection>{
        if (!this.conn)
            throw new Error("Database connection not established");
        return this.conn.collection(table)
    }

    private async getOne(table: string, whereArgs: Object): Promise<Document | null>{
        const tbl = await this.getTable(table)
        return tbl.findOne(whereArgs)
    }

    private async getAll(table: string, whereArgs: Object): Promise<Document[]>{
        const tbl = await this.getTable(table)
        return tbl.find(whereArgs).toArray()
    }

    private async getRandom(table: string, whereArgs: Object): Promise<Document | null>{
        const tbl = await this.getTable(table)
        return tbl.aggregate([
            { $match: whereArgs },
            { $sample: { size: 1 } }
        ])
    }

    private async count(table: string, groupBy: string): Promise<Document | null>{
        const tbl = await this.getTable(table)
        return tbl.aggregate([
            {"$group" : {_id:groupBy, count:{$sum:1}}}
        ])
    }

    async close(){
        await this.client.close()
    }

    async getWords(length: number): Promise<Word[]>{
        const args: IWordArgs = { w_length: length }
        const results = await this.getAll(Word.TABLE_NAME, args)
        const objects = results.map(r => r as IWord)
        return objects.map(w => new Word(w))
    }

    async getWordRandom(length: number): Promise<Word[]>{
        const args: IWordArgs = { w_length: length }
        const result = await this.getRandom(Word.TABLE_NAME, args)
        if (result){
            const obj = result as IWord
            return [new Word(obj)]
        }else{
            return []
        }
    }

    async getLengths(): Promise<number[]>{
        const result = await this.count(Word.TABLE_NAME, "w_length")
        console.log(result)
        //TODO select 1 from each table
        return [0]
    }

}