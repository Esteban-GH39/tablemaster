import Modal from "../../components/ui/Modal/Modal";

import MatchForm from "./MatchForm";

function MatchModal({ match, players, tournaments, onClose, onSuccess }) {
    return (
        <Modal
            title={
                match
                    ? "Edit Match"
                    : "New Match"
            }
            onClose={onClose}
        >
            <MatchForm
                match={match}
                players={players}
                tournaments={tournaments}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default MatchModal;
