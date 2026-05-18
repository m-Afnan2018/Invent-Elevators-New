"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Testimonialssection.module.css";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  review: string;
  avatarSrc: string;
  featureImageSrc: string;
}

const AUTO_INTERVAL = 4000;

export default function TestimonialsSection({ data }: { data: any }) {
  const testimonials: Testimonial[] = data.DATA.map((t: any) => ({
    id: t.id,
    name: t.name,
    location: t.role,
    review: t.content,
    avatarSrc: t.avatar,
    featureImageSrc: t.avatar,
  }));
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 350);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        return next;
      });
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAvatarClick = (index: number) => {
    goTo(index);
    resetTimer();
  };

  const t = testimonials[active];

  return (
    <section className={styles.section}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Real Clients.
          <br />
          Real Clean Results.
        </h2>
        <p className={styles.subtitle}>
          Your Life's Changing. Don't Just Find A Place — Find What's Next. We
          Help You Move Forward With Clarity, Confidence, And
        </p>
      </div>

      {/* ── Card ── */}
      <div className={styles.card}>
        {/* Left: feature image */}
        <div className={styles.imageWrap}>
          <img
            key={active}
            src={t.featureImageSrc}
            alt={t.name}
            className={`${styles.featureImage} ${animating ? styles.fadeOut : styles.fadeIn}`}
          />
        </div>

        {/* Right: review content */}
        <div
          key={`content-${active}`}
          className={`${styles.content} ${animating ? styles.fadeOut : styles.fadeIn}`}
        >
          {/* Stars */}
          <div className={styles.stars}>
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className={styles.star}>{s}</span>
            ))}
            <span className={styles.ratingText}>Rated 4.9/5 by 1,200 + Happy Clients</span>
          </div>

          {/* Reviewer info */}
          <div className={styles.reviewerInfo}>
            <span className={styles.reviewerName}>{t.name}</span>
            <span className={styles.reviewerLocation}>{t.location}</span>
          </div>

          {/* Review text */}
          <p className={styles.reviewText}>{t.review}</p>

          {/* Avatar strip */}
          <div className={styles.avatarStrip}>
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                className={`${styles.avatarBtn} ${i === active ? styles.avatarActive : ""}`}
                onClick={() => handleAvatarClick(i)}
                aria-label={`View testimonial from ${item.name}`}
              >
                <img
                  src={item.avatarSrc}
                  alt={item.name}
                  className={styles.avatarImg}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}