"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./LocationSection.module.css";

const SPEED = 0.6; // px per animation frame (~36 px/s at 60 fps)

export default function LocationSection({
  cityName = "DUBAI",
  description = "",
  mapSrc = "",
  mapPlaceholder = "",
  projects = [],
}) {
  const doubled = [...projects, ...projects];

  const trackRef        = useRef(null);
  const scrollXRef      = useRef(0);       // current x offset in px
  const rafRef          = useRef(null);
  const pausedRef       = useRef(false);   // hover pause
  const draggingRef     = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartScroll = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  // ── Apply transform directly on the DOM node ───────────────────
  const applyX = (x) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${x}px)`;
    }
  };

  const halfWidth = () =>
    trackRef.current ? trackRef.current.scrollWidth / 2 : 0;

  const wrapX = (x) => {
    const half = halfWidth();
    if (!half) return x;
    return ((x % half) + half) % half;
  };

  // ── Animation loop via ref — avoids stale-closure / self-ref issue ──
  useEffect(() => {
    const step = () => {
      if (!pausedRef.current && !draggingRef.current) {
        scrollXRef.current += SPEED;
        const half = halfWidth();
        if (half > 0 && scrollXRef.current >= half) {
          scrollXRef.current -= half;
        }
        applyX(scrollXRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Hover ───────────────────────────────────────────────────────
  const onEnter = () => { pausedRef.current = true; };
  const onLeave = () => {
    pausedRef.current = false;
    if (draggingRef.current) {
      draggingRef.current = false;
      setGrabbing(false);
    }
  };

  // ── Mouse drag ──────────────────────────────────────────────────
  const onMouseDown = (e) => {
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollXRef.current;
    setGrabbing(true);
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    const delta = dragStartX.current - e.clientX;
    scrollXRef.current = wrapX(dragStartScroll.current + delta);
    applyX(scrollXRef.current);
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    setGrabbing(false);
  };

  // ── Touch swipe ─────────────────────────────────────────────────
  const onTouchStart = (e) => {
    draggingRef.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartScroll.current = scrollXRef.current;
  };

  const onTouchMove = (e) => {
    if (!draggingRef.current) return;
    const delta = dragStartX.current - e.touches[0].clientX;
    scrollXRef.current = wrapX(dragStartScroll.current + delta);
    applyX(scrollXRef.current);
  };

  const onTouchEnd = () => {
    draggingRef.current = false;
  };

  return (
    <section className={styles.section}>
      {/* ── Top: city info + map ── */}
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.cityInfo}>
            <h2 className={styles.cityName}>{cityName}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.mapBox}>
            {mapSrc ? (
              <iframe
                src={mapSrc}
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${cityName}`}
              />
            ) : (
              <div className={styles.mapPlaceholder}>
                <span>{mapPlaceholder || `Map of ${cityName}`}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        className={styles.carouselViewport}
        style={{ cursor: grabbing ? "grabbing" : "grab" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.cardsTrack} ref={trackRef}>
          {doubled.map((project, i) => (
            <article key={`${project.id}-${i}`} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.cardImage}
                  draggable="false"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── View All ── */}
      <div className={styles.inner}>
        <div className={styles.viewMoreRow}>
          <Link href="/projects" className={styles.viewMoreBtn}>View All Projects</Link>
        </div>
      </div>
    </section>
  );
}
