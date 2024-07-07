/**
 * Represents a request to the /api/words endpoint.
 * 
 * This is used to request all words of a specific length.
 */
export default interface IWordsRequest{

    // Grab words of this length.
    // eg. A value of 4 would mean we should grab a word
    // with 4 characters in it.
    length: number;

    // If defined, these specific words are the ones on
    // which to perform a given operation.
    // eg. These are the specific words to delete, or to
    // save.
    words?: Array<string>;

}