import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { login } from "./auth.service";

import "./Login.css";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login: saveToken } = useContext(AuthContext);

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            const data = await login({
                email,
                password
            });

            saveToken(data.token);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
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
                    Sistema de Gestión de Torneos
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >

                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />

                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Iniciando sesión..."
                                : "Iniciar sesión"
                        }
                    </Button>

                    <div className="login-links">
                        <Link to="/forgot-password">
                            Forgot your password?
                        </Link>
                    </div>

                </form>

                <p className="auth-switch-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>

            </div>

        </div>

    );

}

export default Login;