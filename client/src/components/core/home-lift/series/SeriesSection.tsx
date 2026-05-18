"use client";

import styles from "./SeriesSection.module.css";

const SERIES_DEFAULT = [
  {
    name: "Heritage",
    description: "Elegant enclosed lifts crafted for luxurious villa interiors",
    imageSrc: "/images/heritage-2.png",
  },
  {
    name: "Horizon",
    description: "Modern panoramic lifts designed for stylish contemporary homes",
    imageSrc: "/images/horizon-2.png",
  },
  {
    name: "Orbit",
    description: "Compact circular lifts blending innovation with premium aesthetics",
    imageSrc: "/images/orbit.png",
  },
  {
    name: "Aero",
    description: "Slim space-saving lifts perfect for compact modern living",
    imageSrc: "/images/aero-slim-2.png",
  },
];

interface SeriesItem {
  name: string;
  description: string;
  imageSrc: string;
}

interface SeriesSectionProps {
  data?: {
    heading?: string;
    series?: SeriesItem[];
  };
}

export default function SeriesSection({ data }: SeriesSectionProps) {
  const heading = data?.heading ?? "Our Home Lift Models";
  const series = data?.series ?? SERIES_DEFAULT;

  return (
    <section id="series" className={styles.wrapper}>
      {/* Section heading with lines */}
      <div className={styles.headingRow}>
        <span className={styles.line} />
        <h2 className={styles.heading}>{heading}</h2>
        <span className={styles.line} />
      </div>

      {/* Cards grid */}
      <div className={styles.grid}>
        {series.map((item) => (
          <div key={item.name} className={styles.card}>
            {/* Background image */}
            <img
              src={item.imageSrc}
              alt={item.name}
              className={styles.cardImage}
            />

            {/* Dark overlay */}
            <div className={styles.overlay} />

            {/* Default state */}
            <span className={styles.cardName}>{item.name}</span>

            {/* Hover state */}
            <div className={styles.hoverContent}>
              <h3 className={styles.hoverName}>{item.name}</h3>
              <p className={styles.hoverDesc}>{item.description}</p>

              <span
                className={styles.knowMoreBtn}
                onClick={() => {
                  document
                    .getElementById("contact-banner")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                I'm interested
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}