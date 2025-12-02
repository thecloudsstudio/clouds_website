import React from 'react';
import Cursor from './ui/inverted-cursor';


const MaintenancePage = ({ onLogin }) => {
    const [showLogin, setShowLogin] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (password === '9629') {
            onLogin();
        } else {
            alert('Incorrect password');
            setPassword('');
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col items-center justify-center font-sans cursor-none">
            <Cursor size={120} />


            <div className="z-10 flex flex-col items-center justify-center space-y-8 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-light tracking-wider uppercase animate-fade-in">
                    Site Under Maintenance
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-light tracking-wide mt-12 absolute bottom-10">
                    for queries mail us to <a href="mailto:projects@thecloudsstudio.com" className="text-black hover:text-gray-600 transition-colors duration-300 underline decoration-1 underline-offset-4">projects@thecloudsstudio.com</a>
                </p>
            </div>

            {/* Admin Login Button */}
            <button
                onClick={() => setShowLogin(true)}
                className="absolute bottom-4 right-4 text-gray-300 hover:text-gray-500 transition-colors duration-300 text-xs z-20"
            >
                Admin Login
            </button>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded shadow-xl w-full max-w-sm relative">
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-light mb-4">Enter Password</h2>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 font-light"
                                placeholder="Password"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaintenancePage;
