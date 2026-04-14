import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import ArchNavbar from '@/components/arch/ArchNavbar';
import GlobalCursor from '@/components/GlobalCursor';

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clouds Architecture Studio',
    url: 'https://thecloudsstudio.com/arch',
    email: 'projects@thecloudsstudio.com',
    description: 'Award-winning minimalist architectural and interior design studio specialising in residential, commercial, hospitality, and conservation projects across India.',
    foundingDate: '2001',
    knowsAbout: ['Architecture', 'Interior Design', 'Residential Design', 'Commercial Architecture', 'Hospitality Design', 'Heritage Conservation'],
    areaServed: ['India', 'Chennai', 'Bangalore', 'Kerala', 'Tamil Nadu'],
};

export const metadata: Metadata = {
    title: {
        default: 'Clouds Architecture Studio',
        template: '%s | Clouds Architecture Studio',
    },
    description: 'Award-winning minimalist architectural and interior design studio. Specialising in residential, commercial, hospitality, and conservation projects across India.',
    keywords: ['architecture studio', 'interior design', 'minimalist architecture', 'residential design', 'commercial architecture', 'India', 'Chennai', 'Bangalore', 'Kerala'],
    openGraph: {
        title: 'Clouds Architecture Studio',
        description: 'Award-winning minimalist architectural and interior design studio. Specialising in residential, commercial, hospitality, and conservation projects across India.',
        url: 'https://thecloudsstudio.com/arch',
        siteName: 'Clouds Architecture Studio',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clouds Architecture Studio',
        description: 'Award-winning minimalist architectural and interior design studio.',
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com/arch',
    },
};

export default function ArchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <div className="min-h-screen bg-white flex flex-col font-sans cursor-none">
                <GlobalCursor />
                <ArchNavbar />
                <main className="flex-grow pb-12">
                    {children}
                </main>
            </div>
        </>
    );
}
