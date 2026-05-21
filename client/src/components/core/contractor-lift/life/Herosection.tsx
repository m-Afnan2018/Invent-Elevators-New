"use client";

import styles from "./Herosection.module.css";
// import { LIFE_HERO_SECTION, CURRENT_THEME } from "@/utils/constants";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  data: any;
}

export default function HeroSection(props: HeroSectionProps) {
  const data = props.data;
  const imageSrc = props.imageSrc ?? data.imageSrc;
  const imageAlt = props.imageAlt ?? data.imageAlt;
  return (
    <section className={styles.section}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        {/* Left: headline */}
        <div className={styles.headline}>
          <h1 className={styles.headlineDark}>{data.headlineDark}</h1>
          <h1 className={styles.headlineMuted}>{data.headlineMuted}</h1>
        </div>

        {/* Center: tagline */}
        <div className={styles.tagline}>
          <p>
            <strong>
              {data.tagline}
            </strong>{" "}
            <span className={styles.taglineMuted}>
              {data.taglineMuted}
            </span>
          </p>
        </div>

        {/* Right: CTA */}
        <div className={styles.ctaWrap}>
          <button className={styles.ctaBtn}>
            <span>{data.ctaBtn}</span>
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