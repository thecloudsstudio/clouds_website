import React from 'react';
import ArchNavbar from '@/components/arch/ArchNavbar';
import ArchFooter from '@/components/arch/ArchFooter';

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
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <ArchNavbar />
            <main className="flex-grow pb-12">
                {children}
            </main>
            <ArchFooter />
        </div>
    );
}
