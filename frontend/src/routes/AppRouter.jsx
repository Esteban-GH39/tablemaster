import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Players from "../pages/Players";
import Tournaments from "../pages/Tournaments";
import Ranking from "../pages/Ranking";
import Teams from "../pages/Teams";
import Matches from "../pages/Matches";
import HeadToHead from "../pages/HeadToHead";
import Statistics from "../pages/Statistics";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword"

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                <Route path="/reset-password" element={<ResetPassword />} />

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
                        path="/matches"
                        element={<ProtectedRoute>
                                <Matches />
                            </ProtectedRoute>}
                    />

                    <Route
                        path="/matches/head-to-head"
                        element={<ProtectedRoute>
                                <HeadToHead />
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