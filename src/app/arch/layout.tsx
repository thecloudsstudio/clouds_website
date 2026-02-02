import React from 'react';
import ArchNavbar from '@/components/arch/ArchNavbar';
import GlobalCursor from '@/components/GlobalCursor';

export const metadata = {
    title: 'Clouds Architecture',
    description: 'Minimalist Architectural Design Studio',
};

export default function ArchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans cursor-none">
            <GlobalCursor />
            <ArchNavbar />
            <main className="flex-grow pb-12">
                {children}
            </main>
        </div>
    );
}
