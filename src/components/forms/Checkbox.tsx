import { ChangeEventHandler } from "react";

export default function Checkbox({
    id,
    label,
    value,
    setValue
} : {
    id: string;
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
}){

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const checked = event.target.checked;
        setValue(checked)
    }

    return (
        <div className="mb-3">
            <div className="form-check">

                <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    checked={value}
                    onChange={onChange}
                    />
                
                <label
                    className="form-check-label"
                    htmlFor={id}
                    >
                    {label}
                </label>

            </div>
        </div>
    )

}