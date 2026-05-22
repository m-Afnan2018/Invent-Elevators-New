"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./AeroSlimCard.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const images = [
  { src: "/series/aero-slim.png", alt: "Aero Slim lift — full slim profile view" },
  { src: "/series/atelier.png", alt: "Aero Slim lift — panoramic glass cabin" },
  { src: "/series/heritage.png", alt: "Aero Slim lift — pit-free base detail" },
  { src: "/series/horizon.png", alt: "Aero Slim lift — installed in narrow space" },
];

const specs = [
  {
    label: "Pit Required",
    value: "None",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        {/* Floor line */}
        <path d="M6 30h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        {/* Lift sitting on floor — no pit below */}
        <rect x="13" y="10" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        {/* Cross through pit area */}
        <path d="M8 34 L12 38M12 34 L8 38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Arrow upward — no pit needed */}
        <path d="M20 10 L20 4M17 7 L20 4 L23 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    label: "Profile",
    value: "Slim Design",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        {/* Very slim shaft */}
        <rect x="16" y="4" width="8" height="32" rx="2" stroke="currentColor" strokeWidth="2.2" />
        {/* Width arrows showing slim */}
        <path d="M6 20h8M34 20h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <path d="M8 17l-2 3 2 3M32 17l2 3-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      </svg>
    ),
  },
  {
    label: "View",
    value: "Panoramic",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        {/* Wide panoramic eye shape */}
        <path d="M4 20 Q20 6 36 20 Q20 34 4 20Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Pupil */}
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

const capacityOptions = ["320 kg", "450 kg", "620 kg", "800 kg", "1000 kg", "1200 kg"];

const machines = [
  { label: "Elite (European)", code: "EE" },
  { label: "Essential (Chinese/Japanese)", code: "EC" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AeroSlimCard() {
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(1);
  const [travel, setTravel] = useState("");

  // No variants for Aero
  const productCode = `Inv-AS-${machines[selectedMachine].code}`;

  const navigate = (newIdx: number, dir: 'next' | 'prev') => {
    if (transitioning) return;
    if (transitionRef.current) clearTimeout(transitionRef.current);
    setDirection(dir);
    setPrevImg(activeImg);
    setActiveImg(newIdx);
    setTransitioning(true);
    transitionRef.current = setTimeout(() => { setPrevImg(null); setTransitioning(false); }, 420);
  };

  const handlePrev = () => navigate((activeImg - 1 + images.length) % images.length, 'prev');
  const handleNext = () => navigate((activeImg + 1) % images.length, 'next');

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>

        {/* ── Left: Image Gallery ───────────────────────────── */}
        <div className={styles.gallery}>
          <div className={styles.mainImageArea}>
            <div className={styles.badge}>AS — Aero</div>

            {/* Pit-free callout pill */}
            <div className={styles.pitFreePill}>
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 11 L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              </svg>
              No Pit Required
            </div>

            <div className={styles.mainImageFrame}>
              {prevImg !== null && (
                <Image
                  src={images[prevImg].src}
                  alt={images[prevImg].alt}
                  fill
                  className={styles.mainImage}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              )}
              <Image
                key={activeImg}
                src={images[activeImg].src}
                alt={images[activeImg].alt}
                fill
                className={[styles.mainImage, styles.imageIncoming, transitioning ? (direction === 'next' ? styles.slideNext : styles.slidePrev) : ''].join(' ')}
                sizes="(max-width: 900px) 100vw, 40vw"
                priority={activeImg === 0}
              />
              {/* Dev fallback */}
              <div className={styles.imageFallback} aria-hidden="true">
                <svg viewBox="0 0 60 120" fill="none" width="40" height="80">
                  {/* Very slim tall shaft */}
                  <rect x="22" y="4" width="16" height="108" rx="3" fill="#c86e6e" opacity="0.07"
                    stroke="#c86e6e" strokeWidth="1.5" />
                  {/* Glass panel lines */}
                  <line x1="28" y1="4" x2="28" y2="112" stroke="#c86e6e" strokeWidth="0.7" opacity="0.25" />
                  <line x1="34" y1="4" x2="34" y2="112" stroke="#c86e6e" strokeWidth="0.7" opacity="0.25" />
                  {/* Cabin */}
                  <rect x="24" y="44" width="12" height="24" rx="2" fill="#c86e6e" opacity="0.14"
                    stroke="#c86e6e" strokeWidth="1" opacity="0.35" />
                  {/* Floor — no pit */}
                  <line x1="8" y1="112" x2="52" y2="112" stroke="#c86e6e" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  {/* No-pit X mark below floor */}
                  <path d="M16 116 L20 120 M20 116 L16 120" stroke="#c86e6e" strokeWidth="1.2"
                    strokeLinecap="round" opacity="0.3" />
                </svg>
                <span>{images[activeImg].alt}</span>
              </div>
            </div>

            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={handlePrev} aria-label="Previous image">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={handleNext} aria-label="Next image">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.imageCounter}>{activeImg + 1} / {images.length}</div>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbnails}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ""}`}
                onClick={() => navigate(i, i > activeImg ? 'next' : 'prev')}
                aria-label={img.alt}
              >
                <Image src={img.src} alt={img.alt} fill className={styles.thumbImage} sizes="100px" />
                <div className={styles.thumbFallback} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Middle: Product Info ──────────────────────────── */}
        <div className={styles.info}>
          <div className={styles.infoInner}>
            <div>
              <h1 className={styles.title}>
                Aero <span className={styles.titleAccent}>Collection</span>
              </h1>
              <p className={styles.titleTagline}>No Pit. No Compromise.</p>
            </div>

            <div className={styles.descriptionBlock}>
              <p className={styles.description}>
                A slim-profile panoramic lift engineered to fit where others cannot.
                No pit required — Aero installs seamlessly into any home, combining
                radical space efficiency with an open, airy glass aesthetic. The lift that
                goes anywhere, without sacrificing anything.
              </p>
            </div>

            {/* Key facts */}
            <div className={styles.dimensions}>
              <p className={styles.dimensionsLabel}>Key Details</p>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Pit Requirement:</span>
                <span className={styles.dimValue}>None — fits anywhere</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Profile:</span>
                <span className={styles.dimValue}>Slim Design</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Cabin View:</span>
                <span className={styles.dimValue}>Panoramic</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Machine Options:</span>
                <span className={styles.dimValue}>Elite (European), Essential (Chinese/Japanese)</span>
              </div>
            </div>

            {/* Highlight banner */}
            <div className={styles.highlightBanner}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className={styles.highlightText}>
                Designed for retrofits and space-constrained homes — no structural modifications required.
              </p>
            </div>

            {/* Spec cards */}
            <div className={styles.specsGrid}>
              {specs.map((spec) => (
                <div key={spec.label} className={styles.specCard}>
                  <div className={styles.specIconWrapper}>{spec.icon}</div>
                  <p className={styles.specLabel}>{spec.label}</p>
                  <p className={styles.specValue}>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        

      </div>
    </section>
  );
}
