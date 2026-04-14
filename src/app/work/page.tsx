import type { Metadata } from 'next';
import Script from 'next/script';
import WorkClient from './WorkClient';
import { projects } from './data';

export const metadata: Metadata = {
    title: 'Work',
    description: 'Selected works by Clouds Studio — residential villas, eco-resorts, commercial tech hubs, and heritage conservation projects across India.',
    keywords: ['architecture portfolio India', 'residential design Chennai', 'eco resort Kerala', 'heritage conservation Tamil Nadu', 'commercial architecture Bangalore'],
    openGraph: {
        title: 'Work | Clouds Studio',
        description: 'Selected works — residential, commercial, hospitality, and conservation projects across India.',
        url: 'https://thecloudsstudio.com/work',
        images: [{ url: '/bangalore_villa_facade_color_1767792911832.png', width: 1200, height: 630, alt: 'Clouds Studio — Selected Works' }],
    },
    alternates: { canonical: 'https://thecloudsstudio.com/work' },
};

const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work — Clouds Studio',
    description: 'Selected architectural works across India',
    url: 'https://thecloudsstudio.com/work',
    hasPart: Object.values(projects).map((p) => ({
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description,
        url: `https://thecloudsstudio.com/work/${p.id}`,
        locationCreated: { '@type': 'Place', name: p.location },
        dateCreated: p.year,
        genre: p.category,
    })),
};

export default function WorkPage() {
    return (
        <>
            <Script id="portfolio-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
            <WorkClient />
        </>
    );
}
