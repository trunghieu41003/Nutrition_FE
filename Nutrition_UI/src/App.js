import React, { useState } from 'react';
import Header from './components/dashboard/Header';
import SideBar from './components/dashboard/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Onboard from './components/onboarding/Onboard';  // Import the Onboard component
import './App.css';

const App = () => {
  // Add state to track whether the onboarding is completed
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // Function to handle onboarding completion
  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <div className="app">
      {/* Conditional rendering: show Onboard component if not completed, otherwise show Dashboard */}
      {!isOnboardingComplete ? (
        <Onboard onComplete={completeOnboarding} />  
      ) : (
        <>
          <SideBar />
          <div className="main-content">
            <Header />
            <Dashboard />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
