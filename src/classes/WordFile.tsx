import IWordFile from "interfaces/IWordFile";

/**
 * Validates an IWordFile JSON data response and provides
 * methods for utilizing it.
 */
export default class WordFile implements IWordFile{

    words: Array<string>;

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
    random(): Array<string> {
        
        const length = this.words.length
        if (length === 0){
            return []
        }

        if (length === 1){
            return [ this.words[0] ]
        }

        const rand = Math.random()
        const index = Math.floor(length * rand)
        return [ this.words[index] ]

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
        const filtered = this.words.filter(w => w.toLowerCase() !in toRemoveLower)
        return new WordFile({
            words: filtered
        })

    }

    private validate<T>(value: T): T {
        if (typeof value === 'undefined'){
            throw Error("One or more expected parameters not specified")
        }
        return value
    }

    static emptyWordFile(): WordFile {
        return new WordFile({
            words: []
        })
    }

}