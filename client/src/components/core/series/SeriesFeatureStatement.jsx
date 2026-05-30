import Image from "next/image";
import Link from "next/link";
import styles from "./SeriesFeatureStatement.module.css";

export default function SeriesFeatureStatement({ series }) {
  const image = series.images?.[1] || series.heroImage;

  return (
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={series.name}
          fill
          sizes="(max-width:900px) 100vw, 55vw"
          className={styles.img}
        />
      </div>

      <div className={styles.textWrap}>
        <p className={styles.eyebrow}>About This Series</p>
        <h2 className={styles.heading}>
          A {series.name}<br />Designed To Be Seen
        </h2>
        <p className={styles.desc}>{series.description}</p>
        <Link href="/contact" className={styles.cta}>
          Discover {series.name}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
