"use client";
import styles from "./CategoryApps.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";

const FALLBACK_IMAGE = "/projects/city-centre.png";

export default function CategoryApps({ name = "This Category", apps = [] }) {
    const trackRef   = useRef(null);
    const outerRef   = useRef(null);
    const drag       = useRef({ active: false, startX: 0, startY: 0, startOffset: 0, isHorizontal: null });

    const [current,      setCurrent]      = useState(0);
    const [offset,       setOffset]       = useState(0);
    const [animating,    setAnimating]    = useState(false);
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

    const maxIndex = Math.max(0, apps.length - visibleCount);

    const getStepWidth = useCallback(() => {
        const track = trackRef.current;
        if (!track?.children[0]) return 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        return track.children[0].getBoundingClientRect().width + gap;
    }, []);

    const snapTo = useCallback((idx) => {
        const next = Math.max(0, Math.min(idx, maxIndex));
        const step = getStepWidth();
        if (!step) return;
        setAnimating(true);
        setOffset(-(next * step));
        setCurrent(next);
        setTimeout(() => setAnimating(false), 380);
    }, [maxIndex, getStepWidth]);

    useEffect(() => {
        const outer = outerRef.current;
        if (!outer) return;

        const onStart = (e) => {
            drag.current = {
                active:       true,
                startX:       e.touches[0].clientX,
                startY:       e.touches[0].clientY,
                startOffset:  -(current * getStepWidth()),
                isHorizontal: null,
            };
        };

        const onMove = (e) => {
            const d = drag.current;
            if (!d.active) return;
            const dx = e.touches[0].clientX - d.startX;
            const dy = e.touches[0].clientY - d.startY;
            if (d.isHorizontal === null) {
                if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
                d.isHorizontal = Math.abs(dx) >= Math.abs(dy);
            }
            if (!d.isHorizontal) return;
            e.preventDefault();
            const step   = getStepWidth();
            const maxOff = -(maxIndex * step);
            const raw    = d.startOffset + dx;
            const clamped = raw > 0      ? raw * 0.25
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
                idx = dx < 0 ? current + 1 : current - 1;
            } else {
                idx = Math.round(-drag.current.startOffset / step + -(dx / step));
            }
            snapTo(idx);
        };

        outer.addEventListener("touchstart", onStart, { passive: true  });
        outer.addEventListener("touchmove",  onMove,  { passive: false });
        outer.addEventListener("touchend",   onEnd,   { passive: true  });
        return () => {
            outer.removeEventListener("touchstart", onStart);
            outer.removeEventListener("touchmove",  onMove);
            outer.removeEventListener("touchend",   onEnd);
        };
    }, [current, maxIndex, getStepWidth, snapTo]);

    useEffect(() => {
        const step = getStepWidth();
        if (step) setOffset(-(current * step));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleCount]);

    return (
        <section className={styles.section}>
            <div className={styles.topRow}>
                <div className={styles.leftPanel}>
                    <p className={styles.eyebrow}>Use Cases</p>
                    <h2 className={styles.sectionTitle}>
                        Where {name}<br />Fits Best
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Discover the ideal environments and applications where our {name.toLowerCase()} solutions deliver the best performance and aesthetic impact.
                    </p>
                    <div style={{ height: "3rem" }} />
                    <Link href="/contact" className={styles.mainBtn}>Find Out More →</Link>
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
                        {apps.map((app, i) => (
                            <div key={i} className={styles.catCard}>
                                <div className={styles.catImgWrap}>
                                    <Image
                                        src={app.image || FALLBACK_IMAGE}
                                        alt={app.label}
                                        fill
                                        sizes="(max-width:640px) 80vw, 25vw"
                                        priority={i < 3}
                                        className={styles.catImg}
                                    />
                                </div>
                                <div className={styles.catLabel}>
                                    <span className={styles.catName}>{app.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {maxIndex > 0 && (
                <div className={styles.carouselFooter}>
                    <button className={styles.navBtn} onClick={() => snapTo(current - 1)} disabled={current === 0} aria-label="Previous">‹</button>
                    <div className={styles.dots}>
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                className={[styles.dot, i === current ? styles.dotActive : ""].join(" ")}
                                onClick={() => snapTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button className={styles.navBtn} onClick={() => snapTo(current + 1)} disabled={current === maxIndex} aria-label="Next">›</button>
                </div>
            )}
        </section>
    );
}
