/**
 * @jest-environment node
 */

import JsonDriver from './JsonDriver';
import {expect, test} from '@jest/globals';

test('JsonDriver parsing test - format 1', async () => {

    const testJsonData = `{
        "words": [
            "paste",
            "pest",
            "testing",
            "test"
        ]
    }`

    const driver = new JsonDriver()
    const wordFile = driver.parseWordFile(testJsonData)

    const words = wordFile.words
    expect(words.length).toBe(4)

    const fourLetterWords = words.filter(w => w.w_length == 4)
    const fiveLetterWords = words.filter(w => w.w_length == 5)
    const sixLetterWords = words.filter(w => w.w_length == 6)
    const sevenLetterWords = words.filter(w => w.w_length == 7)

    expect(fourLetterWords.length).toBe(2)
    expect(fiveLetterWords.length).toBe(1)
    expect(sixLetterWords.length).toBe(0)
    expect(sevenLetterWords.length).toBe(1)

});

test('JsonDriver parsing test - format 2', async () => {

    const testJsonData = `[
        "paste",
        "pest",
        "testing",
        "test"
    ]`

    const driver = new JsonDriver()
    const wordFile = driver.parseWordFile(testJsonData)

    const words = wordFile.words
    expect(words.length).toBe(4)

    const fourLetterWords = words.filter(w => w.w_length == 4)
    const fiveLetterWords = words.filter(w => w.w_length == 5)
    const sixLetterWords = words.filter(w => w.w_length == 6)
    const sevenLetterWords = words.filter(w => w.w_length == 7)

    expect(fourLetterWords.length).toBe(2)
    expect(fiveLetterWords.length).toBe(1)
    expect(sixLetterWords.length).toBe(0)
    expect(sevenLetterWords.length).toBe(1)

});

test('JsonDriver parsing test - format 1 failure', async () => {

    // "word" instead of "words"
    const testJsonData = `{
        "word": [
            "paste",
            "pest",
            "testing",
            "test"
        ]
    }`

    const driver = new JsonDriver()
    let failedToParse = false
    try {
        driver.parseWordFile(testJsonData)
    } catch (error) {
        failedToParse = true
    }

    expect(failedToParse).toBe(true)

});

test('JsonDriver parsing test - format 2 failure', async () => {

    // Missing close bracket
    const testJsonData = `[
        "paste",
        "pest",
        "testing",
        "test"
    `

    const driver = new JsonDriver()
    let failedToParse = false
    try {
        driver.parseWordFile(testJsonData)
    } catch (error) {
        failedToParse = true
    }

    expect(failedToParse).toBe(true)

});