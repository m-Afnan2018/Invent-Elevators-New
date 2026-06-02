"use client";
import { useState, useMemo } from "react";
import styles from "./TypesGrid.module.css";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGES = [
  "/series/heritage.png",
  "/series/horizon.png",
  "/series/orbit.png",
  "/series/aero-slim.png",
];
const FALLBACK_DESCRIPTIONS = [
  "Built for RCC shafts — the permanent choice for residential towers and landmark developments.",
  "Full-glass cabin car for MS shafts. Transforms vertical travel into a design statement.",
  "Panoramic curved cabin for round shafts — the architect's choice for centrepiece lifts.",
  "Pit-free, slim panoramic lift. Minimal footprint, maximum presence.",
];
const FALLBACK_ANCHORS = ["heritage", "horizon", "orbit", "aero"];

export default function TypesGrid({ series = [] }) {
  const seriesKey = series.map(s => s._id || s.name).join(",");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => series.slice(0, 4), [seriesKey]);

  const bgImages     = useMemo(() => items.map((it, i) => it.url      || FALLBACK_IMAGES[i]       || ""), [items]);
  const descriptions = useMemo(() => items.map((it, i) => it.description || it.subtitle || FALLBACK_DESCRIPTIONS[i] || ""), [items]);
  const anchors      = useMemo(() => items.map((it, i) => it.link     || FALLBACK_ANCHORS[i]      || it.name?.toLowerCase().replace(/\s+/g, "-") || "#"), [items]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={[styles.section, styles.typesSection].join(' ')}>
      <div className={styles.heading}>
        <h2 className="headings">Our Series of Home Lifts</h2>
      </div>

      {bgImages.map((src, i) => src && (
        <Image
          key={`bg-${i}`}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={[styles.bgImage, hoveredIndex === i ? styles.imageActive : ''].join(' ').trim()}
          style={{ objectFit: "cover" }}
          priority={i === 0}
        />
      ))}

      <div className={[styles.row, hoveredIndex !== null ? styles.rowHovered : ''].join(' ').trim()}>
        {items.map((item, i) => {
          const isActive = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && !isActive;
          const anchor   = anchors[i];
          const bgSrc    = bgImages[i] || "";

          return (
            <Link
              key={item._id || i}
              href={`/series/${anchor}`}
              className={[styles.cell, isActive ? styles.cellActive : '', isDimmed ? styles.cellDimmed : ''].join(' ').trim()}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.cellImg}>
                {bgSrc && (
                  <Image
                    src={bgSrc}
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div className={styles.cellImgOverlay} />
              </div>

              <div
                className={styles.cellContent}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <p className={styles.name}>{item.name}</p>
                <p className={styles.sub}>{item.subtitle || ""}</p>
                <div className={styles.hoverInfo}>
                  <p className={styles.descText}>{descriptions[i]}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
