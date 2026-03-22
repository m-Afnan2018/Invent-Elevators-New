import Image from "next/image";
import styles from "./CategoriesHero.module.css";

const FALLBACK_MOSAIC = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=600&q=80",
];

export default function CategoriesHero({ categories = [], totalProducts = 0 }) {
  const mosaicImages = [0, 1, 2, 3].map(
    (i) => categories[i]?.image || FALLBACK_MOSAIC[i]
  );

  return (
    <section className={styles.hero}>
      {/* Left: Text content */}
      <div className={styles.textSide}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Product Collections</span>
        </div>

        <h1 className={styles.heading}>
          Explore{" "}
          <span className={styles.headingAccent}>Categories</span>
        </h1>

        <p className={styles.description}>
          Discover our full range of elevator solutions — engineered for homes,
          commercial spaces, and specialized environments across the UAE.
        </p>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>
              {categories.length > 0 ? categories.length : "—"}
            </span>
            <span className={styles.statLbl}>Collections</span>
          </div>
          <div className={styles.statSep} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>
              {totalProducts > 0 ? totalProducts : "—"}
            </span>
            <span className={styles.statLbl}>Products</span>
          </div>
        </div>
      </div>

      {/* Right: 2×2 mosaic of category images */}
      <div className={styles.mosaicSide}>
        <div className={styles.mosaic}>
          {mosaicImages.map((src, i) => (
            <div key={i} className={styles.mosaicCell}>
              <Image
                src={src}
                alt=""
                fill
                sizes="22vw"
                className={styles.mosaicImg}
              />
              <div className={styles.mosaicOverlay} />
            </div>
          ))}
        </div>
        <div className={styles.mosaicAccent} />
      </div>
    </section>
  );
}
