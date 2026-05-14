"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "./BeforeAfter.module.css";

export default function BeforeAfter({
  beforeSrc = "/before.jpg",
  afterSrc = "/after.jpg",
  beforeAlt = "Before",
  afterAlt = "After",
  defaultPosition = 50, // percentage
}) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const getPositionFromEvent = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return clamp((x / rect.width) * 100, 0, 100);
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition(getPositionFromEvent(e));
    },
    [isDragging, getPositionFromEvent]
  );

  const onEnd = useCallback(() => setIsDragging(false), []);
  const onStart = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      setPosition(getPositionFromEvent(e));
    },
    [getPositionFromEvent]
  );

  // Click on container to jump
  const onContainerClick = useCallback(
    (e) => {
      if (!isDragging) setPosition(getPositionFromEvent(e));
    },
    [isDragging, getPositionFromEvent]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, onMove, onEnd]);

  return (
    <section className={styles.BeforeAfter}>
      <div
        className={`${styles.wrapper} ${isRevealed ? styles.revealed : ""}`}
        ref={containerRef}
        onClick={onContainerClick}
        style={{ cursor: isDragging ? "grabbing" : "col-resize" }}
        aria-label="Before and after comparison slider"
      >
        {/* After (full width base) */}
        <div className={styles.layer}>
          <Image src={afterSrc} alt={afterAlt} fill sizes="100vw" className={styles.img} />
          <span className={`${styles.label} ${styles.labelAfter}`}>After</span>
        </div>

        {/* Before (clipped) */}
        <div
          className={styles.beforeLayer}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={beforeSrc} alt={beforeAlt} fill sizes="100vw" className={styles.img} />
          <span className={`${styles.label} ${styles.labelBefore}`}>Before</span>
        </div>

        {/* Divider line */}
        <div className={styles.divider} style={{ left: `${position}%` }}>
          <div className={styles.line} />

          {/* Handle */}
          <button
            className={`${styles.handle} ${isDragging ? styles.handleActive : ""}`}
            onMouseDown={onStart}
            onTouchStart={onStart}
            aria-label="Drag to compare"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPosition((p) => clamp(p - 2, 0, 100));
              if (e.key === "ArrowRight") setPosition((p) => clamp(p + 2, 0, 100));
            }}
          >
            <svg
              className={styles.handleIcon}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="1.5" />
              {/* Left arrow */}
              <path
                d="M11 16L7 12M11 16L7 20M11 16H5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right arrow */}
              <path
                d="M21 16L25 12M21 16L25 20M21 16H27"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
