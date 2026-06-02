'use client';
import { useState, useEffect, useCallback } from 'react';
import { RiCloseLine, RiSearchLine, RiUploadCloudLine, RiImageLine, RiVideoLine, RiCheckLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getAllMedia } from '@/services/media.service';
import { uploadImage } from '@/services/upload.service';
import { API_BASE_URL } from '@/lib/constants';
import styles from './MediaSelector.module.css';

const toAbsolute = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url}`;
};

export default function MediaSelector({ isOpen, onClose, onSelect, accept = 'all', folder = 'misc' }) {
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('all');
  const [selected,  setSelected]  = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tab,       setTab]       = useState('library');

  const load = useCallback(async () => {
    setLoading(true);
    try { const data = await getAllMedia(); setItems(Array.isArray(data) ? data : []); }
    catch { toast.error('Failed to load media'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (isOpen) { load(); setSelected(null); setSearch(''); setTab('library'); }
  }, [isOpen, load]);

  if (!isOpen) return null;

  const typeFilter = accept === 'image' ? 'image' : accept === 'video' ? 'video' : filter;
  const visible = items.filter(m => {
    const matchType  = typeFilter === 'all' || m.type === typeFilter;
    const matchSearch = !search || m.originalName?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const tid = toast.loading('Uploading…');
    try {
      await uploadImage(file, folder);
      toast.success('Uploaded!', { id: tid });
      await load();
      setTab('library');
    } catch (err) {
      toast.error(err?.message || 'Upload failed.', { id: tid });
    } finally { setUploading(false); }
  };

  const handleConfirm = () => {
    if (!selected) return;
    onSelect(toAbsolute(selected.url));
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          <h2>Media Library</h2>
          <button className={styles.closeBtn} onClick={onClose}><RiCloseLine /></button>
        </div>

        <div className={styles.tabs}>
          <button className={[styles.tab, tab==='library' ? styles.tabActive : ''].join(' ')} onClick={()=>setTab('library')}>Library</button>
          <button className={[styles.tab, tab==='upload'  ? styles.tabActive : ''].join(' ')} onClick={()=>setTab('upload')}>Upload New</button>
        </div>

        {tab === 'upload' ? (
          <div className={styles.uploadPane}>
            <label className={[styles.uploadDrop, uploading ? 'uploadLoading' : ''].join(' ')}>
              <RiUploadCloudLine size={40} />
              <p>Click to upload or drag a file here</p>
              <span>Images &amp; videos supported</span>
              <input type="file" accept="image/*,video/*" style={{display:'none'}} onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        ) : (
          <>
            <div className={styles.toolbar}>
              <div className={styles.searchWrap}>
                <RiSearchLine className={styles.searchIcon} />
                <input className={styles.searchInput} placeholder="Search by name…" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              {accept === 'all' && (
                <div className={styles.filterBtns}>
                  {['all','image','video'].map(t => (
                    <button key={t} className={[styles.filterBtn, filter===t ? styles.filterBtnActive : ''].join(' ')} onClick={()=>setFilter(t)}>
                      {t==='image' ? <><RiImageLine /> Image</> : t==='video' ? <><RiVideoLine /> Video</> : 'All'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <div className={styles.loading}>Loading media…</div>
            ) : visible.length === 0 ? (
              <div className={styles.empty}>No media found. Upload some files first.</div>
            ) : (
              <div className={styles.grid}>
                {visible.map(m => (
                  <div key={m._id} className={[styles.item, selected?._id===m._id ? styles.itemSelected : ''].join(' ')} onClick={()=>setSelected(m)}>
                    {m.type === 'video'
                      ? <video src={toAbsolute(m.url)} className={styles.itemThumb} muted />
                      : <img   src={toAbsolute(m.url)} alt={m.originalName} className={styles.itemThumb} />}
                    {selected?._id === m._id && <div className={styles.itemCheck}><RiCheckLine /></div>}
                    <p className={styles.itemName}>{m.originalName}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className={styles.footer}>
          {selected && <span className={styles.selectedLabel}>Selected: {selected.originalName}</span>}
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.confirmBtn} onClick={handleConfirm} disabled={!selected || tab==='upload'}>
            Use Selected
          </button>
        </div>
      </div>
    </div>
  );
}
