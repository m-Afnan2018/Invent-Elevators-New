"use client";
import { useState } from "react";
import styles from "./TypesGrid.module.css";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  '/series/heritage.png',
  '/series/horizon.png',
  '/series/orbit.png',
  '/series/aero-slim.png',
];

const DESIGN_OPTIONS = ["Select", "Signature", "Bespoke"];
const SERIES_ANCHORS = ["heritage", "horizon", "orbit", "aero"];

export default function TypesGrid({ series = [] }) {
  const items = series.slice(0, 4);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={`${styles.section} ${styles.typesSection}`}>

      <div className={styles.heading}>
        <h2 className="headings">Our Series of Home Lifts</h2>
      </div>

      {IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={`${styles.bgImage} ${hoveredIndex === i ? styles.imageActive : ""}`}
          style={{ objectFit: "cover" }}
          priority={i === 0}
        />
      ))}

      <div className={`${styles.row} ${hoveredIndex !== null ? styles.rowHovered : ""}`}>
        {items.map((item, i) => {
          const isActive = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && !isActive;
          return (
            <div
              key={item._id || i}
              className={`${styles.cell} ${isActive ? styles.cellActive : ""} ${isDimmed ? styles.cellDimmed : ""}`}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.cellImg}>
                <Image src={IMAGES[i]} alt={item.name} fill sizes="100vw" style={{ objectFit: "cover" }} />
                <div className={styles.cellImgOverlay} />
              </div>

              <div
                className={styles.cellContent}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <p className={styles.name}>{item.name}</p>
                <p className={styles.sub}>{item.subtitle || "European/Japanese"}</p>

                {/* Extra info — visible only on active cell */}
                <div className={styles.hoverInfo}>
                  {/* Description */}
                  {item.description && (
                    <p className={styles.descText}>{item.description}</p>
                  )}

                  {/* Tiers */}
                  {/* <div className={styles.tiers}>
                    <Link href={`/series#${SERIES_ANCHORS[i]}`} className={styles.tier}>Essentials</Link>
                    <span className={styles.tierDivider}>/</span>
                    <Link href={`/series#${SERIES_ANCHORS[i]}`} className={styles.tier}>Elite</Link>
                  </div> */}

                  {/* Design options */}
                  {/* <div className={styles.designOptions}>
                    {DESIGN_OPTIONS.map((opt) => (
                      <Link key={opt} href={`/series#${SERIES_ANCHORS[i]}`} className={styles.designOpt}>{opt}</Link>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
