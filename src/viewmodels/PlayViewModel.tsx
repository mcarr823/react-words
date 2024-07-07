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
        setGuesses([
            ...guesses.slice(0, 5),
            guess
        ])
    }

    return {
        word,
        guesses,
        addGuess
    }

}

interface IPlayViewModel{
    word: string;
    guesses: Array<string>;
    addGuess: (guess: string) => void;
}