import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <h2>TableMaster</h2>

            <nav>

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/players">
                    Players
                </NavLink>

                <NavLink to="/teams">
                    Teams
                </NavLink>

                <NavLink to="/tournaments">
                    Tournaments
                </NavLink>

                <NavLink to="/ranking">
                    Ranking
                </NavLink>

                <NavLink to="/statistics">
                    Statistics
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;