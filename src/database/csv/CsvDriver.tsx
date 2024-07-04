import Word from "classes/Word"
import WordFile from "classes/WordFile"
import AbstractFlatFileDriver from "database/AbstractFlatFileDriver"
import IWordFile from "interfaces/IWordFile"

/**
 * Driver for a flat file CSV database.
 * 
 * Expected format is:
 * word,length
 * 
 * eg.
 * test,4
 * 
 * Length (the second parameter) is optional.
 * 
 * Note that this is NOT a proper CSV parser.
 * This game only allows alpha characters, so it assumes the data
 * being fed to it doesn't contain any other characters.
 * If you try to use words with special characters, such as apostrophes,
 * it won't work.
 */
export default class JsonDriver extends AbstractFlatFileDriver{

    constructor(){
        super("csv")
    }

    parseWordFile(data: string): IWordFile{
        
        const lines = data.split("\n")
        const linesAndRows = lines.map(l => l.split(","))

        var i = 0
        const arr = linesAndRows.map(cols => {
            i += 1
            
            const w_word = cols[0].toUpperCase()
            // TODO validate w_word, make sure they're all alpha characters

            const w_length = (cols.length > 1) ? parseInt(cols[1]):  cols[0].length
            return new Word({ w_id:i, w_length, w_word })
        })
        return new WordFile({ words:arr })

    }

}