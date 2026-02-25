"use client";

import { useState, useRef } from "react";
import styles from "./ProductsCarousel.module.css";

const products = [
  {
    id: 1,
    title: "Hydraulic Cargo Lift",
    description:
      "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    image: "/images/product-hydraulic-cargo.jpg",
    href: "/products/hydraulic-cargo-lift",
  },
  {
    id: 2,
    title: "Four Post Car Lift",
    description:
      "Robust vehicle lifting solution ideal for automobile workshops, service stations, and parking facilities. Designed for stability and long-term operational reliability.",
    image: "/images/product-four-post-car.jpg",
    href: "/products/four-post-car-lift",
  },
  {
    id: 3,
    title: "Scissor Lift Table",
    description:
      "Compact yet powerful lifting platform built for smooth material handling in industrial and commercial environments.",
    image: "/images/product-scissor-lift.jpg",
    href: "/products/scissor-lift-table",
  },
  {
    id: 4,
    title: "Home Lift",
    description:
      "Modern and space-efficient elevator solution crafted for residential buildings, villas, and private homes with style and safety.",
    image: "/images/product-home-lift.jpg",
    href: "/products/home-lift",
  },
];

export default function ProductsCarousel() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const visibleCount = 3;
  const maxIndex = products.length - visibleCount;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  return (
    <section className={styles.section}>
      {/* ── Heading ── */}
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Engineered for Performance. Built for Reliability.
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div className={styles.carouselWrapper}>
        {/* Prev Button */}
        <button
          className={`${styles.navBtn} ${styles.navPrev} ${current === 0 ? styles.navDisabled : ""}`}
          onClick={prev}
          aria-label="Previous product"
          disabled={current === 0}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Track */}
        <div className={styles.trackOuter}>
          <div
            ref={trackRef}
            className={styles.track}
            style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCount}) - ${current} * 24px))` }}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                {/* Image */}
                <div className={styles.cardImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.cardImage}
                  />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <p className={styles.cardDesc}>{product.description}</p>
                  <a href={product.href} className={styles.viewBtn}>
                    <span>View Product</span>
                    <span className={styles.viewBtnIcon}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className={`${styles.navBtn} ${styles.navNext} ${current === maxIndex ? styles.navDisabled : ""}`}
          onClick={next}
          aria-label="Next product"
          disabled={current === maxIndex}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Dots ── */}
      <div className={styles.dots}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
