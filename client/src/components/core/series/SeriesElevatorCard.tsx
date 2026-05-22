"use client";

import React, { useState } from "react";
import styles from "./SeriesElevatorCard.module.css";

const thumbnails = [
  { id: 1, alt: "Elevator view 1" },
  { id: 2, alt: "Elevator view 2" },
  { id: 3, alt: "Elevator view 3", active: true },
  { id: 4, alt: "Elevator view 4" },
];

const specs = [
  { label: "Height", value: "13500 mm / 531 in" },
  { label: "Stops", value: "Up to 4 Stops (G+3)" },
  { label: "Capacity", value: "210 kg / 2 Persons" },
];

const HeightIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M20 6v28M20 6l-5 5M20 6l5 5M20 34l-5-5M20 34l5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StopsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="8" y="6" width="10" height="28" rx="2" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="22" y="6" width="10" height="28" rx="2" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M11 14h4M11 20h4M11 26h4M25 14h4M25 20h4M25 26h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CapacityIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M20 8a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M20 20v4M18 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const specIcons = [HeightIcon, StopsIcon, CapacityIcon];

export default function SeriesElevatorCard() {
  const [activeThumb, setActiveThumb] = useState(2);

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        {/* Left: Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <div className={styles.mainImagePlaceholder}>
              {/* Replace with <Image src={...} alt="..." fill /> for Next.js */}
              <div className={styles.imageFallback}>
                <svg viewBox="0 0 80 80" fill="none" width="64" height="64">
                  <rect x="8" y="20" width="20" height="48" rx="2" fill="#c8a96e" opacity="0.3"/>
                  <rect x="52" y="20" width="20" height="48" rx="2" fill="#c8a96e" opacity="0.3"/>
                  <rect x="16" y="8" width="4" height="64" rx="2" fill="#c8a96e" opacity="0.5"/>
                  <rect x="60" y="8" width="4" height="64" rx="2" fill="#c8a96e" opacity="0.5"/>
                  <ellipse cx="40" cy="10" rx="10" ry="4" fill="#c8a96e" opacity="0.4"/>
                  <path d="M20 20 Q40 14 60 20" stroke="#c8a96e" strokeWidth="2" fill="none" opacity="0.6"/>
                </svg>
                <span>Home Elevator Series V</span>
              </div>
            </div>
            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.navBtnRight}`} aria-label="Next">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.thumbnails}>
            {thumbnails.map((thumb, i) => (
              <button
                key={thumb.id}
                className={`${styles.thumb} ${activeThumb === i ? styles.thumbActive : ""}`}
                onClick={() => setActiveThumb(i)}
                aria-label={thumb.alt}
              >
                <div className={styles.thumbInner} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>
            Home Elevator <span className={styles.titleAccent}>Series V</span>
          </h1>

          <div className={styles.descriptionBlock}>
            <div className={styles.descriptionBorder} />
            <p className={styles.description}>
              Nibav Lifts Series V is a next-generation home elevator designed for modern living,
              offering advanced technology, elegant aesthetics, and seamless performance.
              Engineered with smart safety systems and a space-efficient structure, it delivers
              quiet operation, superior energy efficiency, and unmatched riding comfort. Ideal for
              contemporary homes, Series V blends innovation, luxury, and reliability to enhance
              everyday mobility.
            </p>
          </div>

          <div className={styles.dimensions}>
            <div className={styles.dimensionRow}>
              <span className={styles.dimLabel}>Clear Space Required:</span>
              <span className={styles.dimValue}>1000 mm</span>
            </div>
            <div className={styles.dimensionRow}>
              <span className={styles.dimLabel}>Internal Cabin Diameter:</span>
              <span className={styles.dimValue}>830 mm</span>
            </div>
            <div className={styles.dimensionRow}>
              <span className={styles.dimLabel}>External Cylinder Diameter:</span>
              <span className={styles.dimValue}>933 mm</span>
            </div>
          </div>

          <div className={styles.specsGrid}>
            {specs.map((spec, i) => {
              const Icon = specIcons[i];
              return (
                <div key={spec.label} className={styles.specCard}>
                  <div className={styles.specIconWrapper}>
                    <Icon />
                  </div>
                  <p className={styles.specLabel}>{spec.label}</p>
                  <p className={styles.specValue}>{spec.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
