export default function NumberInput({
    id,
    label
} : {
    id: string;
    label: string;
}){

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input type="number" id={id} className="form-control"/>
        </div>
    )

}