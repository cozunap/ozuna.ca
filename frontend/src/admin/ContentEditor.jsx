// src/admin/ContentEditor.jsx
import React, { useState } from 'react';
import { Save, Upload, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function ContentEditor({ page, onSave }) {
  const [title, setTitle] = useState(page?.title || '');
  const [metaDescription, setMetaDescription] = useState(page?.metaDescription || '');
  const [sections, setSections] = useState(page?.sections || []);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFieldChange = (sectionIndex, fieldKey, value) => {
    const updated = [...sections];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      [fieldKey]: value
    };
    setSections(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    await onSave({
      title,
      metaDescription,
      sections
    });
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleMediaUpload = async (e, sectionIndex, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const token = localStorage.getItem('ozuna_token');
        const res = await fetch('/api/media/upload-base64', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ filename: file.name, dataUrl: reader.result })
        });
        const data = await res.json();
        if (data.url) {
          handleFieldChange(sectionIndex, fieldKey, data.url);
        }
      } catch (err) {
        alert('Upload failed: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-subtle">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">
            Page Content: <span className="text-accent">{page?.slug?.toUpperCase()}</span>
          </h2>
          <p className="text-xs text-muted">Update live text, SEO metadata, and component attributes.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-accent px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 size={16} /> Saved Live!
            </>
          ) : (
            <>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
            </>
          )}
        </button>
      </div>

      {/* SEO Metadata Box */}
      <div className="bg-surface border border-subtle rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          SEO & Page Meta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-card border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Sections Breakdown */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Page Sections ({sections.length})
        </h3>

        {sections.map((section, sIdx) => (
          <div key={section.id || sIdx} className="bg-surface border border-subtle rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-subtle/50">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Section #{sIdx + 1}: {section.name || section.id}
              </span>
              <span className="text-[11px] text-muted font-mono">{section.id}</span>
            </div>

            <div className="space-y-4">
              {Object.entries(section).map(([key, val]) => {
                if (key === 'id' || key === 'name') return null;

                // Array of list items
                if (Array.isArray(val)) {
                  return (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-muted uppercase mb-1">
                        {key} (List items)
                      </label>
                      <textarea
                        rows={3}
                        value={val.join('\n')}
                        onChange={(e) => handleFieldChange(sIdx, key, e.target.value.split('\n'))}
                        className="w-full px-4 py-2.5 bg-card border border-subtle rounded-xl text-white text-sm font-mono text-xs focus:outline-none focus:border-accent"
                      />
                    </div>
                  );
                }

                // Image / Asset URL
                if (typeof val === 'string' && (val.includes('/images/') || val.includes('.jpg') || val.includes('.png') || val.includes('.svg') || key.toLowerCase().includes('image') || key.toLowerCase().includes('video'))) {
                  return (
                    <div key={key} className="space-y-2">
                      <label className="block text-xs font-semibold text-muted uppercase">
                        {key} (Media Path)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleFieldChange(sIdx, key, e.target.value)}
                          className="flex-1 px-4 py-2 bg-card border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                        />
                        <label className="cursor-pointer bg-card hover:bg-cardHover border border-subtle text-slate-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                          <Upload size={14} /> Upload
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, sIdx, key)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                }

                // Regular string or long text
                const isLongText = typeof val === 'string' && val.length > 60;
                return (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">
                      {key}
                    </label>
                    {isLongText ? (
                      <textarea
                        rows={3}
                        value={val}
                        onChange={(e) => handleFieldChange(sIdx, key, e.target.value)}
                        className="w-full px-4 py-2.5 bg-card border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val || ''}
                        onChange={(e) => handleFieldChange(sIdx, key, e.target.value)}
                        className="w-full px-4 py-2.5 bg-card border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
