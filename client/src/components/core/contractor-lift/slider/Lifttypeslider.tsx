"use client";

import { useState, useRef } from "react";
import styles from "./Lifttypeslider.module.css";


interface Slide {
  type: string;
  titleGold: string;
  titleWhite: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

type Direction = "up" | "down" | null;

export default function LiftTypeSlider({ data: slides }: { data: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<Direction>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (dir: "up" | "down") => {
    if (isAnimating) return;

    const next =
      dir === "down"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;

    setAnimDir(dir);
    setIsAnimating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(next);
      setAnimDir(null);
      setIsAnimating(false);
    }, 500);
  };

  const slide = slides[current];

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* ── Left: Text content ── */}
        <div className={styles.left}>
          <div
            key={`content-${current}`}
            className={`${styles.content} ${animDir === "down"
              ? styles.slideOutUp
              : animDir === "up"
                ? styles.slideOutDown
                : styles.slideIn
              }`}
          >
            <span className={styles.typeLabel}>{slide.type}</span>
            <h2 className={styles.title}>
              <span className={styles.titleGold}>{slide.titleGold}</span>{" "}
              <span className={styles.titleWhite}>{slide.titleWhite}</span>
            </h2>
            <p className={styles.description}>{slide.description}</p>
          </div>

          {/* ── Controls ── */}
          <div className={styles.controls}>
            <button
              className={styles.arrowBtn}
              onClick={() => goTo("up")}
              aria-label="Previous slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14L4 8H16L10 14Z"
                  fill="white"
                  transform="rotate(180 10 10)"
                />
              </svg>
            </button>

            <button
              className={styles.arrowBtn}
              onClick={() => goTo("down")}
              aria-label="Next slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 14L4 8H16L10 14Z" fill="white" />
              </svg>
            </button>

            {/* ── Dot indicators ── */}
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                  onClick={() => {
                    if (i === current || isAnimating) return;
                    goTo(i > current ? "down" : "up");
                    // Jump directly to index after animation
                    setTimeout(() => setCurrent(i), 500);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className={styles.right}>
          <img
            key={`img-${current}`}
            src={slide.imageSrc}
            alt={slide.imageAlt}
            className={`${styles.image} ${animDir ? styles.imgFadeOut : styles.imgFadeIn
              }`}
          />
        </div>
      </div>
    </div>
  );
}