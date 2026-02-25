"use client";
import { useState } from "react";
import styles from "./ProductsSection.module.css";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Hydraulic Cargo Lift",
    description:
      "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    tag: "Industrial",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=85&fit=crop",
  },
  {
    id: 2,
    title: "Home Lift",
    description:
      "Modern and space-efficient elevator solution designed to blend seamlessly into residential interiors with quiet operation and elegant finishes.",
    tag: "Residential",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
  },
  {
    id: 3,
    title: "Four Post Car Lift",
    description:
      "Robust vehicle lifting solution ideal for automobile workshops, service stations, and parking facilities. Designed for stability and long-term operational reliability.",
    tag: "Automotive",
    img: "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da12?w=800&q=85&fit=crop",
  },
  {
    id: 4,
    title: "Scissor Lift Table",
    description:
      "Compact yet powerful lifting platform built for smooth material handling in industrial and commercial environments with flexible load configurations.",
    tag: "Commercial",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=85&fit=crop",
  },
];

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + products.length) % products.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % products.length);

  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>What We Build</p>
          <h2 className={styles.heading}>
            Engineered for Performance.{" "}
            <em className={styles.headingEm}>Built for Reliability.</em>
          </h2>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.headerBody}>
            Explore our range of high-quality vertical mobility solutions —
            each designed to meet the unique demands of modern residential,
            commercial, and industrial spaces.
          </p>
          <a href="#products" className={styles.viewAll}>
            View All Products
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.dividerLine} />

      {/* Cards grid */}
      <div className={styles.cardsGrid}>
        {products.map((product, i) => (
          <div
            key={product.id}
            className={`${styles.card} ${i === activeIndex ? styles.cardActive : ""}`}
            onClick={() => setActiveIndex(i)}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Image */}
            <div className={styles.cardImgWrapper}>
              <Image
                width={1000}
                height={1000}
                src={product.img}
                alt={product.title}
                className={styles.cardImg}
              />
              <div className={styles.cardImgOverlay} />
              <span className={styles.cardTag}>{product.tag}</span>
            </div>

            {/* Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDesc}>{product.description}</p>
              <a href="#" className={styles.cardCta}>
                View Product
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7h9M7.5 3.5l3.5 3.5-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel controls */}
      <div className={styles.carouselControls}>
        <button className={styles.arrowBtn} onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15l-5-5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.dots}>
          {products.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className={styles.arrowBtn} onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
