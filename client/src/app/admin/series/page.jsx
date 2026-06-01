'use client';

import { useState, useEffect } from 'react';
import { RiEditLine, RiSaveLine, RiCloseLine, RiAddLine, RiDeleteBinLine, RiImageAddLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getAllSeriesCMS, upsertSeriesCMS } from '@/services/series.service';
import { uploadImage } from '@/services/upload.service';
import styles from './page.module.css';

/* ── Fallback mirrors SERIES_DATA in page.jsx ── */
const FALLBACK = {
  HT: { tagline: 'Built for What Endures.', pitFree: false, description: 'The Heritage series is engineered for permanence.', heroImage: '/series/heritage.png', images: ['/series/heritage.png'], details: [{ label: 'Shaft Type', value: 'RCC (Reinforced Concrete)' }, { label: 'Capacity Range', value: '320 kg – 1200 kg' }], tiers: [{ name: 'Essential', subtitle: 'Global Standard', bullets: ['Globally-sourced precision components', '3-year warranty'] }, { name: 'Elite', subtitle: 'European Grade', bullets: ['Premium European-engineered machines', '5-year warranty'] }], cabinStyles: [{ name: 'Select', label: 'Classically Simple', image: '/projects/adnoc.png', desc: 'Clean stainless panels.' }, { name: 'Signature', label: 'Elevated Design', image: '/projects/downtown.png', desc: 'Premium panel materials.' }, { name: 'Bespoke', label: 'Fully Custom', image: '/projects/palm-jumeirah.png', desc: 'Every surface tailored.' }], finishes: [{ name: 'Silver Satin', color: '#B8B8B8' }, { name: 'Gold Mirror', color: '#D4AF37' }, { name: 'Matte Black', color: '#1A1A1A' }], applications: [{ label: 'Luxury Villas', image: '/projects/downtown.png' }, { label: 'High-Rise Towers', image: '/projects/adnoc.png' }] },
  HZ: { tagline: 'Light. Space. Movement.', pitFree: false, description: 'The Horizon series redefines vertical mobility through transparency.', heroImage: '/series/horizon.png', images: ['/series/horizon.png'], details: [{ label: 'Shaft Type', value: 'MS (Mild Steel) Shaft' }, { label: 'Capacity Range', value: '320 kg – 1000 kg' }], tiers: [{ name: 'Essential', subtitle: 'Global Standard', bullets: ['Global drive systems', '3-year warranty'] }, { name: 'Elite', subtitle: 'European Grade', bullets: ['European precision motors', '5-year warranty'] }], cabinStyles: [{ name: 'Select', label: 'Crystal Clear', image: '/projects/yas-island.png', desc: 'Full glass panels.' }, { name: 'Signature', label: 'Tinted Elegance', image: '/projects/city-centre.png', desc: 'Tinted glass.' }, { name: 'Bespoke', label: 'Architect Specified', image: '/projects/al-majaz.png', desc: 'Architect-specified.' }], finishes: [{ name: 'Clear Glass', color: '#DDE8F0' }, { name: 'Black Frame', color: '#1A1A1A' }], applications: [{ label: 'Hotel Atriums', image: '/projects/yas-island.png' }, { label: 'Retail Centres', image: '/projects/city-centre.png' }] },
  OB: { tagline: 'Round by Design. Refined by Purpose.', pitFree: false, description: 'The Orbit series centres on the circle.', heroImage: '/series/orbit.png', images: ['/series/orbit.png'], details: [{ label: 'Shaft Type', value: 'Round / Curved Shaft' }], tiers: [{ name: 'Essential', subtitle: 'Global Standard', bullets: ['Precision global components', '3-year warranty'] }, { name: 'Elite', subtitle: 'European Grade', bullets: ['European precision drive', '5-year warranty'] }], cabinStyles: [{ name: 'Select', label: 'Classically Round', image: '/projects/palm-jumeirah.png', desc: 'Curved glass walls.' }, { name: 'Signature', label: 'Refined Curvature', image: '/projects/downtown.png', desc: 'Custom lighting.' }, { name: 'Bespoke', label: 'Landmark Vision', image: '/projects/yas-island.png', desc: 'Every surface to drawing.' }], finishes: [{ name: 'Silver Satin', color: '#B8B8B8' }, { name: 'Champagne Gold', color: '#EDD9A3' }], applications: [{ label: 'Luxury Villas', image: '/projects/palm-jumeirah.png' }] },
  AS: { tagline: 'No Pit. No Compromise.', pitFree: true, description: 'The Aero Slim is our pit-free panoramic lift.', heroImage: '/series/aero-slim.png', images: ['/series/aero-slim.png'], details: [{ label: 'Shaft Type', value: 'Self-Supporting Structure' }, { label: 'Pit Depth', value: 'Zero — Pit-Free' }], tiers: [{ name: 'Essential', subtitle: 'Global Standard', bullets: ['Pit-free structure', '3-year warranty'] }, { name: 'Elite', subtitle: 'European Grade', bullets: ['European hydraulics', '5-year warranty'] }], cabinStyles: [{ name: 'Select', label: 'Slim & Open', image: '/projects/adnoc.png', desc: 'Slim panoramic glass.' }, { name: 'Signature', label: 'Tinted & Refined', image: '/projects/city-centre.png', desc: 'Tinted glass.' }, { name: 'Bespoke', label: 'Retrofit Luxury', image: '/projects/al-majaz.png', desc: 'Fully specified.' }], finishes: [{ name: 'Clear Panoramic', color: '#DDE8F0' }, { name: 'Matte Black', color: '#1A1A1A' }], applications: [{ label: 'Retrofit Buildings', image: '/projects/adnoc.png' }] },
};

const SERIES_META = [
  { code: 'HT', name: 'Heritage', slug: 'heritage' },
  { code: 'HZ', name: 'Horizon',  slug: 'horizon'  },
  { code: 'OB', name: 'Orbit',    slug: 'orbit'     },
  { code: 'AS', name: 'Aero',     slug: 'aero'      },
];

const TABS = ['basic','images','details','tiers','cabins','finishes','applications'];

const arrStr = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const strArr = (s)   => String(s||'').split('\n').map(l=>l.trim()).filter(Boolean);

function mergeWithFallback(code, cms) {
  const fb = FALLBACK[code];
  const c  = cms || {};
  return {
    tagline:     c.tagline     || fb.tagline     || '',
    pitFree:     c.pitFree     ?? fb.pitFree     ?? false,
    description: c.description || fb.description || '',
    heroImage:   c.heroImage   || fb.heroImage   || '',
    images:      arrStr(c.images?.length     ? c.images     : fb.images     || []),
    details:     c.details?.length     ? c.details     : fb.details     || [],
    tiers:       (c.tiers?.length      ? c.tiers      : fb.tiers      || []).map(t=>({...t,bulletsText:arrStr(t.bullets)})),
    cabinStyles: c.cabinStyles?.length ? c.cabinStyles : fb.cabinStyles || [],
    finishes:    c.finishes?.length    ? c.finishes    : fb.finishes    || [],
    applications:c.applications?.length? c.applications: fb.applications|| [],
    features:    c.features?.length    ? c.features    : [],
    techSpecs:   c.techSpecs?.length   ? c.techSpecs   : [],
  };
}

export default function SeriesCMSPage() {
  const [cmsData,    setCmsData]    = useState({});
  const [loading,    setLoading]    = useState(true);
  const [editing,    setEditing]    = useState(null);
  const [form,       setForm]       = useState({});
  const [saving,     setSaving]     = useState(false);
  const [activeTab,  setActiveTab]  = useState('basic');
  const [uploading,  setUploading]  = useState(false);

  useEffect(() => {
    getAllSeriesCMS()
      .then(list => {
        const map = {};
        if (Array.isArray(list)) list.forEach(s => { map[s.code] = s; });
        setCmsData(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (code) => {
    setForm(mergeWithFallback(code, cmsData[code]));
    setEditing(code);
    setActiveTab('basic');
  };
  const closeEdit = () => { setEditing(null); setForm({}); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        images: strArr(form.images),
        tiers:  form.tiers.map(t => {
          const { bulletsText, ...rest } = t;
          return { ...rest, bullets: strArr(bulletsText) };
        }),
      };
      const saved = await upsertSeriesCMS(editing, payload);
      setCmsData(prev => ({ ...prev, [editing]: saved }));
      toast.success('Saved!');
      closeEdit();
    } catch (err) {
      toast.error(err?.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const uploadImg = async (e, field, idx, subField) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, 'series');
      if (subField != null) {
        setForm(f => { const arr = [...f[field]]; arr[idx] = { ...arr[idx], [subField]: url }; return { ...f, [field]: arr }; });
      } else {
        setForm(f => ({ ...f, [field]: url }));
      }
    } catch { toast.error('Upload failed.'); }
    finally { setUploading(false); }
  };

  const addItem    = (field, tpl) => setForm(f => ({ ...f, [field]: [...(f[field]||[]), tpl] }));
  const removeItem = (field, i)   => setForm(f => ({ ...f, [field]: f[field].filter((_,j)=>j!==i) }));
  const setItem    = (field, i, k, v) => setForm(f => { const a=[...f[field]]; a[i]={...a[i],[k]:v}; return {...f,[field]:a}; });

  const meta = editing ? SERIES_META.find(s => s.code === editing) : null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Series CMS</h1>
          <p className={styles.subtitle}>Edit each series page — static data is used as fallback when a field is empty.</p>
        </div>
      </div>

      {loading ? <div className={styles.loading}>Loading…</div> : (
        <div className={styles.grid}>
          {SERIES_META.map(s => {
            const hasCms = !!cmsData[s.code];
            const fb     = FALLBACK[s.code];
            return (
              <div key={s.code} className={styles.seriesCard}>
                <div className={styles.cardHero} style={{ backgroundImage: `url(${cmsData[s.code]?.heroImage || fb.heroImage})` }}>
                  <div className={styles.cardOverlay} />
                  <span className={styles.cardCode}>{s.code}</span>
                  {hasCms && <span className={styles.cmsBadge}>CMS Active</span>}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{s.name}</h3>
                  <p className={styles.cardTagline}>{cmsData[s.code]?.tagline || fb.tagline}</p>
                  <button className={styles.editBtn} onClick={() => openEdit(s.code)}>
                    <RiEditLine /> Edit Content
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {editing && (
        <div className={styles.overlay} onClick={closeEdit}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2>{meta?.name} Series — Edit Content</h2>
              <button className={styles.closeBtn} onClick={closeEdit}><RiCloseLine /></button>
            </div>

            <div className={styles.tabs}>
              {TABS.map(t => (
                <button key={t} className={`${styles.tab} ${activeTab===t?styles.tabActive:''}`} onClick={()=>setActiveTab(t)}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.modalBody}>

              {activeTab === 'basic' && (
                <div className={styles.fields}>
                  <div className={styles.field}><label>Tagline</label>
                    <input value={form.tagline||''} onChange={e=>setForm(f=>({...f,tagline:e.target.value}))} />
                  </div>
                  <div className={styles.field}><label>Description</label>
                    <textarea rows={4} value={form.description||''} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
                  </div>
                  <div className={styles.field}><label>Hero Image</label>
                    <div className={styles.imgRow}>
                      <input value={form.heroImage||''} onChange={e=>setForm(f=>({...f,heroImage:e.target.value}))} placeholder="URL or upload →" />
                      <label className={styles.uploadBtn}><RiImageAddLine /><input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,'heroImage')} /></label>
                    </div>
                    {form.heroImage && <img src={form.heroImage} alt="" className={styles.imgPreview} />}
                  </div>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" checked={!!form.pitFree} onChange={e=>setForm(f=>({...f,pitFree:e.target.checked}))} />
                    Pit-Free Series
                  </label>
                </div>
              )}

              {activeTab === 'images' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>One URL per line. First image = hero background, rest = gallery.</p>
                  <textarea rows={6} value={form.images||''} onChange={e=>setForm(f=>({...f,images:e.target.value}))} />
                  <label className={styles.addBtn} style={{cursor:'pointer'}}>
                    <RiImageAddLine /> Upload & append
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{
                      const file=e.target.files[0]; if(!file) return;
                      setUploading(true);
                      try { const url=await uploadImage(file,'series'); setForm(f=>({...f,images:(f.images?f.images.trim()+'\n':'')+url})); }
                      catch{ toast.error('Upload failed.'); } finally{ setUploading(false); }
                    }} />
                  </label>
                </div>
              )}

              {activeTab === 'details' && (
                <div className={styles.fields}>
                  {(form.details||[]).map((d,i)=>(
                    <div key={i} className={styles.row3}>
                      <input value={d.label||''} onChange={e=>setItem('details',i,'label',e.target.value)} placeholder="Label (e.g. Shaft Type)" />
                      <input value={d.value||''} onChange={e=>setItem('details',i,'value',e.target.value)} placeholder="Value (e.g. RCC)" />
                      <button className={styles.delBtn} onClick={()=>removeItem('details',i)}><RiDeleteBinLine /></button>
                    </div>
                  ))}
                  <button className={styles.addBtn} onClick={()=>addItem('details',{label:'',value:''})}><RiAddLine /> Add Row</button>
                </div>
              )}

              {activeTab === 'tiers' && (
                <div className={styles.fields}>
                  {(form.tiers||[]).map((t,i)=>(
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}>
                        <input value={t.name||''} onChange={e=>setItem('tiers',i,'name',e.target.value)} placeholder="Tier name (Essential)" />
                        <input value={t.subtitle||''} onChange={e=>setItem('tiers',i,'subtitle',e.target.value)} placeholder="Subtitle (Global Standard)" />
                      </div>
                      <label className={styles.smallLabel}>Bullet points — one per line</label>
                      <textarea rows={4} value={t.bulletsText||''} onChange={e=>setItem('tiers',i,'bulletsText',e.target.value)} placeholder={'Feature 1\nFeature 2\nFeature 3'} />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'cabins' && (
                <div className={styles.fields}>
                  {(form.cabinStyles||[]).map((c,i)=>(
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}>
                        <input value={c.name||''} onChange={e=>setItem('cabinStyles',i,'name',e.target.value)} placeholder="Badge (Select)" />
                        <input value={c.label||''} onChange={e=>setItem('cabinStyles',i,'label',e.target.value)} placeholder="Title (Classically Simple)" />
                      </div>
                      <textarea rows={2} value={c.desc||''} onChange={e=>setItem('cabinStyles',i,'desc',e.target.value)} placeholder="Short description…" />
                      <div className={styles.imgRow}>
                        <input value={c.image||''} onChange={e=>setItem('cabinStyles',i,'image',e.target.value)} placeholder="Image URL" />
                        <label className={styles.uploadBtn}><RiImageAddLine /><input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,'cabinStyles',i,'image')} /></label>
                      </div>
                      {c.image && <img src={c.image} alt="" className={styles.imgPreview} />}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'finishes' && (
                <div className={styles.fields}>
                  <div className={styles.finishGrid}>
                    {(form.finishes||[]).map((f,i)=>(
                      <div key={i} className={styles.finishRow}>
                        <input type="color" value={f.color||'#888888'} onChange={e=>setItem('finishes',i,'color',e.target.value)} className={styles.colorPicker} />
                        <input value={f.name||''} onChange={e=>setItem('finishes',i,'name',e.target.value)} placeholder="Finish name" />
                        <button className={styles.delBtn} onClick={()=>removeItem('finishes',i)}><RiDeleteBinLine /></button>
                      </div>
                    ))}
                  </div>
                  <button className={styles.addBtn} onClick={()=>addItem('finishes',{name:'',color:'#888888'})}><RiAddLine /> Add Finish</button>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className={styles.fields}>
                  {(form.applications||[]).map((a,i)=>(
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}>
                        <input value={a.label||''} onChange={e=>setItem('applications',i,'label',e.target.value)} placeholder="Label (Luxury Villas)" />
                        <button className={styles.delBtn} onClick={()=>removeItem('applications',i)}><RiDeleteBinLine /></button>
                      </div>
                      <div className={styles.imgRow}>
                        <input value={a.image||''} onChange={e=>setItem('applications',i,'image',e.target.value)} placeholder="Image URL" />
                        <label className={styles.uploadBtn}><RiImageAddLine /><input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadImg(e,'applications',i,'image')} /></label>
                      </div>
                      {a.image && <img src={a.image} alt="" className={styles.imgPreview} />}
                    </div>
                  ))}
                  <button className={styles.addBtn} onClick={()=>addItem('applications',{label:'',image:''})}><RiAddLine /> Add</button>
                </div>
              )}

            </div>

            <div className={styles.modalFoot}>
              {uploading && <span className={styles.uploading}>Uploading image…</span>}
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
