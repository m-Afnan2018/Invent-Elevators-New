"use client";
import useBanner from '@/hooks/useBanner';
import PageHero from "@/components/common/PageHero/PageHero";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const FAQ_DATA = [
  {
    category: "General",
    items: [
      {
        q: "What types of elevators does Invent Elevator offer?",
        a: "We offer a wide range of elevator solutions including passenger lifts, home lifts, hospital elevators, goods lifts, car lifts, and custom-designed systems tailored to your project requirements.",
      },
      {
        q: "Where does Invent Elevator operate?",
        a: "We are headquartered in the UAE and primarily serve clients across Dubai, Abu Dhabi, Sharjah, and the wider GCC region. International projects are considered on a case-by-case basis.",
      },
      {
        q: "Is Invent Elevator certified and licensed?",
        a: "Yes, we hold all required trade licenses and our products comply with Dubai Civil Defense and international EN 81 elevator safety standards. Our team includes certified elevator engineers.",
      },
    ],
  },
  {
    category: "Products & Customization",
    items: [
      {
        q: "Do you provide customized elevator solutions?",
        a: "Yes, we specialize in bespoke elevator designs that match your building's architecture, load requirements, and aesthetic preferences. Our engineers work closely with you from concept to installation.",
      },
      {
        q: "What series and models are available?",
        a: "Our home lift range includes the Heritage, Horizon, Orbit, and Aero Slim series — each available in Essentials and Elite tiers, with Select, Signature, or Bespoke design options.",
      },
      {
        q: "What cabin finishes and materials can I choose?",
        a: "We offer stainless steel, glass, wood veneer, and mirror panel finishes. Flooring, lighting, and handrail options can all be tailored to your interior design requirements.",
      },
    ],
  },
  {
    category: "Safety & Standards",
    items: [
      {
        q: "Are your elevators safe during a power failure?",
        a: "All our elevators are equipped with battery-powered rescue devices (ARD) that automatically lower the cabin to the nearest floor and open the doors safely in case of a power outage.",
      },
      {
        q: "What safety certifications do your products carry?",
        a: "Our elevators comply with EN 81-20/50 European safety standards and Dubai Civil Defense requirements. Each unit undergoes pre-dispatch factory testing and on-site commissioning inspection.",
      },
      {
        q: "How do you handle in-cabin emergencies?",
        a: "Every cabin includes an emergency intercom connected to a 24/7 monitoring centre, emergency lighting, ventilation, and a safety door edge to prevent entrapment.",
      },
    ],
  },
  {
    category: "Installation & Maintenance",
    items: [
      {
        q: "Do you offer installation and maintenance services?",
        a: "Absolutely. We provide end-to-end services including site surveys, installation, commissioning, annual maintenance contracts (AMC), and 24/7 emergency support.",
      },
      {
        q: "What is included in an Annual Maintenance Contract?",
        a: "Our AMC covers quarterly preventive maintenance visits, lubrication, safety checks, software updates, and priority breakdown response with transparent SLA timelines.",
      },
      {
        q: "How long does installation take?",
        a: "A standard home lift typically takes 30+ days on-site. Larger commercial installations may take 2–4 weeks depending on shaft complexity and number of floors.",
      },
    ],
  },
  {
    category: "Pricing & Timeline",
    items: [
      {
        q: "What is the typical lead time for an elevator project?",
        a: "A standard passenger lift typically takes 8–12 weeks from order confirmation to installation completion, including manufacturing, shipping, and on-site commissioning.",
      },
      {
        q: "How do I get a quote?",
        a: "You can request a quote through our Contact page, by calling our team, or via the product inquiry form on any product page. We typically provide a detailed proposal within 48 hours.",
      },
      {
        q: "What factors affect the cost of an elevator?",
        a: "Key cost factors include lift type, number of floors, cabin size, finish level (Essentials / Elite / Bespoke), pit and headroom requirements, and any site-specific civil work.",
      },
    ],
  },
];

const ALL_CATS = FAQ_DATA.map((g) => g.category);

export default function FAQPage() {
  const banner = useBanner("faq");
  const [activeCat, setActiveCat] = useState("General");

  const visibleItems =
    activeCat === "General"
      ? FAQ_DATA.flatMap((g) => g.items)
      : FAQ_DATA.find((g) => g.category === activeCat)?.items || [];

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <PageHero
        image={banner?.image}
        fallbackImage="/projects/yas-island.png"
        eyebrow="Knowledge Base"
        title={<>Frequently Asked<br />Questions</>}
        description="Everything you need to know about our products, services, safety standards, and processes — answered clearly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      {/* ── OLD hero (commented out — kept for reference) ──
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}><Image src={banner?.image || "/projects/yas-island.png"} unoptimized={!!(banner?.image)} alt="FAQ — Invent Elevator" fill priority sizes="100vw" className={styles.heroBgImg} /></div>
        <div className={styles.heroOverlayTop} /><div className={styles.heroOverlayBottom} />
        <nav className={styles.heroBreadcrumb}><Link href="/" className={styles.heroBcLink}>Home</Link><svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.heroBcActive}>FAQ</span></nav>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}><span className={styles.eyebrowDot} /><span>Knowledge Base</span></div>
          <h1 className={styles.heroTitle}>Frequently Asked<br />Questions</h1>
          <p className={styles.heroDesc}>Everything you need to know about our products, services, safety standards, and processes — answered clearly.</p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>{FAQ_DATA.reduce((n, g) => n + g.items.length, 0)}</strong><span>Questions answered</span></div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}><strong>{FAQ_DATA.length}</strong><span>Topic categories</span></div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}><strong>24h</strong><span>Response time</span></div>
          </div>
        </div>
        <div className={styles.heroScrollWrap}><span className={styles.heroScrollLabel}>Scroll to explore</span><div className={styles.heroScrollTrack}><div className={styles.heroScrollThumb} /></div></div>
      </section>
      ── END OLD hero ── */}

      {/* ── Tabs ── */}
      <section className={styles.tabsSection}>
        <div className={styles.inner}>
          <div className={styles.tabs}>
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCat === cat ? styles.tabActive : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
                {cat !== "General" && (
                  <span className={styles.tabCount}>
                    {FAQ_DATA.find((g) => g.category === cat)?.items.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ List ── */}
      <section className={styles.faqSection}>
        <div className={styles.inner}>
          <div className={styles.list}>
            {visibleItems.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLeft}>
                  <h3 className={styles.itemQ}>{item.q}</h3>
                  <p className={styles.itemA}>{item.a}</p>
                </div>
                <span className={styles.itemNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className={styles.ctaBand}>
        <div className={styles.inner}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaEyebrow}>Still have questions?</p>
            <h2 className={styles.ctaTitle}>Our team is ready to help</h2>
            <p className={styles.ctaSub}>
              Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Contact Us
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="tel:+971585723553" className={styles.btnSecondary}>+971 58 572 3553</a>
          </div>
        </div>
      </section>

    </main>
  );
}
