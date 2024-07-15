/**
 * A modal dialog with minimal styling.
 * 
 * @param title Text to show at the top of the modal
 * @param message Text to show in the body of the modal
 * @param button Button to show at the bottom of the modal
 */
export default function GenericModal(args : IGenericModal){

    const { title, message, button } = args

    const styles = {
        display: 'block',
        background: '#0007'
    }

    return (
        <div className="modal" style={styles} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <b>{message}</b>
                    </div>
                    <div className="modal-footer">
                        {button}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface IGenericModal{
    title: string;
    message: string;
    button: React.ReactNode;
}