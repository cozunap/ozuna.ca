// src/routes/content.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// 1. Global Settings
router.get('/settings', async (req, res) => {
  try {
    let settings = await prisma.siteSetting.findUnique({ where: { id: 'global-settings' } });
    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          id: 'global-settings',
          title: 'Carlos Ozuna | Senior Graphic Designer & Web Developer',
          description: 'Portfolio of Carlos Ozuna, Senior Designer & Full-Stack Web Developer.',
          colorsJson: JSON.stringify({
            dominant60: '#020202',
            secondary30: '#111111',
            accent10: '#ff1d25'
          }),
          heroVideo: '/videos/hero-background.mp4'
        }
      });
    }
    res.json({
      ...settings,
      colors: JSON.parse(settings.colorsJson || '{}')
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const { title, description, colors, heroVideo } = req.body;
    const updated = await prisma.siteSetting.upsert({
      where: { id: 'global-settings' },
      update: {
        title,
        description,
        heroVideo,
        colorsJson: colors ? JSON.stringify(colors) : undefined
      },
      create: {
        id: 'global-settings',
        title: title || 'Carlos Ozuna',
        description: description || '',
        heroVideo: heroVideo || '/videos/hero-background.mp4',
        colorsJson: JSON.stringify(colors || { dominant60: '#020202', secondary30: '#111111', accent10: '#ff1d25' })
      }
    });
    res.json({
      ...updated,
      colors: JSON.parse(updated.colorsJson || '{}')
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Pages & Sections
router.get('/pages', async (req, res) => {
  try {
    const pages = await prisma.page.findMany();
    const formatted = pages.map(p => ({
      ...p,
      sections: JSON.parse(p.sectionsJson || '[]')
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pages/:slug', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({
      ...page,
      sections: JSON.parse(page.sectionsJson || '[]')
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/pages/:slug', authMiddleware, async (req, res) => {
  try {
    const { title, metaDescription, sections } = req.body;
    const updated = await prisma.page.update({
      where: { slug: req.params.slug },
      data: {
        title,
        metaDescription,
        sectionsJson: sections ? JSON.stringify(sections) : undefined
      }
    });
    res.json({
      ...updated,
      sections: JSON.parse(updated.sectionsJson || '[]')
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Portfolio CRUD
router.get('/portfolio', async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }
    const items = await prisma.portfolioItem.findMany({
      where,
      orderBy: { order: 'asc' }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/portfolio', authMiddleware, async (req, res) => {
  try {
    const { title, category, slug, image, description, client, year, link, featured, order } = req.body;
    const item = await prisma.portfolioItem.create({
      data: {
        title,
        category,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        image,
        description,
        client,
        year,
        link,
        featured: featured ?? true,
        order: order ?? 0
      }
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    const { title, category, slug, image, description, client, year, link, featured, order } = req.body;
    const item = await prisma.portfolioItem.update({
      where: { id: req.params.id },
      data: {
        title,
        category,
        slug,
        image,
        description,
        client,
        year,
        link,
        featured,
        order
      }
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.portfolioItem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Contact Form Submissions
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        message,
        payload: JSON.stringify(req.body)
      }
    });
    res.status(201).json({ success: true, message: 'Thank you for reaching out!', submissionId: submission.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
