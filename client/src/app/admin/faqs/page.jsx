'use client';

import { useState, useEffect } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiSearchLine, RiCloseLine, RiQuestionLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/services/faqs.service';
import styles from './page.module.css';

const CATEGORIES = ['General', 'Technical', 'Installation', 'Pricing', 'Maintenance', 'Safety'];
const EMPTY = { question: '', answer: '', category: 'General', order: 0, isActive: true };

export default function FAQsAdminPage() {
  const [faqs, setFaqs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getFAQs();
      setFaqs(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load FAQs'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (faq) => {
    setEditing(faq._id);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || 'General', order: faq.order || 0, isActive: faq.isActive !== false });
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return toast.error('Question and answer are required.');
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateFAQ(editing, form);
        setFaqs(f => f.map(x => x._id === editing ? updated : x));
        toast.success('FAQ updated.');
      } else {
        const created = await createFAQ(form);
        setFaqs(f => [created, ...f]);
        toast.success('FAQ created.');
      }
      closeModal();
    } catch (err) { toast.error(err?.message || 'Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      setFaqs(f => f.filter(x => x._id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  const handleToggle = async (faq) => {
    try {
      const updated = await updateFAQ(faq._id, { isActive: !faq.isActive });
      setFaqs(f => f.map(x => x._id === faq._id ? updated : x));
    } catch { toast.error('Update failed.'); }
  };

  const filtered = faqs.filter(f =>
    f.question?.toLowerCase().includes(search.toLowerCase()) ||
    f.answer?.toLowerCase().includes(search.toLowerCase()) ||
    f.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>FAQs</h1>
          <p className={styles.subtitle}>{faqs.length} questions total</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><RiAddLine /> Add FAQ</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <RiSearchLine className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search FAQs…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}><RiQuestionLine size={40} /><p>No FAQs found.</p></div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>#</th><th>Question</th><th>Category</th><th>Order</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((faq, i) => (
                <tr key={faq._id}>
                  <td className={styles.tdNum}>{i + 1}</td>
                  <td className={styles.tdQuestion}>
                    <p className={styles.questionText}>{faq.question}</p>
                    <p className={styles.answerPreview}>{faq.answer?.slice(0, 90)}{faq.answer?.length > 90 ? '…' : ''}</p>
                  </td>
                  <td><span className={styles.catBadge}>{faq.category || 'General'}</span></td>
                  <td className={styles.tdCenter}>{faq.order ?? 0}</td>
                  <td>
                    <button className={`${styles.toggleBtn} ${faq.isActive ? styles.active : styles.inactive}`} onClick={() => handleToggle(faq)}>
                      {faq.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openEdit(faq)}><RiEditLine /></button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(faq._id)}><RiDeleteBinLine /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editing ? 'Edit FAQ' : 'Add FAQ'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}><RiCloseLine /></button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Question *</label>
                <input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="Enter question…" required />
              </div>
              <div className={styles.field}>
                <label>Answer *</label>
                <textarea rows={5} value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} placeholder="Enter answer…" required />
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Display Order</label>
                  <input type="number" min={0} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} />
                </div>
              </div>
              <div className={styles.checkRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                  Active (visible on frontend)
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : editing ? 'Save Changes' : 'Create FAQ'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
