import { ReactNode } from "react";

/**
 * Represents a single key on a keyboard, represented by an icon.
 * 
 * @param icon Icon to display on the key
 * @returns Div node containing the key
 */
export default function IconKey(args : ILetter){

    const { icon } = args

    return (
        <div className="col-1 p-0 m-0 ms-1 mt-1">
            <div className="card">
                <div className="card-body pt-2 pb-2 ps-2">
                    {icon}
                </div>
            </div>
        </div>
    )

}

interface ILetter{
    icon: ReactNode;
}