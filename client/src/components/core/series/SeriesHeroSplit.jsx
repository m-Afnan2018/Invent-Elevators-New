"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./SeriesHeroSplit.module.css";

function SpecIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.specIconSvg}>
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function SeriesHeroSplit({ series }) {
  return (
    <section className={styles.hero}>
      {/* ── Full-bleed background image ── */}
      <div className={styles.bgWrap}>
        <Image
          src={series.heroImage}
          alt={series.name}
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
      </div>
      <div className={styles.overlayLeft} aria-hidden />
      <div className={styles.overlayTop} aria-hidden />
      <div className={styles.leftGlow} aria-hidden />

      {/* ── Content panel ── */}
      <div className={styles.left}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.bcLink}>Home</Link>
          <span className={styles.bcSep}>/</span>
          <Link href="/series" className={styles.bcLink}>Series</Link>
          <span className={styles.bcSep}>/</span>
          <span className={styles.bcActive}>{series.name}</span>
        </nav>

        <div className={styles.content}>
          <span className={styles.eyebrow}>{series.tagline}</span>
          <h1 className={styles.heading}>{series.name}</h1>
          {/* <p className={styles.desc}>{series.description}</p> */}

          <div className={styles.btns}>
            <Link href="#crafted" className={styles.btnGold}>Explore Designs</Link>
            <Link href="/contact" className={styles.btnOutline}>Request Consultation</Link>
          </div>

          <div className={styles.specRow}>
            {series.details.map((d) => (
              <div key={d.label} className={styles.specItem}>
                {/* <SpecIcon /> */}
                <div className={styles.specText}>
                  <span className={styles.specLabel}>{d.label}</span>
                  <span className={styles.specValue}>{d.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
