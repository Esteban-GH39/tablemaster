import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    Shield,
    Trophy,
    BarChart3,
    ChartColumn,
    Target,
    LogOut,
    UserCog
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const menuSections = [
    {
        label: "Overview",
        items: [
            { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }
        ]
    },
    {
        label: "Management",
        items: [
            { name: "Players", path: "/players", icon: Users },
            { name: "Teams", path: "/teams", icon: Shield }
        ]
    },
    {
        label: "Competition",
        items: [
            { name: "Tournaments", path: "/tournaments", icon: Trophy },
            { name: "Matches", path: "/matches", icon: Target },
            { name: "Ranking", path: "/ranking", icon: BarChart3 },
            { name: "Statistics", path: "/statistics", icon: ChartColumn }
        ]
    }
];

function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const sections = menuSections.map((section) => {
        if (
            section.label !== "Management" ||
            user?.role !== "admin"
        ) {
            return section;
        }
        return {
            ...section,
            items: [
                ...section.items,
                {
                    name: "Users",
                    path: "/users",
                    icon: UserCog
                }
            ]
        };
    });

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <Trophy size={28}/>
                <h2>TableMaster</h2>
            </div>

            <nav>
                {
                    sections.map((section) => (
                        <div key={section.label} className="sidebar-section">
                            <span className="sidebar-section-label">{section.label}</span>
                            {
                                section.items.map((item) => {
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
                        </div>
                    ))
                }
            </nav>

            <div className="sidebar-footer">
                <button type="button" className="sidebar-logout" onClick={handleLogout}>
                    <LogOut size={17} />
                    <span>Log out</span>
                </button>
                <span className="sidebar-version">TableMaster v1.0</span>
            </div>

        </aside>
    );
}

export default Sidebar;