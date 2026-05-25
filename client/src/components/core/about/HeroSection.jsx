import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          fill
          sizes="100vw"
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&fit=crop"
          alt="Luxury elevator interior"
          priority
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}>
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.bcActive}>About Us</span>
      </nav>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Luxury Vertical Mobility</span>
        </div>

        <h1 className={styles.heading}>
          Elevating Luxury Living<br />Across UAE
        </h1>

        <p className={styles.description}>
          Invent Elevator is a UAE-based luxury elevator company specializing in premium home lifts, commercial elevators, and bespoke vertical mobility solutions designed for modern villas, architectural spaces, and sophisticated interiors.
        </p>

        <div className={styles.actions}>
          <Link href="/series" className={styles.btnPrimary}>
            Explore Series
          </Link>
          <Link href="/contact" className={styles.btnSecondary}>
            Book Consultation
          </Link>
        </div>

        <p className={styles.trustLine}>
          We combine advanced engineering with refined aesthetics to create elevator experiences that seamlessly blend functionality, elegance, and innovation.

        </p>
      </div>

      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
