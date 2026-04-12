const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  degree: { type: String, default: '' },
  institution: { type: String, default: '' },
  period: { type: String, default: '' },
  status: { type: String, enum: ['Current', 'Completed'], default: 'Current' },
  tags: { type: [String], default: [] },
  order: { type: Number, default: 0 }
}, { _id: true });

const experienceSchema = new mongoose.Schema({
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  period: { type: String, default: '' },
  type: { type: String, enum: ['Full-time', 'Internship', 'Freelance', 'Part-time'], default: 'Full-time' },
  desc: { type: String, default: '' },
  tags: { type: [String], default: [] },
  order: { type: Number, default: 0 }
}, { _id: true });

const worksSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  desc: { type: String, default: '' },
  tags: { type: [String], default: [] },
  accent: { type: String, default: '#00FFFF' },
  link: { type: String, default: '#' },
  github: { type: String, default: '#' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { _id: true });

const archiveSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  year: { type: String, default: '' },
  category: { type: String, default: '' },
  status: { type: String, enum: ['Live', 'In Progress', 'Archived'], default: 'Live' },
  tags: { type: [String], default: [] },
  link: { type: String, default: '#' },
  github: { type: String, default: '#' },
  order: { type: Number, default: 0 }
}, { _id: true });

const portfolioSchema = new mongoose.Schema({
  academic: [academicSchema],
  experience: [experienceSchema],
  works: [worksSchema],
  archive: [archiveSchema]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
