import Word from "classes/Word";

/**
 * Represents a response from a request to
 * the /api/words endpoint.
 * 
 * See IWordRequest.tsx for more context.
 */
export default interface IWordRequestResponse{

    // An array containing zero or more words.
    // Contains 0-1 words if `all` was set to false.
    // Contains 0-n words if `all` was set to true.
    // undefined if `length` was not set.
    words?: Array<Word>;

    // An array containing all of the available word lengths.
    // ie. Word lengths which have at least 1 word defined.
    // undefined if `length` was set.
    lengths?: Array<number>;

}