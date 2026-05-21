'use client';

import { useState, useEffect } from 'react';
import {
  RiSearchLine, RiCloseLine, RiMailLine, RiPhoneLine,
  RiExternalLinkLine, RiDownloadLine, RiFilterLine, RiDeleteBinLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import toast from 'react-hot-toast';
import { deleteApplication, getAllApplications, updateApplication } from '@/services/careers.service';

const STATUSES = [
  { value: 'pending',     label: 'Pending',     color: '#f59e0b' },
  { value: 'reviewing',  label: 'Reviewing',   color: '#3b82f6' },
  { value: 'shortlisted',label: 'Shortlisted', color: '#8b5cf6' },
  { value: 'rejected',   label: 'Rejected',    color: '#ef4444' },
  { value: 'hired',      label: 'Hired',       color: '#10b981' },
];

export default function ApplicationsAdminPage() {
  const [apps, setApps]               = useState([]);
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [notes, setNotes]             = useState('');
  const [saving, setSaving]           = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAllApplications();
      setApps(res.data || res || []);
    } catch { toast.error('Failed to load applications'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openDetail = (app) => { setSelected(app); setNotes(app.notes || ''); };

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplication(id, { status });
      setApps(a => a.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      toast.success('Status updated.');
    } catch { toast.error('Failed to update.'); }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateApplication(selected._id, { notes });
      setApps(a => a.map(x => x._id === selected._id ? { ...x, notes } : x));
      setSelected(s => ({ ...s, notes }));
      toast.success('Notes saved.');
    } catch { toast.error('Failed to save notes.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      await deleteApplication(id);
      toast.success('Deleted.');
      setApps(a => a.filter(x => x._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch { toast.error('Failed to delete.'); }
  };

  const filtered = apps.filter(a => {
    const matchSearch = [a.name, a.email, a.job?.title].some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusStyle = (status) => {
    const s = STATUSES.find(x => x.value === status);
    return s ? { background: `${s.color}22`, color: s.color } : {};
  };

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.value] = apps.filter(a => a.status === s.value).length;
    return acc;
  }, {});

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Applications</h1>
          <p className={styles.subtitle}>{apps.length} total application{apps.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        {STATUSES.map(s => (
          <button
            key={s.value}
            className={`${styles.statPill} ${statusFilter === s.value ? styles.statPillActive : ''}`}
            style={statusFilter === s.value ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => setStatusFilter(p => p === s.value ? '' : s.value)}
          >
            <span className={styles.statCount} style={{ color: s.color }}>{counts[s.value] || 0}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <RiSearchLine className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search by name, email or position…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {statusFilter && (
          <button className={styles.clearFilter} onClick={() => setStatusFilter('')}>
            <RiFilterLine /> Clear filter
          </button>
        )}
      </div>

      <div className={styles.tableWrap}>
        {loading ? <p className={styles.empty}>Loading…</p> : filtered.length === 0 ? (
          <p className={styles.empty}>No applications found.</p>
        ) : (
          <table className={styles.table}>
            <thead><tr>
              <th>Applicant</th><th>Position</th><th>Applied</th>
              <th>Status</th><th>Resume</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app._id} className={styles.clickRow} onClick={() => openDetail(app)}>
                  <td>
                    <div className={styles.applicant}>
                      <div className={styles.avatar}>{app.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className={styles.appName}>{app.name}</div>
                        <div className={styles.appEmail}>{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{app.job?.title || '—'}</td>
                  <td className={styles.date}>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      className={styles.statusSelect}
                      value={app.status}
                      style={getStatusStyle(app.status)}
                      onChange={e => handleStatusChange(app._id, e.target.value)}
                    >
                      {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    {app.resume ? (
                      <a href={app.resume} target="_blank" rel="noreferrer" className={styles.resumeLink}>
                        <RiDownloadLine /> View
                      </a>
                    ) : <span className={styles.noResume}>—</span>}
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className={styles.delBtn} onClick={() => handleDelete(app._id)}><RiDeleteBinLine /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h2>Application Detail</h2>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}><RiCloseLine /></button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.infoSection}>
                <div className={styles.bigAvatar}>{selected.name?.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className={styles.panelName}>{selected.name}</h3>
                  <p className={styles.panelJob}>{selected.job?.title || 'Unknown Position'}</p>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailItem}><RiMailLine /><span>{selected.email}</span></div>
                {selected.phone && <div className={styles.detailItem}><RiPhoneLine /><span>{selected.phone}</span></div>}
                {selected.portfolio && (
                  <div className={styles.detailItem}>
                    <RiExternalLinkLine />
                    <a href={selected.portfolio} target="_blank" rel="noreferrer" className={styles.portfolioLink}>{selected.portfolio}</a>
                  </div>
                )}
              </div>

              <div className={styles.panelField}>
                <label>Status</label>
                <select
                  className={styles.panelStatusSelect}
                  value={selected.status}
                  style={getStatusStyle(selected.status)}
                  onChange={e => handleStatusChange(selected._id, e.target.value)}
                >
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              {selected.coverLetter && (
                <div className={styles.panelField}>
                  <label>Cover Letter</label>
                  <div className={styles.coverLetter}>{selected.coverLetter}</div>
                </div>
              )}

              {selected.resume && (
                <div className={styles.panelField}>
                  <label>Resume</label>
                  <a href={selected.resume} target="_blank" rel="noreferrer" className={styles.resumeBtn}>
                    <RiDownloadLine /> Download / View Resume
                  </a>
                </div>
              )}

              <div className={styles.panelField}>
                <label>Admin Notes</label>
                <textarea className={styles.notesArea} rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add internal notes about this applicant…" />
                <button className={styles.saveNotesBtn} onClick={handleSaveNotes} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Notes'}
                </button>
              </div>

              <p className={styles.appliedOn}>Applied on {new Date(selected.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
