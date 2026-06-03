"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./PageHero.module.css";

/**
 * PageHero — shared banner for all main pages.
 *
 * Props:
 *   image         – URL from useBanner (overrides fallback when set)
 *   fallbackImage – static fallback image path (required)
 *   eyebrow       – small label above the title
 *   title         – H1 content (string or JSX for line breaks)
 *   description   – subtitle paragraph
 *   breadcrumbs   – [{label, href?}] — last item has no href (active)
 *   children      – optional extra content rendered below description
 */
export default function PageHero({
  image,
  fallbackImage = "/projects/palm-jumeirah.png",
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
}) {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bgWrap}>
        <Image
          src={image || fallbackImage}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized={!!image}
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />

      {/* Breadcrumb */}
      {breadcrumbs.length > 0 && (
        <nav className={styles.breadcrumb}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={styles.bcSegment}>
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron} aria-hidden>
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {crumb.href
                ? <Link href={crumb.href} className={styles.bcLink}>{crumb.label}</Link>
                : <span className={styles.bcActive}>{crumb.label}</span>
              }
            </span>
          ))}
        </nav>
      )}

      {/* Main content — anchored to bottom */}
      <div className={styles.inner}>
        {eyebrow && (
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
