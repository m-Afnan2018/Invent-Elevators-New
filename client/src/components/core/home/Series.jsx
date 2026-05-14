"use client";
import styles from "./Series.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback } from "react"; // useCallback kept for goTo

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80";

export default function Series({ activeCategories = [] }) {
    const trackRef = useRef(null);
    const [current, setCurrent] = useState(0);

    const VISIBLE = 3;
    const maxIndex = Math.max(0, activeCategories.length - VISIBLE);

    const goTo = useCallback(
        (idx) => {
            const next = Math.max(0, Math.min(idx, maxIndex));
            setCurrent(next);

            const track = trackRef.current;
            if (!track) return;

            // Measure the first card + gap to get one "step" exactly
            const cards = track.children;
            if (!cards[0]) return;

            const gap = parseFloat(getComputedStyle(track).gap) || 20;
            const stepWidth = cards[0].getBoundingClientRect().width + gap;

            track.scrollTo({ left: next * stepWidth, behavior: "smooth" });
        },
        [maxIndex]
    );

    return (
        <section className={styles.section}>
            {/* ── Top row: left label + cards ── */}
            <div className={styles.topRow}>
                {/* Left panel */}
                <div className={styles.leftPanel}>
                    <h2 className={styles.sectionTitle}>
                        Complete Lift<br />Solutions
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        The perfect blend of luxury design, advanced engineering, and seamless vertical mobility solutions crafted for modern UAE spaces.
                    </p>
                </div>

                {/* Carousel */}
                <div className={styles.carouselOuter}>
                    <div className={styles.carouselTrack} ref={trackRef}>
                        {activeCategories.map((cat, i) => (
                            <Link
                                key={cat._id}
                                href={cat.__fallback ? "/categories" : `/categories/${cat._id}`}
                                className={styles.catCard}
                            >
                                <div className={styles.catImgWrap}>
                                    <Image
                                        src={cat.image || FALLBACK_IMAGE}
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

            {/* ── Bottom nav ── */}
            <div className={styles.carouselFooter}>
                <button
                    className={styles.navBtn}
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    aria-label="Previous"
                >
                    ‹
                </button>
                <div className={styles.dots}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    className={styles.navBtn}
                    onClick={() => goTo(current + 1)}
                    disabled={current === maxIndex}
                    aria-label="Next"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
