import IConfig from "interfaces/IConfig"
import IWordRequestResponse from "interfaces/IWordRequestResponse"
import { INextResponseSuccess } from "network/NextResponseSuccess"
import { useEffect, useState } from "react"

export default function PlayViewModel(): IPlayViewModel{

    const [word, setWord] = useState<string>("")
    const [guesses, setGuesses] = useState<Array<string>>([])
    const [currentGuess, setCurrentGuess] = useState<string>("")
    const [allowedAttempts, setAllowedAttempts] = useState<number>(0)
    const [currentAttempt, setCurrentAttempt] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const startNewGame = (newWord: string, config: IConfig) => {

        const maxNumberOfGuesses = config.attempts
        const maxWordLength = newWord.length
        const paddedInitialAttempt = "".padEnd(maxWordLength, " ")

        const initialGuesses = Array<string>(maxNumberOfGuesses)
        for (var i = 0; i < maxNumberOfGuesses; i += 1)
            initialGuesses[i] = paddedInitialAttempt

        setWord(newWord)
        setGuesses(initialGuesses)
        setCurrentGuess(paddedInitialAttempt)
        setAllowedAttempts(maxNumberOfGuesses)
        setCurrentAttempt(0)

    }

    // When the viewmodel first loads, fetch the config from the server
    useEffect(() => {
        if (!loaded){
            fetch('/api/config')
                .then((res) => res.json())
                .then((res: INextResponseSuccess) => res.data as IConfig)
                .then((config: IConfig) => {

                    fetch('/api/word')
                        .then(res => res.json())
                        .then((res: INextResponseSuccess) => res.data as IWordRequestResponse)
                        .then(data => {
                            const w = data.word
                            startNewGame(w.w_word, config)
                            setLoaded(true)
                        })
                        .catch(() => {
                            setError("Failed to load word")
                            setLoaded(true)
                        })
                })
        }
    }, [loaded])

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
            ...guesses.slice(index, 5)
        ])
    }

    const currentGuessAdd = (letter: string) => {
        const trimmed = currentGuess.trim()
        if (trimmed.length < word.length){
            const newGuess = (trimmed+letter).padEnd(word.length, " ")
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