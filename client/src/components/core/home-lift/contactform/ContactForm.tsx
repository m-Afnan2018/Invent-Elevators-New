"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { createLead } from "@/services/leads.service";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) return;

    setStatus("submitting");
    try {
      await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.service,
        source: "Home Lift Landing Page",
      });
      setStatus("success");
      setForm({ name: "", email: "", service: "", phone: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        {/* LEFT CONTENT */}
        <div className={styles.imageSide}>
          <span className={styles.leftSubtitle}>INVENT ELEVATOR</span>
          <h2 className={styles.leftTitle}>
            Elevating Spaces With Modern Lift Solutions
          </h2>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>Premium villa and residential lift solutions</li>
            <li className={styles.featureItem}>Advanced safety systems with smooth performance</li>
            <li className={styles.featureItem}>Elegant modern designs tailored for every space</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formSide} style={{ background: "#1d1d1d" }}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✓</div>
              <h4 className={styles.successTitle}>Thank you!</h4>
              <p className={styles.successText}>Our team will get back to you within 24 hours.</p>
              <button className={styles.submitBtn} style={{ marginTop: 16 }} onClick={() => setStatus("idle")}>
                Submit Another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                className={styles.input}
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                className={styles.input}
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className={styles.input}
                value={form.phone}
                onChange={handleChange}
              />

              <select
                name="service"
                required
                className={styles.select}
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select Service *</option>
                <option value="Home Lift">Home Lift</option>
                <option value="Villa Lift">Villa Lift</option>
              </select>

              {status === "error" && (
                <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
