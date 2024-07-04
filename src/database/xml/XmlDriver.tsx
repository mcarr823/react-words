import WordFile from "classes/WordFile"
import AbstractFlatFileDriver from "database/AbstractFlatFileDriver"
import IWordFile from "interfaces/IWordFile"
import { XMLParser } from "fast-xml-parser"
import Word from "classes/Word"

/**
 * Driver for a flat file XML database.
 * 
 * Expected format:
 * <words>
 *  <word>test</word>
 *  <word>pest</word>
 * </words>
 */
export default class XmlDriver extends AbstractFlatFileDriver{

    constructor(){
        super("xml")
    }

    parseWordFile(data: string): IWordFile{

        const parser = new XMLParser();
        const p = parser.parse(data);

        const xmlWords: Array<string> = p.words.word
        var w_id = 0
        const words = xmlWords.map(w_word => {
            w_id += 1
            const w_length = w_word.length
            return new Word({ w_id, w_length, w_word })
        })
        return new WordFile({ words })

    }

}
