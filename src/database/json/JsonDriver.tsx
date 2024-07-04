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
        const words = json.words as Array<String>
        var i = 0
        const arr = words.map(w => {
            i += 1
            const w_word = w.toUpperCase()
            const w_length = w_word.length
            return new Word({ w_id: i, w_word, w_length })
        })
        return new WordFile({ words:arr })

    }

}