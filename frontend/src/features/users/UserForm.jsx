import { useEffect, useRef, useState } from "react";

import { Check, ChevronDown } from "lucide-react";

import {
    createUser,
    updateUser
} from "../../services/users.service";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

import "./UserForm.css";

const ROLE_OPTIONS = [
    { value: "player", label: "Player" },
    { value: "organizer", label: "Organizer" },
    { value: "referee", label: "Referee" },
    { value: "admin", label: "Admin" }
];

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

    const [roleOpen, setRoleOpen] = useState(false);
    const roleRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (roleRef.current && !roleRef.current.contains(event.target)) {
                setRoleOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

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

    const handleRoleSelect = (value) => {
        setFormData((previous) => ({
            ...previous,
            role: value
        }));
        setRoleOpen(false);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            if (isEditing) {

                const { password, ...rest } = formData;

                await updateUser(
                    user.id,
                    password ? formData : rest
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
                label="Full name"
                placeholder="e.g. Esteban Giron Herrera"
                value={formData.fullName}
                onChange={handleChange}
                required
            />

            <Input
                type="email"
                name="email"
                label="Email"
                placeholder="e.g. name@email.com"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Input
                type="password"
                name="password"
                label="Password"
                placeholder={
                    isEditing
                        ? "Leave blank to keep current"
                        : "Minimum 8 characters"
                }
                value={formData.password}
                onChange={handleChange}
                required={!isEditing}
                minLength={8}
            />

            <div className="user-form-field" ref={roleRef}>

                <label className="user-form-label">
                    Role
                </label>

                <div className="user-form-select-wrap">

                    <button
                        type="button"
                        className={`user-form-select ${roleOpen ? "is-open" : ""}`}
                        onClick={() => setRoleOpen((open) => !open)}
                    >
                        <span>
                            {
                                ROLE_OPTIONS.find(
                                    (option) => option.value === formData.role
                                )?.label
                            }
                        </span>
                        <ChevronDown size={18} className="user-form-select-chevron" />
                    </button>

                    {
                        roleOpen && (
                            <ul className="user-form-select-list" role="listbox">
                                {
                                    ROLE_OPTIONS.map((option) => (
                                        <li
                                            key={option.value}
                                            role="option"
                                            aria-selected={option.value === formData.role}
                                            className={`user-form-select-option ${
                                                option.value === formData.role ? "is-selected" : ""
                                            }`}
                                            onClick={() => handleRoleSelect(option.value)}
                                        >
                                            {option.label}
                                            {
                                                option.value === formData.role && (
                                                    <Check size={16} />
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }

                </div>

            </div>

            <div className="user-form-actions">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="primary"
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