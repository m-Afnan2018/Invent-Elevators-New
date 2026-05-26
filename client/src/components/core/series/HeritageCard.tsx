"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./HeritageCard.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const images = [
  { src: "/series/heritage.png", alt: "Heritage lift — exterior view" },
  { src: "/series/aero-slim.png", alt: "Heritage lift — cabin interior" },
  { src: "/series/horizon.png", alt: "Heritage lift — door detail" },
  { src: "/series/orbit.png", alt: "Heritage lift — installed view" },
];

const specs = [
  {
    label: "Select Cabin",
    value: "Silver Mirror, Solid Door, Hand Rail",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="10" y="4" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 14h20M10 22h20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="15" y="16" width="10" height="8" rx="1" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Signature Cabin",
    value: "Bronze / Champagne Gold / Black, Glass Door",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M20 6l10 8v12l-10 8-10-8V14z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M20 6v28M10 14l10 8 10-8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Bespoke Cabin",
    value: "Fully Custom, Touch Screen COP/LOP",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2" />
        <path d="M20 7v26M7 20h26" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
];

const capacityOptions = ["320 kg", "450 kg", "620 kg", "800 kg", "1000 kg", "1200 kg"];

const variants = [
  { name: "Select", code: "L1" },
  { name: "Signature", code: "L2" },
  { name: "Bespoke", code: "L3" },
];

const machines = [
  { label: "Essential (Global Model)", code: "T1" },
  { label: "Elite (European)", code: "T2" },
];

const tiers = [
  {
    label: "Essential",
    code: "T1",
    value: "Global Model Motor, Standard Door Drive & Guiderail",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="2.2" />
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4M7.5 7.5l2.8 2.8M29.7 29.7l2.8 2.8M7.5 32.5l2.8-2.8M29.7 10.3l2.8-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Elite",
    code: "T2",
    value: "European Motor, European Door Drive & Guiderail",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M20 6l3.09 9.51H33l-8.09 5.88 3.09 9.51L20 26.02l-8 4.88 3.09-9.51L7 15.51h9.91z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      </svg>
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeritageCard() {
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(1); // default 450 kg
  const [travel, setTravel] = useState("");

  const productCode = `Inv-HT-${machines[selectedMachine].code}-${variants[selectedVariant].code}`;

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
            {/* Collection badge */}
            <div className={styles.badge}>HT — Heritage</div>

            {/* Main image */}
            <div className={styles.mainImageFrame}>
              {prevImg !== null && (
                <Image
                  src={images[prevImg].src}
                  alt={images[prevImg].alt}
                  fill
                  className={styles.mainImage}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              )}
              <Image
                key={activeImg}
                src={images[activeImg].src}
                alt={images[activeImg].alt}
                fill
                className={[styles.mainImage, styles.imageIncoming, transitioning ? (direction === 'next' ? styles.slideNext : styles.slidePrev) : ''].join(' ')}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={activeImg === 0}
              />
              {/* Fallback overlay shown when image is missing in dev */}
              <div className={styles.imageFallback} aria-hidden="true">
                <svg viewBox="0 0 80 100" fill="none" width="56" height="70">
                  <rect x="14" y="4" width="52" height="92" rx="3" fill="#c8a96e" opacity="0.08" stroke="#c8a96e" strokeWidth="1.5" />
                  <rect x="22" y="4" width="4" height="92" rx="2" fill="#c8a96e" opacity="0.15" />
                  <rect x="54" y="4" width="4" height="92" rx="2" fill="#c8a96e" opacity="0.15" />
                  <rect x="28" y="42" width="24" height="16" rx="2" fill="#c8a96e" opacity="0.18" />
                  <path d="M40 42v-10M34 36l6-6 6 6" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
                <span>{images[activeImg].alt}</span>
              </div>
            </div>

            {/* Nav buttons */}
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

            {/* Counter */}
            <div className={styles.imageCounter}>
              {activeImg + 1} / {images.length}
            </div>
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
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.thumbImage}
                  sizes="100px"
                />
                <div className={styles.thumbFallback} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Middle: Product Info ──────────────────────────── */}
        <div className={styles.info}>
          <div className={styles.infoInner}>
            <h1 className={styles.title}>
              Heritage <span className={styles.titleAccent}>Collection</span>
            </h1>

            <div className={styles.descriptionBlock}>
              <p className={styles.description}>
                A standard cabin lift built inside your existing RCC or masonry shaft.
                Heritage combines structural reliability with refined aesthetics — choose your
                Technical Tier (Essential or Elite) and Design Level (Select, Signature, or Bespoke)
                to match your building's requirements and your interior vision.
              </p>
            </div>

            {/* Dimensions */}
            <div className={styles.dimensions}>
              <p className={styles.dimensionsLabel}>Dimensions</p>
              <div className={styles.dimensionRow}>
                <span className={styles.dimLabel}>Shaft Type:</span>
                <span className={styles.dimValue}>Client's RCC / Masonry Shaft</span>
              </div>
            </div>

            {/* Tier Boxes */}
            <div className={styles.tiersGrid}>
              {tiers.map((tier) => (
                <div key={tier.code} className={styles.specCard}>
                  <div className={styles.specIconWrapper}>{tier.icon}</div>
                  <p className={styles.specLabel}>{tier.label} <span style={{ opacity: 0.5, fontSize: '0.85em' }}>({tier.code})</span></p>
                  <p className={styles.specValue}>{tier.value}</p>
                </div>
              ))}
            </div>

            {/* Cabin Style Boxes */}
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

        {/* ── Right: Configurator ───────────────────────────── */}
        {/* <div className={styles.configurator}>
          <p className={styles.configuratorEyebrow}>Configure Your Lift</p>
          <h2 className={styles.configuratorTitle}>Heritage Collection</h2>

          
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Machine Type</label>
            <div className={styles.machineRow}>
              {machines.map((m, i) => (
                <button
                  key={m.code}
                  className={`${styles.selectBtn} ${selectedMachine === i ? styles.selectBtnActive : ""}`}
                  onClick={() => setSelectedMachine(i)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Variant</label>
            <div className={styles.variantList}>
              {variants.map((v, i) => (
                <button
                  key={v.code}
                  className={`${styles.variantBtn} ${selectedVariant === i ? styles.variantBtnActive : ""}`}
                  onClick={() => setSelectedVariant(i)}
                >
                  <span className={styles.variantDot} data-variant={v.code} />
                  <span className={styles.variantName}>{v.name}</span>
                  <span className={styles.variantCode}>{v.code}</span>
                </button>
              ))}
            </div>
          </div>

          
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Capacity</label>
            <div className={styles.capacityGrid}>
              {capacityOptions.map((c, i) => (
                <button
                  key={c}
                  className={`${styles.capacityBtn} ${selectedCapacity === i ? styles.capacityBtnActive : ""}`}
                  onClick={() => setSelectedCapacity(i)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Travel</label>
            <input
              type="text"
              className={styles.travelInput}
              value={travel}
              onChange={(e) => setTravel(e.target.value)}
              placeholder="e.g. G+3, B+G+2, B2+G+5"
            />
          </div>

          
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockLeft}>
              <p className={styles.codeBlockLabel}>Product Code</p>
              <p className={styles.codeBlockValue}>{productCode}</p>
            </div>
            <button
              className={styles.copyBtn}
              onClick={() => navigator.clipboard?.writeText(productCode)}
            >
              Copy
            </button>
          </div>

          <button className={styles.quoteBtn}>Request a Quote</button>
        </div>*/}

      </div>
    </section>
  );
}
