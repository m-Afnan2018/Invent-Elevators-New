"use client";
import styles from "./ProductCategories.module.css";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Home Lifts",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    href: "/products/home-lifts",
  },
  {
    id: 2,
    title: "Passenger Lift",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80",
    href: "/products/passenger-lifts",
  },
  {
    id: 3,
    title: "Car Lift",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
    href: "/products/car-lifts",
  },
  {
    id: 4,
    title: "Dumb Waiter",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    href: "/products/dumb-waiters",
  },
];

export default function ProductCategories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Top: Intro text + Right description ── */}
        <div className={styles.introRow}>
          <div className={styles.introLeft}>
            <span className={styles.eyebrow}>Our Product Categories</span>
            <h2 className={styles.heading}>
              Lifts for greater <br />
              <em>comfort and joy</em> in life
            </h2>
          </div>

          <div className={styles.introRight}>
            <p className={styles.introText}>
              At Cibes, we make lift solutions for increased comfort and joy in
              life — and that has been our driving force since 1947. Today, we
              are a global lift company with sales and distribution on all
              continents. We believe that our unique combination of smart,
              sustainable lift technology and sleek Scandinavian design has taken
              us to where we are today.
            </p>
            <Link href="/contact" className={styles.consultBtn}>
              Request a free consultation
              <span className={styles.arrow}>→</span>
            </Link>
            <p className={styles.tagline}>
              We design elevator solutions for all kinds of buildings. Regardless
              of whether you need a lift for your home, a school, an office, a
              hotel or a warehouse, we have the perfect lift model for you.
            </p>
          </div>
        </div>

        {/* ── Category Cards ── */}
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={styles.card}
              style={{ "--delay": `${i * 0.08}s` }}
            >
              {/* Background image */}
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Gradient overlay */}
              <div className={styles.cardOverlay} />

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <span className={styles.discoverLink}>
                  Discover more
                  <span className={styles.discoverArrow}>↗</span>
                </span>
              </div>

              {/* Hover line accent */}
              <div className={styles.cardAccent} />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
