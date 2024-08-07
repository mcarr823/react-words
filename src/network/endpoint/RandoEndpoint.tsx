import { AbstractEndpoint } from "./AbstractEndpoint"

/**
 * HTTP endpoint for the random word API hosted on:
 * https://random-word-api.vercel.app
 * */
export class RandoEndpoint extends AbstractEndpoint {

    constructor(){
        super("https://random-word-api.vercel.app")
    }

    override getRandomWord(length?: number | undefined): Promise<string> {
        if (length)
            return this.getJsonStringArraySingle(`api?words=1&length=${length}`)
        else
            return this.getJsonStringArraySingle("api?words=1")
    }

}