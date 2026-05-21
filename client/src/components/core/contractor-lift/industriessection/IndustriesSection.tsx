"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IndustriesSection.module.css";

const INDUSTRIES = [
  {
    title: "Site Inspection",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  <circle
    cx="28"
    cy="28"
    r="10"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <line
    x1="36"
    y1="36"
    x2="46"
    y2="46"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <rect
    x="16"
    y="14"
    width="20"
    height="32"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <line
    x1="26"
    y1="18"
    x2="26"
    y2="42"
    stroke="currentColor"
    strokeWidth="2"
    strokeDasharray="3 3"
  />
</svg>
    ),
  },
  {
    title: "Technical Consultation",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  <rect
    x="14"
    y="12"
    width="36"
    height="40"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <circle
    cx="32"
    cy="24"
    r="5"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <path
    d="M24 40C24 35.5 27.5 32 32 32C36.5 32 40 35.5 40 40"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <line
    x1="50"
    y1="18"
    x2="56"
    y2="18"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <line
    x1="50"
    y1="28"
    x2="56"
    y2="28"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />
</svg>
    ),
  },
  {
    title: "Planning & Design",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  <rect
    x="14"
    y="12"
    width="36"
    height="40"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <line
    x1="22"
    y1="20"
    x2="42"
    y2="20"
    stroke="currentColor"
    strokeWidth="2"
  />

  <line
    x1="22"
    y1="28"
    x2="42"
    y2="28"
    stroke="currentColor"
    strokeWidth="2"
  />

  <line
    x1="22"
    y1="36"
    x2="34"
    y2="36"
    stroke="currentColor"
    strokeWidth="2"
  />

  <path
    d="M48 46L56 54"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <circle
    cx="44"
    cy="42"
    r="8"
    stroke="currentColor"
    strokeWidth="2.5"
  />
</svg>
    ),
  },
  {
    title: "Installation Coordination",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  <rect
    x="20"
    y="10"
    width="24"
    height="44"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <rect
    x="26"
    y="18"
    width="12"
    height="20"
    rx="1"
    stroke="currentColor"
    strokeWidth="2"
  />

  <path
    d="M10 20L20 20"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <path
    d="M44 20L54 20"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <path
    d="M32 54V60"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />
</svg>
    ),
  },
  {
    title: "Testing & Handover",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  <rect
    x="18"
    y="10"
    width="28"
    height="44"
    rx="2"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <circle
    cx="32"
    cy="24"
    r="6"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  <path
    d="M28 24L31 27L36 21"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <line
    x1="24"
    y1="40"
    x2="40"
    y2="40"
    stroke="currentColor"
    strokeWidth="2"
  />
</svg>
    ),
  },
  {
    title: "Maintenance & Support",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
      <rect
        x="18"
        y="10"
        width="28"
        height="44"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    
      <circle
        cx="32"
        cy="32"
        r="6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    
      <path
        d="M32 20V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    
      <path
        d="M32 50V44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    
      <path
        d="M20 32H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    
      <path
        d="M50 32H44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    ),
  },
  {
    title: "24/7 Emergency Assistance",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
  {/* Headset */}
  <path
    d="M22 30C22 22 26 18 32 18C38 18 42 22 42 30"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <path
    d="M18 30V38"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <path
    d="M46 30V38"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  {/* 24 */}
  {/* 24 */}
<text
  x="15"
  y="52"
  fill="currentColor"
  fontSize="12"
  fontWeight="700"
  fontFamily="Arial"
>
  24
</text>

{/* Slash */}
<line
  x1="32"
  y1="54"
  x2="37"
  y2="42"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
/>

{/* 7 */}
<text
  x="42"
  y="52"
  fill="currentColor"
  fontSize="12"
  fontWeight="700"
  fontFamily="Arial"
>
  7
</text>
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
        <h2 className={styles.heading}>End To End Support</h2>
      </div>

      <p className={styles.subheading}>
      Complete lift solutions from consultation and installation to maintenance and support.
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