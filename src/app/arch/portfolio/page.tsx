import type { Metadata } from 'next';
import Script from 'next/script';
import PortfolioClient from './PortfolioClient';
import { projects } from './data';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Selected works by Clouds Architecture Studio — residential villas, eco-resorts, commercial tech hubs, and heritage conservation projects across India.',
    keywords: ['architecture portfolio', 'India architecture', 'residential design India', 'eco resort design', 'heritage conservation', 'commercial architecture Chennai', 'Bangalore villa design'],
    openGraph: {
        title: 'Portfolio | Clouds Architecture Studio',
        description: 'Selected works — residential villas, eco-resorts, commercial tech hubs, and heritage conservation projects across India.',
        url: 'https://thecloudsstudio.com/arch/portfolio',
        images: [
            {
                url: '/bangalore_villa_facade_color_1767792911832.png',
                width: 1200,
                height: 630,
                alt: 'Clouds Architecture Studio — Bangalore Fusion Villa',
            },
        ],
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com/arch/portfolio',
    },
};

const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio — Clouds Architecture Studio',
    description: 'Selected architectural works across India',
    url: 'https://thecloudsstudio.com/arch/portfolio',
    hasPart: Object.values(projects).map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: `https://thecloudsstudio.com/arch/portfolio/${project.id}`,
        locationCreated: {
            '@type': 'Place',
            name: project.location,
        },
        dateCreated: project.year,
        genre: project.category,
    })),
};

export default function ArchPortfolio() {
    return (
        <>
            <Script
                id="portfolio-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
            />
            <PortfolioClient />
        </>
    );
}
