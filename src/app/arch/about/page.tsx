import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About',
    description: 'Clouds Architecture Studio — an award-winning architectural and interior design practice. Founded 2001, we create elegant, modern spaces rigorous in detail and construction.',
    openGraph: {
        title: 'About | Clouds Architecture Studio',
        description: 'Award-winning architectural and interior design practice. Founded 2001, creating elegant, modern spaces that are rigorous in detail and construction.',
        url: 'https://thecloudsstudio.com/arch/about',
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com/arch/about',
    },
};

export default function ArchAbout() {
    return <AboutClient />;
}
