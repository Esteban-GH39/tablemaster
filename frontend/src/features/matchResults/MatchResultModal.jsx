import Modal from "../../components/ui/Modal/Modal";

import MatchResultForm from "./MatchResultForm";

function MatchResultModal({
    match,
    playerOneName,
    playerTwoName,
    onClose,
    onSuccess
}) {
    return (
        <Modal
            title="Register Match Result"
            onClose={onClose}
        >
            <MatchResultForm 
                match={match}
                playerOneName={playerOneName}
                playerTwoName={playerTwoName}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default MatchResultModal;