"use client";

import { useState } from "react";
import Link from "next/link";
import ContactHero from "@/components/core/contact/ContactHero";
import { createLead } from "@/services/leads.service";
import styles from "./page.module.css";

const INFO_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4.5C4 3.67 4.67 3 5.5 3h2.09a1 1 0 0 1 .95.68l.9 2.7a1 1 0 0 1-.29 1.06L7.8 8.67C8.9 10.87 10.13 12.1 12.33 13.2l1.23-1.35a1 1 0 0 1 1.06-.29l2.7.9a1 1 0 0 1 .68.95V15.5c0 .83-.67 1.5-1.5 1.5C8.54 17 3 11.46 3 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Phone",
    value: "+971 58 572 3553",
    href: "tel:+971585723553",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6l8 5.5L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Email",
    value: "info@inventelevator.com",
    href: "mailto:info@inventelevator.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: "Address",
    value: "Dubai, United Arab Emirates",
    href: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Working Hours",
    value: "Sun – Thu, 9:00 AM – 6:00 PM",
    href: null,
  },
];

const INQUIRY_TYPES = [
  "General Inquiry",
  "Product Information",
  "Quotation Request",
  "Maintenance & Service",
  "Installation Inquiry",
  "Partnership",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        inquiryType: form.inquiryType,
        message: form.message,
        source: "contact-page",
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className={styles.page}>
      <ContactHero />

      {/* ── Contact Body ── */}
      <section className={styles.contactSection}>
        <div className={styles.inner}>
          <div className={styles.layout}>

            {/* Left: Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoHeader}>
                <div className={styles.infoLabel}>
                  <span className={styles.labelLine} />
                  <span className={styles.labelText}>Get in Touch</span>
                </div>
                <h2 className={styles.infoTitle}>
                  Let&apos;s talk about<br />your project
                </h2>
                <p className={styles.infoSub}>
                  Whether you&apos;re planning a new installation, need a quote, or have
                  questions about our products — our team is ready to help.
                </p>
              </div>

              <div className={styles.infoCards}>
                {INFO_CARDS.map((card) => (
                  <div key={card.label} className={styles.infoCard}>
                    <div className={styles.infoCardIcon}>{card.icon}</div>
                    <div className={styles.infoCardBody}>
                      <span className={styles.infoCardLabel}>{card.label}</span>
                      {card.href ? (
                        <a href={card.href} className={styles.infoCardValue}>
                          {card.value}
                        </a>
                      ) : (
                        <span className={styles.infoCardValue}>{card.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.faqNudge}>
                <p>
                  Looking for quick answers?{" "}
                  <Link href="/faq" className={styles.faqLink}>Browse our FAQ →</Link>
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className={styles.formCol}>
              {status === "success" ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="16.5" stroke="#0a0a0a" strokeWidth="1.5" />
                      <path d="M11 18.5l5 5 9-10" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message Sent</h3>
                  <p className={styles.successSub}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    className={styles.successReset}
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formHeader}>
                    <p className={styles.formEyebrow}>Contact Form</p>
                    <h3 className={styles.formTitle}>Send us a message</h3>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="name">
                        Full Name <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Ahmed Al Mansouri"
                        className={styles.input}
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">
                        Email Address <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={styles.input}
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="phone">Phone Number <span className={styles.req}>*</span></label>
                      <input
                        required
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        className={styles.input}
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="inquiryType">
                        Inquiry Type <span className={styles.req}>*</span>
                      </label>
                      <div className={styles.selectWrap}>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          required
                          className={styles.select}
                          value={form.inquiryType}
                          onChange={handleChange}
                        >
                          <option value="">Select a topic…</option>
                          {INQUIRY_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <span className={styles.selectChevron}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                      Message <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, building type, number of floors, and any specific requirements…"
                      className={styles.textarea}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {status === "error" && (
                    <p className={styles.errorMsg}>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2.5 8h11M9 4l4.5 4L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className={styles.formNote}>
                    We typically respond within 24 hours on business days.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
