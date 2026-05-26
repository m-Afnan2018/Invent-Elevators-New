"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import styles from "./WhereHorizonFitsBest.module.css";

const DEFAULT_APPLICATIONS = [
  { label: "Luxury Villas",            image: "/images/solutions/duplex.jpg" },
  { label: "Duplex Apartments",        image: "/images/solutions/accessibility.jpg" },
  { label: "Architectural Residences", image: "/images/solutions/glass.jpg" },
  { label: "Penthouses",               image: "/images/solutions/penthouse.jpg" },
];

function normalizeOffset(offset, halfWidth) {
  offset = offset % halfWidth;
  if (offset > 0) offset -= halfWidth;
  return offset;
}

export default function WhereHorizonFitsBest({ seriesName = "This Series", applications }) {
  const items = applications ?? DEFAULT_APPLICATIONS;
  const doubled = [...items, ...items];

  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const hoverRef = useRef(false);

  const SPEED = 0.6;

  const tick = useCallback(() => {
    if (!dragRef.current.active && !hoverRef.current) {
      offsetRef.current -= SPEED;
      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current = normalizeOffset(offsetRef.current, halfWidth);
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const startDrag = (clientX) => {
    dragRef.current = { active: true, startX: clientX, startOffset: offsetRef.current };
    if (outerRef.current) outerRef.current.style.cursor = "grabbing";
  };

  const moveDrag = (clientX) => {
    if (!dragRef.current.active) return;
    const dx = clientX - dragRef.current.startX;
    let newOffset = dragRef.current.startOffset + dx;
    if (trackRef.current) {
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (halfWidth > 0) newOffset = normalizeOffset(newOffset, halfWidth);
    }
    offsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newOffset}px)`;
    }
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (outerRef.current) outerRef.current.style.cursor = "grab";
  };

  const onMouseEnter = () => { hoverRef.current = true; };
  const onMouseLeaveOuter = () => { endDrag(); hoverRef.current = false; };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Applications</p>
          <h2 className={styles.heading}>
            Where {seriesName}<br />Fits Best
          </h2>
          <Link href="/projects" className={styles.galleryBtn}>
            View Gallery
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div
          ref={outerRef}
          className={styles.gridOuter}
          onMouseEnter={onMouseEnter}
          onMouseDown={(e) => startDrag(e.clientX)}
          onMouseMove={(e) => moveDrag(e.clientX)}
          onMouseUp={endDrag}
          onMouseLeave={onMouseLeaveOuter}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
          onTouchEnd={endDrag}
        >
          <div ref={trackRef} className={styles.track}>
            {doubled.map((cat, i) => (
              <div key={`${cat.label}-${i}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="210px"
                    draggable={false}
                    className={styles.image}
                  />
                  <div className={styles.imgOverlay} />
                </div>
                <p className={styles.cardLabel}>{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
