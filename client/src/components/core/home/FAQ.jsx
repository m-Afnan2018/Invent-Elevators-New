"use client";
import styles from "./FAQ.module.css";
import { useState } from "react";

const DEFAULT_FAQS = [
  {
    q: "What types of elevators do you offer?",
    a: "We design and install a full range of vertical mobility solutions — passenger lifts, goods lifts, home lifts, hydraulic systems, and bespoke architectural elevators tailored to your specification.",
  },
  {
    q: "How long does a typical installation take?",
    a: "Installation timelines vary by project complexity. A standard passenger lift typically takes 4–8 weeks from site preparation to commissioning. We provide a precise schedule during the consultation phase.",
  },
  {
    q: "Do you offer maintenance and after-sales service?",
    a: "Yes. Every installation is backed by our comprehensive maintenance programme, including scheduled inspections, 24/7 emergency support, and genuine parts replacement.",
  },
  {
    q: "Are your elevators compliant with Indian safety standards?",
    a: "All our systems meet and exceed Bureau of Indian Standards (BIS) requirements and relevant NBC provisions. We handle all statutory inspections and certification on your behalf.",
  },
  {
    q: "Can the cabin design be fully customised?",
    a: "Absolutely. Finishes, materials, lighting, flooring, and control panels are all specified to your brief — from understated minimalism to bespoke luxury interiors.",
  },
  {
    q: "What is the warranty on your products?",
    a: "We offer a standard two-year warranty on all components and installation workmanship, extendable through our annual maintenance contracts.",
  },
];

export default function FAQ({ faqs = DEFAULT_FAQS }) {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ── Left: heading ── */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 className={styles.title}>
            Frequently<br />Asked<br />Questions
          </h2>
          <p className={styles.sub}>
            Everything you need to know before your first conversation with us.
          </p>
        </div>

        {/* ── Right: accordion ── */}
        <div className={styles.right}>
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={styles.icon}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div
                className={styles.answerWrap}
                style={{
                  maxHeight: open === i ? "400px" : "0",
                }}
              >
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
