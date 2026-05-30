import Link from "next/link";
import styles from "./SeriesCTABanner.module.css";

export default function SeriesCTABanner({ seriesName }) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{seriesName} Series</p>
        <h2 className={styles.heading}>
          Bring Architectural<br />Elegance Home
        </h2>
        <p className={styles.desc}>
          Schedule a consultation with our design specialists and discover the {seriesName} collection.
        </p>
        <Link href="/contact" className={styles.btn}>
          Request Design Consultation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
