const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Auth middleware — checks Bearer token against ADMIN_TOKEN env var
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — no token provided' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden — invalid token' });
  }
  next();
};

// GET /api/portfolio — return all 4 sections (public)
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = { academic: [], experience: [], works: [], archive: [] };
    }
    res.json({
      academic: portfolio.academic.sort((a, b) => a.order - b.order),
      experience: portfolio.experience.sort((a, b) => a.order - b.order),
      works: portfolio.works.sort((a, b) => a.order - b.order),
      archive: portfolio.archive.sort((a, b) => a.order - b.order)
    });
  } catch (err) {
    console.error('GET /api/portfolio error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/portfolio — replace/update all 4 sections at once (protected)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { academic, experience, works, archive } = req.body;
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }
    if (academic) portfolio.academic = academic;
    if (experience) portfolio.experience = experience;
    if (works) portfolio.works = works;
    if (archive) portfolio.archive = archive;

    await portfolio.save();
    res.json({
      message: 'Portfolio updated successfully',
      academic: portfolio.academic.sort((a, b) => a.order - b.order),
      experience: portfolio.experience.sort((a, b) => a.order - b.order),
      works: portfolio.works.sort((a, b) => a.order - b.order),
      archive: portfolio.archive.sort((a, b) => a.order - b.order)
    });
  } catch (err) {
    console.error('PUT /api/portfolio error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
