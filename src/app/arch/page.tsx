import type { Metadata } from 'next';
import ArchHomeClient from './ArchHomeClient';

export const metadata: Metadata = {
    title: 'Clouds Architecture Studio',
    description: 'Minimalist architectural design studio creating timeless spaces across India — residential, commercial, hospitality, and conservation projects.',
    openGraph: {
        title: 'Clouds Architecture Studio',
        description: 'Minimalist architectural design studio creating timeless spaces across India — residential, commercial, hospitality, and conservation projects.',
        url: 'https://thecloudsstudio.com/arch',
        images: [
            {
                url: '/hero_slideshow_chennai_minimal_1767686629299.png',
                width: 1200,
                height: 630,
                alt: 'Clouds Architecture Studio — Chennai Project',
            },
        ],
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com/arch',
    },
};

export default function ArchHome() {
    return <ArchHomeClient />;
}
