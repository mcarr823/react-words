/**
 * @jest-environment node
 */

import Word from './Word';
import WordFile from './WordFile';
import {expect, test} from '@jest/globals';

test('WordFile success parsing test', async () => {

    const inData = [
        new Word({ w_id:0, w_word:"test" }),
        new Word({ w_id:1, w_word:"testing" }),
        new Word({ w_id:2, w_word:"pest" }),
        new Word({ w_id:3, w_word:"paste" })
    ]

    const wordFile = new WordFile({
        words:inData
    })

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

test('WordFile fail parsing test', async () => {

    const inData = [
        new Word({ w_id:0, w_word:"test", w_length:5 })
    ]

    var parsedSuccessfully = false
    try{
        new WordFile({
            words:inData
        })
        parsedSuccessfully = true
    }catch(e){}

    expect(parsedSuccessfully).toBe(false)

});

test('WordFile random()', async () => {

    const emptyWordFile = new WordFile({ words:[] })
    expect(emptyWordFile.words.length).toBe(0)

    const emptyRandom = emptyWordFile.random()
    expect(emptyRandom.length).toBe(0)


    const oneWordFile = new WordFile({ words:[
        new Word({ w_id:0, w_word:"test" })
    ]})
    expect(oneWordFile.words.length).toBe(1)

    const oneRandom = oneWordFile.random()
    expect(oneRandom.length).toBe(1)
    expect(oneRandom[0].w_word.toLowerCase()).toBe("test")


    var w_id = 0
    const fourWords = [ "test", "testing", "pest", "paste" ]
    const fourWordArray = fourWords.map(w_word => {
        w_id += 1
        return new Word({ w_id, w_word })
    })
    const fourWordFile = new WordFile({ words:fourWordArray })
    expect(fourWordFile.words.length).toBe(4)

    for (var i = 0; i < 10; i += 1){
        const fourRandom = fourWordFile.random()
        expect(fourRandom.length).toBe(1)
        const found = fourWords.includes(fourRandom[0].w_word.toLowerCase())
        expect(found).toBe(true)
    }

});

test('WordFile filter()', async () => {

    var w_id = 0
    const fourWords = [ "test", "testing", "pest", "paste" ]
    const fourWordArray = fourWords.map(w_word => {
        w_id += 1
        return new Word({ w_id, w_word })
    })

    // Length is initially 4
    const fourWordFile = new WordFile({ words:fourWordArray })
    expect(fourWordFile.words.length).toBe(4)

    // "test" is removed, so the length is now 3 instead
    // of 4.
    const threeWordFile = fourWordFile.filter([ "test" ])
    expect(threeWordFile.words.length).toBe(3)

    // "test" has already been removed, so it should still
    // have a length of 3.
    const stillThreeWordFile = fourWordFile.filter([ "test" ])
    expect(stillThreeWordFile.words.length).toBe(3)


});

test('WordFile emptyWordFile()', async () => {

    const emptyFile = WordFile.emptyWordFile()
    expect(emptyFile.words.length).toBe(0)

});
