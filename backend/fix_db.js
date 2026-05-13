const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio');

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const newExperiences = [
  {
    role: 'Full Stack Developer',
    type: 'Freelance',
    company: 'Self-Employed',
    period: 'Jan 2025 — Present',
    status: 'Current',
    accent: '#00FFFF',
    desc: 'Designing and developing premium, full-stack web applications for clients — from AI-powered code analysis tools to editorial portfolio sites. Focused on performance, animation, and scalable MERN architecture.',
    tags: ['Client Projects', 'MERN Stack', 'UI/UX Design', 'API Development'],
    order: 0
  },
  {
    role: 'AI / ML Research Intern',
    type: 'Internship',
    company: 'MedicalVLM Project',
    period: 'Oct 2024 — Dec 2024',
    status: 'Completed',
    accent: '#B599FF',
    desc: 'Built a medical visual language model (VLM) platform for X-ray analysis using LLaVA-1.5. Integrated GradCAM heatmaps, structured PDF report generation, and a React dashboard with Supabase auth.',
    tags: ['LLaVA-1.5', 'FastAPI', 'GradCAM', 'Supabase'],
    order: 1
  },
  {
    role: 'Frontend Developer',
    type: 'Project-Based',
    company: 'University & Personal',
    period: 'Aug 2023 — Sep 2024',
    status: 'Completed',
    accent: '#CCFF00',
    desc: 'Developed multiple web projects including 3D model-integrated UI, e-commerce platforms, and interactive dashboards. Focused on learning modern frameworks, responsive design, and motion engineering.',
    tags: ['React', 'Three.js', 'CSS Animations', 'REST APIs'],
    order: 2
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Fixing DB');
    
    const portfolio = await Portfolio.findOne();
    if (portfolio) {
      portfolio.experience = newExperiences;
      await portfolio.save();
      console.log('Fixed DB!');
    } else {
      console.log('Portfolio not found.');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
