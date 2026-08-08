import UserRow from "./UserRow";

function UserTable({
    users,
    onEdit,
    onDelete
}) {
    return (
        <div className="user-table-container">
            <table className="user-table">

                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.length > 0 ? (
                            users.map((user) => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="user-table-empty"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
}

export default UserTable;