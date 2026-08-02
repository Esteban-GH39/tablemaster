import { X } from "lucide-react";

import "./Player.css";

import PlayerForm from "./PlayerForm";

function PlayerModal({ player, onClose, onSuccess }) {
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
                    {player ? "Edit Player" : "New Player"}
                </h2>
                <PlayerForm
                    player={player}
                    onSuccess={onSuccess}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}

export default PlayerModal;