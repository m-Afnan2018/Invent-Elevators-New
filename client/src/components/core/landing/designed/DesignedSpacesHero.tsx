"use client";

import { useState } from "react";
import styles from "./DesignedSpacesHero.module.css";

const thumbnails = [
  { src: "/images/c1.jpg", alt: "Elevator view 1" },
  { src: "/images/c2.jpg", alt: "Elevator view 2" },
  { src: "/images/c3.jpg", alt: "Elevator view 3" },
  { src: "/images/c4.jpg", alt: "Elevator view 4" },
];

const heroImages = [
  "/images/c1.jpg",
  "/images/c2.jpg",
  "/images/c3.jpg",
  "/images/c4.jpg",
];

const reviewAvatars = [
  "/images/t1.jpg",
  "/images/t2.jpg",
  "/images/t3.jpg",
  "/images/t4.jpg",
];

export default function DesignedSpacesHero() {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <section className={styles.section}>
      {/* ── Heading ── */}
      <h1 className={styles.heading}>
        Designed <span className={styles.headingGold}>Spaces</span> for
        <br />
        Refined Stays
      </h1>

      {/* ── 3-column grid ── */}
      <div className={styles.grid}>
        {/* ── Col 1: Left panel ── */}
        <div className={styles.leftPanel}>
          <div className={styles.leftText}>
            <h2 className={styles.leftTitle}>
              Your Trusted Partner In Finding
              <br />
              The Perfect Home
            </h2>
            <p className={styles.leftDesc}>
              Your Life's Changing. Don't Just Find A Place — Find What's Next.
              We Help You Move Forward With Clarity, Confidence, And The Right
              Agent By Your Side.
            </p>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbSection}>
            <span className={styles.thumbLabel}>Select</span>
            <div className={styles.thumbRow}>
              {thumbnails.map((t, i) => (
                <button
                  key={i}
                  className={`${styles.thumbBtn} ${i === activeThumb ? styles.thumbActive : ""}`}
                  onClick={() => setActiveThumb(i)}
                  aria-label={t.alt}
                >
                  <img src={t.src} alt={t.alt} className={styles.thumbImg} />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className={styles.ctaBtn}>
            <span>Get a free quote</span>
            <span className={styles.ctaArrow}>↗</span>
          </button>
        </div>

        {/* ── Col 2: Hero image ── */}
        <div className={styles.centerPanel}>
          <img
            key={activeThumb}
            src={heroImages[activeThumb]}
            alt="Featured elevator"
            className={styles.heroImage}
          />
        </div>

        {/* ── Col 3: Info card ── */}
        <div className={styles.rightPanel}>
          {/* Block 1 */}
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Expert Guide</h3>
            <p className={styles.infoDesc}>
              Your Life's Changing. Don't Just Find A Place — Find What's Next.
              We Help You Move Forward With Clarity, Confidence, And
            </p>
          </div>

          <div className={styles.divider} />

          {/* Block 2 */}
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Expert Guide</h3>
            <p className={styles.infoDesc}>
              Your Life's Changing. Don't Just Find A Place — Find What's Next.
              We Help You Move Forward With Clarity, Confidence, And
            </p>
          </div>

          {/* <div className={styles.divider} /> */}

          {/* Reviews */}
          <div className={styles.reviewsBlock}>
            <span className={styles.reviewsLabel}>Reviews</span>
            <div className={styles.reviewsRow}>
              <div className={styles.avatarStack}>
                {reviewAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Reviewer ${i + 1}`}
                    className={styles.reviewAvatar}
                    style={{ zIndex: reviewAvatars.length - i }}
                  />
                ))}
              </div>
              <span className={styles.reviewScore}>4.9</span>
              <span className={styles.reviewStar}>★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}