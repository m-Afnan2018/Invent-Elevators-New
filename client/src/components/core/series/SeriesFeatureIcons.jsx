import styles from "./SeriesFeatureIcons.module.css";

const ICONS = {
  glass: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="4" width="24" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 12h24M6 22h24M14 4v28M22 4v28" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    </svg>
  ),
  structure: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 4l28 28M32 4L4 32" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <rect x="14" y="14" width="8" height="8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  drive: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 6v4M18 26v4M6 18h4M26 18h4M9.5 9.5l2.8 2.8M23.7 23.7l2.8 2.8M9.5 26.5l2.8-2.8M23.7 12.3l2.8-2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  door: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="5" width="12" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="20" y="5" width="12" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 18H20M14 18l-4-4M14 18l-4 4M22 18l4-4M22 18l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  energy: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M20 4L8 20h10l-2 12 12-16H18L20 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  control: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="6" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="23" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="23" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="23" cy="23" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
};

const DEFAULT_FEATURES = [
  { icon: "glass",     label: "Glass Cabin",         desc: "Uninterrupted panoramic views throughout the journey." },
  { icon: "structure", label: "Robust Structure",     desc: "Minimal structural intervention and faster installation." },
  { icon: "drive",     label: "Gearless Drive",       desc: "Quiet, smooth and energy-efficient performance." },
  { icon: "door",      label: "Automatic Doors",      desc: "Seamless and safe access with premium automatic doors." },
  { icon: "energy",    label: "Energy Efficient",     desc: "Designed to reduce power consumption without compromise." },
  { icon: "control",   label: "Smart Controls",       desc: "Modern interfaces and intelligent functionality." },
];

export default function SeriesFeatureIcons({ features }) {
  const items = features ?? DEFAULT_FEATURES;
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((f) => (
          <div key={f.label} className={styles.item}>
            <div className={styles.iconWrap}>{ICONS[f.icon] ?? ICONS.control}</div>
            <h3 className={styles.label}>{f.label}</h3>
            <p className={styles.desc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
