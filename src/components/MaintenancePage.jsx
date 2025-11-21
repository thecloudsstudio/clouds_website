import React from 'react';
import DotShaderBackground from './DotShaderBackground';

const MaintenancePage = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col items-center justify-center font-sans">
            <DotShaderBackground />

            <div className="z-10 absolute inset-0 flex flex-col items-center justify-center space-y-8 text-center px-4 pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-light tracking-wider uppercase animate-fade-in pointer-events-auto">
                    Site Under Maintenance
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-light tracking-wide mt-12 absolute bottom-10 pointer-events-auto">
                    for queries mail us to <a href="mailto:projects@thecloudsstudio.com" className="text-black hover:text-gray-600 transition-colors duration-300 underline decoration-1 underline-offset-4">projects@thecloudsstudio.com</a>
                </p>
            </div>
        </div>
    );
};

export default MaintenancePage;
