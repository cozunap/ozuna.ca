'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout.jsx';
import { supabase } from '../../../supabase.js';

export default function AdminPagesManager() {
  const [activeSubTab, setActiveSubTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Home Page Form State
  const [homeData, setHomeData] = useState({
    heroTitleLine1: 'Elevating Brands',
    heroTitleLine2: 'through Design.',
    heroSubtitle: 'I am a graphic designer & web developer specializing in premium digital experiences, brand identity, and scalable design systems.',
    btn1Text: 'View Portfolio',
    btn1Link: '/work',
    btn2Text: 'About Me',
    btn2Link: '/about',
    sectionTitle: 'Selected Works'
  });

  // About Page Form State
  const [aboutData, setAboutData] = useState({
    heroTitle: 'About',
    heroSubtitle: 'A little bit about who I am and what I do.',
    headline: "Let's Create Something Great Together",
    intro: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.",
    body1: "Over the years, I've learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it's a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.",
    body2: "If you're looking for a professional graphic designer who loves design (and is excited by well-chosen typography or an engaging layout!), let's talk. I'm open to full-time, freelance, or contract positions where I can contribute, learn, and grow with a caring team.",
    body3: "Thanks for your time—I'd be honoured to help bring your company to the next level.",
    contactTitle: 'Contact Carlos Ozuna',
    cvLink: '/carlos-ozuna-cv.pdf',
    contactEmail: 'contact@ozuna.ca'
  });

  useEffect(() => {
    async function loadPages() {
      try {
        const { data, error } = await supabase
          .from('portfolio_work')
          .select('title, description')
          .eq('category', 'site_page');

        if (!error && data) {
          data.forEach(item => {
            try {
              const parsed = JSON.parse(item.description);
              if (item.title === '__page_home__') {
                setHomeData(prev => ({ ...prev, ...parsed }));
              } else if (item.title === '__page_about__') {
                setAboutData(prev => ({ ...prev, ...parsed }));
              }
            } catch (e) {
              console.error('Error parsing page config', e);
            }
          });
        }
      } catch (err) {
        console.error('Failed to load page configs', err);
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  const handleSaveHome = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    try {
      const { error } = await supabase
        .from('portfolio_work')
        .update({ description: JSON.stringify(homeData) })
        .eq('title', '__page_home__')
        .eq('category', 'site_page');

      if (error) throw error;
      setStatusMsg('✅ Home Page guardada exitosamente y actualizada en vivo.');
    } catch (err) {
      setStatusMsg('❌ Error guardando: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    try {
      const { error } = await supabase
        .from('portfolio_work')
        .update({ description: JSON.stringify(aboutData) })
        .eq('title', '__page_about__')
        .eq('category', 'site_page');

      if (error) throw error;
      setStatusMsg('✅ About Page guardada exitosamente y actualizada en vivo.');
    } catch (err) {
      setStatusMsg('❌ Error guardando: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout activeTab="pages">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Site Pages Content Editor</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
            Edita en vivo todos los textos, titulares y enlaces de tu Home y About page.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => { setActiveSubTab('home'); setStatusMsg(''); }}
          className={activeSubTab === 'home' ? 'admin-btn' : 'admin-btn-outline'}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '8px' }}
        >
          🏠 Home Page
        </button>
        <button
          onClick={() => { setActiveSubTab('about'); setStatusMsg(''); }}
          className={activeSubTab === 'about' ? 'admin-btn' : 'admin-btn-outline'}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '8px' }}
        >
          👤 About Page
        </button>
      </div>

      {statusMsg && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: statusMsg.startsWith('✅') ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)', color: statusMsg.startsWith('✅') ? '#2ecc71' : '#e74c3c', border: `1px solid ${statusMsg.startsWith('✅') ? '#2ecc71' : '#e74c3c'}` }}>
          {statusMsg}
        </div>
      )}

      {loading ? (
        <div className="admin-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
          Cargando configuración de páginas...
        </div>
      ) : activeSubTab === 'home' ? (
        /* HOME PAGE FORM */
        <div className="admin-card" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSaveHome} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ color: 'var(--admin-gold)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.75rem', margin: 0 }}>
              Hero Video Section
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="admin-label">Hero Title - Line 1</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.heroTitleLine1} 
                  onChange={e => setHomeData({ ...homeData, heroTitleLine1: e.target.value })} 
                />
              </div>
              <div>
                <label className="admin-label">Hero Title - Line 2 (Italic Accent)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.heroTitleLine2} 
                  onChange={e => setHomeData({ ...homeData, heroTitleLine2: e.target.value })} 
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Hero Subtitle</label>
              <textarea 
                className="admin-input" 
                rows="3"
                value={homeData.heroSubtitle} 
                onChange={e => setHomeData({ ...homeData, heroSubtitle: e.target.value })} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="admin-label">Button 1 Label</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.btn1Text} 
                  onChange={e => setHomeData({ ...homeData, btn1Text: e.target.value })} 
                />
              </div>
              <div>
                <label className="admin-label">Button 1 Link</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.btn1Link} 
                  onChange={e => setHomeData({ ...homeData, btn1Link: e.target.value })} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="admin-label">Button 2 Label</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.btn2Text} 
                  onChange={e => setHomeData({ ...homeData, btn2Text: e.target.value })} 
                />
              </div>
              <div>
                <label className="admin-label">Button 2 Link</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={homeData.btn2Link} 
                  onChange={e => setHomeData({ ...homeData, btn2Link: e.target.value })} 
                />
              </div>
            </div>

            <h3 style={{ color: 'var(--admin-gold)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.75rem', marginTop: '1rem', margin: 0 }}>
              Portfolio Section
            </h3>

            <div>
              <label className="admin-label">Section Heading</label>
              <input 
                type="text" 
                className="admin-input" 
                value={homeData.sectionTitle} 
                onChange={e => setHomeData({ ...homeData, sectionTitle: e.target.value })} 
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="admin-btn" disabled={saving}>
                {saving ? 'Guardando cambios...' : 'Guardar Home Page'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ABOUT PAGE FORM */
        <div className="admin-card" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSaveAbout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ color: 'var(--admin-gold)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.75rem', margin: 0 }}>
              Hero Section
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="admin-label">Header Title</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={aboutData.heroTitle} 
                  onChange={e => setAboutData({ ...aboutData, heroTitle: e.target.value })} 
                />
              </div>
              <div>
                <label className="admin-label">Header Subtitle</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={aboutData.heroSubtitle} 
                  onChange={e => setAboutData({ ...aboutData, heroSubtitle: e.target.value })} 
                />
              </div>
            </div>

            <h3 style={{ color: 'var(--admin-gold)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.75rem', marginTop: '1rem', margin: 0 }}>
              Main Biography & Story
            </h3>

            <div>
              <label className="admin-label">Headline (H3)</label>
              <input 
                type="text" 
                className="admin-input" 
                value={aboutData.headline} 
                onChange={e => setAboutData({ ...aboutData, headline: e.target.value })} 
              />
            </div>

            <div>
              <label className="admin-label">Intro Paragraph</label>
              <textarea 
                className="admin-input" 
                rows="4"
                value={aboutData.intro} 
                onChange={e => setAboutData({ ...aboutData, intro: e.target.value })} 
              />
            </div>

            <div>
              <label className="admin-label">Body Paragraph 1 (Empathy & Approach)</label>
              <textarea 
                className="admin-input" 
                rows="3"
                value={aboutData.body1} 
                onChange={e => setAboutData({ ...aboutData, body1: e.target.value })} 
              />
            </div>

            <div>
              <label className="admin-label">Body Paragraph 2 (Collaboration & Skills)</label>
              <textarea 
                className="admin-input" 
                rows="3"
                value={aboutData.body2} 
                onChange={e => setAboutData({ ...aboutData, body2: e.target.value })} 
              />
            </div>

            <div>
              <label className="admin-label">Closing Line</label>
              <input 
                type="text" 
                className="admin-input" 
                value={aboutData.body3} 
                onChange={e => setAboutData({ ...aboutData, body3: e.target.value })} 
              />
            </div>

            <h3 style={{ color: 'var(--admin-gold)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.75rem', marginTop: '1rem', margin: 0 }}>
              Contact Section & Links
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="admin-label">Contact Box Title</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={aboutData.contactTitle} 
                  onChange={e => setAboutData({ ...aboutData, contactTitle: e.target.value })} 
                />
              </div>
              <div>
                <label className="admin-label">Contact Email</label>
                <input 
                  type="email" 
                  className="admin-input" 
                  value={aboutData.contactEmail} 
                  onChange={e => setAboutData({ ...aboutData, contactEmail: e.target.value })} 
                />
              </div>
            </div>

            <div>
              <label className="admin-label">CV File URL / Path</label>
              <input 
                type="text" 
                className="admin-input" 
                value={aboutData.cvLink} 
                onChange={e => setAboutData({ ...aboutData, cvLink: e.target.value })} 
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="admin-btn" disabled={saving}>
                {saving ? 'Guardando cambios...' : 'Guardar About Page'}
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
