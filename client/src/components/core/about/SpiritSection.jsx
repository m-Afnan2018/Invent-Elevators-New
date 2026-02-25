"use client";
import Image from "next/image";
import styles from "./SpiritSection.module.css";

export default function SpiritSection() {
  return (
    <section className={styles.section}>
      {/* Background image with overlay */}
      <div className={styles.bgWrapper}>
        <Image
          width={1000}
          height={1000}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1800&q=85&fit=crop"
          alt="Industrial warehouse with forklift"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        {/* Left: large decorative quote / accent */}
        <div className={styles.left}>
          <div className={styles.accentLine} />
          <p className={styles.pullQuote}>
            &quot;Innovation is not just about technology — it is about improving
            everyday movement within buildings.&quot;
          </p>
          <div className={styles.tagRow}>
            <span className={styles.tag}>Est. 2005</span>
            <span className={styles.tagDot} />
            <span className={styles.tag}>Engineering-Led</span>
            <span className={styles.tagDot} />
            <span className={styles.tag}>Global Reach</span>
          </div>
        </div>

        {/* Right: content */}
        <div className={styles.right}>
          <p className={styles.eyebrow}>Our Philosophy</p>
          <h2 className={styles.heading}>The Spirit of Invent Elevator</h2>
          <div className={styles.divider} />
          <p className={styles.body}>
            It all started with a vision to simplify vertical mobility and make
            modern lift solutions more accessible, efficient, and reliable. What
            began as a focused engineering initiative has grown into a trusted
            elevator solutions provider serving residential and commercial spaces.
          </p>
          <p className={styles.body}>
            At Invent Elevator, innovation is not just about technology — it is
            about improving everyday movement within buildings. Our commitment to
            precision, safety, and performance continues to drive everything we
            build. Discover what makes Invent Elevator a forward-thinking lift
            company built for modern architecture.
          </p>

          {/* Metrics row */}
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricNumber}>98%</span>
              <span className={styles.metricLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metric}>
              <span className={styles.metricNumber}>500+</span>
              <span className={styles.metricLabel}>Projects Delivered</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metric}>
              <span className={styles.metricNumber}>20+</span>
              <span className={styles.metricLabel}>Industry Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
