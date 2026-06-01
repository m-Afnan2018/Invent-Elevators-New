"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getSeriesByCode } from "@/services/series.service";
import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import WhereHorizonFitsBest from "@/components/core/series/WhereHorizonFitsBest";
import CraftedAroundYourHome from "@/components/core/series/CraftedAroundYourHome";
import SeriesHeroSplit from "@/components/core/series/SeriesHeroSplit";
import SeriesFeatureStatement from "@/components/core/series/SeriesFeatureStatement";
import SeriesFeatureIcons from "@/components/core/series/SeriesFeatureIcons";
import SeriesFinishesTiers from "@/components/core/series/SeriesFinishesTiers";
import SeriesTechOverview from "@/components/core/series/SeriesTechOverview";
import SeriesCTABanner from "@/components/core/series/SeriesCTABanner";

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
    features: [
      { icon: "glass",     label: "Panoramic Glass",       desc: "Uninterrupted views throughout the full journey." },
      { icon: "structure", label: "Self-Supported",        desc: "Minimal structural intervention, faster installation." },
      { icon: "drive",     label: "Gearless Drive",        desc: "Quiet, smooth and energy-efficient performance." },
      { icon: "door",      label: "Automatic Doors",       desc: "Seamless and safe access with premium auto doors." },
      { icon: "energy",    label: "Energy Efficient",      desc: "Reduces power consumption without compromise." },
      { icon: "control",   label: "Smart Controls",        desc: "Modern interfaces and intelligent functionality." },
    ],
    techSpecs: [
      { icon: "person",    label: "2 – 6",         sub: "Persons" },
      { icon: "height",    label: "Up to 18 m",    sub: "Travel Height" },
      { icon: "stops",     label: "Up to 6",       sub: "Stops" },
      { icon: "traction",  label: "Gearless",      sub: "Traction" },
      { icon: "door",      label: "Automatic",     sub: "Door" },
      { icon: "structure", label: "MS Shaft",      sub: "Structure" },
      { icon: "glass",     label: "Panoramic",     sub: "Glass Cabin" },
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

/* ── ID → Series code map ── */
const ID_TO_CODE = { heritage: "HT", horizon: "HZ", orbit: "OB", aero: "AS" };

/* Merge CMS data over static fallback — only non-empty CMS values win */
function merge(fallback, cms) {
  if (!cms) return fallback;
  const result = { ...fallback };
  const arrayKeys = ["images","details","tiers","cabinStyles","finishes","applications","features","techSpecs"];
  for (const key of Object.keys(fallback)) {
    const v = cms[key];
    if (arrayKeys.includes(key)) {
      if (Array.isArray(v) && v.length > 0) result[key] = v;
    } else if (v !== undefined && v !== null && v !== "") {
      result[key] = v;
    }
  }
  return result;
}

/* ── Main Page ── */
export default function SingleSeriesPage() {
  const { id } = useParams();
  const staticSeries = SERIES_DATA[id];
  const [series, setSeries] = useState(staticSeries);

  useEffect(() => {
    const code = ID_TO_CODE[id];
    if (!code) return;
    getSeriesByCode(code)
      .then((cms) => setSeries(merge(staticSeries, cms)))
      .catch(() => {}); // keep static fallback on error
  }, [id]); // eslint-disable-line

  if (!staticSeries) {
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

      {/* 1. Split hero — dark left panel + full image right */}
      <SeriesHeroSplit series={series} />

      {/* 2. Feature statement — large image + text */}
      <SeriesFeatureStatement series={series} />

      {/* 3. Feature icons row */}
      <SeriesFeatureIcons features={series.features} />

      {/* 4. Crafted Around Your Home — cabin styles */}
      <div id="crafted">
        <CraftedAroundYourHome cabinStyles={series.cabinStyles} />
      </div>

      {/* 5. Finishes (left) + Technology tiers (right) */}
      <SeriesFinishesTiers finishes={series.finishes} tiers={series.tiers} />

      {/* 6. Technical overview icon row */}
      <SeriesTechOverview specs={series.techSpecs} />

      {/* 7. Where it fits best — marquee cards */}
      <WhereHorizonFitsBest seriesName={series.name} applications={series.applications} />

      {/* 8. Other series */}
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

      {/* 9. Dark CTA banner */}
      <SeriesCTABanner seriesName={series.name} />

      <MarqueeLogos />
    </main>
  );
}
