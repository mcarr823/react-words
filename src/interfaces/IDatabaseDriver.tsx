import Word from "classes/Word";

/**
 * Interface which any database driver should implement.
 * 
 * Provides common functions which we would want to run
 * on the database regardless of the exact database type.
 */
export interface IDatabaseDriver{
    getWords: (length: number) => Promise<Array<Word>>;
    getWordRandom: (length: number) => Promise<Word | undefined>;
    getLengths: () => Promise<Array<number>>;
    close: () => Promise<void>;
}