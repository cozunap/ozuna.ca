// src/routes/media.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import multer from 'multer';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const FRONTEND_PUBLIC = path.resolve(process.cwd(), '../frontend/public');
const UPLOAD_DIR = path.join(FRONTEND_PUBLIC, 'images');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const cleanName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    cb(null, cleanName);
  }
});

const upload = multer({ storage });

// POST /api/media/upload
router.post('/upload', authMiddleware, upload.single('mediaFile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    success: true,
    url: `/images/${req.file.filename}`
  });
});

// POST /api/media/upload-base64
router.post('/upload-base64', authMiddleware, async (req, res) => {
  try {
    const { filename, dataUrl } = req.body;
    if (!filename || !dataUrl) return res.status(400).json({ error: 'Filename and dataUrl required' });

    const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ error: 'Invalid dataUrl format' });

    const buffer = Buffer.from(matches[2], 'base64');
    const cleanName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, cleanName), buffer);

    res.json({ success: true, url: `/images/${cleanName}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
