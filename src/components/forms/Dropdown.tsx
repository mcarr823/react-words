export default function Dropdown({
    id,
    label,
    optionText,
    optionValues
} : {
    id: string;
    label: string;
    optionText: Array<string>;
    optionValues: Array<string>;
}){

    const options = Array<JSX.Element>();
    for (var i = 0; i < optionText.length; i++){
        const text = optionText[i]
        const value = optionValues[i];
        options.push(<DropdownOption text={text} value={value}/>)
    }

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <select id={id} className="form-select">
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