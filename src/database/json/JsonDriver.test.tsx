/**
 * @jest-environment node
 */

import JsonDriver from './JsonDriver';
import {expect, test} from '@jest/globals';

test('JsonDriver parsing test', async () => {

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