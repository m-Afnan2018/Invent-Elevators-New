'use client';
import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiPencilLine, RiInformationLine, RiSearchLine, RiImageLine, RiVideoLine, RiCloseLine, RiCheckLine, RiUploadCloudLine, RiExternalLinkLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getAllMedia, renameMedia, deleteMedia, getMediaUsage } from '@/services/media.service';
import { uploadImage } from '@/services/upload.service';
import { API_BASE_URL } from '@/lib/constants';
import styles from './page.module.css';

const toAbs = (url) => (!url || url.startsWith('http')) ? url : `${API_BASE_URL}${url}`;
const fmt   = (b)   => !b ? '—' : b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`;

export default function MediaLibraryPage() {
  const [items,        setItems]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState('');
  const [filter,       setFilter]       = useState('all');
  const [selected,     setSelected]     = useState(null);
  const [renaming,     setRenaming]     = useState(null);
  const [renameVal,    setRenameVal]    = useState('');
  const [usage,        setUsage]        = useState(null);
  const [usageLoading, setUsageLoading] = useState(false);
  const [uploading,    setUploading]    = useState(false);

  const load = async () => {
    setLoading(true);
    try { const d = await getAllMedia(); setItems(Array.isArray(d) ? d : []); }
    catch { toast.error('Failed to load media'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const visible = items.filter(m =>
    (filter === 'all' || m.type === filter) &&
    (!search || m.originalName?.toLowerCase().includes(search.toLowerCase()))
  );

  const openDetail = (m) => { setSelected(m); setUsage(null); setRenaming(null); };

  const loadUsage = async (m) => {
    setUsageLoading(true);
    try { setUsage(await getMediaUsage(m._id)); }
    catch { toast.error('Failed to check usage'); }
    finally { setUsageLoading(false); }
  };

  const startRename = (m, e) => { e.stopPropagation(); setRenaming(m._id); setRenameVal(m.originalName); };

  const commitRename = async (id) => {
    if (!renameVal.trim()) return;
    try {
      const updated = await renameMedia(id, renameVal.trim());
      setItems(prev => prev.map(m => m._id === id ? updated : m));
      if (selected?._id === id) setSelected(updated);
      toast.success('Renamed!');
    } catch { toast.error('Rename failed.'); }
    setRenaming(null);
  };

  const handleDelete = async (m, e) => {
    e.stopPropagation();
    if (!confirm(`Delete "${m.originalName}"?`)) return;
    try {
      await deleteMedia(m._id);
      setItems(prev => prev.filter(x => x._id !== m._id));
      if (selected?._id === m._id) setSelected(null);
      toast.success('Deleted.');
    } catch (err) {
      toast.error(err?.message || (err?.usage?.length ? `In use by ${err.usage.length} item(s) — cannot delete.` : 'Delete failed.'));
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const tid = toast.loading(`Uploading ${files.length} file(s)…`);
    try {
      for (const f of files) await uploadImage(f, 'misc');
      toast.success('Uploaded!', { id: tid });
      await load();
    } catch (err) {
      toast.error(err?.message || 'Upload failed.', { id: tid });
    } finally { setUploading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Media Library</h1>
          <p className={styles.subtitle}>{items.length} files · {items.filter(m=>m.type==='image').length} images · {items.filter(m=>m.type==='video').length} videos</p>
        </div>
        <label className={[styles.uploadBtn, uploading ? 'uploadLoading' : ''].join(' ')}>
          <RiUploadCloudLine /> Upload Files
          <input type="file" accept="image/*,video/*" multiple style={{display:'none'}} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <RiSearchLine className={styles.searchIcon} />
              <input className={styles.searchInput} placeholder="Search by name…" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <div className={styles.filterBtns}>
              {['all','image','video'].map(t => (
                <button key={t} className={[styles.filterBtn, filter===t ? styles.filterBtnActive : ''].join(' ')} onClick={()=>setFilter(t)}>
                  {t==='image' ? <><RiImageLine /> Images</> : t==='video' ? <><RiVideoLine /> Videos</> : 'All'}
                </button>
              ))}
            </div>
          </div>

          {loading ? <div className={styles.loading}>Loading…</div>
          : visible.length === 0 ? <div className={styles.empty}>No media found.</div>
          : (
            <div className={styles.grid}>
              {visible.map(m => (
                <div key={m._id} className={[styles.card, selected?._id===m._id ? styles.cardSelected : ''].join(' ')} onClick={()=>openDetail(m)}>
                  <div className={styles.cardThumbWrap}>
                    {m.type==='video'
                      ? <video src={toAbs(m.url)} className={styles.cardThumb} muted />
                      : <img   src={toAbs(m.url)} alt={m.originalName} className={styles.cardThumb} />}
                    <div className={styles.cardOverlay}>
                      <button className={styles.iconBtn} title="Info"   onClick={e=>{e.stopPropagation();openDetail(m);}}><RiInformationLine /></button>
                      <button className={styles.iconBtn} title="Rename" onClick={e=>startRename(m,e)}><RiPencilLine /></button>
                      <button className={[styles.iconBtn,styles.deleteBtn].join(' ')} title="Delete" onClick={e=>handleDelete(m,e)}><RiDeleteBinLine /></button>
                    </div>
                  </div>
                  {renaming === m._id ? (
                    <div className={styles.renameRow} onClick={e=>e.stopPropagation()}>
                      <input autoFocus className={styles.renameInput} value={renameVal} onChange={e=>setRenameVal(e.target.value)}
                        onKeyDown={e=>{if(e.key==='Enter')commitRename(m._id);if(e.key==='Escape')setRenaming(null);}} />
                      <button className={styles.renameOk}  onClick={()=>commitRename(m._id)}><RiCheckLine /></button>
                      <button className={styles.renameCan} onClick={()=>setRenaming(null)}><RiCloseLine /></button>
                    </div>
                  ) : (
                    <p className={styles.cardName}>{m.originalName}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <aside className={styles.detail}>
            <div className={styles.detailHead}>
              <h3>Details</h3>
              <button className={styles.closeDetail} onClick={()=>setSelected(null)}><RiCloseLine /></button>
            </div>
            <div className={styles.detailThumb}>
              {selected.type==='video'
                ? <video src={toAbs(selected.url)} controls className={styles.detailMedia} />
                : <img   src={toAbs(selected.url)} alt={selected.originalName} className={styles.detailMedia} />}
            </div>
            <dl className={styles.meta}>
              <dt>Name</dt><dd>{selected.originalName}</dd>
              <dt>Type</dt><dd>{selected.mimeType || selected.type}</dd>
              <dt>Size</dt><dd>{fmt(selected.size)}</dd>
              <dt>Folder</dt><dd>{selected.folder}</dd>
              <dt>Uploaded</dt><dd>{new Date(selected.createdAt).toLocaleDateString()}</dd>
              <dt>URL</dt>
              <dd className={styles.urlRow}>
                <span className={styles.urlText}>{selected.url}</span>
                <a href={toAbs(selected.url)} target="_blank" rel="noreferrer" className={styles.urlLink}><RiExternalLinkLine /></a>
              </dd>
            </dl>
            <button className={styles.usageBtn} onClick={()=>loadUsage(selected)} disabled={usageLoading}>
              <RiInformationLine /> {usageLoading ? 'Searching…' : 'Where is this used?'}
            </button>
            {usage !== null && (
              <div className={styles.usageList}>
                {usage.length === 0
                  ? <p className={styles.usageEmpty}>Not used anywhere — safe to delete.</p>
                  : usage.map((u,i) => (
                    <div key={i} className={styles.usageItem}>
                      <span className={styles.usageEntity}>{u.entity}</span>
                      <span className={styles.usageName}>{u.name}</span>
                      {u.href && <a href={u.href} target="_blank" rel="noreferrer" className={styles.usageLink}><RiExternalLinkLine /></a>}
                    </div>
                  ))}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
