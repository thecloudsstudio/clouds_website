import type { Metadata } from 'next';
import { projects } from '../data';
import ProjectDetailClient from './client';

export async function generateStaticParams() {
    return Object.keys(projects).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const project = projects[id];
    if (!project) return { title: 'Project Not Found' };
    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: `${project.title} | Clouds Studio`,
            description: project.description,
            url: `https://thecloudsstudio.com/work/${id}`,
            images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }],
        },
        alternates: { canonical: `https://thecloudsstudio.com/work/${id}` },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects[id];
    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
    return <ProjectDetailClient project={project} />;
}
