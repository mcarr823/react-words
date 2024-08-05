import { AbstractEndpoint } from "./AbstractEndpoint"

/**
 * HTTP endpoint for the random word API hosted on:
 * https://random-word-api.herokuapp.com
 * */
export class HerokuEndpoint extends AbstractEndpoint {

    constructor(){
        super("https://random-word-api.herokuapp.com")
    }

    override getRandomWord(length?: number | undefined): Promise<String> {
        if (length)
            return this.getJsonStringArraySingle(`word?length=${length}`)
        else
            return this.getJsonStringArraySingle("word")
    }

    /**
     * Retrieves all available words from the remote endpoint.
     *
     * This list is quite large, so this request should only be performed
     * once in order to create a local database of words.
     *
     * @return A list of words from the server
     * */
    downloadAllWords(): Promise<Array<String>> {
        return this.getJsonStringArray("all")
    }
}