"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/services/categories.service";
import { extractCollection } from "@/lib/apiResponse";
import styles from "./CategoryPageClient.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";

const FALLBACK_BG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80";

const FEATURES = [
  {
    title: "Precision Engineering",
    desc: "Every unit is built to exacting tolerances — smooth, silent, and reliable for decades of daily use.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.25" />
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Custom Design",
    desc: "Select from our curated finish tiers — Select, Signature, or Bespoke — to complement any interior.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <rect x="4" y="4" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 12h24M12 12v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="16" y="18" width="7" height="5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Safety Certified",
    desc: "All systems comply with international safety standards including EN 81 and local UAE regulations.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <path d="M16 3L5 8v8c0 6.08 4.72 11.76 11 13 6.28-1.24 11-6.92 11-13V8L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Energy Efficient",
    desc: "Regenerative drive systems recover kinetic energy on descent, reducing power consumption by up to 40%.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <path d="M18 4L8 18h14L12 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Silent Operation",
    desc: "Advanced counterweight systems and premium bearings ensure whisper-quiet performance at all speeds.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <path d="M10 12H6a1 1 0 00-1 1v6a1 1 0 001 1h4l7 5V7l-7 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M21 10a8 8 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
        <path d="M24 7a13 13 0 010 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "After-Sales Support",
    desc: "Dedicated service teams across the UAE ensure rapid response, scheduled maintenance, and genuine parts.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
        <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 26c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 22l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const ABOUT_META = [
  {
    label: "Machine Options",
    value: "Essential (Global) · Elite (European)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Design Levels",
    value: "Select · Signature · Bespoke",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Drive System",
    value: "Traction · Hydraulic · MRL",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <rect x="7" y="2" width="10" height="20" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 9h10M7 15h10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="9.5" y="11" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
];

export default function CategoryPageClient({ categoryId = null }) {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await getCategories();
        const all = extractCollection(res, ["categories"]);
        const found = categoryId ? all.find((c) => c._id === categoryId) : null;
        setCategory(found || null);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [categoryId]);

  const heroImage = category?.image || FALLBACK_BG;
  const name = category?.name || "Elevator Solutions";
  const desc =
    category?.description ||
    "Engineered for every environment — explore our complete range of vertical mobility solutions, crafted for residential, commercial, and specialist applications across the UAE.";

  if (isLoading) {
    return <div className={styles.skeletonHero} />;
  }

  return (
    <main className={styles.main}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}>
          <Image src={heroImage} alt={name} fill priority sizes="100vw" className={styles.heroBgImg} />
        </div>
        <div className={styles.heroOverlayTop} />
        <div className={styles.heroOverlayBottom} />

        <nav className={styles.heroBreadcrumb}>
          <Link href="/" className={styles.heroBcLink}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link href="/categories" className={styles.heroBcLink}>Categories</Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.heroBcActive}>{name}</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Our Solutions</span>
          </div>
          <h1 className={styles.heroTitle}>{name}</h1>
          <p className={styles.heroDesc}>{desc}</p>
        </div>

        <div className={styles.heroScrollWrap}>
          <span className={styles.heroScrollLabel}>Scroll to explore</span>
          <div className={styles.heroScrollTrack}>
            <div className={styles.heroScrollThumb} />
          </div>
        </div>
      </section>

      {/* ── About Split ── */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>

          {/* Image */}
          <div className={styles.aboutImgWrap}>
            <Image src={heroImage} alt={name} fill sizes="(max-width:1024px) 100vw, 50vw" className={styles.aboutImg} />
            <div className={styles.aboutImgOverlay} />
          </div>

          {/* Info */}
          <div className={styles.aboutInfo}>
            <p className={styles.aboutEyebrow}>About This Category</p>

            <h2 className={styles.aboutTitle}>
              {name} <span>Collection</span>
            </h2>

            <div className={styles.aboutDivider} />

            <p className={styles.aboutDesc}>{desc}</p>

            <div className={styles.aboutMeta}>
              {ABOUT_META.map((m) => (
                <div key={m.label} className={styles.aboutMetaRow}>
                  <div className={styles.aboutMetaIcon}>{m.icon}</div>
                  <div className={styles.aboutMetaText}>
                    <span className={styles.aboutMetaLabel}>{m.label}</span>
                    <span className={styles.aboutMetaValue}>{m.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className={styles.aboutCta}>
              Request a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.featuresHeader}>
            <p className={styles.featuresEyebrow}>Why Invent Elevator</p>
            <h2 className={styles.featuresTitle}>Built for Performance.<br />Designed for Life.</h2>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaEyebrow}>Get Started</p>
            <h2 className={styles.ctaTitle}>Ready to Elevate Your Space?</h2>
            <p className={styles.ctaDesc}>
              Our team of specialists is ready to guide you from initial consultation
              through installation — tailored to your building, your timeline, and your vision.
            </p>
          </div>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaBtnPrimary}>
              Book a Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/series" className={styles.ctaBtnOutline}>
              Explore Our Series
            </Link>
          </div>
        </div>
      </section>

      <MarqueeLogos />
    </main>
  );
}
