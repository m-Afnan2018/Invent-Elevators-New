"use client";
import { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projects.service";

const FALLBACK_IMAGES = [
  "/projects/project-1.webp",
  "/projects/project-2.webp",
  "/projects/project-3.webp",
];

export default function Projects({ featuredProjects: propProjects = [] }) {
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getProjects()
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        const all = list.filter(p => p?._id && p?.title);
        // Prefer projects that have a featured image
        const withImage = all.filter(p => p.featuredImage || p.galleryImages?.[0]);
        const picks = (withImage.length ? withImage : all).slice(0, 6);
        if (picks.length) setFetched(picks);
      })
      .catch(() => {});
  }, []);

  // Prefer self-fetched data; fall back to prop (which may be FALLBACK_PROJECTS)
  const projects = fetched.length ? fetched : propProjects;

  return (
    <section className={[styles.section, styles.projectSection].join(' ')}>
      <h2 className={`${styles.heading} headings`}>Our Projects</h2>
      <p>We believe an elevator should feel like a natural extension of the architecture, enhancing elegance, functionality,<br/> and the overall luxury experience of the space.</p>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Link
            key={project._id}
            href={project.__fallback ? "/projects" : `/projects/${project.slug || project._id}`}
            className={styles.card}
          >
            <div className={styles.imgWrap}>
              <Image
                src={
                  project.featuredImage ||
                  project.image ||
                  project.galleryImages?.[0] ||
                  project.images?.[0] ||
                  FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
                }
                alt={project.title}
                fill
                sizes="(max-width:640px) 100vw, 50vw"
                className={styles.img}
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={`${styles.desc} lineHeightDescription`}>
                {(project.description || "Custom vertical mobility solution.").slice(0, 160)}
                {(project.description || "").length > 160 ? "…" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button className={styles.viewMoreBtn}>View More</button>
    </section>
  );
}
