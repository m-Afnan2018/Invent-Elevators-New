"use client";

import { useState } from "react";
import Link from "next/link";
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
        a: "A standard home lift typically takes 3–5 days on-site. Larger commercial installations may take 2–4 weeks depending on shaft complexity and number of floors.",
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

const ALL_CATS = ["All", ...FAQ_DATA.map((g) => g.category)];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [openKey, setOpenKey] = useState(null);

  const visibleGroups =
    activeCat === "All" ? FAQ_DATA : FAQ_DATA.filter((g) => g.category === activeCat);

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.bcLink}>Home</Link>
            <span className={styles.bcSep}>›</span>
            <span className={styles.bcCurrent}>FAQ</span>
          </nav>
          <div className={styles.heroLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Knowledge Base</span>
          </div>
          <h1 className={styles.heroTitle}>Frequently Asked<br />Questions</h1>
          <p className={styles.heroSub}>
            Everything you need to know about our products, services, safety
            standards, and processes — answered clearly.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{FAQ_DATA.reduce((n, g) => n + g.items.length, 0)}</span>
              <span className={styles.statLabel}>Questions answered</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{FAQ_DATA.length}</span>
              <span className={styles.statLabel}>Topic categories</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>24h</span>
              <span className={styles.statLabel}>Response time</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Body ── */}
      <section className={styles.faqSection}>
        <div className={styles.inner}>
          <div className={styles.layout}>

            {/* Sticky sidebar */}
            <aside className={styles.sidebar}>
              <p className={styles.sidebarTitle}>Categories</p>
              <nav className={styles.sidebarNav}>
                {ALL_CATS.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.sideBtn} ${activeCat === cat ? styles.sideBtnActive : ""}`}
                    onClick={() => { setActiveCat(cat); setOpenKey(null); }}
                  >
                    <span>{cat}</span>
                    {cat !== "All" && (
                      <span className={styles.sideBtnCount}>
                        {FAQ_DATA.find((g) => g.category === cat)?.items.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Accordion */}
            <div className={styles.content}>
              {visibleGroups.map((group) => (
                <div key={group.category} className={styles.group}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupLabel}>{group.category}</span>
                    <span className={styles.groupCount}>{group.items.length} questions</span>
                  </div>
                  <ul className={styles.faqList}>
                    {group.items.map((item, idx) => {
                      const key = `${group.category}-${idx}`;
                      const isOpen = openKey === key;
                      return (
                        <li key={key} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                          <button
                            className={styles.faqBtn}
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                          >
                            <span className={styles.faqQ}>{item.q}</span>
                            <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  d={isOpen ? "M3 10l5-5 5 5" : "M3 6l5 5 5-5"}
                                  stroke="currentColor" strokeWidth="1.6"
                                  strokeLinecap="round" strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>
                          <div className={`${styles.faqBody} ${isOpen ? styles.faqBodyOpen : ""}`}>
                            <p className={styles.faqA}>{item.a}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

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
              Can't find what you're looking for? Reach out and we'll get back to you within 24 hours.
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
