import PageHero from "@/components/common/PageHero/PageHero";

export default function CategoryHero({ category }) {
  const {
    name = "Category",
    description = "",
    image = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
  } = category || {};

  return (
    <PageHero
      image={image}
      fallbackImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
      eyebrow="Our Products"
      title={name}
      description={description || undefined}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: name },
      ]}
    />
  );
}

/* ── OLD CategoryHero (commented out — kept for reference) ──
import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryHero.module.css";

export default function CategoryHeroOld({ category }) {
  const { name, description, image, _count } = category || {};
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}><Image src={image || FALLBACK} alt={name} fill priority sizes="100vw" className={styles.bgImg} /></div>
      <div className={styles.overlayTop} /><div className={styles.overlayBottom} /><div className={styles.overlayNoise} />
      <nav className={styles.breadcrumb}>Home / Products / {name}</nav>
      <div className={styles.content}>
        <div className={styles.eyebrow}><span className={styles.eyebrowDot} /><span>Our Products</span></div>
        <h1 className={styles.heading}>{name}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {(_count?.subCategories > 0 || _count?.products > 0) && (
          <div className={styles.statsRow}>...</div>
        )}
      </div>
      <div className={styles.scrollWrap}>...</div>
    </section>
  );
}
── END OLD CategoryHero ── */
