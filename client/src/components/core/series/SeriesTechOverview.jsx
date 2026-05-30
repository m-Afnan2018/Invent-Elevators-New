import styles from "./SeriesTechOverview.module.css";

const SPEC_ICONS = {
  person: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  height: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v20M10 8l4-4 4 4M10 20l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  stops: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="5" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  traction: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 6v2M14 20v2M6 14h2M20 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  door: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="5" width="8" height="18" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="5" width="8" height="18" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 14h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  structure: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="5" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 5l18 18M23 5L5 23" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  ),
  glass: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="4" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 10h16M6 18h16M11 4v20M17 4v20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
};

const DEFAULT_SPECS = [
  { icon: "person",    label: "2 – 8",          sub: "Persons" },
  { icon: "height",    label: "Up to 18 m",      sub: "Travel Height" },
  { icon: "stops",     label: "Up to 6",         sub: "Stops" },
  { icon: "traction",  label: "Gearless",        sub: "Traction" },
  { icon: "door",      label: "Automatic",       sub: "Door" },
  { icon: "structure", label: "Self-Supported",  sub: "Structure" },
  { icon: "glass",     label: "Panoramic",       sub: "Glass Cabin" },
];

export default function SeriesTechOverview({ specs }) {
  const items = specs ?? DEFAULT_SPECS;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Technical Overview</p>
        <div className={styles.row}>
          {items.map((s) => (
            <div key={s.sub} className={styles.item}>
              <div className={styles.iconWrap}>{SPEC_ICONS[s.icon] ?? SPEC_ICONS.stops}</div>
              <span className={styles.value}>{s.label}</span>
              <span className={styles.sub}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
