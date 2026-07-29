import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Players from "../pages/Players";
import Tournaments from "../pages/Tournaments";
import Ranking from "../pages/Ranking";
import NotFound from "../pages/NotFound";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Login />} />
                <Route path = "/dashboard" element = {<Dashboard />} />
                <Route path = "/players" element = {<Players />} />
                <Route path = "/tournaments" element = {<Tournaments />} />
                <Route path = "/ranking" element = {<Ranking />} />
                <Route path = "*" element = {<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
