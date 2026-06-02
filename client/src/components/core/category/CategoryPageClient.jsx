"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/services/categories.service";
import { extractCollection } from "@/lib/apiResponse";
import styles from "./CategoryPageClient.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import CategoryApps from "@/components/core/category/CategoryApps";
import CategoryProjectsGallery from "@/components/core/category/CategoryProjectsGallery";

const FALLBACK_BG = "/projects/city-centre.png";

const DEFAULT_FEATURES = [
  { title: "Precision Engineering", desc: "Every unit is built to exacting tolerances — smooth, silent, and reliable for decades of daily use." },
  { title: "Custom Design",         desc: "Select from curated finish tiers — Select, Signature, or Bespoke — to complement any interior." },
  { title: "Safety Certified",      desc: "All systems comply with international safety standards including EN 81 and local UAE regulations." },
  { title: "Energy Efficient",      desc: "Regenerative drive systems recover kinetic energy on descent, reducing power consumption by up to 40%." },
  { title: "Silent Operation",      desc: "Advanced counterweight systems and premium bearings ensure whisper-quiet performance at all speeds." },
  { title: "After-Sales Support",   desc: "Dedicated service teams across the UAE ensure rapid response, scheduled maintenance, and genuine parts." },
];

const DEFAULT_ABOUT_META = [
  { label: "Machine Options", value: "Essential (Global) · Elite (European)" },
  { label: "Design Levels",   value: "Select · Signature · Bespoke" },
  { label: "Drive System",    value: "Traction · Hydraulic · MRL" },
];

const DEFAULT_STATS = [
  { value: "500+", label: "Installations" },
  { value: "10+",  label: "Years Experience" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "3x",   label: "Faster Installation" },
];

const DEFAULT_TESTIMONIAL = {
  quote: "We wanted a home elevator that matched the luxury standards of our villa, and Invent Elevator delivered exactly that. The combination of the Montanari machine and Fermator doors provides an exceptionally smooth and quiet ride. The team handled the entire project professionally, ensuring that every detail aligned with our interior design requirements.",
  name: "Ahmed Al Rashidi",
  role: "Villa Owner, Palm Jumeirah",
  image: "/projects/palm-jumeirah.png",
};

const DEFAULT_APPLICATIONS = [
  { label: "Luxury Villas",    image: "/projects/downtown.png" },
  { label: "High-Rise Towers", image: "/projects/adnoc.png" },
];

const FEATURE_ICONS = [
  <svg key="0" viewBox="0 0 28 28" fill="none" width="20" height="20"><circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.6"/><circle cx="14" cy="14" r="3.5" fill="currentColor" opacity=".25"/><path d="M14 5v3M14 20v3M5 14h3M20 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg key="1" viewBox="0 0 28 28" fill="none" width="20" height="20"><rect x="4" y="4" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1.6"/><path d="M4 11h20M11 11v13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg key="2" viewBox="0 0 28 28" fill="none" width="20" height="20"><path d="M14 2L4 7v7c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7L14 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 14l3.5 3.5L19 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="3" viewBox="0 0 28 28" fill="none" width="20" height="20"><path d="M17 3L7 16h14L11 25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="4" viewBox="0 0 28 28" fill="none" width="20" height="20"><path d="M9 11H5a1 1 0 00-1 1v5a1 1 0 001 1h4l6 4.5V6.5L9 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M19 9a7 7 0 010 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".4"/></svg>,
  <svg key="5" viewBox="0 0 28 28" fill="none" width="20" height="20"><circle cx="14" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6"/><path d="M5 23c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
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
        const found = categoryId ? all.find((c) => c._id === categoryId || c.slug === categoryId) : null;
        setCategory(found || null);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [categoryId]);

  if (isLoading) return <div className={styles.skeleton} />;

  const heroImage      = category?.image             || FALLBACK_BG;
  const name           = category?.name              || "Elevator Solutions";
  const desc           = category?.description       || "Engineered for every environment — premium vertical mobility solutions crafted for residential, commercial, and specialist applications across the UAE.";
  const cmsAboutMeta   = category?.aboutMeta?.length    ? category.aboutMeta    : DEFAULT_ABOUT_META;
  const cmsFeatures    = category?.features?.length     ? category.features     : DEFAULT_FEATURES;
  const cmsTestimonial = category?.testimonial?.quote   ? category.testimonial  : DEFAULT_TESTIMONIAL;
  const cmsApps        = category?.applications?.length  ? category.applications  : DEFAULT_APPLICATIONS;
  const cmsStats       = category?.stats?.length         ? category.stats         : DEFAULT_STATS;
  const cmsCtaEyebrow  = category?.ctaEyebrow || "Get Started";
  const cmsCtaTitle    = category?.ctaTitle   || "Ready to Elevate Your Space?";
  const cmsCtaDesc     = category?.ctaDesc    || "Our team of specialists is ready to guide you from initial consultation through installation — tailored to your building, your timeline, and your vision.";

  return (
    <main className={styles.main}>

      {/* ── 1. HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={heroImage} alt={name} fill priority sizes="100vw" className={styles.heroBgImg} />
        </div>
        <div className={styles.heroOverlay} />
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.bcLink}>Home</Link>
          <span className={styles.bcSep}>›</span>
          <Link href="/categories" className={styles.bcLink}>Categories</Link>
          <span className={styles.bcSep}>›</span>
          <span className={styles.bcActive}>{name}</span>
        </nav>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Our Solutions</p>
          <h1 className={styles.heroTitle}>{name}</h1>
          <p className={styles.heroDesc}>{desc}</p>
          <Link href="/contact" className={styles.heroCta}>
            Get a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 2. COLLECTION SPLIT ── */}
      <section className={styles.collection}>
        <div className={styles.collectionImg}>
          <Image src={heroImage} alt={name} fill sizes="(max-width:900px) 100vw, 42vw" className={styles.collectionImgInner} />
        </div>
        <div className={styles.collectionInfo}>
          <p className={styles.collectionEyebrow}>Category Overview</p>
          <h2 className={styles.collectionTitle}>
            {name} <span className={styles.collectionTitleLight}>Collection</span>
          </h2>
          <ul className={styles.specList}>
            {cmsAboutMeta.map((m, i) => (
              <li key={i} className={styles.specRow}>
                <span className={styles.specCheck}>✓</span>
                <div className={styles.specText}>
                  <span className={styles.specLabel}>{m.label}</span>
                  <span className={styles.specValue}>{m.value}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.collectionDesc}>{desc}</p>
          <Link href="#gallery" className={styles.collectionCta}>
            Browse Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 3. FEATURES ── */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.featuresLeft}>
            <p className={styles.featuresEyebrow}>Why Invent Elevator</p>
            <h2 className={styles.featuresTitle}>Built for Performance.<br />Designed for Life.</h2>
          </div>
          <div className={styles.featuresGrid}>
            {cmsFeatures.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>{FEATURE_ICONS[i % FEATURE_ICONS.length]}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIAL ── */}
      <section className={styles.testimonial}>
        <div className={styles.testimonialMedia}>
          {cmsTestimonial.video ? (
            <video src={cmsTestimonial.video} className={styles.testimonialMediaInner} autoPlay muted loop playsInline />
          ) : (
            <Image
              src={cmsTestimonial.image || FALLBACK_BG}
              alt={cmsTestimonial.name || "Client"}
              fill sizes="340px"
              className={styles.testimonialMediaInner}
            />
          )}
        </div>
        <div className={styles.testimonialBody}>
          <span className={styles.testimonialOpenQuote}>&ldquo;</span>
          <blockquote className={styles.testimonialQuote}>{cmsTestimonial.quote}</blockquote>
          <div className={styles.testimonialAttrib}>
            <span className={styles.testimonialName}>{cmsTestimonial.name}</span>
            {cmsTestimonial.role && <span className={styles.testimonialRole}>{cmsTestimonial.role}</span>}
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY — auto-scroll marquee of projects in this category ── */}
      <div id="gallery">
        <h2 className={styles.galleryHeading}>Related Projects</h2>
        <CategoryProjectsGallery categoryName={name} />
      </div>

      {/* ── 6. APPLICATIONS — same layout as homepage Series section ── */}
      <CategoryApps name={name} apps={cmsApps} />

      {/* ── 7. STATS ── */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {cmsStats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. PARTNERS ── */}
      <MarqueeLogos />

      {/* ── 9. CTA BANNER ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaEyebrow}>{cmsCtaEyebrow}</p>
            <h2 className={styles.ctaTitle}>{cmsCtaTitle}</h2>
            <p className={styles.ctaDesc}>{cmsCtaDesc}</p>
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.ctaBtnPrimary}>
              Book a Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/series" className={styles.ctaBtnOutline}>Explore Our Series</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
