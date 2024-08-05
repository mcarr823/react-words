/**
 * @jest-environment node
 */

import { RyanrkEndpoint } from "./RyanrkEndpoint"

const client = new RyanrkEndpoint()

test("RyanrkEndpoint - get random word", async () => {
    const word = await client.getRandomWord()
    expect(word.length).toBeGreaterThan(0)
})

test("RyanrkEndpoint - get word length 3", async () => {
    const word = await client.getRandomWord(3)
    expect(word.length).toBe(3)
})

test("RyanrkEndpoint - get word length 4", async () => {
    const word = await client.getRandomWord(4)
    expect(word.length).toBe(4)
})

test("RyanrkEndpoint - get word length 5", async () => {
    const word = await client.getRandomWord(5)
    expect(word.length).toBe(5)
})