import type { Metadata } from 'next';
import Script from 'next/script';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Clouds Architecture Studio. Enquiries for new projects, press, and collaborations — projects@thecloudsstudio.com',
    openGraph: {
        title: 'Contact | Clouds Architecture Studio',
        description: 'Get in touch with Clouds Architecture Studio for new project enquiries, press, and collaborations.',
        url: 'https://thecloudsstudio.com/arch/contact',
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com/arch/contact',
    },
};

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectFirm',
    name: 'Clouds Architecture Studio',
    url: 'https://thecloudsstudio.com/arch',
    email: 'projects@thecloudsstudio.com',
    telephone: '+44-20-1234-5678',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '30-34 The Boulevard',
        addressLocality: 'London',
        postalCode: 'SW1 1AB',
        addressCountry: 'GB',
    },
    description: 'Award-winning architectural and interior design studio specialising in minimalist residential, commercial, and hospitality projects.',
    foundingDate: '2001',
    knowsAbout: ['Architecture', 'Interior Design', 'Residential Design', 'Commercial Architecture', 'Conservation'],
};

export default function ArchContact() {
    return (
        <>
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <ContactClient />
        </>
    );
}
