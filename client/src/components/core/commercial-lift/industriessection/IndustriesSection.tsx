"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IndustriesSection.module.css";

const INDUSTRIES = [
  {
    title: "Corporate Offices",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="48" height="46" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <line x1="8" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth="2.5" />
        <line x1="32" y1="10" x2="32" y2="56" stroke="currentColor" strokeWidth="2.5" />
        <rect x="16" y="32" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="40" y="32" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="40" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="24" y="44" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Hotels & Resorts",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 56V16L32 6L56 16V56" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="22" y="36" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="42" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
        <line x1="32" y1="36" x2="32" y2="56" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Shopping Malls",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 24L20 8H44L56 24V56H8V24Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="8" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth="2.5" />
        <rect x="22" y="34" width="20" height="22" rx="1" stroke="currentColor" strokeWidth="2" />
        <line x1="32" y1="34" x2="32" y2="56" stroke="currentColor" strokeWidth="2" />
        <path d="M26 14C26 14 24 20 32 20C40 20 38 14 38 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Schools & Colleges",
    icon: (
      <svg
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* <!-- School Roof --> */}
  <path
    d="M6 24L32 10L58 24"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* <!-- Main Building --> */}
  <rect
    x="10"
    y="24"
    width="44"
    height="30"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  {/* <!-- Center Door --> */}
  <rect
    x="27"
    y="38"
    width="10"
    height="16"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  {/* <!-- Left Windows --> */}
  <rect
    x="16"
    y="32"
    width="7"
    height="7"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  <rect
    x="16"
    y="43"
    width="7"
    height="7"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  {/* <!-- Right Windows --> */}
  <rect
    x="41"
    y="32"
    width="7"
    height="7"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  <rect
    x="41"
    y="43"
    width="7"
    height="7"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  {/* <!-- Flag Pole --> */}
  <line
    x1="32"
    y1="10"
    x2="32"
    y2="2"
    stroke="currentColor"
    strokeWidth="2"
  />

  {/* <!-- Flag --> */}
  <path
    d="M32 3H42L39 8L42 13H32"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />

  {/* <!-- Ground --> */}
  <line
    x1="6"
    y1="54"
    x2="58"
    y2="54"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  />
</svg>
    ),
  },
  {
    title: "Hospitals",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="48" height="42" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M22 8H42V18H22V8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="32" y1="28" x2="32" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="14" y="42" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="40" y="42" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Warehouses",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 28L32 8L60 28V58H4V28Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="4" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="2.5" />
        <rect x="14" y="36" width="12" height="22" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="38" y="36" width="12" height="22" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="36" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
        <line x1="32" y1="8" x2="32" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    title: "Residential Towers",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="4" width="32" height="56" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="22" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="36" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="22" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="36" y="22" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="34" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="36" y="34" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="46" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="60" x2="56" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function IndustriesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % INDUSTRIES.length;
      const card = grid.children[nextIndex] as HTMLElement;
      const cardWidth = card.offsetWidth + 20;
      grid.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" });
      setActiveIndex(nextIndex);
    }, 3500);

    const handleScroll = () => {
      const cardWidth = (grid.children[0] as HTMLElement).offsetWidth + 20;
      const index = Math.round(grid.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    grid.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      grid.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>Industries We Serve</h2>
      </div>

      <p className={styles.subheading}>
        Commercial lift solutions designed for modern business environments.
      </p>

      <div className={styles.grid} ref={gridRef}>
        {INDUSTRIES.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.iconWrap}>
              {item.icon}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {INDUSTRIES.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              activeIndex === index ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}