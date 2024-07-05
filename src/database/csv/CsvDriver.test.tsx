/**
 * @jest-environment node
 */

import CsvDriver from './CsvDriver';
import {expect, test} from '@jest/globals';

test('CsvDriver parsing test', async () => {

    const testCsvData = `
    test,4
    testing,7
    pest,4
    paste,5
    `

    const driver = new CsvDriver()
    const wordFile = driver.parseWordFile(testCsvData)

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