import { X } from "lucide-react";

import "./Player.css";

import PlayerForm from "./PlayerForm";

function PlayerModal({ onClose, onSuccess }) {
    return (
        <div className="modal-overlay">
            <div className="player-modal">
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                <h2>
                    New Player
                </h2>
                <PlayerForm
                    onSuccess={onSuccess}/>
            </div>
        </div>
    );
}

export default PlayerModal;