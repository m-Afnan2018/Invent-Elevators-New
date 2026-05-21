"use client";

import styles from "./SeriesSection.module.css";

const SERIES_DEFAULT = [
  {
    name: "Passenger Lifts",
    description:
      "Smooth and efficient lifts designed for offices, hotels, and commercial buildings.",
    imageSrc: "/commercial/images/series/passngr2.png",
  },
  {
    name: "Freight Lifts",
    description:
      "Heavy-duty lift systems built for safe and reliable goods transportation.",
    imageSrc: "/commercial/images/series/freight2.png",
  },
  {
    name: "Panoramic Lifts",
    description:
      "Elegant glass elevators adding a modern architectural statement to commercial spaces.",
    imageSrc: "/commercial/images/series/panoramic2.png",
  },
  {
    name: "Hospital Lifts",
    description:
      "Safe and spacious lift solutions engineered for hospitals and healthcare facilities.",
    imageSrc: "/commercial/images/series/hospital2.png",
  },
  {
    name: "Car Lifts",
    description:
      "Advanced automobile lift systems designed for parking towers, villas, and commercial garages.",
    imageSrc: "/commercial/images/series/car.png",
  },
  {
    name: "Dumbwaiter Lifts",
    description:
      "Compact service lifts ideal for restaurants, hotels, hospitals, and food transportation.",
    imageSrc: "/commercial/images/series/dumbwaiter.png",
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
  const heading = data?.heading ?? "Commercial Lifts";
  const series = data?.series ?? SERIES_DEFAULT;

  return (
    <section id="series" className={styles.wrapper}>
      {/* Section heading */}
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
                I'm Interested
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}