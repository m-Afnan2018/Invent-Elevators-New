import styles from "./Spirit.module.css";

export default function Spirit() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left Column: Content ── */}
        <div className={styles.contentCol}>
          <h2 className={styles.heading}>The Spirit of Invent Elevator</h2>
          <div className={styles.bodyGroup}>
            <p className={styles.body}>
              It all started with a vision — to simplify vertical mobility and make modern
              lift solutions more accessible, efficient, and reliable. What began as a
              focused engineering initiative has grown into a trusted elevator solutions
              provider serving residential and commercial spaces.
            </p>
            <p className={styles.body}>
              At Invent Elevator, innovation is not just about technology — it is about
              improving everyday movement within buildings. Our commitment to precision,
              safety, and performance continues to drive everything we build.
            </p>
            <p className={styles.body}>
              Discover what makes Invent Elevator a forward-thinking lift company built
              for modern architecture.
            </p>
          </div>
        </div>

        {/* ── Right Column: Image ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            {/* Replace src with your actual warehouse/forklift image */}
            <img
              src="/images/spirit-warehouse.jpg"
              alt="Invent Elevator warehouse operations"
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>

      </div>
    </section>
  );
}
