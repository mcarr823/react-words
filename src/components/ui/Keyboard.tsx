import { Hint } from "enums/Hint"
import Key from "./Key"
import IconKey from "./IconKey"
import { Backspace, Check } from 'react-bootstrap-icons';

/**
 * Represents a keyboard to display on the screen as an
 * alternative to using a physical keyboard.
 */
export default function Keyboard(){

    const row1 = ["q","w","e","r","t","y","u","i","o","p"]
    const row2 = ["a","s","d","f","g","h","j","k","l"]
    const row3 = ["z","x","c","v","b","n","m"]

    // TODO implement hints

    // TODO also add listener for click events

    const topRow = row1.map(l => <Key key={l} letter={l} hint={Hint.NONE}/>)
    const midRow = row2.map(l => <Key key={l} letter={l} hint={Hint.NONE}/>)
    const bottomRow = row3.map(l => <Key key={l} letter={l} hint={Hint.NONE}/>)

    return (
        <div className="text-center">
            <div className="row justify-content-center">
                {topRow}
                <IconKey icon={<Backspace size={36}/>}/>
            </div>
            <div className="row justify-content-center">
                {midRow}
                <IconKey icon={<Check size={36}/>}/>
            </div>
            <div className="row justify-content-center">
                {bottomRow}
            </div>
        </div>
    )

}