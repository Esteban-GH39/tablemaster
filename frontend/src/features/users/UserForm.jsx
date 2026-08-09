import { useEffect, useState } from "react";

import {
    createUser,
    updateUser
} from "../../services/user.service";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

function UserForm({
    user = null,
    onSuccess,
    onClose
}) {

    const isEditing = !!user;

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "player"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                password: "",
                role: user.role || "player"
            });
        } else {
            setFormData({
                fullName: "",
                email: "",
                password: "",
                role: "player"
            });
        }

    }, [user]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            if (isEditing) {

                await updateUser(
                    user.id,
                    formData
                );

            } else {

                await createUser(formData);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Error saving user"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <form
            className="user-form"
            onSubmit={handleSubmit}
        >

            <Input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                required
            />

            <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
            />

            <div className="user-form-field">

                <label htmlFor="role">
                    Role
                </label>

                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="player">
                        Player
                    </option>

                    <option value="organizer">
                        Organizer
                    </option>

                    <option value="referee">
                        Referee
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>

            </div>

            <div className="user-form-actions">

                <Button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Saving..."
                            : isEditing
                                ? "Update User"
                                : "Create User"
                    }
                </Button>

            </div>

        </form>
    );
}

export default UserForm;