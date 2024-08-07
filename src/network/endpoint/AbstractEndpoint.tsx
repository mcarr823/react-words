/**
 * Abstract class which any http endpoint should extend.
 *
 * Provides a layer of abstraction between the different endpoint
 * api implementations and the business logic.
 * */
export abstract class AbstractEndpoint{
    
    baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl
    }

    /**
     * Get a single word of the requested length from the endpoint.
     * 
     * If length is undefined, it will return a word of a random length.
     *
     * @param length Length of the word to request
     * @return A word of the requested length
     * */
    abstract getRandomWord(length: number | undefined): Promise<string>

    /**
     * Performs a request to an API endpoint, expecting
     * the response to be an array of strings.
     *
     * Example response:
     * ["camos"]
     *
     * @param query Query string to append to the end of the API endpoint.
     * @return A list of words returned from the API endpoint.
     * */
    async getJsonStringArray(query: string): Promise<Array<string>> {
        const url = `${this.baseUrl}/${query}`
        return fetch(url)
                .then(res => res.text())
                .then(text => JSON.parse(text))
    }

    /**
     * Performs a request to an API endpoint, expecting
     * the response to be an array of strings.
     *
     * Example response:
     * ["camos"]
     *
     * @param query Query string to append to the end of the API endpoint.
     * @return The first word returned from the API endpoint
     * */
    async getJsonStringArraySingle(query: string): Promise<string> {
        return this.getJsonStringArray(query)
                    .then(arr => arr[0])
    }

}