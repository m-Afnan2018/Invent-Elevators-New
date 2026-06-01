import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import multer from "multer";
import JobApplication from "../models/JobApplication.model.js";
import Job from "../models/Job.model.js";
import { deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

// ── Resume upload ────────────────────────────────────────────────
const RESUME_DIR = path.resolve("uploads", "resumes");
fs.mkdirSync(RESUME_DIR, { recursive: true });

const resumeStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, RESUME_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const resumeUpload = multer({
  storage: resumeStorage,
  limits: { fileSize: 1024 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) return cb(null, true);
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  },
}).single("resume");

// ── Email notification ───────────────────────────────────────────
const sendApplicationNotification = async (application, job) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const to = process.env.LEAD_NOTIFY_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER;

  try {
    const result = await transporter.sendMail({
      from: `"Invent Elevator" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject: `New Application: ${job.title} — ${application.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
          <div style="background:#1a1a1a;padding:24px 32px;">
            <h2 style="color:#e5b96a;margin:0;font-size:18px;letter-spacing:1px;">NEW JOB APPLICATION</h2>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:8px 0;color:#888;width:130px;">Position</td><td style="padding:8px 0;font-weight:600;">${job.title}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Department</td><td style="padding:8px 0;">${job.department}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Applicant</td><td style="padding:8px 0;font-weight:600;">${application.name}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;">${application.email}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${application.phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Portfolio</td><td style="padding:8px 0;">${application.portfolio || "—"}</td></tr>
            </table>
            ${application.coverLetter ? `<div style="margin-top:16px;padding:12px;background:#f9f9f9;border-radius:4px;font-size:14px;color:#555;"><strong>Cover Letter:</strong><p style="margin:8px 0 0;">${application.coverLetter}</p></div>` : ""}
          </div>
          <div style="background:#f9f9f9;padding:16px 32px;font-size:12px;color:#aaa;">
            Submitted on ${new Date(application.createdAt).toUTCString()}
          </div>
        </div>
      `,
    });
    console.log(`[Email] Application notification sent — messageId: ${result.messageId}`);
  } catch (err) {
    console.error(`[Email] Failed to send application notification:`, err.message);
  }
};

// ── Controllers ──────────────────────────────────────────────────
export const submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, phone, portfolio, coverLetter } = req.body;

    if (!jobId || !name || !email) {
      return res.status(400).json({ success: false, message: "Job, name and email are required." });
    }

    const job = await Job.findById(jobId);
    if (!job || job.status !== "active") {
      return res.status(404).json({ success: false, message: "Job not found or no longer active." });
    }

    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : undefined;

    const application = await JobApplication.create({
      job: jobId, name, email, phone, portfolio, coverLetter,
      ...(resumeUrl && { resume: resumeUrl }),
    });

    res.status(201).json({ success: true, data: application });
    sendApplicationNotification(application, job).catch(() => {});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllApplications = getAll(JobApplication, "job");
export const getApplicationById = getOne(JobApplication, "job");
export const updateApplication  = updateOne(JobApplication);
export const deleteApplication  = deleteOne(JobApplication);
