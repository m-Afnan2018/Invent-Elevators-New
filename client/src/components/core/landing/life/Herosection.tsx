"use client";

import styles from "./Herosection.module.css";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  imageSrc = "/images/carlife.png",
  imageAlt = "Designed Spaces for Refined Stays",
}: HeroSectionProps) {
  return (
    <section className={styles.section}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        {/* Left: headline */}
        <div className={styles.headline}>
          <h1 className={styles.headlineDark}>Designed Spaces</h1>
          <h1 className={styles.headlineMuted}>for Refined Stays</h1>
        </div>

        {/* Center: tagline */}
        <div className={styles.tagline}>
          <p>
            <strong>
              Your Life&apos;s Changing. Don&apos;t Just Find A Place — Find What&apos;s Next.
            </strong>{" "}
            <span className={styles.taglineMuted}>
              We Help You Move Forward With Clarity, Confidence, And The Right
              Agent By Your Side.
            </span>
          </p>
        </div>

        {/* Right: CTA */}
        <div className={styles.ctaWrap}>
          <button className={styles.ctaBtn}>
            <span>Get a free quote</span>
            <span className={styles.ctaArrow}>↗</span>
          </button>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className={styles.imageWrap}>
        <img src={imageSrc} alt={imageAlt} className={styles.heroImage} />
      </div>
    </section>
  );
}