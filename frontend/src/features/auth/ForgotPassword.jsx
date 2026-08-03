import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "./auth.service";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

import "./Login.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await forgotPassword(email);
            setMessage(response.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Error sending recovery email."
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
                <h1>Forgot Password</h1>
                <p>
                    Enter your email to receive a password reset link.
                </p>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Sending..."
                            : "Send Recovery Email"
                    }
                </Button>
                {
                    message &&
                    (
                        <p className="form-message">
                            {message}
                        </p>
                    )
                }
                <Link to="/login">
                    Back to Login
                </Link>
            </form>
        </div>
    );
}

export default ForgotPassword;