"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ProjectTestimonial.module.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80";

const FALLBACK_TESTIMONIALS = [
  {
    quote: "Invent Elevators transformed our residential project. The installation was seamless, and the after-sales support has been exceptional.",
    name: "Ahmed Al Rashidi",
    role: "Villa Owner, Palm Jumeirah",
    image: FALLBACK_IMG,
  },
];

export default function ProjectTestimonial({ testimonials }) {
  const items = testimonials?.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;
  const total = items.length;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const t = items[current];
  const hasVideo = !!t.video;

  return (
    <section className={styles.section}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <p className={styles.label}>
          <span className={styles.diamond}>◆</span> CLIENT REVIEW
        </p>
        {total > 1 && (
          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">←</button>
            <button className={styles.navBtn} onClick={next} aria-label="Next">→</button>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div key={current} className={styles.body}>
        {/* Media — video takes priority over image */}
        <div className={styles.portrait}>
          {hasVideo ? (
            <video
              src={t.video}
              className={styles.portraitVideo}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={t.image || t.avatar || FALLBACK_IMG}
              alt={t.name || "Client"}
              fill
              sizes="200px"
              className={styles.portraitImg}
            />
          )}
        </div>

        {/* Quote */}
        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            <span className={styles.openQuote}>&ldquo;</span>
            {t.quote || t.text || t.message}
          </blockquote>
          <div className={styles.attribution}>
            <p className={styles.name}>{t.name}</p>
            {(t.role || t.position || t.company) && (
              <p className={styles.role}>
                {[t.role || t.position, t.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
