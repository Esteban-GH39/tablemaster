import Modal from "../../components/ui/Modal/Modal";

import TournamentForm from "./TournamentForm";

function TournamentModal({tournament, onClose, onSuccess}) {
    return (
        <Modal
            title={
                tournament
                    ? "Edit Tournament"
                    : "New Tournament"
            }
            onClose={onClose}
        >
            <TournamentForm
                tournament={tournament}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default TournamentModal;