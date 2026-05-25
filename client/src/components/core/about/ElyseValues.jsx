import styles from "./ElyseValues.module.css";

const cards = [
  {
    id: 1,
    title: ["ARCHITECTURAL", "HARMONY"],
    description: "Every elevator is crafted to complement and integrate with the surrounding architecture.",
  },
  {
    id: 2,
    title: ["DISCRETION &", "EXCLUSIVITY"],
    description: "Silent operation and bespoke finishes crafted for those who demand the finest standards.",
    hasImage: true,
  },
  {
    id: 3,
    title: ["CULTURAL", "ENRICHMENT"],
    description: "Design influenced by the richness of UAE culture, reflecting heritage in every detail.",
  },
  {
    id: 4,
    title: ["COMMUNITY &", "CONNECTION"],
    description: "Fostering meaningful connections within residences through elegant shared experiences.",
  },
  {
    id: 5,
    title: ["SUSTAINABLE", "ELEGANCE"],
    description: "Energy-efficient systems that honour our commitment to the environment without compromise.",
  },
];

export default function ElyseValues() {
  return (
    <section className={styles.section}>
      {/* Background image */}
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80&auto=format&fit=crop"
          alt="Luxury interior"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Top-right text block */}
      <div className={styles.textBlock}>
        <p className={styles.textPrimary}>
          At Invent Elevator, we believe that a home is more than a physical
          space — it is an extension of who you are, shaped by refined taste
          and personal vision.
        </p>
        <p className={styles.textSecondary}>
          Our mission is to reimagine vertical mobility as an experience of
          luxury, comfort, and architectural excellence — crafted for the
          discerning homes of the UAE.
        </p>
      </div>

      {/* Cards grid */}
      <div className={styles.grid}>
        {/* Row 1: cards 1 and 2 */}
        <div className={styles.row1}>
          {cards.slice(0, 2).map((card) => (
            <div key={card.id} className={`${styles.card} ${card.hasImage ? styles.cardWithImage : ""}`}>
              {card.hasImage && (
                <div className={styles.cardImageWrap}>
                  <img
                    src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&q=80&auto=format&fit=crop"
                    alt="Elevator detail"
                    className={styles.cardImage}
                  />
                </div>
              )}
              <div className={styles.cardInner}>
                <div className={styles.cardIcon}>
                  <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 Q15 30 30 0 Q45 30 60 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>
                  {card.title.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </h3>
                <p className={styles.cardDesc}>{card.description}</p>
                <span className={styles.cardNum}>( {card.id} )</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: cards 3, 4, 5 */}
        <div className={styles.row2}>
          {cards.slice(2).map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardIcon}>
                  <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 Q15 30 30 0 Q45 30 60 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>
                  {card.title.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </h3>
                <p className={styles.cardDesc}>{card.description}</p>
                <span className={styles.cardNum}>( {card.id} )</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
