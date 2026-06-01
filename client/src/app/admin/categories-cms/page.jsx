'use client';

import { useState, useEffect } from 'react';
import { RiEditLine, RiSaveLine, RiCloseLine, RiAddLine, RiDeleteBinLine, RiImageAddLine, RiVideoLine, RiImageLine, RiUploadCloudLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getCategories, updateCategoryCMS } from '@/services/categories.service';
import { uploadImage } from '@/services/upload.service';
import { extractCollection } from '@/lib/apiResponse';
import styles from './page.module.css';

const DEFAULT_ABOUT_META = [
  { label: 'Machine Options', value: 'Essential (Global) · Elite (European)' },
  { label: 'Design Levels',   value: 'Select · Signature · Bespoke' },
  { label: 'Drive System',    value: 'Traction · Hydraulic · MRL' },
];
const DEFAULT_FEATURES = [
  { title: 'Precision Engineering', desc: 'Every unit is built to exacting tolerances — smooth, silent, and reliable.' },
  { title: 'Custom Design',         desc: 'Select from curated finish tiers — Select, Signature, or Bespoke.' },
  { title: 'Safety Certified',      desc: 'All systems comply with EN 81 and local UAE regulations.' },
  { title: 'Energy Efficient',      desc: 'Regenerative drive systems reduce power consumption by up to 40%.' },
  { title: 'Silent Operation',      desc: 'Premium bearings ensure whisper-quiet performance at all speeds.' },
  { title: 'After-Sales Support',   desc: 'Dedicated service teams ensure rapid response across the UAE.' },
];
const DEFAULT_STATS = [
  { value: '500+', label: 'Installations' },
  { value: '10+',  label: 'Years Experience' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '3x',   label: 'Faster Installation' },
];

const TABS = ['about', 'features', 'testimonial', 'gallery', 'applications', 'stats', 'cta'];
const TAB_LABELS = { about: 'Spec Rows', features: 'Features', testimonial: 'Testimonial', gallery: 'Gallery', applications: 'Applications', stats: 'Stats', cta: 'CTA' };

export default function CategoriesCMSPage() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [editing,    setEditing]    = useState(null);
  const [form,       setForm]       = useState({});
  const [saving,     setSaving]     = useState(false);
  const [activeTab,  setActiveTab]  = useState('about');
  const [uploading,  setUploading]  = useState(false);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(extractCollection(res, ['categories']).filter(c => !c.parentId)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (cat) => {
    setForm({
      aboutMeta:    cat.aboutMeta?.length    ? cat.aboutMeta    : DEFAULT_ABOUT_META,
      features:     cat.features?.length     ? cat.features     : DEFAULT_FEATURES,
      testimonial:  { quote: '', name: '', role: '', image: '', video: '', mediaType: 'image', ...(cat.testimonial || {}) },
      galleryImages: (cat.galleryImages || []).join('\n'),
      applications: cat.applications || [],
      stats:        cat.stats?.length ? cat.stats : DEFAULT_STATS,
      ctaEyebrow:   cat.ctaEyebrow || 'Get Started',
      ctaTitle:     cat.ctaTitle   || 'Ready to Elevate Your Space?',
      ctaDesc:      cat.ctaDesc    || 'Our team of specialists is ready to guide you from initial consultation through installation.',
    });
    setEditing(cat);
    setActiveTab('about');
  };
  const closeEdit = () => { setEditing(null); setForm({}); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { mediaType, ...tClean } = form.testimonial || {};
      const payload = {
        ...form,
        testimonial:   tClean,
        galleryImages: String(form.galleryImages || '').split('\n').map(l => l.trim()).filter(Boolean),
      };
      await updateCategoryCMS(editing._id, payload);
      setCategories(prev => prev.map(c => c._id === editing._id ? { ...c, ...payload } : c));
      toast.success('Saved!');
      closeEdit();
    } catch (err) {
      toast.error(err?.message || 'Save failed.');
    } finally { setSaving(false); }
  };

  const addItem    = (field, tpl) => setForm(f => ({ ...f, [field]: [...(f[field] || []), tpl] }));
  const removeItem = (field, i)   => setForm(f => ({ ...f, [field]: f[field].filter((_, j) => j !== i) }));
  const setItem    = (field, i, k, v) => setForm(f => { const a = [...f[field]]; a[i] = { ...a[i], [k]: v }; return { ...f, [field]: a }; });
  const setT       = (k, v) => setForm(f => ({ ...f, testimonial: { ...f.testimonial, [k]: v } }));

  const uploadImg = async (e, onUrl) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const tid = toast.loading('Uploading…');
    try { const url = await uploadImage(file, 'categories'); onUrl(url); toast.success('Uploaded!', { id: tid }); }
    catch (err) { toast.error(err?.message || 'Upload failed.', { id: tid }); }
    finally { setUploading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categories CMS</h1>
          <p className={styles.subtitle}>Edit all content sections of each category page — specs, features, testimonial, gallery, applications, stats, and CTA.</p>
        </div>
      </div>

      {loading ? <div className={styles.loading}>Loading…</div> : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Category</th><th>Spec Rows</th><th>Features</th><th>Gallery</th><th>Stats</th><th>Action</th></tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat._id}>
                  <td>
                    <div className={styles.catCell}>
                      {(cat.image || cat.icon) && <img src={cat.image || cat.icon} alt={cat.name} className={styles.catThumb} />}
                      <span className={styles.catName}>{cat.name}</span>
                    </div>
                  </td>
                  <td className={styles.tdCenter}>{cat.aboutMeta?.length || DEFAULT_ABOUT_META.length}</td>
                  <td className={styles.tdCenter}>{cat.features?.length  || DEFAULT_FEATURES.length}</td>
                  <td className={styles.tdCenter}>{cat.galleryImages?.length || 0}</td>
                  <td className={styles.tdCenter}>{cat.stats?.length || DEFAULT_STATS.length}</td>
                  <td><button className={styles.editBtn} onClick={() => openEdit(cat)}><RiEditLine /> Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className={styles.overlay} onClick={closeEdit}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2>{editing.name} — Page CMS</h2>
              <button className={styles.closeBtn} onClick={closeEdit}><RiCloseLine /></button>
            </div>

            <div className={styles.tabs}>
              {TABS.map(t => (
                <button key={t} className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`} onClick={() => setActiveTab(t)}>
                  {TAB_LABELS[t]}
                </button>
              ))}
            </div>

            <div className={styles.modalBody}>

              {activeTab === 'about' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Checklist rows shown in the Collection split section.</p>
                  {(form.aboutMeta || []).map((m, i) => (
                    <div key={i} className={styles.row3}>
                      <input value={m.label || ''} onChange={e => setItem('aboutMeta', i, 'label', e.target.value)} placeholder="Label" />
                      <input value={m.value || ''} onChange={e => setItem('aboutMeta', i, 'value', e.target.value)} placeholder="Value" />
                      <button className={styles.delBtn} onClick={() => removeItem('aboutMeta', i)}><RiDeleteBinLine /></button>
                    </div>
                  ))}
                  <button className={styles.addBtn} onClick={() => addItem('aboutMeta', { label: '', value: '' })}><RiAddLine /> Add Row</button>
                </div>
              )}

              {activeTab === 'features' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Up to 6 feature cards (icons auto-assigned from static set).</p>
                  {(form.features || []).map((f, i) => (
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}><input value={f.title || ''} onChange={e => setItem('features', i, 'title', e.target.value)} placeholder="Feature title" /><button className={styles.delBtn} onClick={() => removeItem('features', i)}><RiDeleteBinLine /></button></div>
                      <textarea rows={2} value={f.desc || ''} onChange={e => setItem('features', i, 'desc', e.target.value)} placeholder="Short description…" />
                    </div>
                  ))}
                  {(form.features || []).length < 6 && <button className={styles.addBtn} onClick={() => addItem('features', { title: '', desc: '' })}><RiAddLine /> Add Feature</button>}
                </div>
              )}

              {activeTab === 'testimonial' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Single editorial testimonial with large quote and portrait.</p>
                  <div className={styles.field}><label>Quote *</label><textarea rows={4} value={form.testimonial?.quote || ''} onChange={e => setT('quote', e.target.value)} placeholder="Client testimonial…" /></div>
                  <div className={styles.row2}>
                    <div className={styles.field}><label>Name</label><input value={form.testimonial?.name || ''} onChange={e => setT('name', e.target.value)} placeholder="John Smith" /></div>
                    <div className={styles.field}><label>Role</label><input value={form.testimonial?.role || ''} onChange={e => setT('role', e.target.value)} placeholder="Villa Owner, Dubai" /></div>
                  </div>
                  <div className={styles.field}>
                    <label>Media</label>
                    <div className={styles.mediaToggle}>
                      <button type="button" className={`${styles.mediaBtn} ${(form.testimonial?.mediaType||'image')==='image'?styles.mediaBtnActive:''}`} onClick={()=>setT('mediaType','image')}><RiImageLine /> Image</button>
                      <button type="button" className={`${styles.mediaBtn} ${form.testimonial?.mediaType==='video'?styles.mediaBtnActive:''}`} onClick={()=>setT('mediaType','video')}><RiVideoLine /> Video</button>
                    </div>
                  </div>
                  {(form.testimonial?.mediaType||'image')==='image' ? (
                    <div className={styles.field}><label>Client Image</label>
                      <div className={styles.imgRow}>
                        <input value={form.testimonial?.image||''} onChange={e=>setT('image',e.target.value)} placeholder="URL or upload →" />
                        <label className={`${styles.uploadBtn} ${uploading?'uploadLoading':''}`}><RiUploadCloudLine /><input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,url=>setT('image',url))} /></label>
                      </div>
                      {form.testimonial?.image && <img src={form.testimonial.image} alt="" className={styles.imgPreview} />}
                    </div>
                  ) : (
                    <div className={styles.field}><label>Video URL</label>
                      <input value={form.testimonial?.video||''} onChange={e=>setT('video',e.target.value)} placeholder="https://… (mp4 or hosted)" />
                      {form.testimonial?.video && <video src={form.testimonial.video} className={styles.imgPreview} muted playsInline />}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Full-bleed image strip below the testimonial. One URL per line.</p>
                  <textarea rows={6} value={form.galleryImages||''} onChange={e=>setForm(f=>({...f,galleryImages:e.target.value}))} placeholder={'/uploads/images/categories/img1.jpg\n/uploads/images/categories/img2.jpg'} />
                  <label className={styles.addBtn} style={{cursor:'pointer'}}>
                    <RiImageAddLine /> Upload & append
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,url=>setForm(f=>({...f,galleryImages:(f.galleryImages?f.galleryImages.trim()+'\n':'')+url})))} />
                  </label>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>"Where It Fits Best" use-case cards (max 4). Label overlaid on image.</p>
                  {(form.applications||[]).map((a,i)=>(
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}><input value={a.label||''} onChange={e=>setItem('applications',i,'label',e.target.value)} placeholder="Label (e.g. Luxury Villas)" /><button className={styles.delBtn} onClick={()=>removeItem('applications',i)}><RiDeleteBinLine /></button></div>
                      <div className={styles.imgRow}>
                        <input value={a.image||''} onChange={e=>setItem('applications',i,'image',e.target.value)} placeholder="Image URL" />
                        <label className={`${styles.uploadBtn} ${uploading?'uploadLoading':''}`}><RiImageAddLine /><input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,url=>setItem('applications',i,'image',url))} /></label>
                      </div>
                      {a.image && <img src={a.image} alt="" className={styles.imgPreview} />}
                    </div>
                  ))}
                  {(form.applications||[]).length < 4 && <button className={styles.addBtn} onClick={()=>addItem('applications',{label:'',image:''})}><RiAddLine /> Add Application</button>}
                </div>
              )}

              {activeTab === 'stats' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Numbers in the dark stats bar (max 4).</p>
                  {(form.stats||[]).map((s,i)=>(
                    <div key={i} className={styles.row3}>
                      <input value={s.value||''} onChange={e=>setItem('stats',i,'value',e.target.value)} placeholder="Value (e.g. 500+)" />
                      <input value={s.label||''} onChange={e=>setItem('stats',i,'label',e.target.value)} placeholder="Label (e.g. Installations)" />
                      <button className={styles.delBtn} onClick={()=>removeItem('stats',i)}><RiDeleteBinLine /></button>
                    </div>
                  ))}
                  {(form.stats||[]).length < 4 && <button className={styles.addBtn} onClick={()=>addItem('stats',{value:'',label:''})}><RiAddLine /> Add Stat</button>}
                </div>
              )}

              {activeTab === 'cta' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Dark CTA banner at the bottom of the page.</p>
                  <div className={styles.field}><label>Eyebrow</label><input value={form.ctaEyebrow||''} onChange={e=>setForm(f=>({...f,ctaEyebrow:e.target.value}))} /></div>
                  <div className={styles.field}><label>Heading</label><input value={form.ctaTitle||''} onChange={e=>setForm(f=>({...f,ctaTitle:e.target.value}))} /></div>
                  <div className={styles.field}><label>Description</label><textarea rows={3} value={form.ctaDesc||''} onChange={e=>setForm(f=>({...f,ctaDesc:e.target.value}))} /></div>
                </div>
              )}

            </div>

            <div className={styles.modalFoot}>
              {uploading && <span className={styles.uploadingText}>Uploading…</span>}
              <button className={styles.cancelBtn} onClick={closeEdit}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving||uploading}>
                <RiSaveLine /> {saving?'Saving…':'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
