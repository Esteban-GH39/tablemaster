import Modal from "../../components/ui/Modal/Modal";

import PlayerForm from "./PlayerForm";

function PlayerModal({player, onClose, onSuccess}) {
    return (
        <Modal
            title={
                player
                    ? "Edit Player"
                    : "New Player"
            }
            onClose={onClose}
        >
            <PlayerForm
                player={player}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );
}

export default PlayerModal;