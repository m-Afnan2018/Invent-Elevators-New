'use client';

import { useState, useEffect } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiSearchLine, RiCloseLine, RiUserLine, RiUploadCloudLine, RiVideoLine, RiImageLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services/testimonials.service';
import { uploadImage } from '@/services/upload.service';
import styles from './page.module.css';

const EMPTY = {
  name: '', role: '', company: '', quote: '',
  location: '', avatar: '', video: '',
  mediaType: 'image',
  isActive: true, isFeatured: false, order: 0,
};

export default function TestimonialsAdminPage() {
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState('');
  const [modal,     setModal]     = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(false);

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
    setForm({
      name: t.name, role: t.role || '', company: t.company || '',
      quote: t.quote, location: t.location || '',
      avatar: t.avatar || '', video: t.video || '',
      mediaType: t.video ? 'video' : 'image',
      isActive: t.isActive !== false, isFeatured: !!t.isFeatured, order: t.order || 0,
    });
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return toast.error('Name and quote are required.');
    setSaving(true);
    try {
      const payload = { ...form };
      if (form.mediaType === 'image') payload.video  = '';
      else                            payload.avatar = '';
      if (editing) {
        const updated = await updateTestimonial(editing, payload);
        setItems(i => i.map(x => x._id === editing ? updated : x));
        toast.success('Testimonial updated.');
      } else {
        const created = await createTestimonial(payload);
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const tid = toast.loading('Uploading image…');
    try {
      const url = await uploadImage(file, 'testimonials');
      setForm(f => ({ ...f, avatar: url }));
      toast.success('Uploaded!', { id: tid });
    } catch (err) {
      toast.error(err?.message || 'Upload failed.', { id: tid });
    } finally { setUploading(false); }
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
                  {t.video
                    ? <video src={t.video} className={styles.avatarVideo} muted playsInline />
                    : t.avatar
                      ? <img src={t.avatar} alt={t.name} />
                      : <RiUserLine />
                  }
                  {t.video && <span className={styles.videoBadge}><RiVideoLine /></span>}
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardName}>{t.name}</p>
                  <p className={styles.cardRole}>{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                  {t.location && <p className={styles.cardLoc}>{t.location}</p>}
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

              {/* Media type toggle */}
              <div className={styles.field}>
                <label>Media</label>
                <div className={styles.mediaToggle}>
                  <button type="button" className={`${styles.mediaBtn} ${form.mediaType === 'image' ? styles.mediaBtnActive : ''}`} onClick={() => setForm(f => ({ ...f, mediaType: 'image' }))}>
                    <RiImageLine /> Image
                  </button>
                  <button type="button" className={`${styles.mediaBtn} ${form.mediaType === 'video' ? styles.mediaBtnActive : ''}`} onClick={() => setForm(f => ({ ...f, mediaType: 'video' }))}>
                    <RiVideoLine /> Video
                  </button>
                </div>
              </div>

              {form.mediaType === 'image' ? (
                <div className={styles.field}>
                  <label>Client Image</label>
                  <div className={styles.mediaInputRow}>
                    <input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="Image URL or upload →" />
                    <label className={`${styles.uploadBtn} ${uploading ? 'uploadLoading' : ''}`}>
                      <RiUploadCloudLine />
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                    </label>
                  </div>
                  {form.avatar && <img src={form.avatar} alt="preview" className={styles.mediaPreview} />}
                </div>
              ) : (
                <div className={styles.field}>
                  <label>Video URL</label>
                  <input value={form.video} onChange={e => setForm(f => ({ ...f, video: e.target.value }))} placeholder="https://… (mp4 or hosted video URL)" />
                  {form.video && <video src={form.video} className={styles.mediaPreview} muted playsInline />}
                </div>
              )}

              <div className={styles.row2}>
                <div className={styles.field}><label>Display Order</label><input type="number" min={0} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} /></div>
              </div>
              <div className={styles.checkGroup}>
                <label className={styles.checkLabel}><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} /> Active</label>
                <label className={styles.checkLabel}><input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} /> Featured (shown on home)</label>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving || uploading}>{saving ? 'Saving…' : editing ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
