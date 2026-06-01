"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/services/projects.service";

import ProjectHero from "@/components/core/projects/single/ProjectHero";
import ProjectOverview from "@/components/core/projects/single/ProjectOverview";
import ProjectRequirements from "@/components/core/projects/single/ProjectRequirements";
import ProjectSolutions from "@/components/core/projects/single/ProjectSolutions";
import ProjectGallery from "@/components/core/projects/single/ProjectGallery";
import ProjectTestimonial from "@/components/core/projects/single/ProjectTestimonial";
import ProjectBrandCta from "@/components/core/projects/single/ProjectBrandCta";

import styles from "./page.module.css";
import SiteVisitForm from "@/components/core/projects/single/SiteVisitForm";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getProjectBySlug(id)
      .then(res => setProject(res || null))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (project?.title) {
      document.title = project.metaTitle || `${project.title} | Invent Elevator`;
    }
    if (project?.metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
      meta.content = project.metaDescription;
    }
  }, [project?.title, project?.metaTitle, project?.metaDescription]);

  if (loading) {
    return (
      <main className={styles.stateMain}>
        <div className={styles.spinner} />
        <p className={styles.stateText}>Loading project…</p>
      </main>
    );
  }

  if (!project?._id) {
    return (
      <main className={styles.stateMain}>
        <p className={styles.notFound}>Project not found.</p>
        <Link href="/projects" className={styles.backLink}>← Back to all projects</Link>
      </main>
    );
  }

  const heroImage = project.featuredImage || project.image || FALLBACK_IMAGE;
  const requirements = project.customSpecs?.requirements || [];

  return (
    <main>
      <ProjectHero
        title={project.title}
        location={project.location}
        category={project.category}
        image={heroImage}
      />

      <ProjectOverview project={project} />

      <ProjectRequirements requirements={requirements} />

      <ProjectSolutions description={project.customSpecs?.solutionsDesc} />

      <ProjectGallery
        images={project.galleryImages}
        featuredImage={project.featuredImage || project.image}
      />

      <ProjectTestimonial testimonials={project.testimonials} />

      <SiteVisitForm />

      {/* <ProjectBrandCta /> */}
    </main>
  );
}
