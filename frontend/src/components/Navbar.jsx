import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const PAGE_TITLES = {
    "/dashboard": "Dashboard",
    "/players": "Players",
    "/teams": "Teams",
    "/tournaments": "Tournaments",
    "/matches": "Matches",
    "/ranking": "Ranking",
    "/statistics": "Statistics",
    "/users": "Users"
};

const getInitials = (fullName = "") =>
    fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

function Navbar() {

    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const pageTitle = PAGE_TITLES[location.pathname] ?? "TableMaster";

    const handleLogout = () => {
        const confirmed = window.confirm("Log out of TableMaster?");
        if (!confirmed) return;

        logout();
        navigate("/");
    };

    return (
        <header className="navbar">

            <h2 className="navbar-title">
                {pageTitle}
            </h2>

            <div className="navbar-right">
                {
                    isAuthenticated
                        ? (
                            <>
                                <div className="navbar-user">
                                    <span className="navbar-user-avatar">
                                        {getInitials(user?.fullName) || "?"}
                                    </span>
                                    <div className="navbar-user-info">
                                        <span className="navbar-user-name">
                                            {user?.fullName ?? "Loading..."}
                                        </span>
                                        {
                                            user?.role && (
                                                <span className="navbar-user-role">
                                                    {user.role}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="navbar-logout-btn"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </>
                        )
                        : (
                            <span className="navbar-guest">
                                Not authenticated
                            </span>
                        )
                }
            </div>

        </header>
    );

}

export default Navbar;