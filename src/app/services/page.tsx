import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Clouds Studio offers architecture, interior design, construction, and planning services across India. Residential, commercial, hospitality, and heritage conservation.',
    keywords: ['architecture services India', 'interior design studio', 'residential architect', 'commercial interior design', 'heritage conservation architect', 'construction management India'],
    openGraph: {
        title: 'Services | Clouds Studio',
        description: 'Architecture, interior design, construction, and planning services across India.',
        url: 'https://thecloudsstudio.com/services',
    },
    alternates: { canonical: 'https://thecloudsstudio.com/services' },
};

const services = [
    {
        title: 'Architecture',
        description: 'We design buildings that are rooted in context and built to last. From private residences to commercial complexes, our architectural work begins with a deep understanding of site, climate, and the way people live. We work across residential, commercial, and heritage typologies.',
        areas: ['Residential', 'Commercial', 'Heritage & Conservation'],
    },
    {
        title: 'Interior Design',
        description: 'Our interior design practice extends the architectural vision inward. We curate material palettes, spatial sequences, and furniture selections that create cohesive environments — spaces that feel considered from the first wall to the last detail.',
        areas: ['Residential Interiors', 'Commercial Interiors', 'Hospitality Interiors'],
    },
    {
        title: 'Construction',
        description: 'Through our create-and-construct offering, we manage the complete build process — from procurement and contractor coordination to site supervision and handover. A single point of accountability from concept to completion.',
        areas: ['Project Management', 'Contractor Coordination', 'Site Supervision'],
    },
    {
        title: 'Planning',
        description: 'Navigating planning regulations and approvals requires experience and precision. We prepare planning applications, feasibility studies, and statutory submissions — guiding projects through regulatory processes with clarity.',
        areas: ['Planning Applications', 'Feasibility Studies', 'Regulatory Submissions'],
    },
];

const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
        '@type': 'Organization',
        name: 'Clouds Studio',
        url: 'https://thecloudsstudio.com',
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: services.map((s, i) => ({
            '@type': 'Offer',
            position: i + 1,
            itemOffered: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
            },
        })),
    },
};

export default function ServicesPage() {
    return (
        <>
            <Script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {/* Header */}
                <div className="max-w-2xl mb-24">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
                        Services
                    </h1>
                    <p className="text-lg font-light text-gray-500 leading-relaxed">
                        We offer a considered range of design services — from the first sketch to the final fitting.
                        Each project is shaped around the specific needs of the client, the site, and the brief.
                    </p>
                </div>

                {/* Services list */}
                <div className="divide-y divide-gray-100">
                    {services.map((service, index) => (
                        <div key={service.title} className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                            {/* Number + title */}
                            <div className="md:col-span-4">
                                <span className="text-xs tracking-widest text-gray-300 uppercase block mb-3">
                                    0{index + 1}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black">
                                    {service.title}
                                </h2>
                            </div>

                            {/* Description + areas */}
                            <div className="md:col-span-5">
                                <p className="text-base font-light text-gray-600 leading-relaxed mb-8">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.areas.map((area) => (
                                        <li key={area} className="flex items-center gap-3 text-sm font-light text-gray-500 tracking-wide">
                                            <span className="w-4 h-px bg-gray-300 inline-block flex-shrink-0" />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="md:col-span-3 flex md:justify-end items-start">
                                <Link
                                    href="/contact"
                                    className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors border-b border-gray-200 hover:border-black pb-1"
                                >
                                    Start a project →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 pt-16 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <p className="text-2xl md:text-3xl font-light text-black mb-2">Have a project in mind?</p>
                        <p className="text-base font-light text-gray-500">We'd love to hear about it.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
                    >
                        Get in touch
                    </Link>
                </div>
            </div>
        </>
    );
}
