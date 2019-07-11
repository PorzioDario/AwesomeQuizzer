import React from 'react';

import './Modal.css';

const Modal = ({
    showModal,
    modality,
    closeModal,
    children
}) => {

    let buttons = null;
    switch (modality) {
        case 'Ok':
            buttons = (<button className="btnOk" onClick={() => { closeModal('Ok'); }}>Ok</button>);
            break;
        case 'CancelConfirm':
            buttons = (<React.Fragment>
                <button className="btn btn-secondary" onClick={() => { closeModal('Cancel'); }}>Cancel</button>
                <button className="btn btn-success ml-3" onClick={() => { closeModal('Confirm'); }}>Confirm</button>
            </React.Fragment>);
            break;
    }

    return showModal ? (<div>
        <div className="backdrop" ></div>
        <div className="modalBox">
            {
                children
            }
            <div className="buttonsBox">
                {buttons}
            </div>
        </div>
    </div>) : null;
};

export default Modal