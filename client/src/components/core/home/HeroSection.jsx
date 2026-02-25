"use client";
import styles from "./HeroSection.module.css";
import Link from "next/link";

export default function HeroSection() {

  return (
    <section className={styles.heroWrapper}>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        {/* Background image with overlay */}
        <div className={styles.heroBg} />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Elevating Home with</p>
          <h1 className={styles.heroTitle}>
            Design &amp; <br />Performance
          </h1>
          <p className={styles.heroSubtitle}>
            High-quality Hydraulic Cargo Lifts, Scissor Lifts, Car Lifts &amp;
            Custom Vertical Solutions designed for safety, durability, and
            industrial efficiency.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/products" className={styles.ctaPrimary}>
              Our products
            </Link>
            <Link href="/brochure" className={styles.ctaSecondary}>
              Download Brochure
            </Link>
          </div>

          <p className={styles.heroScroll}>Explore our lift solutions</p>
        </div>

        {/* Floating badge */}
        <div className={styles.heroBadge}>
          <span className={styles.badgeYear}>Since</span>
          <strong className={styles.badgeNum}>1947</strong>
          <span className={styles.badgeLabel}>Global Lift Co.</span>
        </div>
      </div>
    </section>
  );
}
