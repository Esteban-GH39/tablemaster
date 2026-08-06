import Modal from "../../components/ui/Modal/Modal";

import TeamForm from "./TeamForm";

function TeamModal({ team, onClose, onSuccess }) {
    return (
        <Modal
            title={team ? "Edit Team" : "New Team"}
            onClose={onClose}
        >
            <TeamForm
                team={team}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default TeamModal;
