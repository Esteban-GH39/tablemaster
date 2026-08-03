import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { resetPassword } from "./auth.service";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

import "./Login.css";

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            const response = await resetPassword({
                token,
                password
            });
            setMessage(response.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Error resetting password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >
                <h1>Reset Password</h1>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Updating..."
                            : "Update Password"
                    }
                </Button>
                {
                    message &&
                    <p className="form-message">
                        {message}
                    </p>
                }
                <Link to="/login">
                    Back to Login
                </Link>
            </form>
        </div>
    );
}

export default ResetPassword;