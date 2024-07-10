import { Hint } from "enums/Hint"
import IConfig from "interfaces/IConfig"
import IWordRequestResponse from "interfaces/IWordRequestResponse"
import { INextResponseSuccess } from "network/NextResponseSuccess"
import { useEffect, useState } from "react"

export default function PlayViewModel(): IPlayViewModel{

    const [word, setWord] = useState<string>("")
    const [guesses, setGuesses] = useState<Array<string>>([])
    const [currentGuess, setCurrentGuess] = useState<string>("")
    const [guessedLetters, setGuessedLetters] = useState<string>("")
    const [allowedAttempts, setAllowedAttempts] = useState<number>(0)
    const [currentAttempt, setCurrentAttempt] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [gameOver, setGameOver] = useState<boolean>(false)

    const startNewGame = (newWord: string, config: IConfig) => {

        const maxNumberOfGuesses = config.attempts
        const maxWordLength = newWord.length
        const paddedInitialAttempt = "".padEnd(maxWordLength, " ")

        const guessesToShow = maxNumberOfGuesses < 4 ? maxNumberOfGuesses : 4
        const initialGuesses = Array<string>(guessesToShow)
        for (var i = 0; i < guessesToShow; i += 1)
            initialGuesses[i] = paddedInitialAttempt

        setGuessedLetters("")
        setWord(newWord)
        setGuesses(initialGuesses)
        setCurrentGuess(paddedInitialAttempt)
        setAllowedAttempts(maxNumberOfGuesses)
        setCurrentAttempt(0)
        setGameOver(false)

    }

    const playAgain = () => {
        setLoaded(false)
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

        // Keep track of letters we've already guessed so we can
        // illustrate this visually, so the player doesn't guess
        // the same letter again by mistake.
        // Removing duplicates isn't strictly necessary, but we
        // might as well.
        const oldGuesses = guessedLetters.split("")
        const newGuessLetters = guess.split("")
        newGuessLetters.forEach(l => {
            if (!oldGuesses.includes(l)) oldGuesses.push(l)
        })
        const joinedGuesses = oldGuesses.join("")
        setGuessedLetters(joinedGuesses)

        const emptyGuess = "".padEnd(word.length, " ")

        // Maximum number of guesses to show at once.
        // Note that this number is 1 less than in the startNewGame function.
        // That is because one space will be taken up by the new guess being inserted.
        const guessesToShow = (allowedAttempts < 4 ? allowedAttempts : 4) - 1

        // Find the first empty guess.
        // If there is one, then that means the grid isn't full yet,
        // so we should put our guess in the next empty space.
        // If there aren't any more empty guesses, that means the grid
        // is full, so we're going to have to shift the previous guesses
        // up one row to make more space.
        var offset = 0
        var index = guesses.indexOf(emptyGuess)
        if (index == -1){
            index = guesses.length - 1
            offset = 1
        }

        setGuesses([
            ...guesses.slice(offset, index+offset),
            guess,
            ...guesses.slice(index+offset, guessesToShow+offset)
        ])
    }

    // Returns the color which the corresponding virtual keyboard letter
    // should be.
    // If the letter hasn't been guessed, return NONE.
    // If the letter has been guessed and is in the word, return CORRECT.
    // If it's been guessed and isn't in the word, return INCORRECT.
    const getAlreadyGuessedHint = (letter: string): Hint => {
        const upper = letter.toUpperCase()
        const alreadyGuessed = guessedLetters.includes(upper)
        if (!alreadyGuessed)
            return Hint.NONE
        else if (word.includes(upper))
            return Hint.CORRECT
        else
            return Hint.INCORRECT
    }

    // If we're at least 1 character away from the character limit,
    // add the new character to the end of the current guess
    const currentGuessAdd = (letter: string) => {
        const trimmed = currentGuess.trim()
        if (trimmed.length < word.length){
            const newGuess = (trimmed+letter).padEnd(word.length, " ").toUpperCase()
            setCurrentGuess(newGuess)
        }else{
            console.log("Guess is already full")
        }
    }

    // If there's at least one character guessed, remove the
    // last character from the current guess
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

            // If we've guessed correctly, or allowedAttempts has been reached,
            // then the game is over.
            const correctGuess = trimmed == word
            const noAttemptsLeft = currentAttempt == allowedAttempts
            if (correctGuess || noAttemptsLeft){
                setGameOver(true)
                return
            }

            addGuess(trimmed)
            const newGuess = "".padEnd(word.length, " ")
            setCurrentGuess(newGuess)
            setCurrentAttempt(currentAttempt+1)
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
        currentGuessSubmit,
        error,
        loaded,
        playAgain,
        gameOver,
        getAlreadyGuessedHint
    }

}

export interface IPlayViewModel{
    word: string;
    guesses: Array<string>;
    currentGuess: string;
    currentGuessAdd: (letter: string) => void;
    currentGuessBackspace: () => void;
    currentGuessSubmit: () => void;
    error: string;
    loaded: boolean;
    playAgain: () => void;
    gameOver: boolean;
    getAlreadyGuessedHint: (letter: string) => Hint;
}