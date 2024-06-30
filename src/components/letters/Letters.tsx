import Letter from "./Letter"

/**
 * Displays a row of <Letter/> nodes, side by side, to spell out
 * a word.
 * 
 * @param word The word to spell out
 * @returns Div node containing the row of letters
 */
export default function Letters(args : ILetters){

    const { word } = args

    // Split the word up into individual characters
    const chars = word.split("")

    // Turn each character into a <Letter/> node
    const elems = chars.map((c, i) => <Letter key={i} letter={c}/>)

    return (
        <div className="container text-center">
            <div className="row">
                {elems}
            </div>
        </div>
    )

}

interface ILetters{
    word: string
}