import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LayoutDashboard, Users, Shield, Trophy, BarChart3, ChartColumn, Target, UserCog } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Players",
        path: "/players",
        icon: Users
    },
    {
        name: "Teams",
        path: "/teams",
        icon: Shield
    },
    {
        name: "Tournaments",
        path: "/tournaments",
        icon: Trophy
    },
    {
        name: "Matches",
        path: "/matches",
        icon: Target
    },
    {
        name: "Ranking",
        path: "/ranking",
        icon: BarChart3
    },
    {
        name: "Statistics",
        path: "/statistics",
        icon: ChartColumn
    }
];

function Sidebar() {

    const { role } = useContext(AuthContext);

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <Trophy size={28}/>
                <h2>TableMaster</h2>
            </div>

            <nav>
                {
                    menuItems.map((item) => {
                        const Icon = item.icon;
                        return(
                            <NavLink
                                key={item.path}
                                to={item.path}
                            >
                                <Icon size={18}/>
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })
                }

                {
                    role === "admin" && (
                        <>
                            <div className="sidebar-divider">Admin</div>
                            <NavLink to="/users">
                                <UserCog size={18} />
                                <span>Users</span>
                            </NavLink>
                        </>
                    )
                }
            </nav>

        </aside>
    );
}

export default Sidebar;