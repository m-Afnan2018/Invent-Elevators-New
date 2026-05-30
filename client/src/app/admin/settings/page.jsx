'use client';

import { useState } from 'react';
import { RiSaveLine, RiGlobalLine, RiMailLine, RiLinksLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import styles from './page.module.css';

const INITIAL = {
  siteName:     'Invent Elevator',
  siteTagline:  'Premium Lift Solutions Across the UAE',
  contactEmail: 'info@inventelevator.com',
  contactPhone: '+971 XX XXX XXXX',
  address:      'Dubai, United Arab Emirates',
  linkedIn: '', instagram: '', facebook: '', twitter: '',
};

export default function SettingsPage() {
  const [form, setForm]     = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [tab, setTab]       = useState('general');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    toast.success('Settings saved.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage site configuration and contact details</p>
      </div>

      <div className={styles.tabs}>
        {['general', 'contact', 'social'].map(t => (
          <button key={t} type="button" className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSave}>
        {tab === 'general' && (
          <div className={styles.section}>
            <div className={styles.sectionHead}><RiGlobalLine size={20} /><h2>General</h2></div>
            <div className={styles.field}><label>Site Name</label><input value={form.siteName} onChange={set('siteName')} /></div>
            <div className={styles.field}><label>Tagline</label><input value={form.siteTagline} onChange={set('siteTagline')} /></div>
          </div>
        )}

        {tab === 'contact' && (
          <div className={styles.section}>
            <div className={styles.sectionHead}><RiMailLine size={20} /><h2>Contact Details</h2></div>
            <div className={styles.field}><label>Email</label><input type="email" value={form.contactEmail} onChange={set('contactEmail')} /></div>
            <div className={styles.field}><label>Phone</label><input value={form.contactPhone} onChange={set('contactPhone')} /></div>
            <div className={styles.field}><label>Address</label><input value={form.address} onChange={set('address')} /></div>
          </div>
        )}

        {tab === 'social' && (
          <div className={styles.section}>
            <div className={styles.sectionHead}><RiLinksLine size={20} /><h2>Social Links</h2></div>
            <div className={styles.field}><label>LinkedIn</label><input value={form.linkedIn} onChange={set('linkedIn')} placeholder="https://linkedin.com/company/…" /></div>
            <div className={styles.field}><label>Instagram</label><input value={form.instagram} onChange={set('instagram')} placeholder="https://instagram.com/…" /></div>
            <div className={styles.field}><label>Facebook</label><input value={form.facebook} onChange={set('facebook')} placeholder="https://facebook.com/…" /></div>
            <div className={styles.field}><label>Twitter / X</label><input value={form.twitter} onChange={set('twitter')} placeholder="https://x.com/…" /></div>
          </div>
        )}

        <div className={styles.footer}>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            <RiSaveLine /> {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
