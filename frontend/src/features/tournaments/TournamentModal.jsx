import { X } from "lucide-react";

import TournamentForm from "./TournamentForm";

import "./Tournament.css";

function TournamentModal({tournament, onClose, onSuccess}) {
    return (
        <div className="modal-overlay">
            <div className="tournament-modal">
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    <X size={20}/>
                </button>
                <h2>
                    {
                        tournament
                            ? "Edit Tournament"
                            : "New Tournament"
                    }
                </h2>
                <TournamentForm
                    tournament={tournament}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            </div>
        </div>
    );
}

export default TournamentModal;