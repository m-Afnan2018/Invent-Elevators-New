"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { getActiveJobs, submitApplication } from "@/services/careers.service";
import toast from "react-hot-toast";

const TYPE_LABEL = { "full-time": "Full‑Time", "part-time": "Part‑Time", contract: "Contract", remote: "Remote" };

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const fileRef = useRef();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Name and email are required.");
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("jobId", job._id);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (resume) fd.append("resume", resume);
      await submitApplication(fd);
      setStatus("success");
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <div>
            <p className={styles.modalEyebrow}>Apply for</p>
            <h2 className={styles.modalTitle}>{job.title}</h2>
            <p className={styles.modalMeta}>{job.department} · {job.location}</p>
          </div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        {status === "success" ? (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3>Application Submitted!</h3>
            <p>Thank you for applying. Our team will review your application and get back to you soon.</p>
            <button className={styles.closeSuccessBtn} onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className={styles.applyForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
              </div>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+971 50 000 0000" />
              </div>
              <div className={styles.formGroup}>
                <label>Portfolio / LinkedIn</label>
                <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://linkedin.com/in/…" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Cover Letter</label>
              <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={5} placeholder="Tell us why you're a great fit for this role…" />
            </div>
            <div className={styles.formGroup}>
              <label>Resume / CV</label>
              <div className={styles.fileArea} onClick={() => fileRef.current?.click()}>
                <input type="file" ref={fileRef} accept=".pdf,.doc,.docx" style={{ display: "none" }}
                  onChange={e => setResume(e.target.files[0] || null)} />
                {resume
                  ? <span className={styles.fileName}>📄 {resume.name}</span>
                  : <span className={styles.filePlaceholder}>Click to upload PDF, DOC, or DOCX (max 10 MB)</span>}
              </div>
            </div>
            <div className={styles.applyFooter}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);
  const isExpired = job.deadline && new Date(job.deadline) < new Date();

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardMeta}>
          <span className={styles.dept}>{job.department}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.jobType}>{TYPE_LABEL[job.type] || job.type}</span>
        </div>
        <h3 className={styles.cardTitle}>{job.title}</h3>
        <div className={styles.cardInfo}>
          <span>📍 {job.location}</span>
          {job.experience && <span>⏱ {job.experience}</span>}
          {job.salary && <span>💼 {job.salary}</span>}
          {job.deadline && (
            <span className={isExpired ? styles.expired : styles.deadlineTag}>
              {isExpired ? "Closed" : `Deadline: ${new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
            </span>
          )}
        </div>
      </div>

      <p className={styles.cardDesc}>
        {job.description.length > 220 ? job.description.slice(0, 220) + "…" : job.description}
      </p>

      {open && (
        <div className={styles.cardDetails}>
          {job.requirements?.length > 0 && (
            <div className={styles.detailBlock}>
              <h4>Requirements</h4>
              <ul>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
          {job.responsibilities?.length > 0 && (
            <div className={styles.detailBlock}>
              <h4>Responsibilities</h4>
              <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
          {job.benefits?.length > 0 && (
            <div className={styles.detailBlock}>
              <h4>Benefits</h4>
              <ul>{job.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          )}
        </div>
      )}

      <div className={styles.cardActions}>
        <button className={styles.detailsBtn} onClick={() => setOpen(o => !o)}>
          {open ? "Show less ↑" : "View details ↓"}
        </button>
        {!isExpired && (
          <button className={styles.applyBtn} onClick={() => onApply(job)}>Apply Now →</button>
        )}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [dept, setDept]         = useState("All");
  const [type, setType]         = useState("All");
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    getActiveJobs()
      .then(res => setJobs(res.data || res || []))
      .catch(() => toast.error("Could not load job listings."))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["All", ...new Set(jobs.map(j => j.department))];
  const types       = ["All", ...new Set(jobs.map(j => j.type))];

  const filtered = jobs.filter(j =>
    (dept === "All" || j.department === dept) &&
    (type === "All" || j.type === type)
  );

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Careers at Invent Elevator</span>
          <h1 className={styles.heroH1}>
            Build the Future<br />
            <em className={styles.accent}>of Vertical Mobility</em>
          </h1>
          <p className={styles.heroDesc}>
            Join a team that engineers premium lift solutions for residences, villas,
            and high‑rise developments across the UAE and beyond.
          </p>
          <a href="#openings" className={styles.heroBtn}>See Open Positions ↓</a>
        </div>
      </section>

      {/* Why Join Us */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Join Invent Elevator?</h2>
          <div className={styles.whyGrid}>
            {[
              { icon: "🚀", title: "Grow Fast", desc: "Take on real responsibility from day one with clear paths for career progression." },
              { icon: "🌍", title: "Global Exposure", desc: "Work with European and Japanese technology on projects across the Gulf region." },
              { icon: "🤝", title: "Great Culture", desc: "A collaborative team that values quality, innovation, and each other." },
              { icon: "💎", title: "Premium Work", desc: "Be part of luxury and high‑end projects that set the benchmark in the industry." },
            ].map(w => (
              <div key={w.title} className={styles.whyCard}>
                <span className={styles.whyIcon}>{w.icon}</span>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className={styles.openings}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Department:</span>
              {departments.map(d => (
                <button key={d} className={`${styles.filterChip} ${dept === d ? styles.chipActive : ""}`} onClick={() => setDept(d)}>{d}</button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Type:</span>
              {types.map(t => (
                <button key={t} className={`${styles.filterChip} ${type === t ? styles.chipActive : ""}`} onClick={() => setType(t)}>
                  {TYPE_LABEL[t] || t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className={styles.loadingText}>Loading positions…</p>
          ) : filtered.length === 0 ? (
            <div className={styles.noJobs}>
              <p>No open positions match your filters right now.</p>
              <p className={styles.noJobsSub}>Check back soon — we&apos;re always growing.</p>
            </div>
          ) : (
            <div className={styles.jobsGrid}>
              {filtered.map(job => <JobCard key={job._id} job={job} onApply={setApplying} />)}
            </div>
          )}
        </div>
      </section>

      {applying && <ApplyModal job={applying} onClose={() => setApplying(null)} />}
    </>
  );
}
