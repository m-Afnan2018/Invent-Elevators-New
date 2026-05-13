"use client";
import styles from "./Projects.module.css";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGES = [
  "/projects/project-1.webp",
  "/projects/project-2.webp",
  "/projects/project-3.webp",
];

export default function Projects({ featuredProjects = [] }) {
  return (
    <section className={`${styles.section} ${styles.projectSection}`}>
      <h2 className='{styles.heading} headings'>Our Projects</h2>
      <div className={styles.grid}>
        {featuredProjects.map((project, i) => (
          <Link
            key={project._id}
            href={project.__fallback ? "/projects" : `/projects/${project._id}`}
            className={styles.card}
          >
            {/* Image */}
            <div className={styles.imgWrap}>
              <Image
                src={
                  project.image ||
                  project.images?.[0] ||
                  FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
                }
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={styles.img}
              />
              {/* Price tag bottom-right */}
              {project.price && (
                <span className={styles.price}>
                  FROM {project.price} PER PERSON
                </span>
              )}
            </div>

            {/* Text below image */}
            <div className={styles.body}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.desc}>
                {(project.description || "Custom vertical mobility solution.")
                  .slice(0, 160)}
                {(project.description || "").length > 160 ? "…" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button className={styles.viewMoreBtn}>View More </button>
    </section>
  );
}
