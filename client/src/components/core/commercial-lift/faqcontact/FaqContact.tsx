"use client";

import { useState } from "react";
import styles from "./FaqContact.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "01",
    question: "What types of commercial lifts do you offer?",
    answer:
      "We provide commercial lift solutions including passenger elevators, mall lifts, office building elevators, hospital lifts, goods lifts, and customized systems for commercial projects.",
  },
  {
    id: "02",
    question: "Do you provide customized lift solutions?",
    answer:
      "Yes, we design custom commercial lift systems tailored to your building layout, traffic requirements, and architectural aesthetics.",
  },
  {
    id: "03",
    question: "Are your lifts safe during power failures?",
    answer:
      "All our lifts are equipped with Automatic Rescue Devices (ARD) that safely move the cabin to the nearest floor during a power outage.",
  },
  {
    id: "04",
    question: "Do you offer installation and maintenance services?",
    answer:
      "Yes, we provide complete installation, testing, maintenance contracts, and responsive technical support across the UAE.",
  },
  {
    id: "05",
    question: "How long does installation usually take?",
    answer:
      "Installation timelines depend on the project size, but most commercial lift installations are completed efficiently within the scheduled project timeframe.",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function FaqContact() {
  const [openId, setOpenId] = useState<string | null>("01");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="faqs" className={styles.section}>
      <div className={styles.inner}>
        {/* ── Left: FAQ ── */}
        <div className={styles.faqSide}>
          <h2 className={styles.faqTitle}>
            <span className={styles.faqTitleDark}>COMMON QUESTIONS</span>
            <br />
            <span className={styles.faqTitleDark}>ABOUT </span>
            <span className={styles.faqTitleGold}>INVENT ELEVATOR</span>
          </h2>

          <ul className={styles.faqList}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <li key={faq.id} className={styles.faqItem}>
                  <button
                    className={styles.faqHeader}
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqNum}>{faq.id}</span>
                    <span className={styles.faqQuestion}>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`${styles.faqBody} ${isOpen ? styles.faqBodyOpen : ""}`}
                  >
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Right: Contact form ── */}
        {/* <div className={styles.contactSide}>
          <h3 className={styles.contactTitle}>CONTACT US</h3>
          <p className={styles.contactSubtitle}>
            Get in touch with our experts for reliable and customized elevator
            solutions.
          </p>

          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type your name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your e-mail"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className={`${styles.input} ${styles.textarea}`}
                rows={3}
              />
            </div>

            <button className={styles.submitBtn} onClick={handleSubmit}>
              <span>{submitted ? "Sent!" : "Submit"}</span>
              <span className={styles.submitArrow}>
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div> */}
        {/* ── Right: Image ── */}
<div className={styles.imageSide}>
  <img
    src="/commercial/images/faq-image.jpeg"
    alt="Invent Elevator"
    className={styles.sideImage}
  />
</div>
      </div>
    </section>
  );
}