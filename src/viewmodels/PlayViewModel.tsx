import { useState } from "react"

export default function PlayViewModel(): IPlayViewModel{

    // TODO remove later
    // Hard-coded test data
    const TEST_WORD = "TESTING"
    const maxLength = 5
    const initialGuesses = Array<string>(maxLength)
    for (var i = 0; i < maxLength; i += 1)
        initialGuesses[i] = "".padEnd(TEST_WORD.length, " ")
    const testCurrentGuess = "".padEnd(TEST_WORD.length, " ")

    const [word, setWord] = useState<string>(TEST_WORD)
    const [guesses, setGuesses] = useState<Array<string>>(initialGuesses)
    const [currentGuess, setCurrentGuess] = useState<string>(testCurrentGuess)

    // TODO useEffect to load random word from server

    // Add a new guess
    // Slice the existing guesses, so we don't go over 6 recent guesses
    // at any one time.
    const addGuess = (
        guess: string
    ) => {
        // TODO remove first element if guesses are full, but we haven't hit the limit
        const emptyGuess = "".padEnd(word.length, " ")
        const index = guesses.indexOf(emptyGuess)
        setGuesses([
            ...guesses.slice(0, index),
            guess,
            ...guesses.slice(index, maxLength-1)
        ])
    }

    const currentGuessAdd = (letter: string) => {
        const trimmed = currentGuess.trim()
        if (trimmed.length < word.length){
            const newGuess = (trimmed+letter).padEnd(word.length, " ")
            console.log(`Setting current guess to ${newGuess}`)
            setCurrentGuess(newGuess)
        }else{
            console.log("Guess is already full")
        }
    }

    const currentGuessBackspace = () => {
        const trimmed = currentGuess.trim()
        if (trimmed.length > 0){
            const guessMinusLastChar = trimmed.substring(0, trimmed.length - 1)
            const newGuess = guessMinusLastChar.padEnd(word.length, " ")
            setCurrentGuess(newGuess)
        }else{
            console.log("Guess is already empty")
        }
    }

    const currentGuessSubmit = () => {
        const trimmed = currentGuess.trim()
        if (trimmed.length == word.length){
            addGuess(trimmed)
            //if game is finished (either correct or max guesses exceeded)
            //add hinting to current guess (if last)
            //else

            const newGuess = "".padEnd(word.length, " ")
            setCurrentGuess(newGuess)
        }else{
            console.log("Guess is not full")
        }
    }

    return {
        word,
        guesses,
        currentGuess,
        currentGuessAdd,
        currentGuessBackspace,
        currentGuessSubmit
    }

}

export interface IPlayViewModel{
    word: string;
    guesses: Array<string>;
    currentGuess: string;
    currentGuessAdd: (letter: string) => void;
    currentGuessBackspace: () => void;
    currentGuessSubmit: () => void;
}