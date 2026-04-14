import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About',
    description: 'Clouds Studio — an award-winning architectural and interior design practice creating elegant, modern spaces that are rigorous in detail and construction.',
    openGraph: {
        title: 'About | Clouds Studio',
        description: 'Award-winning architectural and interior design practice creating elegant, modern spaces.',
        url: 'https://thecloudsstudio.com/about',
    },
    alternates: { canonical: 'https://thecloudsstudio.com/about' },
};

export default function AboutPage() {
    return <AboutClient />;
}
