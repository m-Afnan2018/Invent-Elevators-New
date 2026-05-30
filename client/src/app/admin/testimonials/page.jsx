'use client';

import { useState, useEffect } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiSearchLine, RiCloseLine, RiStarFill, RiUserLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services/testimonials.service';
import styles from './page.module.css';

const EMPTY = { name: '', role: '', company: '', quote: '', rating: 5, location: '', avatar: '', isActive: true, isFeatured: false, order: 0 };

function StarRating({ value, onChange }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" className={`${styles.star} ${n <= value ? styles.starOn : ''}`} onClick={() => onChange(n)}>
          <RiStarFill />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getTestimonials();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (t) => {
    setEditing(t._id);
    setForm({ name: t.name, role: t.role || '', company: t.company || '', quote: t.quote, rating: t.rating || 5, location: t.location || '', avatar: t.avatar || '', isActive: t.isActive !== false, isFeatured: !!t.isFeatured, order: t.order || 0 });
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return toast.error('Name and quote are required.');
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateTestimonial(editing, form);
        setItems(i => i.map(x => x._id === editing ? updated : x));
        toast.success('Testimonial updated.');
      } else {
        const created = await createTestimonial(form);
        setItems(i => [created, ...i]);
        toast.success('Testimonial created.');
      }
      closeModal();
    } catch (err) { toast.error(err?.message || 'Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setItems(i => i.filter(x => x._id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  const handleToggle = async (item, field) => {
    try {
      const updated = await updateTestimonial(item._id, { [field]: !item[field] });
      setItems(i => i.map(x => x._id === item._id ? updated : x));
    } catch { toast.error('Update failed.'); }
  };

  const filtered = items.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.company?.toLowerCase().includes(search.toLowerCase()) ||
    t.quote?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Testimonials</h1>
          <p className={styles.subtitle}>{items.length} testimonials total</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><RiAddLine /> Add Testimonial</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <RiSearchLine className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search testimonials…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}><RiUserLine size={40} /><p>No testimonials found.</p></div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(t => (
            <div key={t._id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  {t.avatar ? <img src={t.avatar} alt={t.name} /> : <RiUserLine />}
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardName}>{t.name}</p>
                  <p className={styles.cardRole}>{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                  {t.location && <p className={styles.cardLoc}>{t.location}</p>}
                </div>
                <div className={styles.cardRating}>
                  {[1,2,3,4,5].map(n => (
                    <RiStarFill key={n} className={n <= (t.rating || 5) ? styles.starOn : styles.starOff} />
                  ))}
                </div>
              </div>
              <p className={styles.cardQuote}>"{t.quote}"</p>
              <div className={styles.cardFooter}>
                <button className={`${styles.toggleBtn} ${t.isActive ? styles.active : styles.inactive}`} onClick={() => handleToggle(t, 'isActive')}>{t.isActive ? 'Active' : 'Inactive'}</button>
                <button className={`${styles.toggleBtn} ${t.isFeatured ? styles.featured : styles.notFeatured}`} onClick={() => handleToggle(t, 'isFeatured')}>{t.isFeatured ? '★ Featured' : 'Not Featured'}</button>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => openEdit(t)}><RiEditLine /></button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(t._id)}><RiDeleteBinLine /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}><RiCloseLine /></button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row2}>
                <div className={styles.field}><label>Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith" required /></div>
                <div className={styles.field}><label>Role / Title</label><input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Homeowner" /></div>
              </div>
              <div className={styles.row2}>
                <div className={styles.field}><label>Company</label><input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" /></div>
                <div className={styles.field}><label>Location</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Dubai, UAE" /></div>
              </div>
              <div className={styles.field}><label>Quote *</label><textarea rows={4} value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="Their testimonial…" required /></div>
              <div className={styles.row2}>
                <div className={styles.field}><label>Rating</label><StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} /></div>
                <div className={styles.field}><label>Display Order</label><input type="number" min={0} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} /></div>
              </div>
              <div className={styles.field}><label>Avatar URL</label><input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="https://…" /></div>
              <div className={styles.checkGroup}>
                <label className={styles.checkLabel}><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} /> Active (visible on frontend)</label>
                <label className={styles.checkLabel}><input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} /> Featured (shown in home section)</label>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : editing ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
