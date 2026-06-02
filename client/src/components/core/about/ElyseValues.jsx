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
      {/* Background */}
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80&auto=format&fit=crop"
          alt="Luxury interior"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.content}>
        {/* Text block — top */}
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

        {/* All 5 cards in a single row */}
        <div className={styles.cardsRow}>
          {cards.map((card) => (
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
