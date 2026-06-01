'use client';

import { useState, useEffect } from 'react';
import { RiEditLine, RiSaveLine, RiCloseLine, RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { getCategories, updateCategoryCMS } from '@/services/categories.service';
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

const TABS = ['about', 'features', 'cta'];

export default function CategoriesCMSPage() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [editing,    setEditing]    = useState(null);
  const [form,       setForm]       = useState({});
  const [saving,     setSaving]     = useState(false);
  const [activeTab,  setActiveTab]  = useState('about');

  useEffect(() => {
    getCategories()
      .then(res => setCategories(extractCollection(res, ['categories']).filter(c => !c.parentId)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (cat) => {
    setForm({
      aboutMeta:  cat.aboutMeta?.length  ? cat.aboutMeta  : DEFAULT_ABOUT_META,
      features:   cat.features?.length   ? cat.features   : DEFAULT_FEATURES,
      ctaEyebrow: cat.ctaEyebrow || 'Get Started',
      ctaTitle:   cat.ctaTitle   || 'Ready to Elevate Your Space?',
      ctaDesc:    cat.ctaDesc    || 'Our team of specialists is ready to guide you from initial consultation through installation.',
    });
    setEditing(cat);
    setActiveTab('about');
  };
  const closeEdit = () => { setEditing(null); setForm({}); };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCategoryCMS(editing._id, form);
      setCategories(prev => prev.map(c => c._id === editing._id ? { ...c, ...form } : c));
      toast.success('Category CMS saved!');
      closeEdit();
    } catch (err) {
      toast.error(err?.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const addItem    = (field, tpl) => setForm(f => ({ ...f, [field]: [...(f[field] || []), tpl] }));
  const removeItem = (field, i)   => setForm(f => ({ ...f, [field]: f[field].filter((_, j) => j !== i) }));
  const setItem    = (field, i, k, v) => setForm(f => { const a = [...f[field]]; a[i] = { ...a[i], [k]: v }; return { ...f, [field]: a }; });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categories CMS</h1>
          <p className={styles.subtitle}>Edit feature grid, spec rows, and CTA for each category page. Core data (name, image) stays in Categories.</p>
        </div>
      </div>

      {loading ? <div className={styles.loading}>Loading…</div> : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Category</th><th>About Rows</th><th>Features</th><th>CTA Title</th><th>Action</th></tr>
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
                  <td className={styles.tdMuted}>{(cat.ctaTitle || 'Ready to Elevate Your Space?').slice(0, 30)}…</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => openEdit(cat)}><RiEditLine /> Edit</button>
                  </td>
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
                  {t === 'about' ? 'About Specs' : t === 'features' ? 'Features Grid' : 'CTA Section'}
                </button>
              ))}
            </div>

            <div className={styles.modalBody}>

              {activeTab === 'about' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>Spec rows in the About section beside the image.</p>
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
                  <p className={styles.hint}>Up to 6 feature cards. Icons are auto-assigned from the static set.</p>
                  {(form.features || []).map((f, i) => (
                    <div key={i} className={styles.block}>
                      <div className={styles.row2}>
                        <input value={f.title || ''} onChange={e => setItem('features', i, 'title', e.target.value)} placeholder="Feature title" />
                        <button className={styles.delBtn} onClick={() => removeItem('features', i)}><RiDeleteBinLine /></button>
                      </div>
                      <textarea rows={2} value={f.desc || ''} onChange={e => setItem('features', i, 'desc', e.target.value)} placeholder="Short description…" />
                    </div>
                  ))}
                  {(form.features || []).length < 6 && (
                    <button className={styles.addBtn} onClick={() => addItem('features', { title: '', desc: '' })}><RiAddLine /> Add Feature</button>
                  )}
                </div>
              )}

              {activeTab === 'cta' && (
                <div className={styles.fields}>
                  <p className={styles.hint}>The dark CTA banner at the bottom of the page.</p>
                  <div className={styles.field}><label>Eyebrow</label>
                    <input value={form.ctaEyebrow || ''} onChange={e => setForm(f => ({ ...f, ctaEyebrow: e.target.value }))} />
                  </div>
                  <div className={styles.field}><label>Heading</label>
                    <input value={form.ctaTitle || ''} onChange={e => setForm(f => ({ ...f, ctaTitle: e.target.value }))} />
                  </div>
                  <div className={styles.field}><label>Description</label>
                    <textarea rows={3} value={form.ctaDesc || ''} onChange={e => setForm(f => ({ ...f, ctaDesc: e.target.value }))} />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.cancelBtn} onClick={closeEdit}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                <RiSaveLine /> {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
