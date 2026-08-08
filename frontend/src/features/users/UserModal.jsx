import Modal from "../../components/ui/Modal/Modal";

import UserForm from "./UserForm";

function UserModal({
    user,
    onClose,
    onSuccess
}) {

    const isEditing = !!user;

    return (
        <Modal
            title={
                isEditing
                    ? "Edit User"
                    : "New User"
            }
            onClose={onClose}
        >

            <UserForm
                user={user}
                onSuccess={onSuccess}
                onClose={onClose}
            />

        </Modal>
    );
}

export default UserModal;