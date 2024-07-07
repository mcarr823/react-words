import { Hint } from "enums/Hint"
import Letter from "./Letter"

/**
 * Displays a row of <Letter/> nodes, side by side, to spell out
 * a word.
 * 
 * @param word The word to spell out
 * @param guess The guess made for this word
 * @param disableHints If true, don't show any color hints
 * @returns Div node containing the row of letters
 */
export default function Letters(args : ILetters){

    const { guess } = args

    // Split the guess up into individual characters
    const chars = guess.split("")

    // Get the hints for each character
    const hints = calculateHints(args)

    // Turn each character into a <Letter/> node
    const elems = chars.map((c, i) => <Letter key={i} letter={c} hint={hints[i]}/>)

    return (
        <div className="container text-center">
            <div className="row">
                {elems}
            </div>
        </div>
    )

}

function calculateHints(args: ILetters): Array<Hint>{

    const { word, guess, disableHints } = args

    // Split the word and guess up into individual characters
    const wordChars = word.split("")
    const guessChars = guess.split("")

    return guessChars.map((l, index) => {

        // If hints are disabled, or if the letter is empty
        // (eg. when displaying empty rows on the screen), return
        // a value of NONE
        if (disableHints || l == " "){
            return Hint.NONE
        }

        // Find each occurrence of the current guess letter in the word.
        // Then find all correct guesses of the letter.
        const occurrencesInWord = wordChars.filter(w => w == l)
        const correctGuesses = guessChars.filter((g, i) => g == l && g == wordChars[i])
        const allGuessedCorrectly = occurrencesInWord.length == correctGuesses.length

        const w = wordChars[index]

        // Return a hint based on whether the guess is correct or not.
        if (w == l){

            // If the guess is correct, and there are no other instances of the
            // same letter which haven't been guessed yet, return CORRECT.
            // If the guess is correct, but there's at least one more instance
            // of the letter which hasn't been guessed yet, return CORRECT_ANOTHER.
            if (allGuessedCorrectly)
                return Hint.CORRECT
            else
                return Hint.CORRECT_ANOTHER

        }else{

            // If the guess is incorrect, but `allGuessedCorrectly` is true, then
            // that means there aren't any instances of that letter in the word.
            // OR there are other instances, but they've been guessed correctly.
            // In that case, return INCORRECT.
            // If `allGuessedCorrectly` is false, that means the letter exists
            // elsewhere in the word and hasn't been guessed yet.
            // In that case, return WRONG_PLACEMENT
            if (allGuessedCorrectly)
                return Hint.INCORRECT
            else
                return Hint.WRONG_PLACEMENT
        }
    })

}

interface ILetters{
    word: string;
    guess: string;
    disableHints?: boolean;
}