// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static media preview serving
const FRONTEND_PUBLIC = path.resolve(process.cwd(), '../frontend/public');
app.use('/images', express.static(path.join(FRONTEND_PUBLIC, 'images')));
app.use('/videos', express.static(path.join(FRONTEND_PUBLIC, 'videos')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✓ Ozuna Replica Backend running on http://localhost:${PORT}`);
});
