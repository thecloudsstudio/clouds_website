import React from 'react';
import Cursor from './ui/inverted-cursor';

const MaintenancePage = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col items-center justify-center font-sans cursor-none">
            <Cursor />

            <div className="z-10 flex flex-col items-center justify-center space-y-8 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-light tracking-wider uppercase animate-fade-in">
                    Site Under Maintenance
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-light tracking-wide mt-12 absolute bottom-10">
                    for queries mail us to <a href="mailto:projects@thecloudsstudio.com" className="text-black hover:text-gray-600 transition-colors duration-300 underline decoration-1 underline-offset-4">projects@thecloudsstudio.com</a>
                </p>
            </div>
        </div>
    );
};

export default MaintenancePage;
