"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./TypesGrid.module.css";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  '/series/heritage.png',
  '/series/horizon.png',
  '/series/orbit.png',
  '/series/aero-slim.png',
];

const DESCRIPTIONS = [
  "Built for RCC shafts — the permanent choice for residential towers and landmark developments.",
  "Full-glass cabin car for MS shafts. Transforms vertical travel into a design statement.",
  "Panoramic curved cabin for round shafts — the architect's choice for centrepiece lifts.",
  "Pit-free, slim panoramic lift. Minimal footprint, maximum presence.",
];

const DESIGN_OPTIONS = ["Select", "Signature", "Bespoke"];
const SERIES_ANCHORS = ["heritage", "horizon", "orbit", "aero"];

const TYPING_SPEED = 28;

export default function TypesGrid({ series = [] }) {
  const items = series.slice(0, 4);

  /* ── Desktop hover typewriter ── */
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setTypedText("");

    if (hoveredIndex === null) { setShowCursor(false); return; }

    const full = DESCRIPTIONS[hoveredIndex] ?? "";
    let pos = 0;
    setShowCursor(true);

    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        pos += 1;
        setTypedText(full.slice(0, pos));
        if (pos >= full.length) {
          clearInterval(intervalRef.current);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, TYPING_SPEED);
    }, 180);

    return () => { clearTimeout(startDelay); clearInterval(intervalRef.current); };
  }, [hoveredIndex]);

  /* ── Mobile per-cell typewriter ── */
  const [isTouch, setIsTouch] = useState(false);
  const [mobileTyped, setMobileTyped] = useState(["", "", "", ""]);
  const [mobileCursors, setMobileCursors] = useState([false, false, false, false]);
  const cellRefs = useRef([]);
  const typedCells = useRef(new Set());

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!isTouch) return;

    const observers = [];

    cellRefs.current.forEach((cell, cellIdx) => {
      if (!cell) return;
      const desc = DESCRIPTIONS[cellIdx] ?? "";

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || typedCells.current.has(cellIdx)) return;
          typedCells.current.add(cellIdx);

          let pos = 0;
          setMobileCursors(prev => prev.map((v, j) => j === cellIdx ? true : v));

          const iv = setInterval(() => {
            pos++;
            setMobileTyped(prev => prev.map((v, j) => j === cellIdx ? desc.slice(0, pos) : v));
            if (pos >= desc.length) {
              clearInterval(iv);
              setTimeout(() => {
                setMobileCursors(prev => prev.map((v, j) => j === cellIdx ? false : v));
              }, 800);
            }
          }, TYPING_SPEED);
        },
        { threshold: 0.45 }
      );

      observer.observe(cell);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isTouch]);

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
              ref={el => cellRefs.current[i] = el}
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

                {/* Extra info */}
                <div className={styles.hoverInfo}>
                  <p className={styles.typewriterText}>
                    {isTouch ? mobileTyped[i] : typedText}
                    {(isTouch ? mobileCursors[i] : showCursor) && <span className={styles.cursor} />}
                  </p>

                  <div className={styles.tiers}>
                    <Link href={`/series#${SERIES_ANCHORS[i]}`} className={styles.tier}>Essentials</Link>
                    <span className={styles.tierDivider}>/</span>
                    <Link href={`/series#${SERIES_ANCHORS[i]}`} className={styles.tier}>Elite</Link>
                  </div>

                  <div className={styles.designOptions}>
                    {DESIGN_OPTIONS.map((opt) => (
                      <Link key={opt} href={`/series#${SERIES_ANCHORS[i]}`} className={styles.designOpt}>{opt}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
