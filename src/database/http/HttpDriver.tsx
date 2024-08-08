import Word from "classes/Word"
import { IDatabaseDriver } from "interfaces/IDatabaseDriver"
import { AbstractEndpoint } from "network/endpoint/AbstractEndpoint"

/**
 * Driver for a HTTP endpoint data source.
 * 
 * The HTTP driver is fundamentally different than the others, since
 * we don't have specific lengths or know specific words.
 * 
 * It can request a new word... but that's about it.
 */
export default class HttpDriver implements IDatabaseDriver{

    endpoint: AbstractEndpoint;

    constructor(endpoint: AbstractEndpoint){
        this.endpoint = endpoint
    }

    async getWords(length: number) : Promise<Array<Word>> {
        throw new Error("This function is not supported by the HTTP driver");
    }

    async getWordRandom(length: number) : Promise<Word | undefined> {
        const w_id = 0
        return this.endpoint.getRandomWord(length)
                            .then(w_word => new Word({ w_id, w_word }))
    }

    async getLengths(): Promise<Array<number>> {
        throw new Error("This function is not supported by the HTTP driver");
    }

    async close(): Promise<void>{
        // Do nothing
    }

}