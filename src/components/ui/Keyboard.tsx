import { Hint } from "enums/Hint"
import Key from "./Key"
import IconKey from "./IconKey"
import { Backspace, Check } from 'react-bootstrap-icons';
import { useEffect } from "react";
import { IPlayViewModel } from "viewmodels/PlayViewModel";

/**
 * Represents a keyboard to display on the screen as an
 * alternative to using a physical keyboard.
 */
export default function Keyboard({ model } : { model: IPlayViewModel }){

    const row1 = ["q","w","e","r","t","y","u","i","o","p"]
    const row2 = ["a","s","d","f","g","h","j","k","l"]
    const row3 = ["z","x","c","v","b","n","m"]

    const topRow = row1.map(l => <Key key={l} letter={l} hint={Hint.NONE} onClick={model.currentGuessAdd}/>)
    const midRow = row2.map(l => <Key key={l} letter={l} hint={Hint.NONE} onClick={model.currentGuessAdd}/>)
    const bottomRow = row3.map(l => <Key key={l} letter={l} hint={Hint.NONE} onClick={model.currentGuessAdd}/>)

    // Handle keyboard events
    // If it's an alpha key, add it to the current guess.
    // If it's Enter, submit the current guess.
    // If it's Backspace, delete the last character.
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {

        if (row1.includes(e.key) || row2.includes(e.key) || row3.includes(e.key)){
            e.preventDefault();
            model.currentGuessAdd(e.key)
        }else if (e.key === 'Enter') {
            e.preventDefault();
            model.currentGuessSubmit()
        }else if (e.key === 'Backspace'){
            e.preventDefault();
            model.currentGuessBackspace()
        }
    
    }

    // Set the event listener inside of a useEffect and specify an unload listener.
    // Otherwise the keypress event listener will be added multiple times.
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => { document.removeEventListener("keydown", handleKeyDown) }
    }, [model.loaded, handleKeyDown])

    return (
        <div className="text-center">
            <div className="row justify-content-center">
                {topRow}
                <IconKey icon={<Backspace size={36}/>} onClick={model.currentGuessBackspace}/>
            </div>
            <div className="row justify-content-center">
                {midRow}
                <IconKey icon={<Check size={36}/>} onClick={model.currentGuessSubmit}/>
            </div>
            <div className="row justify-content-center">
                {bottomRow}
            </div>
        </div>
    )

}