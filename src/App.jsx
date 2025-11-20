import React from 'react';
import Background from './components/Background';
import Layout from './components/Layout';

function App() {
    return (
        <div className="relative w-full min-h-screen">
            <Background />
            <Layout />
        </div>
    );
}

export default App;
