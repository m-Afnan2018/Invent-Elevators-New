"use client";
import styles from "./Series.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80";

export default function Series({ activeCategories = [] }) {
    const trackRef   = useRef(null);
    const outerRef   = useRef(null);
    const drag       = useRef({ active: false, startX: 0, startY: 0, startOffset: 0, isHorizontal: null });

    const [current,     setCurrent]     = useState(0);
    const [offset,      setOffset]      = useState(0);
    const [animating,   setAnimating]   = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const update = () => {
            if      (window.innerWidth <= 768)  setVisibleCount(1);
            else if (window.innerWidth <= 1024) setVisibleCount(2);
            else                                setVisibleCount(3);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, activeCategories.length - visibleCount);

    const getStepWidth = useCallback(() => {
        const track = trackRef.current;
        if (!track?.children[0]) return 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        return track.children[0].getBoundingClientRect().width + gap;
    }, []);

    /* Snap the track to a given index with a CSS transition */
    const snapTo = useCallback((idx) => {
        const next = Math.max(0, Math.min(idx, maxIndex));
        const step = getStepWidth();
        if (!step) return;
        setAnimating(true);
        setOffset(-(next * step));
        setCurrent(next);
        setTimeout(() => setAnimating(false), 380);
    }, [maxIndex, getStepWidth]);

    /* Touch listeners — attached imperatively to the outer container.
       Because we're moving a transform (not scrolling), Android's
       overflow:hidden blocking never comes into play. */
    useEffect(() => {
        const outer = outerRef.current;
        if (!outer) return;

        const onStart = (e) => {
            drag.current = {
                active:      true,
                startX:      e.touches[0].clientX,
                startY:      e.touches[0].clientY,
                startOffset: -(current * getStepWidth()),
                isHorizontal: null,
            };
        };

        const onMove = (e) => {
            const d = drag.current;
            if (!d.active) return;
            const dx = e.touches[0].clientX - d.startX;
            const dy = e.touches[0].clientY - d.startY;

            /* Determine gesture direction on first significant move */
            if (d.isHorizontal === null) {
                if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
                d.isHorizontal = Math.abs(dx) >= Math.abs(dy);
            }

            if (!d.isHorizontal) return; /* let vertical scroll pass through */

            e.preventDefault();

            const step     = getStepWidth();
            const maxOff   = -(maxIndex * step);
            const raw      = d.startOffset + dx;
            /* rubber-band resistance at the edges */
            const clamped  = raw > 0      ? raw * 0.25
                           : raw < maxOff ? maxOff + (raw - maxOff) * 0.25
                           : raw;
            setOffset(clamped);
        };

        const onEnd = (e) => {
            const d = drag.current;
            if (!d.active) return;
            d.active = false;
            if (!d.isHorizontal) return;

            const dx   = e.changedTouches[0].clientX - d.startX;
            const step = getStepWidth();
            let   idx;
            if (Math.abs(dx) > 40) {
                /* Fast swipe: move by one */
                idx = dx < 0 ? current + 1 : current - 1;
            } else {
                /* Slow drag: snap to nearest */
                idx = Math.round(-drag.current.startOffset / step +
                                 -(dx / step));
            }
            snapTo(idx);
        };

        outer.addEventListener("touchstart", onStart, { passive: true  });
        outer.addEventListener("touchmove",  onMove,  { passive: false }); // preventDefault needs this
        outer.addEventListener("touchend",   onEnd,   { passive: true  });

        return () => {
            outer.removeEventListener("touchstart", onStart);
            outer.removeEventListener("touchmove",  onMove);
            outer.removeEventListener("touchend",   onEnd);
        };
    }, [current, maxIndex, getStepWidth, snapTo]);

    /* Re-snap when window resizes to keep position accurate */
    useEffect(() => {
        const step = getStepWidth();
        if (step) setOffset(-(current * step));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleCount]);

    return (
        <section className={styles.section}>
            <div className={styles.topRow}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.sectionTitle}>
                        Complete Lift<br />Solutions
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        The perfect blend of luxury design, advanced engineering, and seamless vertical mobility solutions crafted for modern UAE spaces.
                    </p>
                    <div style={{ height: "5rem" }} />
                    <Link href="/categories" className={styles.mainBtn}>View All Categories</Link>
                    <div style={{ height: "5rem" }} />
                </div>

                <div className={styles.carouselOuter} ref={outerRef}>
                    <div
                        ref={trackRef}
                        className={styles.carouselTrack}
                        style={{
                            transform:  `translateX(${offset}px)`,
                            transition: animating
                                ? "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                : "none",
                        }}
                    >
                        {activeCategories.map((cat, i) => (
                            <Link
                                key={cat._id}
                                href={cat.__fallback ? "/categories" : `/categories/${cat.slug || cat._id}`}
                                className={styles.catCard}
                            >
                                <div className={styles.catImgWrap}>
                                    <Image
                                        src={cat.image || cat.icon || FALLBACK_IMAGE}
                                        alt={cat.name}
                                        fill
                                        sizes="(max-width:640px) 80vw, 25vw"
                                        priority={i < 4}
                                        className={styles.catImg}
                                    />
                                </div>
                                <div className={styles.catLabel}>
                                    <span className={styles.catName}>{cat.name} ›</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.carouselFooter}>
                <button
                    className={styles.navBtn}
                    onClick={() => snapTo(current - 1)}
                    disabled={current === 0}
                    aria-label="Previous"
                >‹</button>
                <div className={styles.dots}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                            onClick={() => snapTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    className={styles.navBtn}
                    onClick={() => snapTo(current + 1)}
                    disabled={current === maxIndex}
                    aria-label="Next"
                >›</button>
            </div>
        </section>
    );
}
