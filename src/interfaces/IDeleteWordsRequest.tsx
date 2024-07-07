/**
 * Represents a DELETE request to the /api/words endpoint.
 * 
 * This is used to delete all words for a single length.
 */
export default interface IDeleteWordsRequest{

    // The length of the words to delete
    length: number;

}