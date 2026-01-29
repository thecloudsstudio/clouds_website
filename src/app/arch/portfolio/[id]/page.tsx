import React from 'react';
import { projects } from '../data';
import ProjectDetailClient from './client';

export async function generateStaticParams() {
    return Object.keys(projects).map((id) => ({
        id: id,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const project = projects[resolvedParams.id];

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
    }

    return <ProjectDetailClient project={project} />;
}
