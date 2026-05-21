'use client';

import { useState, useEffect } from 'react';
import {
  RiAddLine, RiSearchLine, RiEditLine, RiDeleteBinLine,
  RiCloseLine, RiBriefcaseLine, RiMapPinLine, RiTimeLine,
  RiCheckboxCircleLine, RiCloseCircleLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import toast from 'react-hot-toast';
import { createJob, deleteJob, getAllJobs, updateJob } from '@/services/careers.service';

const DEPARTMENTS = ['Engineering', 'Sales', 'Operations', 'Customer Service', 'Finance', 'Marketing', 'HR', 'Other'];
const JOB_TYPES   = ['full-time', 'part-time', 'contract', 'remote'];

const EMPTY_FORM = {
  title: '', department: 'Engineering', location: '', type: 'full-time',
  experience: '', salary: '', description: '',
  requirements: '', responsibilities: '', benefits: '',
  deadline: '', status: 'active',
};

export default function CareersAdminPage() {
  const [jobs, setJobs]       = useState([]);
  const [search, setSearch]   = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [saving, setSaving]   = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(res.data || res || []);
    } catch { toast.error('Failed to load jobs'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setModal(true); };

  const openEdit = (job) => {
    setEditing(job._id);
    setForm({
      title: job.title || '', department: job.department || 'Engineering',
      location: job.location || '', type: job.type || 'full-time',
      experience: job.experience || '', salary: job.salary || '',
      description: job.description || '',
      requirements:    (job.requirements    || []).join('\n'),
      responsibilities:(job.responsibilities || []).join('\n'),
      benefits:        (job.benefits        || []).join('\n'),
      deadline: job.deadline ? job.deadline.slice(0, 10) : '',
      status: job.status || 'active',
    });
    setModal(true);
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) return toast.error('Title, location and description are required.');
    setSaving(true);
    try {
      const payload = {
        ...form,
        requirements:    form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
        responsibilities:form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
        benefits:        form.benefits.split('\n').map(s => s.trim()).filter(Boolean),
        deadline:        form.deadline || undefined,
      };
      editing ? await updateJob(editing, payload) : await createJob(payload);
      toast.success(editing ? 'Job updated.' : 'Job created.');
      setModal(false); load();
    } catch (err) { toast.error(err?.message || 'Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    try { await deleteJob(id); toast.success('Deleted.'); setJobs(j => j.filter(x => x._id !== id)); }
    catch { toast.error('Failed to delete.'); }
  };

  const filtered = jobs.filter(j =>
    [j.title, j.department, j.location].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const TYPE_LABEL = { 'full-time': 'Full-Time', 'part-time': 'Part-Time', contract: 'Contract', remote: 'Remote' };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Listings</h1>
          <p className={styles.subtitle}>{jobs.length} position{jobs.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><RiAddLine /> Add Job</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <RiSearchLine className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search by title, department or location…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? <p className={styles.empty}>Loading…</p> : filtered.length === 0 ? (
          <p className={styles.empty}>No jobs found. Add your first listing.</p>
        ) : (
          <table className={styles.table}>
            <thead><tr>
              <th>Title</th><th>Department</th><th>Location</th>
              <th>Type</th><th>Deadline</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job._id}>
                  <td className={styles.jobTitle}>{job.title}</td>
                  <td>{job.department}</td>
                  <td><span className={styles.loc}><RiMapPinLine />{job.location}</span></td>
                  <td><span className={styles.typeBadge}>{TYPE_LABEL[job.type] || job.type}</span></td>
                  <td>
                    {job.deadline
                      ? <span className={styles.deadline}><RiTimeLine />{new Date(job.deadline).toLocaleDateString()}</span>
                      : <span className={styles.noDeadline}>—</span>}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${job.status === 'active' ? styles.active : styles.inactive}`}>
                      {job.status === 'active' ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openEdit(job)}><RiEditLine /></button>
                      <button className={styles.delBtn} onClick={() => handleDelete(job._id)}><RiDeleteBinLine /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <h2><RiBriefcaseLine /> {editing ? 'Edit Job' : 'New Job'}</h2>
              <button className={styles.closeBtn} onClick={() => setModal(false)}><RiCloseLine /></button>
            </div>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Basic Info</h3>
                <div className={styles.row2}>
                  <div className={styles.field}><label>Job Title *</label><input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Elevator Engineer" /></div>
                  <div className={styles.field}><label>Department *</label><select name="department" value={form.department} onChange={handleChange}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></div>
                </div>
                <div className={styles.row2}>
                  <div className={styles.field}><label>Location *</label><input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Dubai, UAE" /></div>
                  <div className={styles.field}><label>Job Type</label><select name="type" value={form.type} onChange={handleChange}>{JOB_TYPES.map(t => <option key={t} value={t}>{t.replace('-', ' ')}</option>)}</select></div>
                </div>
                <div className={styles.row2}>
                  <div className={styles.field}><label>Experience</label><input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3–5 years" /></div>
                  <div className={styles.field}><label>Salary</label><input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. Competitive" /></div>
                </div>
                <div className={styles.row2}>
                  <div className={styles.field}><label>Deadline</label><input type="date" name="deadline" value={form.deadline} onChange={handleChange} /></div>
                  <div className={styles.field}><label>Status</label><select name="status" value={form.status} onChange={handleChange}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Description *</h3>
                <div className={styles.field}><textarea name="description" value={form.description} onChange={handleChange} rows={5} required placeholder="Describe the role and its impact…" /></div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Details <span className={styles.hint}>(one item per line)</span></h3>
                <div className={styles.field}><label>Requirements</label><textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4} placeholder={"Degree in Engineering\n3+ years experience"} /></div>
                <div className={styles.field}><label>Responsibilities</label><textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows={4} placeholder={"Install and maintain elevator systems\nCoordinate with site teams"} /></div>
                <div className={styles.field}><label>Benefits</label><textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} placeholder={"Medical insurance\nAnnual flight ticket"} /></div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : editing ? 'Update Job' : 'Create Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
