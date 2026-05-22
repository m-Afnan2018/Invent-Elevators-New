"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./OrbitCard.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const images = [
  { src: "/series/orbit.png", alt: "Orbit lift — full round exterior view" },
  { src: "/series/atelier.png", alt: "Orbit lift — glass cabin interior" },
  { src: "/series/aero-slim.png", alt: "Orbit lift — aluminium shaft detail" },
  { src: "/series/horizon.png", alt: "Orbit lift — installed in home" },
];

const specs = [
  {
    label: "Shaft",
    value: "Steel or Aluminium",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="10" y="4" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 14h20M10 22h20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="15" y="16" width="10" height="8" rx="1" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Cabin Shape",
    value: "Round / Curvature",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    label: "Colors",
    value: "All RAL Colors",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M20 6a14 14 0 0 1 0 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20 6a14 14 0 0 0 0 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="3.5" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
];

const capacityOptions = ["320 kg", "450 kg", "620 kg", "800 kg", "1000 kg", "1200 kg"];

const variants = [
  { name: "Glass Cabin", code: "GL" },
  { name: "Fibre Sheet", code: "FS" },
];

const machines = [
  { label: "Elite (European)", code: "EE" },
  { label: "Essential (Chinese/Japanese)", code: "EC" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function OrbitCard() {
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(1);
  const [travel, setTravel] = useState("");
  const [ralColor, setRalColor] = useState("");

  const productCode = `Inv-OB-${machines[selectedMachine].code}-${variants[selectedVariant].code}`;

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
            <div className={styles.badge}>OB — Orbit</div>

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
                <svg viewBox="0 0 100 100" fill="none" width="72" height="72">
                  {/* outer round shaft */}
                  <circle cx="50" cy="50" r="42" stroke="#a8c86e" strokeWidth="1.5" opacity="0.3" />
                  <circle cx="50" cy="50" r="34" stroke="#a8c86e" strokeWidth="1" opacity="0.2" />
                  {/* cabin circle */}
                  <circle cx="50" cy="50" r="24" fill="#a8c86e" opacity="0.08" stroke="#a8c86e" strokeWidth="1.5" opacity="0.35" />
                  {/* glass panes */}
                  <path d="M50 26 L50 74" stroke="#a8c86e" strokeWidth="0.8" opacity="0.25" />
                  <path d="M29 38 L71 62" stroke="#a8c86e" strokeWidth="0.8" opacity="0.25" />
                  <path d="M29 62 L71 38" stroke="#a8c86e" strokeWidth="0.8" opacity="0.25" />
                  <circle cx="50" cy="50" r="4" fill="#a8c86e" opacity="0.3" />
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
              Orbit <span className={styles.titleAccent}>Collection</span>
            </h1>

            <div className={styles.descriptionBlock}>
              <p className={styles.description}>
                A round lift with a steel or aluminium shaft and a curvature cabin.
                Choose between a glass cabin for luminous transparency or a fibre sheet
                cabin for a sculpted, opaque finish. Available across the full RAL color
                spectrum — Orbit makes the lift a centrepiece, not an afterthought.
              </p>
            </div>

            {/* Key details */}
            <div className={styles.dimensions}>
              <p className={styles.dimensionsLabel}>Key Details</p>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Shaft Options:</span>
                <span className={styles.dimValue}>Steel or Aluminium</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Cabin Shape:</span>
                <span className={styles.dimValue}>Round / Curvature</span>
              </div>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Cabin Variants:</span>
                <span className={styles.dimValue}>Glass (GL), Fibre Sheet (FS)</span>
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
