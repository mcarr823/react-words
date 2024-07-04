import Word from "classes/Word";

/**
 * Specifies the format which a file in /data/words/
 * must adhere to.
 */
export default interface IWordFile{

    // An array containing zero or more words.
    words: Array<Word>;

}