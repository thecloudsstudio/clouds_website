import type { Metadata } from 'next';
import Script from 'next/script';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Clouds Studio offers architecture, interior design, construction management, and planning services across India.',
    keywords: ['architecture services India', 'interior design studio', 'residential architect', 'commercial interior design', 'heritage conservation architect', 'construction management India'],
    openGraph: {
        title: 'Services | Clouds Studio',
        description: 'Architecture, interior design, construction, and planning services across India.',
        url: 'https://thecloudsstudio.com/services',
    },
    alternates: { canonical: 'https://thecloudsstudio.com/services' },
};

const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'Organization', name: 'Clouds Studio', url: 'https://thecloudsstudio.com' },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: [
            { '@type': 'Offer', position: 1, itemOffered: { '@type': 'Service', name: 'Architecture & Design', description: 'Full architectural design from concept to completion.' } },
            { '@type': 'Offer', position: 2, itemOffered: { '@type': 'Service', name: 'Interior Design', description: 'Material palettes, spatial sequences, and furniture curation.' } },
            { '@type': 'Offer', position: 3, itemOffered: { '@type': 'Service', name: 'Construction Management', description: 'End-to-end build management and site supervision.' } },
            { '@type': 'Offer', position: 4, itemOffered: { '@type': 'Service', name: 'Planning & Approvals', description: 'Planning applications and statutory submissions.' } },
            { '@type': 'Offer', position: 5, itemOffered: { '@type': 'Service', name: 'Project Consultation', description: 'Expert guidance at any stage of a project.' } },
            { '@type': 'Offer', position: 6, itemOffered: { '@type': 'Service', name: 'Site Analysis', description: 'Comprehensive site studies informing design decisions.' } },
        ],
    },
};

export default function ServicesPage() {
    return (
        <>
            <Script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
            <ServicesClient />
        </>
    );
}
