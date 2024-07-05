import IWord, { IWordArgs } from "interfaces/IWord";

/**
 * Represents a row of the "Word" table.
 */
export default class Word implements IWord{

    // Database table name and fields
    static TABLE_NAME = "Word"
    static W_ID = "w_id"
    static W_LENGTH = "w_length"
    static W_WORD = "w_word"

    w_id: number;
    w_length: number;
    w_word: string;

    constructor(args: {
        w_id: number,
        w_word: string,
        w_length?: number
    }){
        this.w_id = args.w_id
        this.w_word = args.w_word.toUpperCase().trim()
        this.w_length = args.w_length ?? this.w_word.length
    }

}