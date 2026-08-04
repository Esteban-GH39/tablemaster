import { X } from "lucide-react";

import "./Modal.css";

function Modal({title, children, onClose, width = "700px"}) {
    return (
        <div className="modal-overlay">
            <div
                className="modal-container"
                style={{ maxWidth: width }}
            >
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        <X size={20}/>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;