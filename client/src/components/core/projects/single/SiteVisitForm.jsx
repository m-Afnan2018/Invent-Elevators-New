"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SiteVisitForm.module.css";
import { createLead } from "@/services/leads.service";

const PROPERTY_TYPES = [
  "Residential Villa",
  "Apartment",
  "Commercial Tower",
  "Hospitality / Hotel",
  "Healthcare Facility",
  "Industrial / Warehouse",
  "Other",
];

const LOCATIONS = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

export default function SiteVisitForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSubmitting(true);
    setError("");
    try {
      await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `Location: ${form.location || "—"} | Property Type: ${form.propertyType || "—"}`,
        source: "Site Visit Form — Project Page",
      });
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      {/* Headings */}
      <h2 className={styles.mainHeading}>
        Get Your Free <span className={styles.accent}>Site Visit</span> Today
      </h2>
      <p className={styles.miniHeading}>
        Connect With Our Sales Team by filling the following form.
      </p>

      {/* Form row */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className={styles.field}>
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className={styles.field}>
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </span>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.37 2 2 0 0 1 3.54 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
            </svg>
          </span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className={styles.field}>
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <select
            className={`${styles.input} ${styles.select}`}
            name="location"
            value={form.location}
            onChange={handleChange}
          >
            <option value="" disabled>Location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <span className={styles.chevron}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
        </div>

        {/* Property Type */}
        <div className={styles.field}>
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <select
            className={`${styles.input} ${styles.select}`}
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
          >
            <option value="" disabled>Property Type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <span className={styles.chevron}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
        </div>

        {/* Submit */}
        <button className={styles.submitBtn} type="submit" disabled={submitting}>
          {submitting ? (
            "Submitting…"
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Book Visit
            </>
          )}
        </button>
      </form>

      {error && <p className={styles.errorMsg}>{error}</p>}
    </section>
  );
}
