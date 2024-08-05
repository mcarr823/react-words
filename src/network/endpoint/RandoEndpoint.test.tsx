/**
 * @jest-environment node
 */

import { RandoEndpoint } from "./RandoEndpoint"

const client = new RandoEndpoint()

test("RandoEndpoint - get random word", async () => {
    const word = await client.getRandomWord()
    expect(word.length).toBeGreaterThan(0)
})

test("RandoEndpoint - get word length 3", async () => {
    const word = await client.getRandomWord(3)
    expect(word.length).toBe(3)
})

test("RandoEndpoint - get word length 4", async () => {
    const word = await client.getRandomWord(4)
    expect(word.length).toBe(4)
})

test("RandoEndpoint - get word length 5", async () => {
    const word = await client.getRandomWord(5)
    expect(word.length).toBe(5)
})