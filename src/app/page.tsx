import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    title: 'Clouds Studio',
    description: 'Award-winning minimalist architectural and interior design studio. Creating timeless spaces across India — residential, commercial, hospitality, and conservation.',
    openGraph: {
        title: 'Clouds Studio',
        description: 'Award-winning minimalist architectural and interior design studio. Creating timeless spaces across India.',
        url: 'https://thecloudsstudio.com',
        images: [
            {
                url: '/hero_slideshow_chennai_minimal_1767686629299.png',
                width: 1200,
                height: 630,
                alt: 'Clouds Studio',
            },
        ],
    },
    alternates: {
        canonical: 'https://thecloudsstudio.com',
    },
};

export default function Home() {
    return <HomeClient />;
}
