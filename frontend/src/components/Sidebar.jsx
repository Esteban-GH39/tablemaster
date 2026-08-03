import { NavLink } from "react-router-dom";

import { LayoutDashboard, Users, Shield, Trophy, BarChart3, ChartColumn } from "lucide-react";

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
            </nav>

        </aside>
    );
}

export default Sidebar;