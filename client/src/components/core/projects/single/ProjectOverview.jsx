import Image from "next/image";
import styles from "./ProjectOverview.module.css";

export default function ProjectOverview({ project }) {
  const year = project.completionDate
    ? new Date(project.completionDate).getFullYear()
    : null;

  const mainImage =
    project.featuredImage ||
    project.image ||
    project.galleryImages?.[0] ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ── Left: main image ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src={mainImage}
              alt={project.title}
              fill
              sizes="(max-width:900px) 100vw, 45vw"
              className={styles.image}
            />
          </div>
        </div>

        {/* ── Right: details ── */}
        <div className={styles.detailsCol}>
          <span className={styles.brand}>{project.title}</span>

          <dl className={styles.table}>
            {project.location && (
              <div className={styles.row}>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            {project.category && (
              <div className={styles.row}>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
            )}
            {project.category && (
              <div className={styles.row}>
                <dt>Series / Model</dt>
                <dd>{project.series || project.model || "Aero"}</dd>
              </div>
            )}
            {year && (
              <div className={styles.row}>
                <dt>Year</dt>
                <dd>{year}</dd>
              </div>
            )}
            {project.status && (
              <div className={styles.row}>
                <dt>Status</dt>
                <dd className={`${styles.statusBadge} ${styles[project.status]}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </dd>
              </div>
            )}
            {project.client && (
              <div className={`${styles.row} ${styles.rowClient}`}>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
            )}
          </dl>

          {project.description && (
            <p className={styles.desc}>{project.description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
