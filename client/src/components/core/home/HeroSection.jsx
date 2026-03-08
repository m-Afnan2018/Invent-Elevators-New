"use client";
import styles from "./HeroSection.module.css";
import Link from "next/link";

const heroHighlights = [
  "EN 81 compliant safety architecture",
  "Tailored lift cabins and compact shaft options",
  "Fast installation and preventive AMC support",
];

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.hero}>
        <div className={styles.heroBg} />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Invent Elevator · Premium Mobility Systems</p>
          <h1 className={styles.heroTitle}>
            Elevators Crafted for
            <br />
            Contemporary Buildings
          </h1>
          <p className={styles.heroSubtitle}>
            From home lifts and passenger elevators to freight and hospital solutions,
            we deliver smooth, secure, and efficient vertical transport with modern
            engineering and reliable after-sales support.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Book Site Visit
            </Link>
            <Link href="/products" className={styles.ctaSecondary}>
              Explore Products
            </Link>
          </div>

          <ul className={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.heroBadge}>
          <span className={styles.badgeYear}>Trusted Since</span>
          <strong className={styles.badgeNum}>1999</strong>
          <span className={styles.badgeLabel}>Pan-India Installations</span>
        </div>
      </div>
    </section>
  );
}
