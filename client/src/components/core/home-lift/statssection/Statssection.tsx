"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Statssection.module.css";

const STATS = [
  { number: 100, suffix: "+", label: "Villa Elevators Delivered" },
  { number: 500, suffix: "+", label: "Design Variations" },
  { number: 15, suffix: "+", label: "Trusted Suppliers & Partners" },
  { number: 1000, suffix: "+", label: "Satisfied Customers" },
];

const HEADLINES = [
  "🏆 10+ Years of Experience",
  "⚡ Fast Delivery across the UAE",
  "🔧 Fast & Hassle-Free Installation",
];

// Easing: ease-out quad
function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function useCountUp(target: number, duration = 1800, start: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    // Reset first in case observer fires again
    setCount(0);

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return count;
}

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  start: boolean;
}

function StatCard({ number, suffix, label, start }: StatCardProps) {
  const count = useCountUp(number, 1800, start);

  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <span className={styles.statNumber}>
          {count}
          {suffix}
        </span>
      </div>
      <div className={styles.statBottom}>
        <span className={styles.statLabel}>{label}</span>
      </div>
    </div>
  );
}

const StatsSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Headline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentHeadline((prev) =>
          prev === HEADLINES.length - 1 ? 0 : prev + 1
        );
        setVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer — trigger count-up when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          // Once triggered, no need to keep observing
          observer.disconnect();
        }
      },
      {
        // Fire when at least 20% of the section is visible
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.wrapper}>
      {/* LEFT */}
      <div className={styles.left}>
        <h2
          className={styles.experienceHeading}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {HEADLINES[currentHeadline]}
        </h2>
        <p className={styles.headlineSubtext}>
          Premium villa lift solutions crafted for modern UAE homes.
        </p>
      </div>

      {/* RIGHT */}
      <div className={styles.statsGrid}>
        {STATS.map((stat, index) => (
          <StatCard
            key={index}
            number={stat.number}
            suffix={stat.suffix}
            label={stat.label}
            start={hasEntered}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;