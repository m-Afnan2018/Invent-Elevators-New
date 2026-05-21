"use client";

import styles from "./MarqueeLogos.module.css";

const LOGOS = [
  { src: "contractor//logos/logo-1.png", alt: "Logo 1" },
  { src: "contractor//logos/logo-2.png", alt: "Logo 2" },
  { src: "contractor//logos/logo-3.png", alt: "Logo 3" },
  { src: "contractor//logos/logo-4.png", alt: "Logo 4" },
  { src: "contractor//logos/logo-5.png", alt: "Logo 5" },

  { src: "contractor//logos/logo-6.png", alt: "Logo 6" },
  { src: "contractor//logos/logo-7.png", alt: "Logo 7" },
  { src: "contractor//logos/logo-8.png", alt: "Logo 8" },
  { src: "contractor//logos/logo-9.png", alt: "Logo 9" },

  { src: "contractor//logos/logo-10.png", alt: "Logo 10" },
  { src: "contractor//logos/logo-11.png", alt: "Logo 11" },
  { src: "contractor//logos/logo-12.png", alt: "Logo 12" },
];

export default function MarqueeLogos() {
  return (
    <section className={styles.section}>
      
      {/* Heading */}
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>
          Our Partners
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className={styles.desktopGrid}>

        {/* Row 1 → 5 logos */}
        <div className={styles.logoRow}>
          {LOGOS.slice(0, 5).map((logo, index) => (
            <div key={index} className={styles.logoCard}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>

        {/* Row 2 → 4 centered */}
        <div className={styles.logoRow4}>
          {LOGOS.slice(5, 9).map((logo, index) => (
            <div key={index} className={styles.logoCard}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>

        {/* Row 3 → 3 centered */}
        <div className={styles.logoRow3}>
          {LOGOS.slice(9, 12).map((logo, index) => (
            <div key={index} className={styles.logoCard}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Mobile Carousel */}
      <div className={styles.mobileWrapper}>
        <div className={`${styles.track} ${styles.trackLeft}`}>
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <div key={index} className={styles.mobileLogoCard}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}