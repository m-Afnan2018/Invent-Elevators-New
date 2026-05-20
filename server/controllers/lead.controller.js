import nodemailer from "nodemailer";
import Lead from "../models/Lead.model.js";
import { deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

const sendLeadNotification = async (lead) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("[Email] SMTP not configured — skipping lead notification.");
    return;
  }

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
      subject: `New Lead: ${lead.name}`,
      html: `
      <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
      <div style="background:#1a1a1a;padding:24px 32px;">
      <h2 style="color:#e5b96a;margin:0;font-size:18px;letter-spacing:1px;">NEW LEAD RECEIVED</h2>
      </div>
      <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <tr><td style="padding:8px 0;color:#888;width:110px;">Name</td><td style="padding:8px 0;font-weight:600;">${lead.name}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;">${lead.email || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${lead.phone || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Message</td><td style="padding:8px 0;">${lead.message || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Source</td><td style="padding:8px 0;">${lead.source || "—"}</td></tr>
      </table>
      </div>
      <div style="background:#f9f9f9;padding:16px 32px;font-size:12px;color:#aaa;">
      Submitted on ${new Date(lead.createdAt).toUTCString()}
      </div>
      </div>
      `,
    });
    console.log(`[Email] Sent successfully to ${to} — messageId: ${result.messageId}`);
  } catch (err) {
    console.error(`[Email] Failed to send notification for lead "${lead.name}":`, err.message);
  }
};

export const createLead = async (req, res) => {
  try {
    const doc = await Lead.create(req.body);
    res.status(201).json({ success: true, data: doc });
    // Fire-and-forget — email failure never breaks the API response
    sendLeadNotification(doc).catch(() => {});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllLeads  = getAll(Lead, "assignedTo productInterest");
export const getLeadById = getOne(Lead, "assignedTo productInterest");
export const updateLead  = updateOne(Lead);
export const deleteLead  = deleteOne(Lead);
