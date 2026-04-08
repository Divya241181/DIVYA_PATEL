const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching projects', error: error.message });
  }
});

module.exports = router;
