import React from 'react';
import MaintenancePage from './components/MaintenancePage';
import Background from './components/Background';
import Layout from './components/Layout';
import CreativePage from './components/CreativePage';
import DesignPage from './components/DesignPage';
import StructurePage from './components/StructurePage';
import IntelligencePage from './components/IntelligencePage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [currentView, setCurrentView] = React.useState('home');

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    return (
        <>
            {!isAuthenticated ? (
                <MaintenancePage onLogin={handleLogin} />
            ) : (
                <>
                    {currentView === 'home' ? (
                        <>
                            <Background />
                            <Layout onNavigate={handleNavigate} />
                        </>
                    ) : currentView === 'creative' ? (
                        <CreativePage onBack={() => setCurrentView('home')} />
                    ) : currentView === 'design' ? (
                        <DesignPage onBack={() => setCurrentView('home')} />
                    ) : currentView === 'structure' ? (
                        <StructurePage onBack={() => setCurrentView('home')} />
                    ) : currentView === 'intelligence' ? (
                        <IntelligencePage onBack={() => setCurrentView('home')} />
                    ) : (
                        <>
                            <Background />
                            <Layout onNavigate={handleNavigate} />
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default App;
