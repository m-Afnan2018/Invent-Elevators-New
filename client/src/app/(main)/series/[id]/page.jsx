"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import WhereHorizonFitsBest from "@/components/core/series/WhereHorizonFitsBest";
import CraftedAroundYourHome from "@/components/core/series/CraftedAroundYourHome";

/* ── Static Series Data ── */
const SERIES_DATA = {
  heritage: {
    code: "HT",
    name: "Heritage",
    tagline: "Built for What Endures.",
    pitFree: false,
    description:
      "The Heritage series is engineered for permanence — every component selected for its ability to perform reliably for decades. Built for RCC shaft construction, it supports both Essential and Elite machine configurations, making it the preferred choice for residential towers, commercial buildings, and landmark developments across the UAE.",
    heroImage: "/series/heritage.png",
    images: [
      "/series/heritage.png",
      "/projects/adnoc.png",
      "/projects/downtown.png",
      "/projects/palm-jumeirah.png",
    ],
    details: [
      { label: "Shaft Type", value: "RCC (Reinforced Concrete)" },
      { label: "Capacity Range", value: "320 kg – 1200 kg" },
      { label: "Drive System", value: "Traction / MRL" },
      { label: "Speed", value: "Up to 2.5 m/s" },
    ],
    tiers: [
      {
        name: "Essential",
        subtitle: "Global Standard",
        bullets: [
          "Globally-sourced precision components",
          "Reliable performance across all climates",
          "Suitable for mid-rise and commercial use",
          "Shorter lead times and competitive cost",
          "3-year parts and labour warranty",
        ],
      },
      {
        name: "Elite",
        subtitle: "European Grade",
        bullets: [
          "Premium European-engineered machines",
          "Superior ride quality and whisper-quiet operation",
          "Ultra-low vibration and extended service life",
          "Ideal for luxury residential and premium projects",
          "5-year comprehensive warranty",
        ],
      },
    ],
    cabinStyles: [
      {
        name: "Select",
        label: "Classically Simple",
        image: "/projects/adnoc.png",
        desc: "Clean stainless panels, LED ceiling, ergonomic handrail. Ready to deploy.",
      },
      {
        name: "Signature",
        label: "Elevated Design",
        image: "/projects/downtown.png",
        desc: "Premium panel materials, mood lighting, and custom flooring options.",
      },
      {
        name: "Bespoke",
        label: "Fully Custom",
        image: "/projects/palm-jumeirah.png",
        desc: "Every surface tailored to specification — for projects without compromise.",
      },
    ],
    finishes: [
      { name: "Silver Satin", color: "#B8B8B8" },
      { name: "Silver Mirror", color: "#D6D6D6" },
      { name: "Gold Mirror", color: "#D4AF37" },
      { name: "Brushed Gold", color: "#BFA050" },
      { name: "Champagne Gold", color: "#EDD9A3" },
      { name: "Dark Bronze", color: "#5C3D2E" },
      { name: "Matte Black", color: "#1A1A1A" },
      { name: "Pearl White", color: "#F2F0EB" },
    ],
    applications: [
      { label: "Luxury Villas", image: "/projects/downtown.png" },
      { label: "High-Rise Towers", image: "/projects/adnoc.png" },
      { label: "Architecture & Heritage", image: "/projects/al-majaz.png" },
      { label: "Commercial Buildings", image: "/projects/city-centre.png" },
    ],
  },
  horizon: {
    code: "HZ",
    name: "Horizon",
    tagline: "Light. Space. Movement.",
    pitFree: false,
    description:
      "The Horizon series redefines vertical mobility through the language of transparency. Built for mild-steel shaft construction with full-glass or semi-glass cabin options, it transforms an elevator into a design statement. Ideal for architectural interiors, hotel atriums, and high-end retail spaces.",
    heroImage: "/series/horizon.png",
    images: [
      "/series/horizon.png",
      "/projects/yas-island.png",
      "/projects/city-centre.png",
      "/projects/al-majaz.png",
    ],
    details: [
      { label: "Shaft Type", value: "MS (Mild Steel) Shaft" },
      { label: "Capacity Range", value: "320 kg – 1000 kg" },
      { label: "Drive System", value: "Traction / Hydraulic" },
      { label: "Cabin Style", value: "Glass Cabin Car" },
    ],
    tiers: [
      {
        name: "Essential",
        subtitle: "Global Standard",
        bullets: [
          "Global drive systems with glass cabin design",
          "Full visual impact at accessible cost",
          "LED interior lighting as standard",
          "Aluminium frame with clear anodised finish",
          "3-year parts and labour warranty",
        ],
      },
      {
        name: "Elite",
        subtitle: "European Grade",
        bullets: [
          "European precision motors and controllers",
          "Enhanced vibration isolation for silent travel",
          "Perfectly smooth journey through full glass cabin",
          "Low-energy regenerative drive technology",
          "5-year comprehensive warranty",
        ],
      },
    ],
    cabinStyles: [
      {
        name: "Select",
        label: "Crystal Clear",
        image: "/projects/yas-island.png",
        desc: "Full glass panels, clear anodised frames, LED strip lighting, sleek handrail.",
      },
      {
        name: "Signature",
        label: "Tinted Elegance",
        image: "/projects/city-centre.png",
        desc: "Tinted or frosted glass, custom frame colours, integrated ceiling lighting.",
      },
      {
        name: "Bespoke",
        label: "Architect Specified",
        image: "/projects/al-majaz.png",
        desc: "Architect-specified glass, frame material, and lighting scheme built to drawing.",
      },
    ],
    finishes: [
      { name: "Clear Glass", color: "#DDE8F0" },
      { name: "Frosted Glass", color: "#E8EDEF" },
      { name: "Bronze Tint", color: "#C4A882" },
      { name: "Smoke Grey", color: "#8E9BA4" },
      { name: "Silver Frame", color: "#C2C2C2" },
      { name: "Black Frame", color: "#1A1A1A" },
      { name: "Gold Frame", color: "#D4AF37" },
      { name: "Pearl White", color: "#F2F0EB" },
    ],
    applications: [
      { label: "Hotel Atriums", image: "/projects/yas-island.png" },
      { label: "Retail Centres", image: "/projects/city-centre.png" },
      { label: "Corporate Lobbies", image: "/projects/adnoc.png" },
      { label: "Waterfront Residences", image: "/projects/al-majaz.png" },
    ],
  },
  orbit: {
    code: "OB",
    name: "Orbit",
    tagline: "Round by Design. Refined by Purpose.",
    pitFree: false,
    description:
      "The Orbit series centres on the circle — a form that has no hard edges and no hierarchy. Designed for circular or curved shaft structures, the Orbit delivers a panoramic cabin experience unlike any other in our range. The choice of architects who want the elevator itself to be a landmark.",
    heroImage: "/series/orbit.png",
    images: [
      "/series/orbit.png",
      "/projects/palm-jumeirah.png",
      "/projects/downtown.png",
      "/projects/yas-island.png",
    ],
    details: [
      { label: "Shaft Type", value: "Round / Curved Shaft" },
      { label: "Capacity Range", value: "320 kg – 800 kg" },
      { label: "Drive System", value: "Traction / Hydraulic" },
      { label: "Cabin Style", value: "Curvature Panoramic Cabin" },
    ],
    tiers: [
      {
        name: "Essential",
        subtitle: "Global Standard",
        bullets: [
          "Precision global components in circular shaft system",
          "Full panoramic experience at optimised cost",
          "Continuous LED ceiling ring as standard",
          "Polished aluminium curved trim throughout",
          "3-year parts and labour warranty",
        ],
      },
      {
        name: "Elite",
        subtitle: "European Grade",
        bullets: [
          "European precision drive with ultra-low vibration",
          "Whisper-quiet performance through the full circle",
          "Premium curved flooring and etched glass options",
          "Perfect for hospitality and statement interiors",
          "5-year comprehensive warranty",
        ],
      },
    ],
    cabinStyles: [
      {
        name: "Select",
        label: "Classically Round",
        image: "/projects/palm-jumeirah.png",
        desc: "Curved glass walls, polished aluminium trim, continuous LED ring.",
      },
      {
        name: "Signature",
        label: "Refined Curvature",
        image: "/projects/downtown.png",
        desc: "Etched or coloured glass, custom lighting effects, premium curved flooring.",
      },
      {
        name: "Bespoke",
        label: "Landmark Vision",
        image: "/projects/yas-island.png",
        desc: "Every surface to drawing — for the circular lift as architectural centrepiece.",
      },
    ],
    finishes: [
      { name: "Silver Satin", color: "#B8B8B8" },
      { name: "Silver Mirror", color: "#D6D6D6" },
      { name: "Rose Gold", color: "#D4998A" },
      { name: "Brushed Gold", color: "#BFA050" },
      { name: "Champagne Gold", color: "#EDD9A3" },
      { name: "Dark Bronze", color: "#5C3D2E" },
      { name: "Matte Black", color: "#1A1A1A" },
      { name: "Pearl White", color: "#F2F0EB" },
    ],
    applications: [
      { label: "Luxury Villas", image: "/projects/palm-jumeirah.png" },
      { label: "Hotel Lobbies", image: "/projects/yas-island.png" },
      { label: "Signature Towers", image: "/projects/downtown.png" },
      { label: "Cultural Venues", image: "/projects/al-majaz.png" },
    ],
  },
  aero: {
    code: "AS",
    name: "Aero",
    tagline: "No Pit. No Compromise.",
    pitFree: true,
    description:
      "The Aero Slim is our pit-free panoramic lift — engineered for spaces where a conventional pit cannot be formed. Aero eliminates the pit requirement entirely without sacrificing ride quality, capacity, or aesthetic. A slim, self-supporting structure that installs in days, not weeks.",
    heroImage: "/series/aero-slim.png",
    images: [
      "/series/aero-slim.png",
      "/projects/adnoc.png",
      "/projects/city-centre.png",
      "/projects/al-majaz.png",
    ],
    details: [
      { label: "Shaft Type", value: "Self-Supporting Structure" },
      { label: "Capacity Range", value: "320 kg – 800 kg" },
      { label: "Drive System", value: "Hydraulic / MRL" },
      { label: "Pit Depth", value: "Zero — Pit-Free Design" },
    ],
    tiers: [
      {
        name: "Essential",
        subtitle: "Global Standard",
        bullets: [
          "Pit-free self-supporting steel structure",
          "Globally-sourced drive components",
          "Fast installation — days not weeks",
          "Panoramic glass panels as standard",
          "3-year parts and labour warranty",
        ],
      },
      {
        name: "Elite",
        subtitle: "European Grade",
        bullets: [
          "European precision hydraulics in Aero frame",
          "Whisper-quiet, smooth zero-pit performance",
          "Enhanced noise and vibration control",
          "Premium glass and aluminium finish options",
          "5-year comprehensive warranty",
        ],
      },
    ],
    cabinStyles: [
      {
        name: "Select",
        label: "Slim & Open",
        image: "/projects/adnoc.png",
        desc: "Slim panoramic glass, clean aluminium frame, LED strip. Aero ready to deploy.",
      },
      {
        name: "Signature",
        label: "Tinted & Refined",
        image: "/projects/city-centre.png",
        desc: "Tinted glass, custom frame finish, mood lighting and premium floor.",
      },
      {
        name: "Bespoke",
        label: "Retrofit Luxury",
        image: "/projects/al-majaz.png",
        desc: "Fully specified cabin with pit-free structure — constraints hidden, finish visible.",
      },
    ],
    finishes: [
      { name: "Clear Panoramic", color: "#DDE8F0" },
      { name: "Frosted Glass", color: "#E8EDEF" },
      { name: "Silver Satin", color: "#B8B8B8" },
      { name: "Silver Mirror", color: "#D6D6D6" },
      { name: "Champagne Gold", color: "#EDD9A3" },
      { name: "Dark Bronze", color: "#5C3D2E" },
      { name: "Matte Black", color: "#1A1A1A" },
      { name: "Pearl White", color: "#F2F0EB" },
    ],
    applications: [
      { label: "Retrofit Buildings", image: "/projects/adnoc.png" },
      { label: "Showrooms & Retail", image: "/projects/city-centre.png" },
      { label: "Private Residences", image: "/projects/al-majaz.png" },
      { label: "Heritage Properties", image: "/projects/downtown.png" },
    ],
  },
};

const ALL_SERIES = [
  { id: "heritage", code: "HT", name: "Heritage", sub: "RCC Shaft · Essential & Elite", image: "/series/heritage.png" },
  { id: "horizon", code: "HZ", name: "Horizon", sub: "MS Shaft · Glass Cabin Car", image: "/series/horizon.png" },
  { id: "orbit", code: "OB", name: "Orbit", sub: "Round Shaft · Curvature Cabin", image: "/series/orbit.png" },
  { id: "aero", code: "AS", name: "Aero", sub: "No Pit · Slim Panoramic Lift", image: "/series/aero-slim.png" },
];

/* ── Tier icons ── */
function DiamondIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className={styles.tierIcon}>
      <path d="M18 4L32 14 18 32 4 14 18 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 14h28M12 14L18 4M24 14L18 4M12 14L18 32M24 14L18 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className={styles.tierIcon}>
      <path d="M18 4l3.6 8.4 9 .78-6.84 5.94 2.16 8.84L18 23.4l-7.92 4.56 2.16-8.84L5.4 13.18l9-.78L18 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const TIER_ICONS = { Essential: DiamondIcon, Elite: StarIcon };

/* ── Checkmark icon ── */
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.checkIcon}>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Gallery Component ── */
function Gallery({ images }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null);
  const [dir, setDir] = useState("next");
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (newIdx, direction) => {
    if (transitioning || newIdx === activeIdx) return;
    setDir(direction);
    setNextIdx(newIdx);
    setTransitioning(true);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setNextIdx(null);
      setTransitioning(false);
    }, 420);
  };

  const prev = () => navigate((activeIdx - 1 + images.length) % images.length, "prev");
  const next = () => navigate((activeIdx + 1) % images.length, "next");

  return (
    <div className={styles.galleryCol}>
      <div className={styles.mainImgFrame}>
        <Image
          key={`base-${activeIdx}`}
          src={images[activeIdx]}
          alt="Series preview"
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          className={`${styles.mainImg} ${transitioning ? (dir === "next" ? styles.slideOutLeft : styles.slideOutRight) : styles.mainImgActive}`}
          priority
        />
        {transitioning && nextIdx !== null && (
          <Image
            key={`next-${nextIdx}`}
            src={images[nextIdx]}
            alt="Series preview"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className={`${styles.mainImg} ${dir === "next" ? styles.slideInRight : styles.slideInLeft}`}
          />
        )}
        <button className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={prev} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={next} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.thumbRow}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.thumbBtn} ${i === (nextIdx ?? activeIdx) ? styles.thumbBtnActive : ""}`}
            onClick={() => navigate(i, i > activeIdx ? "next" : "prev")}
            aria-label={`Image ${i + 1}`}
          >
            <Image src={img} alt="" fill sizes="120px" className={styles.thumbImg} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function SingleSeriesPage() {
  const { id } = useParams();
  const series = SERIES_DATA[id];

  if (!series) {
    return (
      <main className={styles.main}>
        <div className={styles.notFound}>
          <p>Series not found.</p>
          <Link href="/series" className={styles.notFoundBack}>← Back to all series</Link>
        </div>
      </main>
    );
  }

  const others = ALL_SERIES.filter((s) => s.id !== id);

  return (
    <main className={styles.main}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}>
          <Image src={series.heroImage} alt={series.name} fill priority sizes="100vw" className={styles.heroBgImg} />
        </div>
        <div className={styles.heroOverlay} />

        <nav className={styles.heroBreadcrumb}>
          <Link href="/" className={styles.heroBcLink}>Home</Link>
          <span className={styles.heroBcSep}>/</span>
          <Link href="/series" className={styles.heroBcLink}>Series</Link>
          <span className={styles.heroBcSep}>/</span>
          <span className={styles.heroBcActive}>{series.name}</span>
        </nav>

        <div className={styles.heroInner}>
          <span className={styles.heroCode}>{series.code} Series</span>
          {series.pitFree && <span className={styles.heroPitFree}>Pit-Free</span>}
          <h1 className={styles.heroName}>{series.name}</h1>
          <p className={styles.heroTagline}>{series.tagline}</p>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className={styles.showcase}>
        <Gallery images={series.images} />

        <div className={styles.infoCol}>
          <h2 className={styles.infoTagline}>{`${series.name} - ${series.code} - Series`}</h2>
          {/* <h2 className={styles.infoTagline}>{series.tagline}</h2> */}
          <p className={styles.infoDesc}>{series.description}</p>

          <div className={styles.specsGrid}>
            {series.details.map((d) => (
              <div key={d.label} className={styles.specItem}>
                <span className={styles.specLabel}>{d.label}</span>
                <span className={styles.specValue}>{d.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.infoBtns}>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a Quote
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/contact" className={styles.btnOutline}>Book Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY TIERS ── */}
      <section className={styles.section}>
        <div className={styles.sectionWrap}>
          <p className={styles.eyebrow}>Our Technical Specs</p>
          <h2 className={styles.sectionTitle}>Essential & Elite</h2>
          <div className={styles.tiersGrid}>
            {series.tiers.map((t) => {
              const Icon = TIER_ICONS[t.name] ?? DiamondIcon;
              return (
              <div key={t.name} className={styles.tierCard}>
                <div className={styles.tierIconWrap}>
                  <Icon />
                </div>
                <div className={styles.tierHeader}>
                  <span className={styles.tierBadge}>{t.name}</span>
                  <span className={styles.tierSubtitle}>{t.subtitle}</span>
                </div>
                <ul className={styles.tierList}>
                  {t.bullets.map((b) => (
                    <li key={b} className={styles.tierItem}>
                      <Check />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CABIN STYLES ── */}
      {/* <section className={styles.section}>
        <div className={styles.sectionWrap}>
          <p className={styles.eyebrow}>Design Level</p>
          <h2 className={styles.sectionTitle}>Select, Signature & Bespoke</h2>
          <div className={styles.cabinGrid}>
            {series.cabinStyles.map((c) => (
              <div key={c.name} className={styles.cabinCard}>
                <div className={styles.cabinImgWrap}>
                  <Image src={c.image} alt={c.name} fill sizes="(max-width:768px) 100vw, 33vw" className={styles.cabinImg} />
                  <div className={styles.cabinImgOverlay} />
                </div>
                <div className={styles.cabinBody}>
                  <span className={styles.cabinBadge}>{c.name}</span>
                  <h3 className={styles.cabinLabel}>{c.label}</h3>
                  <p className={styles.cabinDesc}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <CraftedAroundYourHome cabinStyles={series.cabinStyles} />

      {/* ── PREMIUM FINISHES ── */}
      <section className={styles.finishesSection}>
        <div className={styles.sectionWrap}>
          <p className={styles.eyebrow}>Premium Finishes</p>
          <h2 className={styles.sectionTitle}>Coated to Perfection</h2>
          <div className={styles.finishesGrid}>
            {series.finishes.map((f) => (
              <div key={f.name} className={styles.finishItem}>
                <div className={styles.finishSwatch} style={{ background: f.color }} />
                <span className={styles.finishName}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE IT FITS BEST ── */}
      {/* <section className={styles.appsSection}>
        <div className={styles.sectionWrap}>
          <p className={styles.eyebrow}>Where {series.name} Fits Best</p>
          <div className={styles.appsGrid}>
            {series.applications.map((a) => (
              <div key={a.label} className={styles.appCard}>
                <div className={styles.appImgWrap}>
                  <Image src={a.image} alt={a.label} fill sizes="(max-width:768px) 50vw, 25vw" className={styles.appImg} />
                  <div className={styles.appOverlay} />
                </div>
                <span className={styles.appLabel}>{a.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.appsCta}>
            <Link href="/projects" className={styles.btnOutlineDark}>View Projects</Link>
          </div>
        </div>
      </section> */}

      <WhereHorizonFitsBest seriesName={series.name} applications={series.applications} />

      {/* ── OTHER SERIES ── */}
      <section className={styles.othersSection}>
        <div className={styles.sectionWrap}>
          <p className={styles.eyebrow}>Explore More</p>
          <h2 className={styles.sectionTitle}>Other Series</h2>
          <div className={styles.othersGrid}>
            {others.map((s) => (
              <Link key={s.id} href={`/series/${s.id}`} className={styles.otherCard}>
                <div className={styles.otherImgWrap}>
                  <Image src={s.image} alt={s.name} fill sizes="(max-width:768px) 50vw, 25vw" className={styles.otherImg} />
                  <div className={styles.otherOverlay} />
                </div>
                <div className={styles.otherBody}>
                  <span className={styles.otherCode}>{s.code}</span>
                  <span className={styles.otherName}>{s.name}</span>
                  <span className={styles.otherSub}>{s.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MarqueeLogos />
    </main>
  );
}
