import styles from "./ModernLiving.module.css";

const features = [
  {
    id: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 22V13l6-4 6 4v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="13" y="17" width="6" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Strong Engineering Foundation",
    description:
      "We are built on advanced lift engineering principles, ensuring every system delivers stability, durability, and smooth vertical mobility.",
  },
  {
    id: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26V10l10-6 10 6v16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 4v22M6 14h20M6 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Innovative Lift Solutions",
    description:
      "Invent Elevator focuses on compact, screw-driven and hydraulic technologies designed for efficient installation and optimal space utilization.",
  },
  {
    id: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="5" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 12h22M12 12v15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 17h5M17 21h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Proven Industry Expertise",
    description:
      "With years of hands-on experience in elevator design and installation, we continue to refine our systems to meet evolving architectural demands.",
  },
  {
    id: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6a10 10 0 1 1 0 20A10 10 0 0 1 16 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Reliable Customer Support",
    description:
      "From consultation to installation and after-sales service, our team ensures consistent support and professional assistance at every stage.",
  },
];

export default function ModernLiving() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left Column: Title ── */}
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Invent Elevator –<br />Engineered for<br />Modern Living
          </h2>
        </div>

        {/* ── Right Column: Description + Feature Cards ── */}
        <div className={styles.right}>
          <p className={styles.intro}>
            The journey of Invent Elevator began with a simple vision — to deliver smart,
            space-efficient, and reliable lift solutions for modern buildings. Today, we
            continue to grow as a forward-thinking elevator company while staying committed
            to engineering precision, safety standards, and customer satisfaction.
          </p>

          {/* Feature Cards Grid */}
          <div className={styles.grid}>
            {features.map((feature) => (
              <div key={feature.id} className={styles.card}>
                <div className={styles.iconWrap}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
