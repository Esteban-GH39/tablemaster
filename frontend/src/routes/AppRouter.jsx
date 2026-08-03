import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Players from "../pages/Players";
import Tournaments from "../pages/Tournaments";
import Ranking from "../pages/Ranking";
import Teams from "../pages/Teams";
import Statistics from "../pages/Statistics";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/players"
                        element={
                            <ProtectedRoute>
                                <Players />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/tournaments"
                        element={
                            <ProtectedRoute>
                                <Tournaments />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/ranking"
                        element={
                            <ProtectedRoute>
                                <Ranking />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/teams"
                        element={<ProtectedRoute>
                                <Teams />
                            </ProtectedRoute>}
                    />

                    <Route 
                        path="/statistics"
                        element={<ProtectedRoute>
                                <Statistics />
                            </ProtectedRoute>}
                    />

                </Route>
                
                <Route
                    path="*" 
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default AppRouter;