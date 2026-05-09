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
    question: "What types of elevators does Invent Elevator offer?",
    answer:
      "We offer a wide range of elevator solutions including passenger lifts, home lifts, hospital elevators, goods lifts and custom-designed elevator systems tailored to project requirements.",
  },
  {
    id: "02",
    question: "Do you provide customized elevator solutions?",
    answer:
      "Yes, we specialize in bespoke elevator designs that match your building's architecture, load requirements, and aesthetic preferences. Our engineers work closely with you from concept to installation.",
  },
  {
    id: "03",
    question: "Are your elevators safe during power failure?",
    answer:
      "All our elevators are equipped with battery-powered rescue devices (ARD) that automatically lower the cabin to the nearest floor and open the doors safely in case of a power outage.",
  },
  {
    id: "04",
    question: "Do you offer installation and maintenance services?",
    answer:
      "Absolutely. We provide end-to-end services including site surveys, installation, commissioning, annual maintenance contracts (AMC), and 24/7 emergency support.",
  },
  {
    id: "05",
    question: "What is the typical lead time for an elevator project?",
    answer:
      "Lead times vary by project complexity, but a standard passenger lift typically takes 8–12 weeks from order confirmation to installation completion.",
  },
];

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
    <section className={styles.section}>
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
        <div className={styles.contactSide}>
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
              <span className={styles.submitArrow}>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}