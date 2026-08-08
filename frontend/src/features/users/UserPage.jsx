import { useEffect, useState } from "react";

import {
    getUsers,
    deleteUser
} from "../../services/users.service";

import UserTable from "./UserTable";
import UserModal from "./UserModal";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import useModal from "../../hooks/useModal";

import "./User.css";

function UserPage() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const modal = useModal();

    const loadUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleUserSaved = () => {

        modal.close();

        loadUsers();

    };

    const handleDeleteUser = async (user) => {

        if (user.isActive === false) {
            return;
        }

        const confirmed = window.confirm(
            `Deactivate ${user.fullName}? This user will no longer be able to access TableMaster.`
        );

        if (!confirmed) return;

        try {

            await deleteUser(user.id);

            loadUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Error deactivating user"
            );

        }

    };

    const filteredUsers = users.filter((user) =>
        user.fullName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="user-page">

            <div className="user-page-header">

                <div>
                    <h1>Users</h1>

                    <p>
                        Manage TableMaster users and their roles
                    </p>
                </div>

                <Button onClick={modal.open}>
                    + New User
                </Button>

            </div>

            <SearchBar
                placeholder="Search users..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

            <UserTable
                users={filteredUsers}
                onEdit={modal.edit}
                onDelete={handleDeleteUser}
            />

            {
                modal.isOpen && (
                    <UserModal
                        user={modal.selectedItem}
                        onClose={modal.close}
                        onSuccess={handleUserSaved}
                    />
                )
            }

        </div>
    );
}

export default UserPage;