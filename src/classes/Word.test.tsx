/**
 * @jest-environment node
 */

import Word from './Word';
import WordFile from './WordFile';
import {expect, test} from '@jest/globals';

test('Word success parsing test', async () => {

    const word = new Word({
        w_id: 1,
        w_word: "test",
        w_length: 4
    })
    
    expect(word.w_id).toBe(1)
    expect(word.w_word).toBe("TEST")
    expect(word.w_length).toBe(4)

});

test('Word infer length test', async () => {

    const word = new Word({
        w_id: 1,
        w_word: "test"
    })
    
    expect(word.w_id).toBe(1)
    expect(word.w_word).toBe("TEST")
    expect(word.w_length).toBe(4)

});

test('Word incorrect length test', async () => {

    const word = new Word({
        w_id: 1,
        w_word: "test",
        w_length: 5
    })
    
    expect(word.w_id).toBe(1)
    expect(word.w_word).toBe("TEST")
    expect(word.w_length).toBe(5)

});