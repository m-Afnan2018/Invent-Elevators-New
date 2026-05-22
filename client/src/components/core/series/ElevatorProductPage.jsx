"use client";

import { useState } from "react";
import styles from "./ElevatorProductPage.module.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const collections = [
  {
    id: "HT",
    name: "Heritage",
    tagline: "Timeless Craftsmanship",
    description:
      "A standard cabin lift installed inside your existing RCC shaft, finished entirely in Stainless Steel (SS 304). Heritage blends structural integrity with refined aesthetics — available in two signature finishes.",
    specs: [
      { label: "Shaft", value: "Client's RCC Shaft" },
      { label: "Material", value: "Stainless Steel SS 304" },
      { label: "Finishes", value: "2 Variants" },
    ],
    variants: [
      { name: "Magnetic Black", code: "MB", accent: "#1a1714" },
      { name: "Metallic Silver", code: "MS", accent: "#9fa5aa" },
    ],
    machines: ["Elite (European)", "Essential (Chinese/Japanese)"],
    accentColor: "#c8a96e",
    bgPattern: "heritage",
    codePrefix: "Inv-HT",
  },
  {
    id: "HZ",
    name: "Horizon",
    tagline: "Panoramic Perspective",
    description:
      "A panoramic lift with a steel shaft and an all-glass cabin car. Horizon opens up your home's vertical journey — visible, luminous, and available in the full RAL color spectrum.",
    specs: [
      { label: "Shaft", value: "Steel Shaft" },
      { label: "Cabin", value: "Full Glass Car" },
      { label: "Colors", value: "All RAL Colors" },
    ],
    variants: [],
    machines: ["Elite (European)", "Essential (Chinese/Japanese)"],
    accentColor: "#6ea8c8",
    bgPattern: "horizon",
    codePrefix: "Inv-HZ",
  },
  {
    id: "OB",
    name: "Orbit",
    tagline: "Circular Elegance",
    description:
      "A round lift with a steel or aluminium shaft and a curvature cabin. Choose between a glass cabin for transparency or a fibre cabin for a sculpted, opaque finish. Available in all RAL colors.",
    specs: [
      { label: "Shaft", value: "Steel or Aluminium" },
      { label: "Cabin Shape", value: "Round / Curvature" },
      { label: "Colors", value: "All RAL Colors" },
    ],
    variants: [
      { name: "Glass Cabin", code: "GL", accent: "#6ea8c8" },
      { name: "Fibre Sheet", code: "FS", accent: "#8a7a6a" },
    ],
    machines: ["Elite (European)", "Essential (Chinese/Japanese)"],
    accentColor: "#a8c86e",
    bgPattern: "orbit",
    codePrefix: "Inv-OB",
  },
  {
    id: "AS",
    name: "Aero",
    tagline: "No Pit. No Compromise.",
    description:
      "A slim-profile panoramic lift engineered to fit where others cannot. No pit required — Aero installs seamlessly into any home, combining space efficiency with open-air aesthetics.",
    specs: [
      { label: "Pit Required", value: "None" },
      { label: "Profile", value: "Slim Design" },
      { label: "View", value: "Panoramic" },
    ],
    variants: [],
    machines: ["Elite (European)", "Essential (Chinese/Japanese)"],
    accentColor: "#c86e6e",
    bgPattern: "aero",
    codePrefix: "Inv-AS",
  },
  {
    id: "AT",
    name: "Atelier",
    tagline: "Signature. Yours.",
    description:
      "Fully customizable across five levels of refinement — from lighting through to a signature 1-on-1 session with an interior designer. Atelier is not a product; it's a commission.",
    specs: [
      { label: "Customization", value: "5 Levels (L1–L5)" },
      { label: "Process", value: "Bespoke Design" },
      { label: "Scope", value: "Full Interior" },
    ],
    variants: [
      { name: "L1: Lighting", code: "L1", accent: "#c8a96e" },
      { name: "L2: + LOP/COP", code: "L2", accent: "#c8a96e" },
      { name: "L3: + Ceiling/Flooring", code: "L3", accent: "#c8a96e" },
      { name: "L4: + Shaft", code: "L4", accent: "#c8a96e" },
      { name: "L5: Interior Designer", code: "L5", accent: "#c8a96e" },
    ],
    machines: ["Elite (European)", "Essential (Chinese/Japanese)"],
    accentColor: "#c8a96e",
    bgPattern: "atelier",
    codePrefix: "Inv-AT",
  },
];

const capacityOptions = ["320 kg", "450 kg", "620 kg", "800 kg", "1000 kg", "1200 kg"];

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const ShaftIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
    <rect x="10" y="4" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M10 14h20M10 22h20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <rect x="15" y="16" width="10" height="8" rx="1" fill="currentColor" opacity="0.25" />
  </svg>
);

const CabinIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
    <rect x="8" y="10" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M14 10V8a6 6 0 0 1 12 0v2" stroke="currentColor" strokeWidth="2" />
    <circle cx="20" cy="21" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ColorIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
    <path d="M20 8v24M8 20h24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.3" />
  </svg>
);

const PitIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
    <path d="M8 32h24M12 32V20h16v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 14l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 35h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const CustomIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
    <path
      d="M20 6l2.5 7.5H30l-6 4.5 2.5 7.5L20 21l-6.5 4.5 2.5-7.5-6-4.5h7.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const specIconForLabel = (label) => {
  const l = label.toLowerCase();
  if (l.includes("shaft")) return ShaftIcon;
  if (l.includes("cabin") || l.includes("material")) return CabinIcon;
  if (l.includes("color")) return ColorIcon;
  if (l.includes("pit")) return PitIcon;
  return CustomIcon;
};

// ── Background Patterns ───────────────────────────────────────────────────────

const patterns = {
  heritage: (
    <svg className={styles.patternSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#c8a96e" strokeWidth="0.5" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#hatch)" />
      <rect x="160" y="20" width="80" height="360" rx="4" fill="#c8a96e" opacity="0.05" />
      <rect x="170" y="10" width="8" height="380" rx="4" fill="#c8a96e" opacity="0.08" />
      <rect x="222" y="10" width="8" height="380" rx="4" fill="#c8a96e" opacity="0.08" />
    </svg>
  ),
  horizon: (
    <svg className={styles.patternSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="180" width="400" height="2" fill="#6ea8c8" opacity="0.12" />
      <rect x="0" y="200" width="400" height="1" fill="#6ea8c8" opacity="0.08" />
      <rect x="0" y="220" width="400" height="2" fill="#6ea8c8" opacity="0.06" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="400" stroke="#6ea8c8" strokeWidth="0.5" opacity="0.06" />
      ))}
      <ellipse cx="200" cy="200" rx="140" ry="30" fill="none" stroke="#6ea8c8" strokeWidth="0.8" opacity="0.1" />
    </svg>
  ),
  orbit: (
    <svg className={styles.patternSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {[60, 100, 140, 180].map((r, i) => (
        <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="#a8c86e" strokeWidth="0.8" opacity={0.07 - i * 0.01} />
      ))}
      <circle cx="200" cy="200" r="20" fill="#a8c86e" opacity="0.06" />
    </svg>
  ),
  aero: (
    <svg className={styles.patternSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 200 Q200 100 400 200 Q200 300 0 200Z" fill="#c86e6e" opacity="0.04" />
      <path d="M0 200 Q200 140 400 200" stroke="#c86e6e" strokeWidth="1" fill="none" opacity="0.08" />
      <path d="M0 200 Q200 160 400 200" stroke="#c86e6e" strokeWidth="0.5" fill="none" opacity="0.05" />
    </svg>
  ),
  atelier: (
    <svg className={styles.patternSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diamonds" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="none" stroke="#c8a96e" strokeWidth="0.5" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#diamonds)" />
    </svg>
  ),
};

// ── CollectionCard ────────────────────────────────────────────────────────────

function CollectionCard({ collection, isActive, onClick }) {
  const { name, tagline, description, specs, variants, machines, accentColor, bgPattern, id } = collection;
  const specCount = specs.length;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
      style={{
        borderColor: isActive ? accentColor : undefined,
        boxShadow: isActive
          ? `0 8px 32px ${accentColor}22, 0 2px 8px rgba(0,0,0,0.06)`
          : undefined,
      }}
      onClick={onClick}
    >
      {/* Card visual header */}
      <div className={styles.cardHeader}>
        <div className={styles.patternLayer}>{patterns[bgPattern]}</div>
        <div className={styles.cardHeaderContent}>
          <p className={styles.cardEyebrow} style={{ color: accentColor }}>
            {id} Collection
          </p>
          <h3 className={styles.cardName}>{name}</h3>
          <p className={styles.cardTagline}>{tagline}</p>
        </div>
        <div
          className={styles.cardActiveStripe}
          style={{ background: isActive ? accentColor : "transparent" }}
        />
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>{description}</p>

        {/* Mini specs */}
        <div
          className={styles.miniSpecGrid}
          style={{ gridTemplateColumns: `repeat(${specCount}, 1fr)` }}
        >
          {specs.map((spec) => {
            const Icon = specIconForLabel(spec.label);
            return (
              <div key={spec.label} className={styles.miniSpecCell}>
                <div className={styles.miniSpecIcon} style={{ color: accentColor }}>
                  <Icon />
                </div>
                <p className={styles.miniSpecLabel}>{spec.label}</p>
                <p className={styles.miniSpecValue}>{spec.value}</p>
              </div>
            );
          })}
        </div>

        {/* Variants */}
        {variants.length > 0 && (
          <div className={styles.variantsSection}>
            <p className={styles.variantsSectionLabel}>Variants</p>
            <div className={styles.variantTagList}>
              {variants.map((v) => (
                <span
                  key={v.code}
                  className={styles.variantTag}
                  style={{
                    border: `1px solid ${v.accent}55`,
                    color: v.accent === "#c8a96e" ? accentColor : v.accent,
                    background: `${v.accent}08`,
                  }}
                >
                  {v.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Machine badges */}
        <div className={styles.machineBadgeList}>
          {machines.map((m) => (
            <span key={m} className={styles.machineBadge}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ConfiguratorPanel ─────────────────────────────────────────────────────────

function ConfiguratorPanel({ collection }) {
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [travel, setTravel] = useState("");

  const { name, variants, machines, accentColor, id } = collection;

  const machineCode = selectedMachine === 0 ? "EE" : "EC";
  const variantCode = variants.length > 0 ? variants[selectedVariant]?.code : null;
  const productCode = `Inv-${id}-${machineCode}${variantCode ? `-${variantCode}` : ""}`;

  return (
    <div
      className={styles.configurator}
      style={{
        border: `1px solid ${accentColor}44`,
        boxShadow: `0 8px 40px ${accentColor}18`,
      }}
    >
      <p className={styles.configuratorEyebrow} style={{ color: accentColor }}>
        Configure Your Lift
      </p>
      <h2 className={styles.configuratorTitle}>{name} Collection</h2>

      {/* Machine Type */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Machine Type</label>
        <div className={styles.machineRow}>
          {machines.map((m, i) => (
            <button
              key={m}
              className={styles.machineBtn}
              onClick={() => setSelectedMachine(i)}
              style={{
                border: `1.5px solid ${selectedMachine === i ? accentColor : "#e8e3db"}`,
                background: selectedMachine === i ? `${accentColor}12` : "#fdfcfa",
                color: selectedMachine === i ? "#1a1714" : "#5a5550",
                fontWeight: selectedMachine === i ? 700 : 400,
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Variants */}
      {variants.length > 0 && (
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>
            {id === "AT" ? "Customization Level" : "Variant"}
          </label>
          <div className={styles.variantBtnList}>
            {variants.map((v, i) => (
              <button
                key={v.code}
                className={styles.variantBtn}
                onClick={() => setSelectedVariant(i)}
                style={{
                  border: `1.5px solid ${selectedVariant === i ? accentColor : "#e8e3db"}`,
                  background: selectedVariant === i ? `${accentColor}10` : "#fdfcfa",
                  color: selectedVariant === i ? "#1a1714" : "#5a5550",
                  fontWeight: selectedVariant === i ? 700 : 400,
                }}
              >
                <span>{v.name}</span>
                <span className={styles.variantBtnCode} style={{ color: accentColor }}>
                  {v.code}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Capacity */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Capacity</label>
        <div className={styles.capacityRow}>
          {capacityOptions.map((c, i) => (
            <button
              key={c}
              className={styles.capacityBtn}
              onClick={() => setSelectedCapacity(i)}
              style={{
                border: `1.5px solid ${selectedCapacity === i ? accentColor : "#e8e3db"}`,
                background: selectedCapacity === i ? `${accentColor}12` : "#fdfcfa",
                color: selectedCapacity === i ? "#1a1714" : "#5a5550",
                fontWeight: selectedCapacity === i ? 700 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Travel */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Travel</label>
        <input
          type="text"
          className={styles.travelInput}
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
          placeholder="e.g. G+3, B+G+2, B2+G+5"
          onFocus={(e) => (e.target.style.borderColor = accentColor)}
          onBlur={(e) => (e.target.style.borderColor = "#e8e3db")}
        />
      </div>

      {/* Product Code */}
      <div className={styles.codeBlock}>
        <div>
          <p className={styles.codeBlockLabel}>Product Code</p>
          <p className={styles.codeBlockValue} style={{ color: accentColor }}>
            {productCode}
          </p>
        </div>
        <button
          className={styles.copyBtn}
          onClick={() => navigator.clipboard?.writeText(productCode)}
          style={{
            border: `1px solid ${accentColor}44`,
            background: `${accentColor}20`,
            color: accentColor,
          }}
        >
          Copy
        </button>
      </div>

      <button
        className={styles.quoteBtn}
        style={{ background: accentColor }}
      >
        Request a Quote
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ElevatorProductPage() {
  const [activeCollection, setActiveCollection] = useState(0);
  const active = collections[activeCollection];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <p className={styles.headerEyebrow}>Invent Elevators — Product Collections</p>
        <h1 className={styles.headerTitle}>Elevate Every Journey</h1>
        <p className={styles.headerSubtitle}>
          Five distinct collections, each engineered for a different vision of home mobility.
          Select a collection to explore and configure.
        </p>
      </header>

      {/* Content */}
      <main className={styles.content}>
        {/* Collection Cards */}
        <div className={styles.collectionGrid}>
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              collection={col}
              isActive={activeCollection === i}
              onClick={() => setActiveCollection(i)}
            />
          ))}
        </div>

        {/* Detail + Configurator */}
        <div className={styles.detailRow}>
          {/* Detail Panel */}
          <div className={styles.detailPanel}>
            {/* Pattern header */}
            <div className={styles.detailHeader}>
              <div className={styles.patternLayer}>{patterns[active.bgPattern]}</div>
              <div className={styles.detailHeaderContent}>
                <p className={styles.detailEyebrow} style={{ color: active.accentColor }}>
                  {active.id} — {active.tagline}
                </p>
                <h2 className={styles.detailTitle}>{active.name}</h2>
              </div>
            </div>

            <div className={styles.detailBody}>
              {/* Description */}
              <p
                className={styles.detailDescription}
                style={{ borderLeft: `3px solid ${active.accentColor}` }}
              >
                {active.description}
              </p>

              {/* Spec Cards */}
              <div className={styles.detailSpecGrid}>
                {active.specs.map((spec) => {
                  const Icon = specIconForLabel(spec.label);
                  return (
                    <div key={spec.label} className={styles.detailSpecCard}>
                      <div className={styles.detailSpecIconWrap}>
                        <Icon />
                      </div>
                      <p className={styles.detailSpecLabel}>{spec.label}</p>
                      <p
                        className={styles.detailSpecValue}
                        style={{ color: active.accentColor }}
                      >
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Variant Detail */}
              {active.variants.length > 0 && (
                <div>
                  <p className={styles.variantDetailHeading}>Available Variants</p>
                  <div className={styles.variantDetailList}>
                    {active.variants.map((v) => (
                      <div
                        key={v.code}
                        className={styles.variantDetailItem}
                        style={{
                          border: `1px solid ${v.accent}44`,
                          background: `${v.accent}08`,
                        }}
                      >
                        <span
                          className={styles.variantDot}
                          style={{ background: v.accent }}
                        />
                        <span className={styles.variantDetailName}>{v.name}</span>
                        <span
                          className={styles.variantDetailCode}
                          style={{
                            color: v.accent === "#c8a96e" ? active.accentColor : v.accent,
                          }}
                        >
                          {v.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configurator */}
          <ConfiguratorPanel collection={active} />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Product codes follow the format{" "}
          <span className={styles.footerCode}>Inv-[Collection]-[Machine]-[Variant]</span>
          {" "}— eg.{" "}
          <span className={styles.footerCode}>Inv-AT-EE-L4</span>
        </p>
      </footer>
    </div>
  );
}
