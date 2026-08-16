import Modal from "../../components/ui/Modal/Modal";

import ChallengeForm from "./ChallengeForm";

function ChallengeModal({ myPlayer, players, onClose, onSuccess }) {
    return (
        <Modal
            title="Challenge a Player"
            onClose={onClose}
        >
            <ChallengeForm
                myPlayer={myPlayer}
                players={players}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default ChallengeModal;
