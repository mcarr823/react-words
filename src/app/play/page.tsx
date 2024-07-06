"use client"

import Letters from "@/components/letters/Letters";
import Keyboard from "@/components/ui/Keyboard";

/**
 * The actual game screen.
 * 
 * This screen is responsible for displaying the word to guess,
 * handling player input, etc.
 * 
 * @returns Play screen
 */
export default function Play() {

    // For now, let's just display a few hard-coded test words
    const word = "testing"
    const guesses = ["toastie", "testies", "testin ", "testing"]
    const guessNodes = guesses.map((g, i) => <Letters key={i} word={word} guess={g}/>)

    return (
        
        <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
                
                <div>
                    <h2 className="m-3 text-center">
                        Words
                    </h2>

                    <div className="p-3">
                        {guessNodes}
                    </div>

                    <Keyboard/>
                
                </div>
            </div>
        </div>
    );
}

