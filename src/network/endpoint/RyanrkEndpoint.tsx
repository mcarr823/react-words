import { AbstractEndpoint } from "./AbstractEndpoint"

/**
 * HTTP endpoint for the random word API hosted on:
 * https://random-word.ryanrk.com/api/en
 * */
export class RyanrkEndpoint extends AbstractEndpoint {

    constructor(){
        super("https://random-word.ryanrk.com/api/en")
    }

    override getRandomWord(length?: number | undefined): Promise<string> {
        if (length)
            return this.getJsonStringArraySingle(`word/random/?length=${length}`)
        else
            return this.getJsonStringArraySingle("word/random")
    }

}