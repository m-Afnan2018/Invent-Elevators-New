"use client";
import { useState } from "react";
import styles from "./TypesGrid.module.css";
import Link from "next/link";
import Image from "next/image";

export default function TypesGrid({ series = [] }) {
  const row1 = series.slice(0, 3);
  const row2 = series.slice(3, 5);

  const images = ['/series/series-1.webp',
    '/series/series-2.webp',
    '/series/series-3.webp',
    '/series/series-4.webp',
    '/series/series-5.webp'
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={`${styles.section} ${styles.typesSection}`}>
      {images.map((src, i) => (
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
      {/* Row 1 — 3 columns */}
      <div className={styles.row1}>
        {row1.map((item, i) => (
          <Link
            key={item._id || i}
            href={item.href || `/series/${item._id}`}
            className={`${styles.cell}`}
            id={styles[`imagesId${i}`]}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p className={styles.name} style={{color: hoveredIndex !== null ? 'white' : 'black'}}>{item.name}</p>
            <p className={styles.sub} style={{color: hoveredIndex !== null ? 'white' : 'black'}}>{item.subtitle || "European/Japanese"}</p>
          </Link>
        ))}
      </div>

      {/* Horizontal divider */}
      <div className={styles.hDivider} />

      {/* Row 2 — 2 columns centered */}
      <div className={styles.row2}>
        {row2.map((item, i) => (
          <Link
            key={item._id || i}
            href={item.href || `/series/${item._id}`}
            className={styles.cell}
            onMouseEnter={() => setHoveredIndex(i + 3)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p className={styles.name} style={{color: hoveredIndex !== null ? 'white' : 'black'}}>{item.name}</p>
            <p className={styles.sub} style={{color: hoveredIndex !== null ? 'white' : 'black'}}>{item.subtitle || "European/Japanese"}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}