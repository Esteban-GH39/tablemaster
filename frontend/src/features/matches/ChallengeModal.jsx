import Modal from "../../components/ui/Modal/Modal";
import ChallengeForm from "./ChallengeForm";

function ChallengeModal({ opponents, myName, onClose, onSuccess }) {
    return (
        <Modal title="Challenge a Player" onClose={onClose} width="480px">
            <ChallengeForm
                opponents={opponents}
                myName={myName}
                onClose={onClose}
                onSuccess={onSuccess}
            />
        </Modal>
    );
}

export default ChallengeModal;
