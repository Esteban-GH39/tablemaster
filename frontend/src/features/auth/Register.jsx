import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { register } from "./auth.service";
import { login } from "./auth.service";

import "./Login.css";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login: saveToken } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await register({ fullName, email, password });

            const data = await login({ email, password });
            saveToken(data.token);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    🏓 TableMaster
                </h1>

                <p className="login-subtitle">
                    Create your account
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >

                    <Input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password (min. 8 characters)"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating account..."
                                : "Create account"
                        }
                    </Button>

                </form>

                <p className="auth-footer-note">
                    First account on the system? It becomes admin automatically.
                </p>

                <p className="auth-switch-link">
                    Already have an account? <Link to="/">Sign in</Link>
                </p>

            </div>

        </div>

    );
}

export default Register;
