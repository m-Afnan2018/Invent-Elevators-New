"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./HorizonCard.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const images = [
  { src: "/series/horizon.png", alt: "Horizon lift — full panoramic view" },
  { src: "/series/aero-slim.png", alt: "Horizon lift — glass cabin interior" },
  { src: "/series/orbit.png", alt: "Horizon lift — steel shaft detail" },
  { src: "/series/heritage.png", alt: "Horizon lift — installed in home" },
];

const specs = [
  {
    label: "Shaft",
    value: "Steel Shaft",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="10" y="4" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 14h20M10 22h20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="15" y="16" width="10" height="8" rx="1" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Cabin",
    value: "Full Glass Car",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="8" y="8" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M14 8v28M26 8v28" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <path d="M8 20h24" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Colors",
    value: "All RAL Colors",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2" />
        <path d="M20 7v26M7 20h26" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
        <circle cx="20" cy="20" r="4.5" fill="currentColor" opacity="0.22" />
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

export default function HorizonCard() {
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(1);
  const [travel, setTravel] = useState("");
  const [ralColor, setRalColor] = useState("");

  // Horizon has no sub-variant — code is just machine
  const productCode = `Inv-HZ-${machines[selectedMachine].code}`;

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
            <div className={styles.badge}>HZ — Horizon</div>

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
                <svg viewBox="0 0 80 100" fill="none" width="52" height="68">
                  {/* Panoramic glass shaft */}
                  <rect x="18" y="4" width="44" height="92" rx="3" fill="#6ea8c8" opacity="0.08" stroke="#6ea8c8" strokeWidth="1.5" />
                  {/* vertical glass lines */}
                  <line x1="30" y1="4" x2="30" y2="96" stroke="#6ea8c8" strokeWidth="0.8" opacity="0.25" />
                  <line x1="42" y1="4" x2="42" y2="96" stroke="#6ea8c8" strokeWidth="0.8" opacity="0.25" />
                  <line x1="54" y1="4" x2="54" y2="96" stroke="#6ea8c8" strokeWidth="0.8" opacity="0.25" />
                  {/* cabin box */}
                  <rect x="22" y="36" width="36" height="28" rx="2" fill="#6ea8c8" opacity="0.15" />
                  <rect x="22" y="36" width="36" height="28" rx="2" stroke="#6ea8c8" strokeWidth="1.2" opacity="0.4" />
                  {/* horizon line */}
                  <line x1="8" y1="50" x2="72" y2="50" stroke="#6ea8c8" strokeWidth="1.5" opacity="0.2" />
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
            <h1 className={styles.title}>
              Horizon <span className={styles.titleAccent}>Collection</span>
            </h1>

            <div className={styles.descriptionBlock}>
              <p className={styles.description}>
                A panoramic lift with a steel shaft and an all-glass cabin car. Horizon opens
                up your home's vertical journey — luminous, transparent, and available in the
                full RAL color spectrum. Where architecture meets elevation.
              </p>
            </div>

            {/* Dimensions / key facts */}
            <div className={styles.dimensions}>
              <p className={styles.dimensionsLabel}>Key Details</p>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Shaft Type:</span>
                <span className={styles.dimValue}>Steel Shaft</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Cabin:</span>
                <span className={styles.dimValue}>Full Glass Car</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Color Options:</span>
                <span className={styles.dimValue}>All RAL Colors</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Machine Options:</span>
                <span className={styles.dimValue}>Elite (European), Essential (Chinese/Japanese)</span>
              </div>
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
