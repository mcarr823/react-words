import { Hint } from "enums/Hint";

/**
 * Displays a single letter within a stylized box.
 * 
 * Should be shown within a row of other letters, side by side,
 * to spell out a word.
 * 
 * @param letter The single letter to display within a box
 * @param hint Which color hinting should accompany the letter
 * @returns Div node containing the letter, or empty space
 */
export default function Letter(args : ILetter){

    const { letter, hint } = args

    // If the letter is empty, display &nbsp; instead for spacing
    const letterOrWhitespace = letter === " " ? 
        (<h2>&nbsp;</h2>) :
        (<h2>{letter.toUpperCase()}</h2>)

    const textColor = hint == Hint.NONE ? "text-dark" : "text-light"
    const className = "card " + textColor + " " + (
        hint == Hint.CORRECT ? "bg-success" :
        hint == Hint.CORRECT_ANOTHER ? "bg-primary" :
        hint == Hint.INCORRECT ? "bg-secondary" :
        hint == Hint.WRONG_PLACEMENT ? "bg-warning" : ""
    )

    return (
        <div className="col p-1">
            <div className={className}>
                <div className="card-body">
                    {letterOrWhitespace}
                </div>
            </div>
        </div>
    )

}

interface ILetter{
    letter: string;
    hint: Hint;
}