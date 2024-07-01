import { ChangeEventHandler } from "react";

export default function TextInput({
    id,
    label,
    value,
    setValue
} : {
    id: string;
    label: string;
    value: string;
    setValue: (value: string) => void;
}){

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value)
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
                type="text"
                id={id}
                className="form-control"
                defaultValue={value}
                onChange={onChange}
                />

        </div>
    )

}