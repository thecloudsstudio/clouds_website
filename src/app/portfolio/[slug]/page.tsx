import type { Metadata } from 'next';
import { projects } from '../data';
import ProjectDetailClient from './client';

export async function generateStaticParams() {
    return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects[slug];
    if (!project) return { title: 'Project Not Found' };
    return {
        title: project.title,
        description: project.description,
        keywords: [project.title, project.category, project.location, 'Clouds Studio', 'architecture India'],
        openGraph: {
            title: `${project.title} | Clouds Studio`,
            description: project.description,
            url: `https://thecloudsstudio.com/portfolio/${slug}`,
            images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }],
        },
        alternates: { canonical: `https://thecloudsstudio.com/portfolio/${slug}` },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects[slug];
    if (!project) return <div className="min-h-screen flex items-center justify-center text-gray-400 font-light">Project not found</div>;
    return <ProjectDetailClient project={project} />;
}
