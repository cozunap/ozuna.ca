// src/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette,
  FileText,
  Briefcase,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  ExternalLink,
  Shield,
  Video,
  Images,
  ArrowLeft,
  ArrowRight,
  Star
} from 'lucide-react';
import ContentEditor from './ContentEditor';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPageSlug, setSelectedPageSlug] = useState('home');
  const [portfolio, setPortfolio] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [bulkGalleryText, setBulkGalleryText] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('ozuna_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [token]);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [resSet, resPages, resPort, resSub] = await Promise.all([
        fetch('/api/content/settings'),
        fetch('/api/content/pages'),
        fetch('/api/content/portfolio'),
        fetch('/api/content/submissions', { headers: authHeaders })
      ]);

      if (resSet.ok) setSettings(await resSet.json());
      if (resPages.ok) {
        const pagesData = await resPages.json();
        setPages(pagesData);
        if (pagesData.length > 0 && !selectedPageSlug) {
          setSelectedPageSlug(pagesData[0].slug);
        }
      }
      if (resPort.ok) setPortfolio(await resPort.json());
      if (resSub.ok) setSubmissions(await resSub.json());
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ozuna_token');
    localStorage.removeItem('ozuna_user');
    navigate('/admin/login');
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/settings', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (err) {
      alert('Failed saving settings: ' + err.message);
    }
  };

  const handleSavePage = async (pageData) => {
    try {
      const res = await fetch(`/api/content/pages/${selectedPageSlug}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(pageData)
      });
      if (res.ok) {
        await loadAllData();
      }
    } catch (err) {
      alert('Failed saving page: ' + err.message);
    }
  };

  const handleSavePortfolioItem = async (e) => {
    e.preventDefault();
    try {
      const url = isNewItem
        ? '/api/content/portfolio'
        : `/api/content/portfolio/${editingItem.id}`;
      const method = isNewItem ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        setEditingItem(null);
        setIsNewItem(false);
        await loadAllData();
      }
    } catch (err) {
      alert('Failed saving portfolio item: ' + err.message);
    }
  };

  const handleDeletePortfolioItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      const res = await fetch(`/api/content/portfolio/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        await loadAllData();
      }
    } catch (err) {
      alert('Failed deleting item: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dominant flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm uppercase tracking-wider font-semibold">Loading CMS Dashboard...</p>
        </div>
      </div>
    );
  }

  const selectedPage = pages.find((p) => p.slug === selectedPageSlug) || pages[0];

  return (
    <div className="min-h-screen bg-dominant flex flex-col md:flex-row text-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-subtle flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="p-2 rounded-xl bg-accent text-white">
              <Shield size={20} />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight font-heading text-white">
                OZUNA<span className="text-accent">.CA</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted">CMS Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'settings'
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'text-slate-400 hover:text-white hover:bg-surface'
              }`}
            >
              <Palette size={16} /> 60-30-10 & Hero
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'pages'
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'text-slate-400 hover:text-white hover:bg-surface'
              }`}
            >
              <FileText size={16} /> Pages & Content
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'text-slate-400 hover:text-white hover:bg-surface'
              }`}
            >
              <Briefcase size={16} /> Portfolio Items
              <span className="ml-auto text-[10px] bg-surface px-2 py-0.5 rounded-full border border-subtle">
                {portfolio.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'submissions'
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'text-slate-400 hover:text-white hover:bg-surface'
              }`}
            >
              <Mail size={16} /> Submissions
              <span className="ml-auto text-[10px] bg-surface px-2 py-0.5 rounded-full border border-subtle">
                {submissions.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Footer controls */}
        <div className="pt-6 border-t border-subtle space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white px-2 py-1.5 transition-colors"
          >
            <span>Preview Live Site</span>
            <ExternalLink size={14} />
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        {/* Tab 1: Global 60-30-10 & Hero Video */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-subtle">
              <div>
                <h1 className="text-2xl font-black font-heading text-white uppercase">
                  Global Design & Media Tokens
                </h1>
                <p className="text-xs text-muted">
                  Configured according to the computed 60-30-10 color psychology system.
                </p>
              </div>
              <button
                type="submit"
                className="btn-accent px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                {settingsSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                {settingsSaved ? 'Saved Live!' : 'Save Tokens'}
              </button>
            </div>

            {/* 60-30-10 Palette */}
            <div className="bg-card border border-subtle rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                60-30-10 Color Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-2">
                    60% Dominant (Canvas / Surface)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.colors?.dominant60 || '#020202'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, dominant60: e.target.value }
                        })
                      }
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={settings.colors?.dominant60 || '#020202'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, dominant60: e.target.value }
                        })
                      }
                      className="flex-1 px-3 py-2 bg-surface border border-subtle rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-2">
                    30% Secondary (Structure & Cards)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.colors?.secondary30 || '#111111'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, secondary30: e.target.value }
                        })
                      }
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={settings.colors?.secondary30 || '#111111'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, secondary30: e.target.value }
                        })
                      }
                      className="flex-1 px-3 py-2 bg-surface border border-subtle rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-2">
                    10% Accent (CTA & Highlights)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.colors?.accent10 || '#ff1d25'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, accent10: e.target.value }
                        })
                      }
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={settings.colors?.accent10 || '#ff1d25'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, accent10: e.target.value }
                        })
                      }
                      className="flex-1 px-3 py-2 bg-surface border border-subtle rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Video Controls */}
            <div className="bg-card border border-subtle rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                <Video size={16} /> Looping Hero Background Video
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Video File Path or Stream URL
                </label>
                <input
                  type="text"
                  value={settings.heroVideo || ''}
                  onChange={(e) => setSettings({ ...settings, heroVideo: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface border border-subtle rounded-xl text-sm font-mono text-white"
                />
              </div>

              {settings.heroVideo && (
                <div className="mt-4 rounded-xl overflow-hidden border border-subtle aspect-video max-w-md bg-black">
                  <video
                    src={settings.heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </form>
        )}

        {/* Tab 2: Pages & Content Editor */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            {/* Page selection pills */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-subtle">
              {pages.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedPageSlug(p.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedPageSlug === p.slug
                      ? 'bg-accent text-white shadow-lg shadow-accent/25'
                      : 'bg-card text-slate-400 hover:text-white border border-subtle'
                  }`}
                >
                  {p.slug}
                </button>
              ))}
            </div>

            {selectedPage && (
              <ContentEditor
                key={selectedPage.slug}
                page={selectedPage}
                onSave={handleSavePage}
              />
            )}
          </div>
        )}

        {/* Tab 3: Portfolio Items Manager */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-subtle">
              <div>
                <h1 className="text-2xl font-black font-heading text-white uppercase">
                  Portfolio Manager
                </h1>
                <p className="text-xs text-muted">Manage case studies, categories, and media paths.</p>
              </div>
              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    category: 'Graphic Design',
                    slug: '',
                    image: '/images/ajsmechanical-net.jpg',
                    description: '',
                    client: '',
                    year: '2026',
                    link: '',
                    featured: true,
                    order: portfolio.length + 1,
                    gallery: ['/images/ajsmechanical-net.jpg']
                  });
                  setIsNewItem(true);
                  setShowBulkAdd(false);
                  setNewGalleryUrl('');
                  setBulkGalleryText('');
                }}
                className="btn-accent px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>

            {/* Edit / Create Form Modal/Drawer */}
            {editingItem && (
              <form onSubmit={handleSavePortfolioItem} className="bg-card border border-accent/40 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-subtle">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    {isNewItem ? 'Create New Project' : `Edit Project: ${editingItem.title}`}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-surface border border-subtle text-slate-300">
                    {editingItem.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-sm text-white"
                    >
                      <option value="Graphic Design">Graphic Design (Interactive Gallery)</option>
                      <option value="Web Design">Web Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Cover Image Path</label>
                    <input
                      type="text"
                      required
                      value={editingItem.image}
                      onChange={(e) => {
                        const newImg = e.target.value;
                        const currentGallery = editingItem.gallery || [];
                        const updatedGallery = currentGallery.length > 0
                          ? [newImg, ...currentGallery.slice(1)]
                          : [newImg];
                        setEditingItem({
                          ...editingItem,
                          image: newImg,
                          gallery: updatedGallery
                        });
                      }}
                      className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Client</label>
                    <input
                      type="text"
                      value={editingItem.client || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                      className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-sm text-white"
                  />
                </div>

                {/* Interactive Multi-Image Gallery Manager (Especially for Graphic Design) */}
                <div className="pt-4 border-t border-subtle space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Images size={18} className="text-accent" />
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                          Project Gallery ({editingItem.gallery?.length || 0} Images)
                        </h4>
                        {editingItem.category === 'Graphic Design' && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                            Graphic Design Gallery
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mt-1">
                        These images render in the interactive lightbox carousel on ozuna.ca/work. Drag or reorder them and set the primary cover.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowBulkAdd(!showBulkAdd)}
                      className="px-3 py-1.5 bg-surface border border-subtle rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors shrink-0"
                    >
                      {showBulkAdd ? 'Simple Add Mode' : 'Bulk Import (Multiple Paths)'}
                    </button>
                  </div>

                  {/* Bulk Add Textarea or Single Input */}
                  {showBulkAdd ? (
                    <div className="bg-surface/80 border border-subtle rounded-xl p-4 space-y-3">
                      <label className="block text-xs font-semibold text-muted uppercase">
                        Paste Image Paths / URLs (one per line)
                      </label>
                      <textarea
                        rows={4}
                        placeholder={`/images/Bus-Advertising.jpg\n/images/degan-flyers.jpg\n/images/Degan-Business-C.jpg`}
                        value={bulkGalleryText}
                        onChange={(e) => setBulkGalleryText(e.target.value)}
                        className="w-full px-3 py-2 bg-card border border-subtle rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-accent"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const urls = bulkGalleryText
                              .split('\n')
                              .map((u) => u.trim())
                              .filter((u) => u.length > 0);
                            if (urls.length > 0) {
                              const current = editingItem.gallery || [];
                              const combined = [...current, ...urls];
                              setEditingItem({
                                ...editingItem,
                                gallery: combined,
                                image: editingItem.image || combined[0]
                              });
                              setBulkGalleryText('');
                              setShowBulkAdd(false);
                            }
                          }}
                          className="btn-accent px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                        >
                          Add All Images
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Enter image path e.g. /images/degan-flyers.jpg or full URL"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newGalleryUrl.trim()) {
                                const current = editingItem.gallery || [];
                                const updated = [...current, newGalleryUrl.trim()];
                                setEditingItem({
                                  ...editingItem,
                                  gallery: updated,
                                  image: editingItem.image || updated[0]
                                });
                                setNewGalleryUrl('');
                              }
                            }
                          }}
                          className="w-full px-4 py-2 bg-surface border border-subtle rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (newGalleryUrl.trim()) {
                            const current = editingItem.gallery || [];
                            const updated = [...current, newGalleryUrl.trim()];
                            setEditingItem({
                              ...editingItem,
                              gallery: updated,
                              image: editingItem.image || updated[0]
                            });
                            setNewGalleryUrl('');
                          }
                        }}
                        className="px-4 py-2 bg-accent/20 hover:bg-accent text-accent hover:text-white border border-accent/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Plus size={15} /> Add to Gallery
                      </button>
                    </div>
                  )}

                  {/* Gallery Thumbnails List */}
                  {editingItem.gallery && editingItem.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                      {editingItem.gallery.map((imgSrc, idx) => {
                        const isCover = idx === 0 || imgSrc === editingItem.image;
                        return (
                          <div
                            key={`${imgSrc}-${idx}`}
                            className={`group relative rounded-xl overflow-hidden border transition-all ${
                              isCover
                                ? 'border-accent ring-2 ring-accent/30 bg-accent/5'
                                : 'border-subtle bg-surface hover:border-slate-500'
                            }`}
                          >
                            {/* Thumbnail Preview */}
                            <div className="aspect-[4/3] w-full bg-black/70 relative overflow-hidden flex items-center justify-center">
                              <img
                                src={imgSrc}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/cozuna-contact.jpeg';
                                }}
                              />
                              <span
                                className={`absolute top-1.5 left-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow ${
                                  isCover ? 'bg-accent text-white' : 'bg-black/80 text-white/90 backdrop-blur-sm'
                                }`}
                              >
                                {isCover ? 'Cover' : `#${idx + 1}`}
                              </span>
                            </div>

                            {/* Path and Actions */}
                            <div className="p-2 bg-card border-t border-subtle/50">
                              <p className="text-[10px] font-mono text-slate-300 truncate" title={imgSrc}>
                                {imgSrc.split('/').pop() || imgSrc}
                              </p>

                              <div className="flex items-center justify-between gap-1 mt-2 pt-1.5 border-t border-subtle/40">
                                <div className="flex items-center gap-0.5">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => {
                                      const newG = [...editingItem.gallery];
                                      const temp = newG[idx];
                                      newG[idx] = newG[idx - 1];
                                      newG[idx - 1] = temp;
                                      setEditingItem({
                                        ...editingItem,
                                        gallery: newG,
                                        image: idx - 1 === 0 ? temp : editingItem.image
                                      });
                                    }}
                                    title="Move earlier"
                                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-surface disabled:opacity-20 disabled:hover:bg-transparent"
                                  >
                                    <ArrowLeft size={12} />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === editingItem.gallery.length - 1}
                                    onClick={() => {
                                      const newG = [...editingItem.gallery];
                                      const temp = newG[idx];
                                      newG[idx] = newG[idx + 1];
                                      newG[idx + 1] = temp;
                                      setEditingItem({
                                        ...editingItem,
                                        gallery: newG
                                      });
                                    }}
                                    title="Move later"
                                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-surface disabled:opacity-20 disabled:hover:bg-transparent"
                                  >
                                    <ArrowRight size={12} />
                                  </button>
                                </div>

                                <div className="flex items-center gap-1">
                                  {!isCover && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newG = [imgSrc, ...editingItem.gallery.filter((_, i) => i !== idx)];
                                        setEditingItem({
                                          ...editingItem,
                                          image: imgSrc,
                                          gallery: newG
                                        });
                                      }}
                                      title="Set as Main Cover Image"
                                      className="p-1 rounded text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                                    >
                                      <Star size={12} />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newG = editingItem.gallery.filter((_, i) => i !== idx);
                                      const newCover = (idx === 0 && newG.length > 0) ? newG[0] : editingItem.image;
                                      setEditingItem({
                                        ...editingItem,
                                        gallery: newG,
                                        image: newCover
                                      });
                                    }}
                                    title="Delete from Gallery"
                                    className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center border border-dashed border-subtle rounded-xl bg-surface/30">
                      <p className="text-xs text-muted">
                        No gallery images added yet. Add images above to build this project's interactive gallery.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setNewGalleryUrl('');
                      setBulkGalleryText('');
                      setShowBulkAdd(false);
                    }}
                    className="px-4 py-2 bg-surface border border-subtle rounded-xl text-xs font-bold uppercase text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-accent px-6 py-2 rounded-xl text-xs font-bold uppercase"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Items Table */}
            <div className="bg-card border border-subtle rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-muted text-xs uppercase tracking-wider border-b border-subtle">
                  <tr>
                    <th className="py-3 px-4">Preview</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle/50">
                  {portfolio.map((item) => (
                    <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-10 object-cover rounded-lg bg-surface"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=200';
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{item.title}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface border border-subtle text-slate-300">
                            {item.category}
                          </span>
                          {item.gallery && item.gallery.length > 1 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/15 text-accent border border-accent/25">
                              {item.gallery.length} Images
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted text-xs">{item.client || '—'}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...item,
                              gallery: Array.isArray(item.gallery) && item.gallery.length > 0
                                ? [...item.gallery]
                                : [item.image || '/images/ajsmechanical-net.jpg']
                            });
                            setIsNewItem(false);
                            setShowBulkAdd(false);
                            setNewGalleryUrl('');
                            setBulkGalleryText('');
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeletePortfolioItem(item.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Submissions Inbox */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-subtle">
              <h1 className="text-2xl font-black font-heading text-white uppercase">
                Contact Form Submissions
              </h1>
              <p className="text-xs text-muted">Inbound lead messages submitted via the website.</p>
            </div>

            {submissions.length === 0 ? (
              <div className="bg-card border border-subtle rounded-2xl p-12 text-center text-muted">
                <Mail size={32} className="mx-auto mb-3 opacity-40" />
                <p>No messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div key={sub.id} className="bg-card border border-subtle rounded-2xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">{sub.name}</span>
                        <a
                          href={`mailto:${sub.email}`}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          {sub.email}
                        </a>
                      </div>
                      <span className="text-xs text-muted font-mono">
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {sub.phone && (
                      <p className="text-xs text-slate-400 font-mono">Phone: {sub.phone}</p>
                    )}

                    <p className="text-sm text-slate-200 bg-surface p-4 rounded-xl border border-subtle/50 whitespace-pre-wrap">
                      {sub.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
