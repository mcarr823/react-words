/**
 * @jest-environment node
 */

import { RyanrkEndpoint } from "./RyanrkEndpoint"

const client = new RyanrkEndpoint()
const excludeNetworkTests = process.env.UNIT_TEST_INCLUDE_NETWORK !== 'true'

test("RyanrkEndpoint - get random word", async () => {
    if (excludeNetworkTests) return
    const word = await client.getRandomWord()
    expect(word.length).toBeGreaterThan(0)
})

test("RyanrkEndpoint - get word length 3", async () => {
    if (excludeNetworkTests) return
    const word = await client.getRandomWord(3)
    expect(word.length).toBe(3)
})

test("RyanrkEndpoint - get word length 4", async () => {
    if (excludeNetworkTests) return
    const word = await client.getRandomWord(4)
    expect(word.length).toBe(4)
})

test("RyanrkEndpoint - get word length 5", async () => {
    if (excludeNetworkTests) return
    const word = await client.getRandomWord(5)
    expect(word.length).toBe(5)
})