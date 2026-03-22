"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoriesHero from "./CategoriesHero";
import CategoryCard from "./CategoryCard";
import styles from "./CategoriesBrowse.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { extractCollection } from "@/lib/apiResponse";

const FALLBACK_FEATURED =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80";

// ── Skeleton pieces ──────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={`${styles.skeletonLine} ${styles.lineShort}`} />
        <div className={`${styles.skeletonLine} ${styles.lineLong}`} />
        <div className={`${styles.skeletonLine} ${styles.lineMed}`} />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function CategoriesBrowse() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(extractCollection(catRes, ["categories"]));
        setProducts(extractCollection(prodRes));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Compute product count per category id
  const productCountByCategory = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const single = p?.category?._id || p?.category;
      const many = Array.isArray(p?.categories)
        ? p.categories.map((c) => c?._id || c)
        : [];
      [...new Set([single, ...many].filter(Boolean))].forEach((id) => {
        map[id] = (map[id] || 0) + 1;
      });
    });
    return map;
  }, [products]);

  const featured = categories[0] || null;
  const rest = categories.slice(1);

  // ── Skeleton loading state ──
  if (isLoading) {
    return (
      <>
        {/* Hero skeleton */}
        <div className={styles.heroSkeleton} />

        <section className={styles.gridSection}>
          <div className={styles.container}>
            {/* Featured skeleton */}
            <div className={styles.featuredSkeleton} />

            {/* Cards skeleton */}
            <div className={styles.allSection}>
              <div className={styles.sectionHeader}>
                <div className={`${styles.skeletonLine} ${styles.lineTitle}`} />
              </div>
              <div className={styles.grid}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── Empty state ──
  if (categories.length === 0) {
    return (
      <>
        <CategoriesHero categories={[]} totalProducts={0} />
        <section className={styles.gridSection}>
          <div className={styles.container}>
            <div className={styles.empty}>
              <div className={styles.emptyRing}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M10 22V14l6-4 6 4v8"
                    stroke="#ccc"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="13"
                    y="16"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <p className={styles.emptyTitle}>No categories yet</p>
              <p className={styles.emptyDesc}>
                Check back soon for our product collections.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <CategoriesHero
        categories={categories}
        totalProducts={products.length}
      />

      <section className={styles.gridSection}>
        <div className={styles.container}>

          {/* ── Featured spotlight banner ── */}
          {featured && (
            <div className={styles.featuredWrap}>
              <div className={styles.featuredEyebrow}>
                <span className={styles.featuredDot} />
                <span>Spotlight Collection</span>
              </div>

              <Link
                href={`/categories/${featured._id}`}
                className={styles.featuredCard}
              >
                {/* Background image */}
                <div className={styles.featuredImgWrap}>
                  <Image
                    src={featured.image || FALLBACK_FEATURED}
                    alt={featured.name}
                    fill
                    sizes="100vw"
                    className={styles.featuredImg}
                    priority
                  />
                </div>

                {/* Overlays */}
                <div className={styles.featuredOverlayLeft} />
                <div className={styles.featuredOverlayBottom} />

                {/* Content */}
                <div className={styles.featuredContent}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredTag}>Featured</span>
                    {productCountByCategory[featured._id] > 0 && (
                      <span className={styles.featuredProductCount}>
                        {productCountByCategory[featured._id]} products
                      </span>
                    )}
                  </div>

                  <h2 className={styles.featuredName}>{featured.name}</h2>

                  {featured.description && (
                    <p className={styles.featuredDesc}>
                      {featured.description.length > 140
                        ? featured.description.slice(0, 140) + "…"
                        : featured.description}
                    </p>
                  )}

                  <div className={styles.featuredCta}>
                    <span>Browse Collection</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={styles.featuredCtaArrow}
                    >
                      <path
                        d="M3 8h10M9 3.5L13.5 8 9 12.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ── All categories grid ── */}
          {rest.length > 0 && (
            <div className={styles.allSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>All Collections</h2>
                <span className={styles.sectionCount}>
                  {categories.length} categories
                </span>
              </div>

              <div className={styles.grid}>
                {rest.map((cat) => (
                  <CategoryCard
                    key={cat._id}
                    category={cat}
                    productCount={productCountByCategory[cat._id] || 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Edge case: only one category — show it as a card too */}
          {categories.length === 1 && featured && (
            <div className={styles.allSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>All Collections</h2>
                <span className={styles.sectionCount}>1 category</span>
              </div>
              <div className={styles.grid}>
                <CategoryCard
                  category={featured}
                  productCount={productCountByCategory[featured._id] || 0}
                />
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
