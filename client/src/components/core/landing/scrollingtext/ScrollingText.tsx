"use client";

import { useEffect, useRef, useMemo } from "react";
import styles from "./ScrollingText.module.css";

// Each line: text segments + inline image positions
// imageSlot: "before" | "after" the segment, or null
interface Segment {
  text: string;
  color: "dark" | "gold" | "muted";
  imageSrc?: string; // image shown BEFORE this segment
  imageAfter?: boolean; // if true, image comes AFTER segment text
}

interface Line {
  segments: Segment[];
  direction: "left" | "right"; // scroll direction on reveal
}

const lines: Line[] = [
  {
    direction: "left",
    segments: [
      {
        text: "BEFORE YOU INSTALL",
        color: "dark",
        imageSrc: "/images/Rectangle 75.png",
      },
    ],
  },
  {
    direction: "right",
    segments: [
      { text: "LIFTS, ", color: "dark" },
      { text: "BUILD", color: "gold" },
      {
        text: " THE",
        color: "dark",
        imageAfter: true,
        imageSrc: "/images/Rectangle 76.png",
      },
    ],
  },
  {
    direction: "left",
    segments: [{ text: "SYSTEM — SAFETY,", color: "muted" }],
  },
  {
    direction: "right",
    segments: [
      {
        text: "PERFORMANCE, AND",
        color: "muted",
        imageSrc: "/images/Rectangle 77.png",
      },
    ],
  },
  {
    direction: "left",
    segments: [
      {
        text: "PRECISION.",
        color: "muted",
        imageAfter: true,
        imageSrc: "/images/Rectangle 78.png",
      },
    ],
  },
];

export default function ScrollingText() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { enrichedLines, totalWords } = useMemo(() => {
    let count = 0;
    const enriched = lines.map(line => ({
      ...line,
      segments: line.segments.map(seg => ({
        ...seg,
        words: seg.text.split(" ").map((w, idx, arr) => ({
          textPart: w + (idx < arr.length - 1 ? " " : ""),
          globalIndex: count++
        }))
      }))
    }));
    return { enrichedLines: enriched, totalWords: count };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Change color as the section crosses a specific "trigger line" 
      // (e.g., 60% down the viewport) so the effect happens in full view.
      const trigger = windowHeight * 0.6;
      const distance = rect.height || 1; // prevent division by zero

      let progress = (trigger - rect.top) / distance;
      progress = Math.max(0, Math.min(1, progress));

      // Leading edge defines how many words are "gold" at once 
      // before turning black.
      const LEADING_EDGE = 1;
      const activeWord = Math.floor(progress * (totalWords + LEADING_EDGE));

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        // Sudden change: NO transition in CSS, instantly snap inline style
        if (i < activeWord - LEADING_EDGE) {
          el.style.color = "#000000"; // Black
        } else if (i <= activeWord && i >= activeWord - LEADING_EDGE - 1) {
          el.style.color = "#b59a6a"; // Gold
        } else {
          el.style.color = "#897F7F"; // Grey
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalWords]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {enrichedLines.map((line, li) => (
          <div
            key={li}
            className={styles.line}
          >
            {line.segments.map((seg, si) => (
              <span key={si} className={styles.segment}>
                {/* Image BEFORE text */}
                {seg.imageSrc && !seg.imageAfter && (
                  <span className={styles.imgWrap}>
                    <img src={seg.imageSrc} alt="" className={styles.inlineImg} />
                  </span>
                )}

                <span className={styles.word}>
                  {seg.words.map((w, wi) => (
                    <span
                      key={wi}
                      ref={(el) => {
                        wordRefs.current[w.globalIndex] = el;
                      }}
                    >
                      {w.textPart}
                    </span>
                  ))}
                </span>

                {/* Image AFTER text */}
                {seg.imageSrc && seg.imageAfter && (
                  <span className={styles.imgWrap}>
                    <img src={seg.imageSrc} alt="" className={styles.inlineImg} />
                  </span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
