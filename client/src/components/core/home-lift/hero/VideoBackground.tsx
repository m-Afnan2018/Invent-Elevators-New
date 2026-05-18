"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroBanner.module.css";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
}

export default function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires these set imperatively
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay blocked, try once on first user interaction
          const unlock = () => {
            video.play().catch(() => {});
            document.removeEventListener("touchstart", unlock);
            document.removeEventListener("click", unlock);
          };
          document.addEventListener("touchstart", unlock, { once: true });
          document.addEventListener("click", unlock, { once: true });
        });
      }
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplaythrough", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplaythrough", attemptPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={styles.bgVideo}
      loop
      muted
      playsInline
      poster={poster}
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

{/*"use client";

import { useState, useEffect } from "react";
import styles from "./HeroBanner.module.css";

const CYCLING_WORDS = [
  "affordable",
  "elegant",
  "silent",
  "premium",
  "modern",
  "reliable",
];

interface CyclingTitleProps {
  staticLine?: string;
  words?: string[];
}

function CyclingTitle({
  staticLine = "Our Elevators are",
  words = CYCLING_WORDS,
}: CyclingTitleProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <h1 className={styles.cyclingTitle}>
      <span className={styles.staticLine}>{staticLine}</span>{" "}
      <span
        className={`${styles.cyclingWord} ${
          animating ? styles.wordExit : styles.wordEnter
        }`}
      >
        {words[index]}
      </span>
    </h1>
  );
}

interface HeroBannerProps {
  videoSrc?: string;
  videoPoster?: string;
  title?: React.ReactNode;
  subtitle?: string;
  data: any;
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function HeroBanner({
  videoSrc = "/video-1.mp4",
  videoPoster = "",
  title,
  subtitle,
  data,
}: HeroBannerProps) {
  return (
    <div className={styles.wrapper}>

      <video
        className={styles.bgVideo}
        src={videoSrc}
        poster={videoPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline="true"
      />


      <div className={styles.overlay} />


      <div className={styles.inner}>
        <div className={styles.content}>
          {title ?? (
            <CyclingTitle
              staticLine={data.hero.Heading}
              words={data.hero.cyclingWords ?? CYCLING_WORDS}
            />
          )}

          <p className={styles.subtitle}>
            {(subtitle ?? data.hero.subHeading)
              .split("\n")
              .map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>

          <button
            className={styles.ctaBtn}
            onClick={() => {
              document
                .getElementById("contact-banner")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className={styles.ctaText}>{data.hero.buttonText}</span>

            <span className={styles.arrowCircle}>
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 
  

.wrapper {
    position: relative;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bgVideo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top,
        rgba(0, 0, 0, 0.72) 0%,
        rgba(0, 0, 0, 0.58) 45%,
        rgba(0, 0, 0, 0.08) 100%);
}

/* ── Center container ── *
.inner {
  position: relative;
  z-index: 2;
  top: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 52px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ── Content block — centered ── *
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  max-width: 1100px;
}

/* ── Cycling title — static + word on same line ── */
/* ── Cycling title — word in next line ── *
.cyclingTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0;
  line-height: 1.05;
}

.staticLine {
  font-size: clamp(2rem, 5vw, 4rem);
  font-family: var(--font-verah);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -1px;
  text-align: center;
}

.cyclingWord {
  font-size: clamp(2.8rem, 8vw, 7rem);
  font-family: var(--font-verah);
  font-style: italic;
  text-transform: uppercase;
  font-weight: 900;
  color: #ffbe68;
  letter-spacing: -2px;
  line-height: 1;
  will-change: transform, opacity;
  text-align: center;
}

/* Slide up & fade in *
.wordEnter {
  animation: wordSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Slide up & fade out *
.wordExit {
  animation: wordSlideOut 0.4s cubic-bezier(0.7, 0, 1, 0.3) forwards;
}

@keyframes wordSlideIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}

@keyframes wordSlideOut {
  from { opacity: 1; transform: translateY(0);      }
  to   { opacity: 0; transform: translateY(-24px);  }
}

/* ── Subtitle ── *
.subtitle {
  font-family: var(--font-verah);
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.6;
  text-align: center;
}

/* ── CTA Button ── *
.ctaBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.3rem;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 50px;
  font-family: var(--font-montserrat);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.15s ease;
  width: fit-content;
  text-transform: uppercase;
}

.ctaBtn span:nth-child(1) {
  margin-left: 15px;
}

.ctaBtn:hover {
  background: #333333;
  transform: scale(1.02);
  color: #fff;
}

.ctaBtn:active {
  transform: scale(0.98);
}

.ctaArrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #000000;
  color: #ffffff;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.ctaBtn:hover .ctaArrow {
  background: #f0f0f0;
  color: #000;
}
.arrowCircle {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 50%;
  font-size: 0.9rem;
  flex-shrink: 0;
  transform: rotate(-45deg);
  transition: transform 0.25s ease, background 0.25s ease;
}

/* ── Mobile ── */
/* ── Mobile Responsive ── *
@media (max-width: 768px) {
  .wrapper {
      min-height: 100svh;
      height: auto;
      padding: 80px 0 40px;
  }

  .inner {
      top: 0;
      padding: 0 20px;
  }

  .content {
      width: 100%;
      gap: 18px;
  }

  .cyclingTitle {
      width: 100%;
      gap: 8px;
  }

  .staticLine {
      font-size: clamp(2rem, 9vw, 3rem);
      line-height: 1.1;
      letter-spacing: -1px;
      white-space: normal;
  }

  .cyclingWord {
      font-size: clamp(2.8rem, 14vw, 5rem);
      line-height: 0.95;
      letter-spacing: -2px;
      margin-top: 4px;
  }

  .subtitle {
      font-size: 0.95rem;
      line-height: 1.6;
      max-width: 95%;
  }

  .ctaBtn {
      margin-top: 40px;
      font-size: 0.78rem;
      padding: 0.3rem;
  }

  .ctaArrow {
      width: 38px;
      height: 38px;
      font-size: 0.95rem;
  }
}

/* ── Small iPhones ── *
@media (max-width: 480px) {
  .wrapper {
      min-height: 100svh;
      padding: 90px 0 40px;
  }

  .inner {
      padding: 0 16px;
  }

  .content {
      gap: 16px;
  }

  .staticLine {
      font-size: clamp(1.8rem, 10vw, 2.6rem);
      line-height: 1.12;
  }

  .cyclingWord {
      font-size: clamp(3rem, 15vw, 4.5rem);
      line-height: 0.92;
      margin-top: 6px;
  }

  .subtitle {
      font-size: 0.9rem;
      line-height: 1.55;
  }

  .ctaBtn {
      font-size: 0.72rem;
  }

  .ctaArrow {
      width: 36px;
      height: 36px;
  }
}

/* ── iPhone SE / very small screens ── *
@media (max-width: 375px) {
  .inner {
      padding: 0 14px;
  }

  .staticLine {
      font-size: 1.7rem;
  }

  .cyclingWord {
      font-size: 2.8rem;
  }

  .subtitle {
      font-size: 0.85rem;
  }
}
*/}