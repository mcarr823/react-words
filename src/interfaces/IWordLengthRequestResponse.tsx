/**
 * Represents a response from a request to the /api/wordLength endpoint.
 */
export default interface IWordLengthRequestResponse{

    // An array containing all of the available word lengths.
    // ie. Word lengths which have at least 1 word defined.
    lengths: Array<number>;

}