import { ChangeEventHandler } from "react";

export default function NumberDropdown({
    id,
    label,
    optionText,
    optionValues,
    value,
    setValue
} : {
    id: string;
    label: string;
    optionText: Array<string>;
    optionValues: Array<number>;
    value: number;
    setValue: (value: number) => void;
}){

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const numVal = parseInt(event.target.value)
        setValue(numVal)
    }

    const options = Array<JSX.Element>();
    for (var i = 0; i < optionText.length; i++){
        const text = optionText[i]
        const value = optionValues[i];
        options.push(<DropdownOption key={text} text={text} value={value}/>)
    }

    return (
        <div className="mb-3">

            <label
                htmlFor={id}
                className="form-label"
                >
                {label}
            </label>
            
            <select
                id={id}
                className="form-select"
                defaultValue={value}
                onChange={onChange}
                >
                {options}
            </select>

        </div>
    )

}

function DropdownOption({
    text,
    value
} : {
    text: string;
    value: number;
}){

    return (
        <option value={value}>{text}</option>
    )

}