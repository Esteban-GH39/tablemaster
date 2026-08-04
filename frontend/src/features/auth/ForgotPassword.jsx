import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "./auth.service";

import "./Login.css"

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
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">
                    Recover Password
                </h1>
                <p className="login-subtitle">
                    Enter your email to receive a recovery link.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
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
                    <div className="login-links">
                        <Link to="/login">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;