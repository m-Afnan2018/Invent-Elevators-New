"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.css";

const STATS = [
  { value: 100, suffix: "+", label: "Villa Elevators Delivered", description: "Across residential & commercial spaces" },
  { value: 500, suffix: "+", label: "Design Variations", description: "Fully customisable finishes & cabins" },
  { value: 15, suffix: "+", label: "Trusted Suppliers & Partners", description: "A decade of engineering excellence" },
  { value: 1000, suffix: "+", label: "Satisfied Customers", description: "Trusted by clients across the region" },
];

// Replace with your public Instagram Reel URL
// e.g. "https://www.instagram.com/reel/ABC123xyz/"
const REEL_POST_URL = "https://www.instagram.com/reel/DXQjL1gDL7e/?igsh=ZW82cGw4NWgxaWlr";

/* ── Count-up hook ──────────────────────────────────────── */
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!start) return;
    const isDecimal = !Number.isInteger(target);
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration]);

  return count;
}

/* ── Single stat row ────────────────────────────────────── */
function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.value, 1800 + index * 200, inView);
  const isDecimal = !Number.isInteger(stat.value);

  return (
    <div
      className={styles.statItem}
      style={{ animationDelay: inView ? `${index * 0.13}s` : "0s" }}
    >
      <div className={styles.statNumber}>
        {isDecimal ? count.toFixed(1) : count}
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <div className={styles.statText}>
        <span className={styles.statLabel}>{stat.label}</span>
        <span className={styles.statDesc}>{stat.description}</span>
      </div>
    </div>
  );
}

/* ── Instagram embed ────────────────────────────────────── */
function InstagramEmbed({ url }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!document.getElementById("ig-embed-script")) {
      const script = document.createElement("script");
      script.id = "ig-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => window.instgrm?.Embeds.process();
    } else {
      window.instgrm?.Embeds.process();
    }
  }, [url]);

  return (
    <div ref={ref} className={styles.igEmbedWrap}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#000",
          border: 0,
          borderRadius: "18px",
          margin: 0,
          padding: 0,
          width: "100%",
          minWidth: "unset",
        }}
      />
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function Stats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>

        {/* ── Left: scrolling content ── */}
        <div className={`${styles.left} ${inView ? styles.leftVisible : ""}`}>
          <div className={styles.headWrap}>
            <p className={styles.eyebrow}>Our Impact</p>
            {/* <h2 className={`${styles.title} headings`} style={{ textAlign: 'left' }}>Numbers That<br />Speak for Themselves</h2> */}
            <h2 className={`${styles.title} headings`} style={{ textAlign: 'left' }}>20+ Years of Experience</h2>
            <p className={styles.subtitle}>
              Founded over two decades ago, Invent Elevator is a pioneer in manufacturing home lift solutions by incorporating unparalleled engineering excellence and state-of-the-art elevation systems.
            </p>
          </div>

          <div className={styles.statsStack}>
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Right: sticky phone ── */}
        <div className={styles.rightSticky}>
          {/* <div className={`${styles.reelShell} ${inView ? styles.reelVisible : ""}`}>
            <div className={styles.reelPhone}>
              <div className={styles.phoneNotch}>
                <div className={styles.phoneCam} />
              </div>
              <div className={styles.phoneScreen}>
                <InstagramEmbed url={REEL_POST_URL} />
              </div>
              <div className={styles.phoneHome} />
            </div>
            <div className={styles.reelGlow} />
          </div> */}

          <video
            src="/reels/stats.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.reelVideo}
          />

          {/* <a
            href="https://www.instagram.com/YOUR_HANDLE"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igBadge}
          >
            <svg className={styles.igIcon} viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Follow us on Instagram
          </a> */}
        </div>

      </div>
    </section>
  );
}