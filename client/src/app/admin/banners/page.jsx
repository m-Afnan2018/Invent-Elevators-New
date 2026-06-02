'use client';
import { useState, useEffect } from 'react';
import { RiEditLine, RiSaveLine, RiCloseLine, RiImageAddLine, RiVideoLine, RiGalleryLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getAllBanners, upsertBanner } from '@/services/banner.service';
import { uploadImage } from '@/services/upload.service';
import { API_BASE_URL } from '@/lib/constants';
import MediaSelector from '@/components/admin/MediaSelector';
import styles from './page.module.css';

const PAGES = [
  { key: 'home',          label: 'Homepage',     path: '/',              fallback: '/hero/hero-1.jpg',          supportsVideo: true  },
  { key: 'about',         label: 'About',         path: '/about',         fallback: '/projects/palm-jumeirah.png', supportsVideo: false },
  { key: 'series',        label: 'Series',        path: '/series',        fallback: '/series/heritage.png',      supportsVideo: false },
  { key: 'projects',      label: 'Projects',      path: '/projects',      fallback: '/projects/downtown.png',    supportsVideo: false },
  { key: 'blogs',         label: 'Blogs',         path: '/blogs',         fallback: '/projects/city-centre.png', supportsVideo: false },
  { key: 'area-we-serve', label: 'Area We Serve', path: '/area-we-serve', fallback: '/projects/downtown.png',    supportsVideo: false },
  { key: 'faq',           label: 'FAQ',           path: '/faq',           fallback: '/projects/yas-island.png',  supportsVideo: false },
  { key: 'careers',       label: 'Careers',       path: '/careers',       fallback: '/projects/adnoc.png',       supportsVideo: false },
  { key: 'contact',       label: 'Contact',       path: '/contact',       fallback: '/projects/al-majaz.png',    supportsVideo: false },
];

const toAbs = (url) => (!url || url.startsWith('http') || url.startsWith('/')) ? url : `${API_BASE_URL}${url}`;

export default function BannersAdminPage() {
  const [banners,   setBanners]   = useState({});
  const [loading,   setLoading]   = useState(true);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState({});
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msOpen,    setMsOpen]    = useState(false);
  const [msCb,      setMsCb]      = useState(null);
  const [msAccept,  setMsAccept]  = useState('image');

  const openMs = (cb, accept = 'image') => { setMsCb(() => cb); setMsAccept(accept); setMsOpen(true); };

  useEffect(() => {
    getAllBanners()
      .then(data => {
        const map = {};
        if (Array.isArray(data)) data.forEach(b => { map[b.page] = b; });
        setBanners(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (pageKey) => {
    const b = banners[pageKey] || {};
    setForm({ image: b.image || '', video: b.video || '', title: b.title || '', subtitle: b.subtitle || '' });
    setEditing(pageKey);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await upsertBanner(editing, form);
      setBanners(prev => ({ ...prev, [editing]: saved }));
      toast.success('Banner saved!');
      setEditing(null);
    } catch (err) { toast.error(err?.message || 'Save failed.'); }
    finally { setSaving(false); }
  };

  const uploadFile = async (e, field) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const tid = toast.loading('Uploading…');
    try {
      const url = await uploadImage(file, 'banners');
      setForm(f => ({ ...f, [field]: url }));
      toast.success('Uploaded!', { id: tid });
    } catch (err) { toast.error(err?.message || 'Upload failed.', { id: tid }); }
    finally { setUploading(false); }
  };

  const editingPage = PAGES.find(p => p.key === editing);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Banner Management</h1>
        <p className={styles.subtitle}>Set the hero image and video for each page. Leave blank to use the default.</p>
      </div>

      {loading ? <div className={styles.loading}>Loading…</div> : (
        <div className={styles.grid}>
          {PAGES.map(p => {
            const b = banners[p.key];
            const thumb = toAbs(b?.image || p.fallback);
            return (
              <div key={p.key} className={styles.card}>
                <div className={styles.cardThumb} style={{ backgroundImage: `url(${thumb})` }}>
                  <div className={styles.cardOverlay} />
                  <span className={styles.cardLabel}>{p.label}</span>
                  {b?.image && <span className={styles.liveBadge}>Custom</span>}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardPath}>{p.path}</p>
                  <button className={styles.editBtn} onClick={() => openEdit(p.key)}>
                    <RiEditLine /> Edit Banner
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div className={styles.overlay} onClick={() => setEditing(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2>{editingPage?.label} — Banner</h2>
              <button className={styles.closeBtn} onClick={() => setEditing(null)}><RiCloseLine /></button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Hero Image</label>
                <div className={styles.mediaRow}>
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="Image URL or upload →" />
                  <label className={`${styles.uploadBtn} ${uploading ? 'uploadLoading' : ''}`}>
                    <RiImageAddLine /><input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadFile(e, 'image')} />
                  </label>
                  <button type="button" className={styles.uploadBtn} onClick={() => openMs(url => setForm(f => ({ ...f, image: url })), 'image')}>
                    <RiGalleryLine />
                  </button>
                </div>
                {form.image && <img src={toAbs(form.image)} alt="preview" className={styles.imgPreview} />}
              </div>

              {editingPage?.supportsVideo && (
                <div className={styles.field}>
                  <label>Hero Video <span className={styles.hint}>(overrides image when set)</span></label>
                  <div className={styles.mediaRow}>
                    <input value={form.video} onChange={e => setForm(f => ({ ...f, video: e.target.value }))} placeholder="Video URL or upload →" />
                    <label className={`${styles.uploadBtn} ${uploading ? 'uploadLoading' : ''}`}>
                      <RiVideoLine /><input type="file" accept="video/*" style={{ display: 'none' }} onChange={e => uploadFile(e, 'video')} />
                    </label>
                    <button type="button" className={styles.uploadBtn} onClick={() => openMs(url => setForm(f => ({ ...f, video: url })), 'video')}>
                      <RiGalleryLine />
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label>Title Override <span className={styles.hint}>(leave blank to use default)</span></label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Custom hero heading…" />
              </div>

              <div className={styles.field}>
                <label>Subtitle Override <span className={styles.hint}>(leave blank to use default)</span></label>
                <textarea rows={2} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Custom hero description…" />
              </div>
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving || uploading}>
                <RiSaveLine /> {saving ? 'Saving…' : 'Save Banner'}
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaSelector isOpen={msOpen} onClose={() => setMsOpen(false)} onSelect={url => { msCb?.(url); setMsOpen(false); }} accept={msAccept} folder="banners" />
    </div>
  );
}
