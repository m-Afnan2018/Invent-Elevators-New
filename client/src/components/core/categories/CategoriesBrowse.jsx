"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CategoriesBrowse.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { extractCollection } from "@/lib/apiResponse";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import PageHero from "@/components/common/PageHero/PageHero";

const FALLBACK_CATEGORIES = [
  {
    _id: "home-lifts",
    __fallback: true,
    name: "Home Lifts",
    description:
      "Custom residential elevator solutions designed for private villas and luxury apartments across the UAE.",
    image: "/projects/downtown.png",
  },
  {
    _id: "commercial-elevators",
    __fallback: true,
    name: "Commercial Elevators",
    description:
      "High-capacity passenger lifts engineered for offices, retail malls, and commercial towers.",
    image: "/projects/adnoc.png",
  },
  {
    _id: "car-lifts",
    __fallback: true,
    name: "Car Lifts",
    description:
      "Heavy-duty vehicle lift systems built for limited-space parking structures and showrooms.",
    image: "/projects/yas-island.png",
  },
  {
    _id: "hospital-lifts",
    __fallback: true,
    name: "Healthcare Lifts",
    description:
      "Bed and stretcher elevator systems with emergency power backup for uninterrupted medical operations.",
    image: "/projects/palm-jumeirah.png",
  },
  {
    _id: "dumbwaiters",
    __fallback: true,
    name: "Dumbwaiters",
    description:
      "Compact service lifts for seamless food and goods transport between floors in hospitality venues.",
    image: "/projects/city-centre.png",
  },
  {
    _id: "panoramic-lifts",
    __fallback: true,
    name: "Panoramic Lifts",
    description:
      "Glass-enclosed scenic elevators that elevate architectural beauty while delivering smooth vertical mobility.",
    image: "/projects/al-majaz.png",
  },
];

function CategoryCard({ category, productCount = 0 }) {
  const href = `/categories/${category.slug || category._id}`;
  const fallbackImg =
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80";

  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardImgWrap}>
        <Image
          src={category.image || fallbackImg}
          alt={category.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className={`${styles.cardImg} ${hovered ? styles.cardImgHovered : ""}`}
        />
        <div className={styles.cardImgOverlay} />
        {/* <span className={styles.countBadge}>
          {productCount > 0 ? `${productCount} Products` : "View Collection"}
        </span> */}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h3 className={styles.cardTitle}>{category.name}</h3>
          <span className={styles.cardLink}>Browse</span>
        </div>
        <p className={styles.cardDesc}>
          {(category.description || "").slice(0, 110)}
          {(category.description || "").length > 110 ? "…" : ""}
        </p>
      </div>
    </Link>
  );
}

export default function CategoriesBrowse() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const allCategories = useMemo(() => {
    return categories.length ? categories : FALLBACK_CATEGORIES;
  }, [categories]);

  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <PageHero
        fallbackImage="/projects/al-majaz.png"
        eyebrow="Our Products"
        title="Elevator Categories"
        description="Explore our complete range of elevator solutions — from bespoke home lifts and high-speed commercial elevators to specialist healthcare and car lift systems, engineered for the UAE."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      {/* ── OLD hero (commented out — kept for reference) ──
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}><Image src="/projects/al-majaz.png" alt="Elevator categories" fill priority sizes="100vw" className={styles.heroBgImg} /></div>
        <div className={styles.heroOverlayTop} /><div className={styles.heroOverlayBottom} />
        <nav className={styles.heroBreadcrumb}><Link href="/" className={styles.heroBcLink}>Home</Link><svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.heroBcActive}>Categories</span></nav>
        <div className={styles.heroInner}><div className={styles.eyebrow}><span className={styles.eyebrowDot} /><span>Our Products</span></div><h1 className={styles.heroTitle}>Elevator Categories</h1></div>
        <div className={styles.heroScrollWrap}><span className={styles.heroScrollLabel}>Scroll to explore</span><div className={styles.heroScrollTrack}><div className={styles.heroScrollThumb} /></div></div>
      </section>
      ── END OLD hero ── */}

      {/* ── Categories Grid ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeleton}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonLine} style={{ width: "70%" }} />
                    <div className={styles.skeletonLine} style={{ width: "90%" }} />
                    <div className={styles.skeletonLine} style={{ width: "50%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {allCategories.map((cat) => (
                <CategoryCard
                  key={cat._id}
                  category={cat}
                  productCount={productCountByCategory[cat._id] || 0}
                />
              ))}
            </div>
          )}

          <div className={styles.ctaWrap}>
            <p className={styles.ctaText}>Looking for a custom elevator solution?</p>
            <Link href="/contact" className={styles.cta}>
              Book a Consultation →
            </Link>
          </div>
        </div>
      </section>

      <MarqueeLogos />
    </main>
  );
}
