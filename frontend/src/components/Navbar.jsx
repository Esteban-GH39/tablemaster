import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const pageTitles = {
    dashboard: "Dashboard",
    players: "Players",
    teams: "Teams",
    tournaments: "Tournaments",
    matches: "Matches",
    ranking: "Ranking",
    statistics: "Statistics"
};

function Navbar() {

    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    const segment = location.pathname.split("/")[1];
    const pageTitle = pageTitles[segment] ?? "TableMaster";

    return (
        <header className="navbar">
            <h2>{pageTitle}</h2>

            <div className="navbar-user">
                <UserCircle2 size={22} />
                <span>
                    {isAuthenticated ? "Usuario autenticado" : "No autenticado"}
                </span>
            </div>
        </header>
    );
}

export default Navbar;