import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryCard.module.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80";

export default function CategoryCard({ category, productCount = 0 }) {
  const { _id, name, description, image } = category;

  return (
    <Link href={`/categories/${_id}`} className={styles.card}>
      {/* Gold accent bar (slides in on hover) */}
      <div className={styles.accentBar} />

      {/* Image */}
      <div className={styles.imgWrap}>
        <Image
          src={image || FALLBACK_IMG}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.img}
        />
        <div className={styles.gradient} />

        {/* Product count badge */}
        <div className={styles.countBadge}>
          <span className={styles.countNum}>{productCount}</span>
          <span className={styles.countLabel}>Products</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {description && (
          <p className={styles.desc}>
            {description.length > 80
              ? description.slice(0, 80) + "…"
              : description}
          </p>
        )}
        <div className={styles.cta}>
          <span>Browse Collection</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={styles.ctaArrow}
          >
            <path
              d="M2.5 7h9M8 2.5L12.5 7 8 11.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
