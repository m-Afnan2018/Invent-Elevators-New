"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import LocationSection from "@/components/core/area-we-serve/LocationSection";

// ── Per-city project data (sourced from FALLBACK_PROJECTS on home page) ────────

const DUBAI_PROJECTS = [
  {
    id: 1,
    image: "/projects/palm-jumeirah.png",
    subtitle: "Residential",
    title: "Palm Jumeirah Signature Villa",
    description:
      "Bespoke panoramic home lift with floor-to-ceiling glass cabin installed in a waterfront villa on Palm Jumeirah, serving 4 floors with whisper-quiet operation.",
  },
  {
    id: 2,
    image: "/projects/downtown.png",
    subtitle: "Residential",
    title: "Downtown Dubai Luxury Residences",
    description:
      "Premium residential elevators with custom Italian marble interiors and smart home integration installed across a 32-storey high-rise tower.",
  },
  {
    id: 3,
    image: "/projects/yas-island.png",
    subtitle: "Hospitality",
    title: "Dubai Marina Hotel",
    description:
      "High-speed scenic lifts with bespoke interior finishes installed to serve guests across one of Dubai's most prestigious waterfront properties.",
  },
  {
    id: 4,
    image: "/projects/al-majaz.png",
    subtitle: "Commercial",
    title: "Business Bay Tower",
    description:
      "Destination-control passenger elevators providing efficient peak-hour traffic management across a 28-storey commercial tower in Business Bay.",
  },
  {
    id: 5,
    image: "/projects/adnoc.png",
    subtitle: "Healthcare",
    title: "Dubai Healthcare City",
    description:
      "Bed and stretcher elevator systems with emergency power backup for uninterrupted patient transport across multiple clinical floors.",
  },
  {
    id: 6,
    image: "/projects/city-centre.png",
    subtitle: "Commercial",
    title: "Dubai Festival City Mall",
    description:
      "Heavy-duty commercial escalators and panoramic glass elevators deployed across a multi-level retail destination with full accessibility compliance.",
  },
];

const SHARJAH_PROJECTS = [
  {
    id: 1,
    image: "/projects/city-centre.png",
    subtitle: "Commercial",
    title: "City Centre Sharjah Expansion",
    description:
      "8 heavy-duty commercial escalators and 6 panoramic glass elevators deployed across a multi-level retail mall with full accessibility compliance.",
  },
  {
    id: 2,
    image: "/projects/al-majaz.png",
    subtitle: "Mixed-Use",
    title: "Al Majaz Waterfront Complex",
    description:
      "Hydraulic freight elevators and passenger lifts fitted across a mixed-use waterfront development comprising retail outlets, offices, and dining promenades.",
  },
  {
    id: 3,
    image: "/projects/downtown.png",
    subtitle: "Residential",
    title: "Sharjah Garden City Residences",
    description:
      "Modern residential lifts with energy-efficient variable-speed drives installed across a gated residential community.",
  },
  {
    id: 4,
    image: "/projects/palm-jumeirah.png",
    subtitle: "Healthcare",
    title: "Sharjah University Hospital",
    description:
      "Bed and stretcher elevator systems with emergency power backup for uninterrupted patient transport across 8 clinical floors.",
  },
  {
    id: 5,
    image: "/projects/yas-island.png",
    subtitle: "Hospitality",
    title: "Sharjah Heritage District Hotel",
    description:
      "Elegant passenger lifts with traditional Arabic-inspired cabin finishes installed in a boutique hotel overlooking the historic Heart of Sharjah.",
  },
  {
    id: 6,
    image: "/projects/adnoc.png",
    subtitle: "Commercial",
    title: "Sharjah Media City Tower",
    description:
      "High-speed destination-control elevators installed across a modern commercial tower housing media and technology companies.",
  },
];

const ABU_DHABI_PROJECTS = [
  {
    id: 1,
    image: "/projects/adnoc.png",
    subtitle: "Commercial",
    title: "ADNOC Headquarters Tower",
    description:
      "12 high-speed destination-control passenger elevators installed across a 45-floor corporate skyscraper, handling peak-hour traffic with intelligent dispatch systems.",
  },
  {
    id: 2,
    image: "/projects/yas-island.png",
    subtitle: "Hospitality",
    title: "Yas Island Resort & Spa",
    description:
      "Scenic observation lifts and service dumbwaiters installed throughout a 5-star beachfront resort, blending seamlessly with the property's architectural design.",
  },
  {
    id: 3,
    image: "/projects/city-centre.png",
    subtitle: "Commercial",
    title: "Abu Dhabi Mall Extension",
    description:
      "6 panoramic glass elevators and 4 escalator systems installed across a major mall extension project serving 3 million visitors annually.",
  },
  {
    id: 4,
    image: "/projects/downtown.png",
    subtitle: "Residential",
    title: "Saadiyat Island Residences",
    description:
      "Luxury residential elevators with custom cabin finishes installed across an exclusive island residential development near the Louvre Abu Dhabi.",
  },
  {
    id: 5,
    image: "/projects/palm-jumeirah.png",
    subtitle: "Residential",
    title: "Al Reem Island Villa Complex",
    description:
      "Bespoke home lifts across a premium villa compound, each featuring custom cabin lighting and silent drive systems tailored to the client.",
  },
  {
    id: 6,
    image: "/projects/al-majaz.png",
    subtitle: "Mixed-Use",
    title: "Corniche Road Development",
    description:
      "Mixed-use tower elevators with panoramic glass cabins overlooking Abu Dhabi's iconic Corniche waterfront and the Arabian Gulf.",
  },
];

export default function AreaWeServePage() {
  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}>
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
            alt="UAE skyline"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImg}
          />
        </div>
        <div className={styles.heroOverlayTop} />
        <div className={styles.heroOverlayBottom} />

        <nav className={styles.heroBreadcrumb}>
          <Link href="/" className={styles.heroBcLink}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.heroBcActive}>Areas We Serve</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Our Locations</span>
          </div>
          <h1 className={styles.heroTitle}>Areas We Serve</h1>
          <p className={styles.heroDesc}>
            Delivering precision-engineered lift solutions across Dubai, Sharjah, and Abu Dhabi — from luxury villas to iconic commercial towers.
          </p>
        </div>

        <div className={styles.heroScrollWrap}>
          <span className={styles.heroScrollLabel}>Scroll to explore</span>
          <div className={styles.heroScrollTrack}>
            <div className={styles.heroScrollThumb} />
          </div>
        </div>
      </section>

      <LocationSection
        cityName="DUBAI"
        description="Delivering precision-engineered lift solutions across Dubai's most iconic residential, commercial, and hospitality developments — from Palm Jumeirah villas to Downtown high-rises."
        mapSrc="https://maps.google.com/maps?q=Dubai,UAE&t=&z=11&ie=UTF8&iwloc=&output=embed"
        projects={DUBAI_PROJECTS}
      />

      <LocationSection
        cityName="SHARJAH"
        description="Serving Sharjah's growing skyline with bespoke elevator installations designed for performance, safety, and elegance across retail, residential, and mixed-use developments."
        mapSrc="https://maps.google.com/maps?q=Sharjah,UAE&t=&z=11&ie=UTF8&iwloc=&output=embed"
        projects={SHARJAH_PROJECTS}
      />

      <LocationSection
        cityName="ABU DHABI"
        description="Serving Abu Dhabi's skyline with bespoke elevator installations built for performance and elegance — from ADNOC headquarters to Saadiyat Island's luxury residences."
        mapSrc="https://maps.google.com/maps?q=Abu+Dhabi,UAE&t=&z=11&ie=UTF8&iwloc=&output=embed"
        projects={ABU_DHABI_PROJECTS}
      />

      <MarqueeLogos />
    </main>
  );
}
