"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const heading    = data?.heading    ?? "Planning a lift installation in the UAE?";
  const subheading = data?.subheading ?? "We'll recommend the best lift for your home within 24 hours";
  const imageSrc   = data?.imageSrc   ?? "/contractor/images/contact-bg-1.jpg";

  const [form, setForm]           = useState({ name: "", mobile: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email) return;
    setSubmitting(true);
    setError("");
    try {
      await createLead({
        name: form.name,
        phone: form.mobile,
        email: form.email,
        source: "Contractor Lift Landing — Contact Banner",
      });
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
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
            {error && <p className={styles.errorMsg}>{error}</p>}
            <div className={`${styles.row} ${styles.rowTwo}`}>
              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? "SUBMITTING..." : "GET A FREE QUOTE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
