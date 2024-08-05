import Word from "classes/Word"
import WordFile from "classes/WordFile"
import AbstractFlatFileDriver from "database/AbstractFlatFileDriver"
import IWordFile from "interfaces/IWordFile"

/**
 * Driver for a flat file JSON database.
 * 
 * Expected format:
 * {"words": [ word1, word2, word3, etc. ]}
 * or
 * [ word1, word2, word3, etc. ]
 * 
 * eg.
 * {"words": ["easy", "four", "word"]}
 * or
 * ["easy", "four", "word"]
 */
export default class JsonDriver extends AbstractFlatFileDriver{

    constructor(){
        super("json")
    }

    parseWordFile(data: string): IWordFile{
        
        const json = JSON.parse(data)

        let strArray: Array<string>;

        if (Array.isArray(json)){
            // First format: ["word","word2",etc.]
            strArray = json as Array<string>;
        }else if (typeof json === 'object' && 'words' in json){
            // Second format: {"words":["word", "word2", etc.]}
            strArray = json.words as Array<string>;
        }else{
            throw new Error("Invalid format");
        }

        var w_id = 0
        const words = strArray.map(w_word => {
            w_id += 1
            return new Word({ w_id, w_word })
        })
        return new WordFile({ words })

    }

}