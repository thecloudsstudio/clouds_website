import React from 'react';
import MaintenancePage from './components/MaintenancePage';
import Background from './components/Background';
import Layout from './components/Layout';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <>
            {!isAuthenticated ? (
                <MaintenancePage onLogin={handleLogin} />
            ) : (
                <>
                    <Background />
                    <Layout />
                </>
            )}
        </>
    );
}

export default App;
