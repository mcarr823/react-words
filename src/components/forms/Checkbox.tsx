export default function Checkbox({
    id,
    label
} : {
    id: string;
    label: string;
}){

    return (
        <div className="mb-3">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id={id}/>
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </div>
    )

}