"use client";
import styles from "./OurProjects.module.css";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    id: 1,
    tag: "Passengers Elevators",
    title: "Modern Office Tower — Dubai",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    href: "/projects/office-tower-dubai",
    size: "large", // spans 2 rows
  },
  {
    id: 2,
    tag: "Passengers Elevators",
    title: "Luxury Residential Complex",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80",
    href: "/projects/residential-complex",
    size: "small",
  },
  {
    id: 3,
    tag: "Passengers Elevators",
    title: "Industrial Warehouse — Logistics Hub",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    href: "/projects/warehouse-logistics",
    size: "small",
  },
];

export default function OurProjects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Our Projects</span>
            <h2 className={styles.heading}>
              Real Installations, <br />
              <em>Real Impact</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Explore our portfolio of completed lift installations across
              residential, commercial, and industrial sectors worldwide. Each
              project reflects our commitment to precision engineering and
              long-term reliability.
            </p>
            <Link href="/projects" className={styles.viewAllBtn}>
              View all references
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* ── Masonry-style grid ── */}
        <div className={styles.grid}>
          {/* Large card — left */}
          <Link
            href={projects[0].href}
            className={`${styles.card} ${styles.cardLarge}`}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={styles.cardBg}
              style={{ backgroundImage: `url(${projects[0].image})` }}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <span className={styles.cardTag}>{projects[0].tag}</span>
              <h3 className={styles.cardTitle}>{projects[0].title}</h3>
              <span className={`${styles.discoverBtn} ${hovered === 0 ? styles.discoverVisible : ""}`}>
                Discover this project ↗
              </span>
            </div>
          </Link>

          {/* Right column — two small cards stacked */}
          <div className={styles.rightCol}>
            {projects.slice(1).map((project, i) => (
              <Link
                key={project.id}
                href={project.href}
                className={`${styles.card} ${styles.cardSmall}`}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={styles.cardBg}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>{project.tag}</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={`${styles.discoverBtn} ${hovered === i + 1 ? styles.discoverVisible : ""}`}>
                    Discover this project ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className={styles.ctaStrip}>
          <p className={styles.ctaStripText}>
            Interested in seeing more of our installations?
          </p>
          <Link href="/projects" className={styles.ctaStripBtn}>
            View all references
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
