"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./TypesGrid.module.css";
import Image from "next/image";
import Link from "next/link";

/* ── Fallbacks when category data doesn't supply a value ── */
const FALLBACK_IMAGES = [
  '/series/heritage.png',
  '/series/horizon.png',
  '/series/orbit.png',
  '/series/aero-slim.png',
];
const FALLBACK_DESCRIPTIONS = [
  "Built for RCC shafts — the permanent choice for residential towers and landmark developments.",
  "Full-glass cabin car for MS shafts. Transforms vertical travel into a design statement.",
  "Panoramic curved cabin for round shafts — the architect's choice for centrepiece lifts.",
  "Pit-free, slim panoramic lift. Minimal footprint, maximum presence.",
];
const FALLBACK_ANCHORS = ["heritage", "horizon", "orbit", "aero"];
const DESIGN_OPTIONS   = ["Select", "Signature", "Bespoke"];
const TYPING_SPEED     = 28;

export default function TypesGrid({ series = [] }) {
  const items = series.slice(0, 4);

  /* Derived arrays — prop data first, fallback by index */
  const bgImages     = useMemo(() => items.map((it, i) => it.url      || FALLBACK_IMAGES[i]       || ''), [items]);
  const descriptions = useMemo(() => items.map((it, i) => it.subtitle || FALLBACK_DESCRIPTIONS[i] || ''), [items]);
  const anchors      = useMemo(() => items.map((it, i) => it.link     || FALLBACK_ANCHORS[i]      || it.name?.toLowerCase().replace(/\s+/g, '-') || '#'), [items]);

  /* ref so IO callbacks always see latest descriptions even after async load */
  const descRef = useRef(descriptions);
  descRef.current = descriptions;

  /* ── Desktop hover typewriter ── */
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [typedText,    setTypedText]    = useState("");
  const [showCursor,   setShowCursor]   = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setTypedText("");
    if (hoveredIndex === null) { setShowCursor(false); return; }

    const full = descriptions[hoveredIndex] ?? "";
    let pos = 0;
    setShowCursor(true);

    const delay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        pos++;
        setTypedText(full.slice(0, pos));
        if (pos >= full.length) {
          clearInterval(intervalRef.current);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, TYPING_SPEED);
    }, 180);

    return () => { clearTimeout(delay); clearInterval(intervalRef.current); };
  }, [hoveredIndex, descriptions]);

  /* ── Mobile per-cell typewriter ── */
  const [isTouch,       setIsTouch]       = useState(false);
  const [mobileTyped,   setMobileTyped]   = useState(["", "", "", ""]);
  const [mobileCursors, setMobileCursors] = useState([false, false, false, false]);
  const cellRefs   = useRef([]);
  const typedCells = useRef(new Set());

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  /* Re-run when touch detected OR when items populate (categories async load) */
  useEffect(() => {
    if (!isTouch || items.length === 0) return;

    typedCells.current = new Set();
    const observers = [];

    cellRefs.current.forEach((cell, idx) => {
      if (!cell) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || typedCells.current.has(idx)) return;
          typedCells.current.add(idx);

          const desc = descRef.current[idx] ?? "";
          let pos = 0;
          setMobileCursors(prev => prev.map((v, j) => j === idx ? true : v));

          const iv = setInterval(() => {
            pos++;
            setMobileTyped(prev => prev.map((v, j) => j === idx ? desc.slice(0, pos) : v));
            if (pos >= desc.length) {
              clearInterval(iv);
              setTimeout(() => setMobileCursors(prev => prev.map((v, j) => j === idx ? false : v)), 800);
            }
          }, TYPING_SPEED);
        },
        { threshold: 0.45 }
      );
      observer.observe(cell);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isTouch, items.length]);

  return (
    <section className={`${styles.section} ${styles.typesSection}`}>
      <div className={styles.heading}>
        <h2 className="headings">Our Series of Home Lifts</h2>
      </div>

      {/* Background images from category data */}
      {bgImages.map((src, i) => src && (
        <Image
          key={`${src}-${i}`}
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
          const anchor   = anchors[i];
          const bgSrc    = bgImages[i] || '';

          return (
            <div
              key={item._id || i}
              ref={el => { cellRefs.current[i] = el; }}
              className={`${styles.cell} ${isActive ? styles.cellActive : ""} ${isDimmed ? styles.cellDimmed : ""}`}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.cellImg}>
                {bgSrc && <Image src={bgSrc} alt={item.name} fill sizes="100vw" style={{ objectFit: "cover" }} />}
                <div className={styles.cellImgOverlay} />
              </div>

              <div className={styles.cellContent} onMouseEnter={() => setHoveredIndex(i)}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.sub}>{item.subtitle || ""}</p>

                <div className={styles.hoverInfo}>
                  <p className={styles.typewriterText}>
                    {isTouch ? mobileTyped[i] : typedText}
                    {(isTouch ? mobileCursors[i] : showCursor) && <span className={styles.cursor} />}
                  </p>

                  {/* <div className={styles.tiers}>
                    <Link href={`/series#${anchor}`} className={styles.tier}>Essentials</Link>
                    <span className={styles.tierDivider}>/</span>
                    <Link href={`/series#${anchor}`} className={styles.tier}>Elite</Link>
                  </div>

                  <div className={styles.designOptions}>
                    {DESIGN_OPTIONS.map((opt) => (
                      <Link key={opt} href={`/series#${anchor}`} className={styles.designOpt}>{opt}</Link>
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
