"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./AtelierCard.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const images = [
  { src: "/series/atelier.png", alt: "Atelier lift — bespoke interior view" },
  { src: "/series/atelier.png", alt: "Atelier lift — custom lighting detail" },
  { src: "/series/atelier.png", alt: "Atelier lift — LOP/COP panel close-up" },
  { src: "/series/atelier.png", alt: "Atelier lift — full shaft with custom finish" },
];

const customLevels = [
  {
    code: "L1",
    name: "Lighting",
    description: "Custom cabin lighting design",
    includes: ["Custom Lighting"],
  },
  {
    code: "L2",
    name: "Lighting + Panels",
    description: "Lighting with custom operating panels",
    includes: ["Custom Lighting", "LOP/COP"],
  },
  {
    code: "L3",
    name: "Lighting + Panels + Interior",
    description: "Panels with custom ceiling and flooring",
    includes: ["Custom Lighting", "LOP/COP", "Ceiling/Flooring"],
  },
  {
    code: "L4",
    name: "Full Custom",
    description: "Complete interior including shaft",
    includes: ["Custom Lighting", "LOP/COP", "Ceiling/Flooring", "Shaft"],
  },
  {
    code: "L5",
    name: "Signature",
    description: "1-on-1 session with our interior designer",
    includes: ["Custom Lighting", "LOP/COP", "Ceiling/Flooring", "Shaft", "Interior Designer"],
  },
];

const specs = [
  {
    label: "Customization",
    value: "5 Levels (L1–L5)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M20 6l2.8 8.4H31l-7 5.2 2.8 8.4L20 23l-6.8 5 2.8-8.4-7-5.2h8.2z"
          stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Process",
    value: "Bespoke Design",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M12 28l4-4 3 3 8-10" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="6" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M6 14h28" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <path d="M14 6v8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <path d="M26 6v8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      </svg>
    ),
  },
  {
    label: "Scope",
    value: "Full Interior",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M6 34V14l14-8 14 8v20H6z" stroke="currentColor" strokeWidth="2.2"
          strokeLinejoin="round" />
        <path d="M15 34v-9h10v9" stroke="currentColor" strokeWidth="2"
          strokeLinejoin="round" />
        <path d="M20 6v8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
];

const capacityOptions = ["320 kg", "450 kg", "620 kg", "800 kg", "1000 kg", "1200 kg"];

const machines = [
  { label: "Elite (European)", code: "EE" },
  { label: "Essential (Chinese/Japanese)", code: "EC" },
];

// ── Level includes stack visual ───────────────────────────────────────────────

const levelIcons: Record<string, JSX.Element> = {
  "Custom Lighting": (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
      <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1v1.5M8 12.5V14M1 7h1.5M12.5 7H14M3.1 3.1l1 1M11.9 11.9l1 1M3.1 10.9l1-1M11.9 4.1l1-1"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "LOP/COP": (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
      <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="6" r="1.2" fill="currentColor" opacity="0.5" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "Ceiling/Flooring": (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
      <path d="M2 4h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 4v8M11 4v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  "Shaft": (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
      <rect x="4" y="1" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 5.5h8M4 10.5h8" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.45" />
    </svg>
  ),
  "Interior Designer": (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
      <path d="M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function AtelierCard() {
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(3); // default L4
  const [selectedCapacity, setSelectedCapacity] = useState(1);
  const [travel, setTravel] = useState("");

  const productCode = `Inv-AT-${machines[selectedMachine].code}-${customLevels[selectedLevel].code}`;

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
            <div className={styles.badge}>AT — Atelier</div>
            <div className={styles.signaturePill}>Signature Collection</div>

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
                <svg viewBox="0 0 80 100" fill="none" width="54" height="68">
                  {/* Ornate lift shaft */}
                  <rect x="10" y="4" width="60" height="92" rx="4"
                    fill="#c8a96e" opacity="0.06" stroke="#c8a96e" strokeWidth="1.5" />
                  {/* Diamond pattern on shaft */}
                  <path d="M10 20 L40 10 L70 20" stroke="#c8a96e" strokeWidth="0.8" opacity="0.2" />
                  <path d="M10 40 L40 30 L70 40" stroke="#c8a96e" strokeWidth="0.8" opacity="0.15" />
                  <path d="M10 60 L40 50 L70 60" stroke="#c8a96e" strokeWidth="0.8" opacity="0.15" />
                  <path d="M10 80 L40 70 L70 80" stroke="#c8a96e" strokeWidth="0.8" opacity="0.1" />
                  {/* Cabin */}
                  <rect x="18" y="36" width="44" height="30" rx="3"
                    fill="#c8a96e" opacity="0.1" stroke="#c8a96e" strokeWidth="1.2" />
                  {/* Interior detail */}
                  <path d="M28 36 L28 66M52 36 L52 66" stroke="#c8a96e" strokeWidth="0.7" opacity="0.3" />
                  <path d="M18 51 L62 51" stroke="#c8a96e" strokeWidth="0.7" opacity="0.25" />
                  {/* Star/signature mark */}
                  <path d="M40 44 L41.4 48.2H45.8L42.2 50.8L43.6 55L40 52.4L36.4 55L37.8 50.8L34.2 48.2H38.6Z"
                    stroke="#c8a96e" strokeWidth="0.8" fill="#c8a96e" opacity="0.3" />
                </svg>
                <span>{images[activeImg].alt}</span>
              </div>
            </div>

            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={handlePrev} aria-label="Previous image">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={handleNext} aria-label="Next image">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
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
                Atelier <span className={styles.titleAccent}>Collection</span>
              </h1>
              <p className={styles.titleTagline}>Signature. Yours.</p>
            </div>

            <div className={styles.descriptionBlock}>
              <p className={styles.description}>
                Fully customizable across five levels of refinement — from bespoke lighting
                through to a signature 1-on-1 session with an interior designer. Atelier is
                not a product; it's a commission. Every element, every finish, every detail
                is shaped around you.
              </p>
            </div>

            {/* Customization levels visual ladder */}
            <div className={styles.levelsBlock}>
              <p className={styles.levelsLabel}>Customization Levels</p>
              <div className={styles.levelsList}>
                {customLevels.map((level, i) => (
                  <div key={level.code} className={styles.levelRow}>
                    <div className={styles.levelCodeBadge}>{level.code}</div>
                    <div className={styles.levelContent}>
                      <p className={styles.levelName}>{level.name}</p>
                      <div className={styles.levelIncludes}>
                        {level.includes.map((item) => (
                          <span key={item} className={styles.levelIncludeTag}>
                            <span className={styles.levelIncludeIcon}>{levelIcons[item]}</span>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    {i < customLevels.length - 1 && (
                      <div className={styles.levelConnector} />
                    )}
                  </div>
                ))}
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
