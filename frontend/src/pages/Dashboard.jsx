import StatCard from "../components/dashboard/StatCard";
import "./Dashboard.css";

import { useEffect, useState } from "react";

import { getPlayers } from "../services/players.service";

function Dashboard() {
    const [players, setPlayers] = useState([]);
        useEffect(() => {
        const loadPlayers = async () => {
            try {
                const data = await getPlayers();
                setPlayers(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadPlayers();
    }, []);
    
    return (
        <div>
            <h1>
                Dashboard
            </h1>
            <p>
                Bienvenido a TableMaster
            </p>
            <div className="dashboard-grid">
                <StatCard
                    title="Players"
                    value="16"
                    icon="👥"
                />
                <StatCard
                    title="Teams"
                    value="4"
                    icon="🏓"
                />
                <StatCard
                    title="Tournaments"
                    value="2"
                    icon="🏆"
                />
                <StatCard
                    title="Matches"
                    value="18"
                    icon="🎯"
                />
            </div>
        </div>
    );
}

export default Dashboard;