import { IModalViewModel } from "viewmodels/ModalViewModel"

/**
 * Modal dialog component used to show the How To Play guide.
 * 
 * Takes an instance of IModalViewModel to show and hide the modal.
 * 
 * eg.
 * const model = ModalViewModel()
 * return (<InfoModal modal={model}/>)
 * 
 * @param model IModalViewModel object for hiding and showing the modal
 * @returns Modal div node
 */
export default function InfoModal({
    model
} : {
    model: IModalViewModel
}){

    // If show is false, render an empty node.
    if (!model.show){
        return (<></>)
    }

    const styles = {
        display: 'block',
        background: '#0007'
    }

    return (
        <div className="modal" style={styles} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">How To Play</h5>
                    </div>
                    <div className="modal-body">
                        <p>A random word will be selected for you to guess.</p>
                        <p>To guess what it is, type a word with your keyboard, or use the on-screen keyboard.</p>
                        <p>The letters will appear in the bottom row of boxes on the screen.</p>
                        <p>Once you've filled the bottom row of boxes, click on the Tick button, or press Enter.</p>
                        <p>Every time you make a guess, letters will come up in the following colors:</p>
                        <ul>
                            <li className="text-success">
                                Green:&nbsp;
                                <span className="text-black">
                                    Correct guess
                                </span>
                            </li>
                            <li className="text-primary">
                                Blue:&nbsp;
                                <span className="text-black">
                                    Correct guess, and that letter also appears somewhere else in the word
                                </span>
                            </li>
                            <li className="text-warning">
                                Yellow:&nbsp;
                                <span className="text-black">
                                    Incorrect guess, but that letter does appear somewhere else in the word
                                </span>
                            </li>
                            <li className="text-secondary">
                                Grey:&nbsp;
                                <span className="text-black">
                                    Incorrect guess
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            tabIndex={0}
                            onClick={model.hideModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}