import { useState } from "react"

export default function PlayViewModel(): IPlayViewModel{

    const [word, setWord] = useState<string>("")
    const [guesses, setGuesses] = useState<Array<string>>([])

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