import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated } = useContext(AuthContext);

    return (

        <header className="navbar">

            <h2>TableMaster</h2>

            <p>

                {isAuthenticated
                    ? "Usuario autenticado"
                    : "No autenticado"}

            </p>

        </header>

    );

}

export default Navbar;