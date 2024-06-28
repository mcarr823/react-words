/**
 * Represents a request to the /api/words endpoint.
 * 
 * This is used to request either:
 * -a list of all available word lengths
 * -all words of a specific length
 * -a single word of a specific length
 */
export default interface IWordRequest{

    // If defined, grab one or more words of this length.
    // eg. A value of 4 would mean we should grab a word
    // with 4 characters in it.
    length?: number;

    // If defined and true, grab ALL of the words of the
    // given length instead of just one.
    // Requires length to be defined.
    all?: boolean;

    // If defined, these specific words are the ones on
    // which to perform a given operation.
    // eg. These are the specific words to delete, or to
    // save.
    words?: Array<string>;

}