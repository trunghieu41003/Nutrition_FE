// App.js
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
                    
                   
                    <Route 
                        path="/onboard" 
                        element={<Onboard onComplete={completeOnboarding} />} 
                    />

                    {/* Root route redirect */}
                    <Route 
                        path="/" 
                        element={
                            !isOnboardingComplete ? (
                                <Navigate to="/onboard" />
                            ) : !isAuthenticated ? (
                                <Navigate to="/authentication" />
                            ) : (
                                <Navigate to="/dashboard" />
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
                                <Navigate to="/authentication" />
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
