import KeyValuePair from "classes/KeyValuePair";
import { ChangeEventHandler } from "react";

export default function PairDropdown({
    id,
    label,
    options,
    value,
    setValue
} : {
    id: string;
    label: string;
    options: Array<KeyValuePair>;
    value: string;
    setValue: (value: string) => void;
}){

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setValue(event.target.value)
    }

    const elements = options.map(args => <DropdownOption args={args}/>)

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
                {elements}
            </select>

        </div>
    )

}

function DropdownOption({
    args
} : {
    args: KeyValuePair
}){

    const { key, value } = args

    return (
        <option value={key}>{value}</option>
    )

}