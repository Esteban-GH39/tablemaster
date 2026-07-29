import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/layout.css";

function DashboardLayout() {
    return (
        <div className="layout">
            <Navbar />

            <div className="content">

                <Sidebar />

                <main className="main">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;