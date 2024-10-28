import React, { useState } from 'react';
import Header from './components/dashboard/Header';
import SideBar from './components/dashboard/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Onboard from './components/onboarding/Onboard';
import MyMeal from './components/dashboard/MyMeal';
import Setting from './components/dashboard/Setting';
import Authentication from './components/authentication/Authentication';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    const completeAuthentication = () => {
        setIsAuthenticated(true);
    };

    const completeOnboarding = () => {
        setIsOnboardingComplete(true);
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    {/* Route for Authentication */}
                    <Route 
                        path="/authentication" 
                        element={<Authentication onComplete={completeAuthentication} />} 
                    />
                    
                    {/* Root route for Onboarding or Redirecting */}
                    <Route 
                        path="/" 
                        element={
                            !isOnboardingComplete ? (
                                <Onboard onComplete={completeOnboarding} />
                            ) : !isAuthenticated ? (
                                <Navigate to="/authentication" /> // Redirect to Authentication if not authenticated
                            ) : (
                                <Navigate to="/dashboard" /> // Redirect to Dashboard if authenticated and onboarding complete
                            )
                        } 
                    />
                    
                    {/* Protected Dashboard Routes */}
                    <Route 
                        path="/dashboard" 
                        element={
                            isAuthenticated ? (
                                <>
                                    <SideBar />
                                    <Header />
                                    <Dashboard />
                                </>
                            ) : (
                                <Navigate to="/authentication" /> // Redirect to Authentication if not authenticated
                            )
                        }
                    />
                    <Route 
                        path="/my-meal" 
                        element={
                            isAuthenticated ? (
                                <>
                                    <SideBar />
                                    <Header />
                                    <MyMeal />
                                </>
                            ) : (
                                <Navigate to="/authentication" />
                            )
                        } 
                    />
                    <Route 
                        path="/settings" 
                        element={
                            isAuthenticated ? (
                                <>
                                    <SideBar />
                                    <Header />
                                    <Setting />
                                </>
                            ) : (
                                <Navigate to="/authentication" />
                            )
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
