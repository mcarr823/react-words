import Word from "classes/Word";

/**
 * Represents a response from a request to the /api/word endpoint.
 */
export default interface IWordRequestResponse{

    // An single word
    word: Word;

}