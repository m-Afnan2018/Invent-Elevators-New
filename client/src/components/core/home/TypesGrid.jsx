"use client";
import { useState } from "react";
import styles from "./TypesGrid.module.css";
import Image from "next/image";

const IMAGES = [
  '/series/heritage.png',
  '/series/horizon.png',
  '/series/orbit.png',
  '/series/aero-slim.png',
];

export default function TypesGrid({ series = [] }) {
  const items = series.slice(0, 4);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={`${styles.section} ${styles.typesSection}`}>

      {/* Section heading */}
      <div className={styles.heading}>
        <h2 className="headings">Our Series of Lifts</h2>
      </div>

      {/* Background images — revealed on hover (desktop only) */}
      {IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={`${styles.backgroungImages} ${hoveredIndex === i ? styles.imageActive : ""}`}
          style={{ objectFit: "cover" }}
          priority={i === 0}
        />
      ))}

      {/* Single row — all 4 items */}
      <div className={styles.row}>
        {items.map((item, i) => (
          <div
            key={item._id || i}
            className={styles.cell}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Per-cell image — only visible on mobile (touch devices) */}
            <div className={styles.cellImg}>
              <Image
                src={IMAGES[i]}
                alt={item.name}
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.cellImgOverlay} />
            </div>

            <p
              className={styles.name}
              style={{ color: hoveredIndex !== null ? "white" : "black" }}
            >
              {item.name}
            </p>
            <p
              className={styles.sub}
              style={{ color: hoveredIndex !== null ? "rgba(255,255,255,0.65)" : "#888" }}
            >
              {item.subtitle || "European/Japanese"}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
