import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import {
    getUsers,
    updateUserRole,
    setUserActive
} from "../../services/users.service";

import useFetch from "../../hooks/useFetch";
import Badge from "../../components/ui/Badge/Badge";

import "./Users.css";

const ROLE_OPTIONS = ["admin", "organizer", "referee", "player"];

function UsersPage() {

    const { role, userId } = useContext(AuthContext);

    const {
        data: users,
        loading,
        error,
        reload
    } = useFetch(getUsers);

    if (role !== "admin") {
        return (
            <div className="users-denied">
                <h1>Access denied</h1>
                <p>Only admins can manage users.</p>
            </div>
        );
    }

    const handleRoleChange = async (user, newRole) => {
        if (newRole === user.role) return;

        const confirmed = window.confirm(
            `Change ${user.fullName}'s role to "${newRole}"?`
        );
        if (!confirmed) return;

        try {
            await updateUserRole(user.id, newRole);
            reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error updating role"
            );
        }
    };

    const handleToggleActive = async (user) => {
        const action = user.isActive ? "deactivate" : "reactivate";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} ${user.fullName}?`
        );
        if (!confirmed) return;

        try {
            await setUserActive(user.id, !user.isActive);
            reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error updating user"
            );
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <div className="users-page">
            <div className="users-page-header">
                <div>
                    <h1>Users</h1>
                    <p>Manage accounts, roles and access</p>
                </div>
            </div>

            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        {user.fullName}
                                        {
                                            user.id === userId && (
                                                <span className="users-you-tag">you</span>
                                            )
                                        }
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            value={user.role}
                                            disabled={user.id === userId}
                                            onChange={(event) =>
                                                handleRoleChange(user, event.target.value)
                                            }
                                        >
                                            {
                                                ROLE_OPTIONS.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <Badge variant={user.isActive ? "success" : "danger"}>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="users-toggle-btn"
                                            disabled={user.id === userId}
                                            onClick={() => handleToggleActive(user)}
                                        >
                                            {user.isActive ? "Deactivate" : "Reactivate"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;
