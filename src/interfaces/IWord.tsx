/**
 * Represents a row of the "Word" table.
 */
export default interface IWord{
    w_id: number;
    w_length: number;
    w_word: string;
}

/**
 * Represents a row of the "Word" table, but with
 * optional arguments.
 * 
 * Used in cases where we only want a subset of the
 * parameters.
 */
export interface IWordArgs{
    w_id?: number;
    w_length?: number;
    w_word?: string;
}