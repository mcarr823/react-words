import Word from "classes/Word"
import WordFile from "classes/WordFile"
import { IDatabaseDriver } from "interfaces/IDatabaseDriver"
import IWordFile from "interfaces/IWordFile"
import fs from "node:fs"

/**
 * Driver for a flat file database.
 * 
 * eg. JSON, CSV, XML
 */
export default abstract class AbstractFlatFileDriver implements IDatabaseDriver{

    extension: string
    localWordDir: string

    /**
     * @param extension The extension of the file format. eg. "xml" or "json"
     */
    constructor(extension: string){
        this.extension = extension
        this.localWordDir = process.cwd()+"/data/words"
    }

    abstract parseWordFile(data: string): IWordFile

    private getWordFile(length: number): WordFile{

        // Read the local file which contains words of
        // the given length.
        const file = `${this.localWordDir}/${length}.${this.extension}`
        const data = fs.readFileSync(file)

        // Parse the file and make sure it adheres to
        // the expected format.
        const arr = this.parseWordFile(data.toString())

        return new WordFile(arr)

    }

    async close(){
        // Nothing to do
    }

    async getWords(length: number): Promise<Array<Word>>{
        return this.getWordFile(length).words
    }

    async getWordRandom(length: number): Promise<Array<Word>>{
        return this.getWordFile(length).random()
    }

    async getLengths(): Promise<Array<number>>{

        // Read all of the files from the directory and
        // filter out any which aren't JSON files.
        const files = fs.readdirSync(this.localWordDir)
                        .filter(f => f.endsWith(`.${this.extension}`))

        // For each of those files, remove the suffix and
        // convert the name into an int.
        // eg. Convert 4.json into 4
        return files.map(f => f.substring(0, f.length - 5))
                    .map(f => parseInt(f))

    }

}