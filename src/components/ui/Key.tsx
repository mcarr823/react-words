import { Hint } from "enums/Hint";

/**
 * Represents a single key on a keyboard.
 * 
 * @param letter Letter to show on the key
 * @param hint Type of hint to give for this letter
 * @returns Div node containing the key
 */
export default function Key(args : ILetter){

    const { letter, hint } = args

    const textColor = hint == Hint.NONE ? "text-dark" : "text-light"
    const className = "card " + textColor + " " + (
        hint == Hint.CORRECT ? "bg-success" :
        hint == Hint.CORRECT_ANOTHER ? "bg-primary" :
        hint == Hint.INCORRECT ? "bg-secondary" :
        hint == Hint.WRONG_PLACEMENT ? "bg-warning" : ""
    )

    return (
        <div className="col-1 p-0 m-0 ms-1 mt-1">
            <div className={className}>
                <div className="card-body pt-2 pb-0">
                    <h2 style={{ fontFamily:"monospace" }}>{letter.toUpperCase()}</h2>
                </div>
            </div>
        </div>
    )

}

interface ILetter{
    letter: string;
    hint: Hint;
}