import Word from "classes/Word"
import WordFile from "classes/WordFile"
import AbstractFlatFileDriver from "database/AbstractFlatFileDriver"
import IWordFile from "interfaces/IWordFile"

/**
 * Driver for a flat file JSON database.
 * 
 * Expected format:
 * {"words": [ word1, word2, word3, etc. ]}
 * 
 * eg.
 * {"words": [ "easy", "four", "word"]}
 */
export default class JsonDriver extends AbstractFlatFileDriver{

    constructor(){
        super("json")
    }

    parseWordFile(data: string): IWordFile{
        
        const json = JSON.parse(data)
        const strArray = json.words as Array<string>
        var w_id = 0
        const words = strArray.map(w_word => {
            w_id += 1
            return new Word({ w_id, w_word })
        })
        return new WordFile({ words })

    }

}