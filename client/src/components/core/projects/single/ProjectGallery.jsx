"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProjectGallery.module.css";

const SPEED = 0.6;

const FALLBACK = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
];

export default function ProjectGallery({ images, featuredImage }) {
  const raw = [featuredImage, ...(images || [])].filter(Boolean);
  const gallery = raw.length >= 2 ? raw : FALLBACK;
  const doubled = [...gallery, ...gallery];

  // ── Auto-scroll refs ────────────────────────────────────────────
  const trackRef      = useRef(null);
  const scrollXRef    = useRef(0);
  const rafRef        = useRef(null);
  const pausedRef     = useRef(false);
  const draggingRef   = useRef(false);
  const dragStartX    = useRef(0);
  const dragStartScroll = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  // ── Lightbox state ──────────────────────────────────────────────
  const [lightbox, setLightbox] = useState(null); // index into `gallery`

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
    if (draggingRef.current) { draggingRef.current = false; setGrabbing(false); }
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
  const onMouseUp = () => { draggingRef.current = false; setGrabbing(false); };

  // ── Touch ───────────────────────────────────────────────────────
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
  const onTouchEnd = () => { draggingRef.current = false; };

  // ── Lightbox helpers ────────────────────────────────────────────
  const openLightbox = (realIdx) => setLightbox(realIdx % gallery.length);
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () => setLightbox((i) => (i - 1 + gallery.length) % gallery.length);
  const lbNext = () => setLightbox((i) => (i + 1) % gallery.length);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <section className={styles.section}>
        <div
          className={styles.viewport}
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
          <div className={styles.track} ref={trackRef}>
            {doubled.map((src, i) => (
              <div
                key={i}
                className={styles.card}
                onClick={() => {
                  if (!draggingRef.current) openLightbox(i);
                }}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={src}
                    alt={`Gallery image ${(i % gallery.length) + 1}`}
                    fill
                    sizes="(max-width:768px) 80vw, 40vw"
                    className={styles.image}
                    draggable="false"
                  />
                  <div className={styles.hoverOverlay}>
                    <span className={styles.zoomIcon}>
                      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className={styles.lbOverlay} onClick={closeLightbox}>
          <button className={styles.lbClose} onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <button className={`${styles.lbNav} ${styles.lbNavLeft}`} onClick={(e) => { e.stopPropagation(); lbPrev(); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.lbImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[lightbox]}
              alt={`Gallery image ${lightbox + 1}`}
              fill
              sizes="100vw"
              className={styles.lbImage}
              priority
            />
          </div>

          <button className={`${styles.lbNav} ${styles.lbNavRight}`} onClick={(e) => { e.stopPropagation(); lbNext(); }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className={styles.lbCounter}>
            {lightbox + 1} / {gallery.length}
          </span>
        </div>
      )}
    </>
  );
}
