import { ChangeEventHandler } from "react";

export default function NumberInput({
    id,
    label,
    value,
    setValue
} : {
    id: string;
    label: string;
    value: number;
    setValue: (value: number) => void;
}){

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const numVal = parseInt(event.target.value)
        if (isNaN(numVal))
            setValue(0)
        else
            setValue(numVal)
    }

    return (
        <div className="mb-3">

            <label
                htmlFor={id}
                className="form-label"
                >
                {label}
            </label>
            
            <input
                type="number"
                id={id}
                className="form-control"
                defaultValue={value}
                onChange={onChange}
                />

        </div>
    )

}