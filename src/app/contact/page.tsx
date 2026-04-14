import type { Metadata } from 'next';
import Script from 'next/script';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Clouds Studio. Enquiries for new projects, press, and collaborations — projects@thecloudsstudio.com',
    openGraph: {
        title: 'Contact | Clouds Studio',
        description: 'Get in touch with Clouds Studio for new project enquiries, press, and collaborations.',
        url: 'https://thecloudsstudio.com/contact',
    },
    alternates: { canonical: 'https://thecloudsstudio.com/contact' },
};

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectFirm',
    name: 'Clouds Studio',
    url: 'https://thecloudsstudio.com',
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
};

export default function ContactPage() {
    return (
        <>
            <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
            <ContactClient />
        </>
    );
}
