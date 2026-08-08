import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";

function UserRow({
    user,
    onEdit,
    onDelete
}) {

    return (
        <tr>

            <td>
                <strong>
                    {user.fullName}
                </strong>
            </td>

            <td>
                {user.email}
            </td>

            <td>
                <span
                    className={`user-role user-role-${user.role}`}
                >
                    {user.role}
                </span>
            </td>

            <td>
                <span
                    className={
                        user.isActive
                            ? "user-status user-status-active"
                            : "user-status user-status-inactive"
                    }
                >
                    {
                        user.isActive
                            ? "Active"
                            : "Inactive"
                    }
                </span>
            </td>

            <td>
                {
                    new Date(
                        user.createdAt
                    ).toLocaleDateString()
                }
            </td>

            <td>
                <ActionMenu
                    onEdit={() => onEdit(user)}
                    onDelete={
                        user.isActive
                            ? () => onDelete(user)
                            : undefined
                    }
                    deleteLabel="Deactivate"
                />
            </td>

        </tr>
    );
}

export default UserRow;