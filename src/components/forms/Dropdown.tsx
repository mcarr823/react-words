import { ChangeEventHandler } from "react";

export default function Dropdown({
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
    optionValues: Array<string>;
    value: string;
    setValue: (value: string) => void;
}){

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setValue(event.target.value)
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
    value: string;
}){

    return (
        <option value={value}>{text}</option>
    )

}