/**
 * Displays a single letter within a stylized box.
 * 
 * Should be shown within a row of other letters, side by side,
 * to spell out a word.
 * 
 * @param letter The single letter to display within a box
 * @returns Div node containing the letter, or empty space
 */
export default function Letter(args : ILetter){

    const { letter } = args

    // If the letter is empty, display &nbsp; instead for spacing
    const letterOrWhitespace = letter === " " ? 
        (<h2>&nbsp;</h2>) :
        (<h2>{letter.toUpperCase()}</h2>)

    return (
        <div className="col p-1">
            <div className="card">
                <div className="card-body">
                    {letterOrWhitespace}
                </div>
            </div>
        </div>
    )

}

interface ILetter{
    letter: string;
}