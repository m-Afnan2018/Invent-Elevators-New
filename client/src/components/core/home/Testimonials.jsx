"use client";
import styles from "./Testimonials.module.css";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1";

export default function Testimonials({ testimonials = [] }) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  if (!total) return null;

  const t = testimonials[current];

  return (
    <section className={styles.section}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <p className={styles.label}>
          <span className={styles.diamond}>◆</span> CLIENT STORIES
        </p>
        <p key={current} className={styles.counter}>
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <div className={styles.navBtns}>
          <button className={styles.navBtn} onClick={prev} aria-label="Previous">
            ←
          </button>
          <button className={styles.navBtn} onClick={next} aria-label="Next">
            →
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div key={current} className={styles.body}>
        {/* Left: portrait */}
        <div className={styles.portrait}>
          <Image
            src={t.image || FALLBACK}
            alt={t.name}
            fill
            sizes="200px"
            className={styles.portraitImg}
          />
        </div>

        {/* Right: quote + attribution */}
        <div className={styles.quoteWrap}>
          {/* <span className={styles.openQuote}>"</span> */}
          <blockquote className={styles.quote}><span className={styles.openQuote}>"</span>{t.quote}</blockquote>
          <div className={styles.attribution}>
            <p className={styles.name}>{t.name}</p>
            <p className={styles.role}>{t.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
