import Image from "next/image";
import styles from "./PhilosophySection.module.css";

const pillars = [
  {
    id: 1,
    title: "Holistic\nWell-Being",
    description: "Every elevator is designed to nurture comfort and enhance the well-being of every resident.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1" />
        <path d="M10 5v5l3 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Discretion &\nExclusivity",
    description: "Silent operation and bespoke finishes crafted for those who demand the finest standards.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Architectural\nHarmony",
    description: "Seamlessly integrated with your interior vision — every detail is considered.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M3 8h14M8 3v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Cultural\nEnrichment",
    description: "Design influenced by the richness of UAE culture, reflecting heritage in every element.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <path d="M4 16V8l6-5 6 5v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7.5" y="11" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Community &\nConnection",
    description: "Fostering meaningful connections within residences through elegant shared experiences.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="14" cy="7" r="3" stroke="currentColor" strokeWidth="1" />
        <path d="M2 17c0-3.3 2.2-5 5-5M18 17c0-3.3-2.2-5-5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Sustainable\nElegance",
    description: "Energy-efficient systems that honour our commitment to the environment without compromise.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <path d="M10 2C6 2 3 5 3 9c0 3 1.5 5 4 6.5V18h6v-2.5C15.5 14 17 12 17 9c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PhilosophySection() {
  return (
    <section className={styles.section}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=85&fit=crop"
          alt="Luxury interior"
          fill
          sizes="100vw"
          className={styles.bgImg}
          priority
        />
      </div>
      <div className={styles.overlay} />

      {/* Content wrapper */}
      <div className={styles.content}>

        {/* Top area: empty left | text right */}
        <div className={styles.topArea}>
          <div />
          <div className={styles.textBlock}>
            <span className={styles.eyebrow}>Our Philosophy</span>
            <p className={styles.intro}>
              At Invent Elevator, we believe that a home is more than a physical
              space — it is the centre of your experience, where every element
              speaks to your refined taste and personal vision.
            </p>
            <p className={styles.intro}>
              Our mission is to reimagine vertical mobility as an expression of
              luxury, comfort, and architectural excellence.
            </p>
          </div>
        </div>

        {/* Full-width 3×2 card grid */}
        <div className={styles.grid}>
          {pillars.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardDecor}>{p.icon}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
