import Word from "classes/Word";

/**
 * Represents a response from a request to the /api/words endpoint.
 */
export default interface IWordsRequestResponse{

    // An array containing zero or more words.
    words: Array<Word>;

}