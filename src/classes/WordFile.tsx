import IWordFile from "interfaces/IWordFile";
import Word from "./Word";

/**
 * Validates an IWordFile JSON data response and provides
 * methods for utilizing it.
 */
export default class WordFile implements IWordFile{

    words: Array<Word>;

    constructor(
        file: IWordFile
    ){
        this.words = this.validate(file.words)
    }

    /**
     * Returns an array containing a single word, or
     * an empty array if there are no words.
     * 
     * The word is chosen at random.
     * 
     * @returns An array containing a random word from the file.
     * Returns an empty array if there are no words.
     */
    random(): Word | undefined {
        
        const length = this.words.length
        if (length === 0){
            return undefined
        }

        if (length === 1){
            return this.words[0]
        }

        const rand = Math.random()
        const index = Math.floor(length * rand)
        return this.words[index]

    }

    /**
     * Returns a new WordFile object, since the words array
     * is immutable.
     * 
     * @param wordsToRemove Array of words to remove from
     * this file.
     * @returns A new WordFile object
     */
    filter(
        wordsToRemove: Array<string>
    ): WordFile {

        const toRemoveLower = wordsToRemove.map(w => w.toLowerCase())
        const filtered = this.words.filter(w => !toRemoveLower.includes(w.w_word.toLowerCase()))
        return new WordFile({
            words: filtered
        })

    }

    private validate(value: Array<Word>): Array<Word> {

        if (typeof value === 'undefined'){
            throw Error("One or more expected parameters not specified")
        }

        const filtered = value.filter(w => w.w_length > 0)

        filtered.forEach(w => {
            if (w.w_length != w.w_word.length){
                throw new Error(`Length match failed for '${w.w_word}' (${w.w_length} != ${w.w_word.length})`);
            }
        })
        // TODO validate w_word, make sure they're all alpha characters
        return filtered
    }

    static emptyWordFile(): WordFile {
        return new WordFile({
            words: []
        })
    }

}