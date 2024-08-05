/**
 * @jest-environment node
 */

import { HerokuEndpoint } from "./HerokuEndpoint"

const client = new HerokuEndpoint()

test("HerokuEndpoint - get random word", async () => {
    const word = await client.getRandomWord()
    expect(word.length).toBeGreaterThan(0)
})

test("HerokuEndpoint - get word length 3", async () => {
    const word = await client.getRandomWord(3)
    expect(word.length).toBe(3)
})

test("HerokuEndpoint - get word length 4", async () => {
    const word = await client.getRandomWord(4)
    expect(word.length).toBe(4)
})

test("HerokuEndpoint - get word length 5", async () => {
    const word = await client.getRandomWord(5)
    expect(word.length).toBe(5)
})