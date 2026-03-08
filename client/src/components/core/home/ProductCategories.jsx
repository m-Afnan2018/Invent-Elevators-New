"use client";
import styles from "./ProductCategories.module.css";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCategories } from "@/services/categories.service";

export default function ProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(Array.isArray(response) ? response : []);
      } catch (_error) {
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category?._id && category?.name)
        .filter((category) => category?.isActive !== false && category?.status !== "inactive")
        .slice(0, 6),
    [categories]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.introRow}>
          <div className={styles.introLeft}>
            <span className={styles.eyebrow}>Core Product Lines</span>
            <h2 className={styles.heading}>
              Elevator solutions engineered
              <br />
              for every project type
            </h2>
          </div>

          <div className={styles.introRight}>
            <p className={styles.introText}>
              Choose from home elevators, passenger lifts, freight systems, and
              custom-built options designed around traffic, space, and performance
              requirements.
            </p>
            <Link href="/contact" className={styles.consultBtn}>
              Talk to an expert
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {activeCategories.map((cat, i) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className={styles.card}
              style={{ "--delay": `${i * 0.08}s` }}
            >
              {cat.image ? (
                <div className={styles.cardBg} style={{ backgroundImage: `url(${cat.image})` }} />
              ) : (
                <div className={`${styles.cardBg} ${styles.cardBgFallback}`} />
              )}

              <div className={styles.cardOverlay} />

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.name}</h3>
                <span className={styles.discoverLink}>
                  View category
                  <span className={styles.discoverArrow}>↗</span>
                </span>
              </div>
            </Link>
          ))}

          {!activeCategories.length ? (
            <Link href="/categories" className={styles.card}>
              <div className={`${styles.cardBg} ${styles.cardBgFallback}`} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Browse Categories</h3>
                <span className={styles.discoverLink}>
                  View category
                  <span className={styles.discoverArrow}>↗</span>
                </span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
