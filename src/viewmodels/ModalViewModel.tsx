import { useState } from "react"

/**
 * Viewmodel for showing and hiding a modal.
 * 
 * @returns An object which implements IModalViewModel
 */
export default function ModalViewModel(): IModalViewModel{

    const [show, setShow] = useState<boolean>(false)

    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)

    return {
        show, //setShow,
        showModal, hideModal
    }

}

export interface IModalViewModel{
    show: boolean;
    //setShow: (show: boolean) => void;
    showModal: () => void;
    hideModal: () => void;
}