"use client";

import { useState } from "react";
import styles from "./ContactBanner.module.css";
import { createLead } from "@/services/leads.service";

interface ContactBannerProps {
  data?: {
    heading?: string;
    subheading?: string;
    imageSrc?: string;
  };
}

export default function ContactBanner({ data }: ContactBannerProps) {
  const heading    = data?.heading    ?? "Planning a lift installation in the UAE?";
  const subheading = data?.subheading ?? "We'll recommend the best lift for your home within 24 hours";
  const imageSrc   = data?.imageSrc   ?? "/images/contact-bg-1.jpg";

  const [form, setForm]     = useState({ name: "", mobile: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email) return;

    setStatus("submitting");
    try {
      await createLead({
        name: form.name,
        phone: form.mobile,
        email: form.email,
        source: "Home Lift Landing — Contact Banner",
      });
      setStatus("success");
      setForm({ name: "", mobile: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-banner" className={styles.wrapper}>
      <img src={imageSrc} alt="" className={styles.bgImage} aria-hidden="true" />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>

        <div className={styles.formCard}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✓</span>
              <p className={styles.successText}>
                Thank you! Our team will contact you within 24 hours.
              </p>
              <button
                className={styles.submitBtn}
                style={{ marginTop: 12 }}
                onClick={() => setStatus("idle")}
              >
                SUBMIT ANOTHER
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className={`${styles.row} ${styles.rowTwo}`}>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Your Mobile No. *"
                  required
                  className={styles.input}
                  value={form.mobile}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
              )}

              <div className={`${styles.row} ${styles.rowTwo}`}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "SUBMITTING..." : "GET A FREE QUOTE"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
