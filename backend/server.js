const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (curl, mobile apps, etc.)
    if (!origin) return callback(null, true);
    // Allow any localhost port in development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    // Allow configured frontend URL
    const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
    if (origin === allowedOrigin) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Seed function — populates default data if Portfolio collection is empty
const Portfolio = require('./models/Portfolio');

const seedData = async () => {
  try {
    const existing = await Portfolio.findOne();
    if (existing) {
      console.log('Portfolio data already exists — skipping seed.');
      return;
    }

    const portfolio = new Portfolio({
      academic: [
        {
          degree: "B.Tech — Information Technology",
          institution: "Drs. Kiran & Pallavi Patel Global University",
          period: "Aug 2023 — 2027",
          status: "Current",
          tags: ["Full Stack Dev", "DSA", "AI/ML", "DBMS"],
          order: 0
        },
        {
          degree: "Higher Secondary (Science)",
          institution: "Krishna School of Science",
          period: "May 2021 — 2023",
          status: "Completed",
          tags: ["Physics", "Chemistry", "Maths", "Computer Sc."],
          order: 1
        }
      ],
      experience: [
        {
          role: "Full Stack Developer",
          company: "Freelance",
          period: "2023 — Present",
          type: "Freelance",
          desc: "Building web applications for clients using React, Node.js, and MongoDB.",
          tags: ["React", "Node.js", "MongoDB"],
          order: 0
        }
      ],
      works: [
        {
          title: "AI Code Intel Pro",
          category: "AI / Developer Tools",
          desc: "Deep structural and security analysis on source code using LLMs.",
          tags: ["Next.js", "OpenAI", "Node.js"],
          accent: "#00FFFF",
          link: "#",
          github: "#",
          image: "",
          order: 0
        },
        {
          title: "MedicalVLM",
          category: "AI / Healthcare",
          desc: "Medical visual language model for X-ray analysis using LLaVA-1.5.",
          tags: ["LLaVA-1.5", "FastAPI", "React", "Supabase"],
          accent: "#B599FF",
          link: "#",
          github: "https://github.com/Divya241181",
          image: "",
          order: 1
        },
        {
          title: "EcoTrack Dashboard",
          category: "Fullstack / Data",
          desc: "Carbon footprint tracking platform with real-time data and ESG reports.",
          tags: ["React", "Express", "MongoDB", "D3.js"],
          accent: "#CCFF00",
          link: "#",
          github: "#",
          image: "",
          order: 2
        },
        {
          title: "3D Model Web UI",
          category: "Frontend / 3D",
          desc: "Interactive 3D model showcase with real-time rendering and WebGL.",
          tags: ["Three.js", "CSS3", "JavaScript", "WebGL"],
          accent: "#FF00FF",
          link: "#",
          github: "https://github.com/Divya241181/3D-Model-Web-Design",
          image: "",
          order: 3
        }
      ],
      archive: [
        {
          title: "AI Code Intel Pro",
          year: "2024",
          category: "AI",
          status: "Live",
          tags: ["Next.js", "OpenAI"],
          link: "#",
          github: "#",
          order: 0
        },
        {
          title: "MedicalVLM",
          year: "2024",
          category: "Healthcare",
          status: "In Progress",
          tags: ["LLaVA-1.5", "FastAPI"],
          link: "#",
          github: "#",
          order: 1
        },
        {
          title: "EcoTrack Dashboard",
          year: "2024",
          category: "Fullstack",
          status: "Live",
          tags: ["React", "D3.js"],
          link: "#",
          github: "#",
          order: 2
        },
        {
          title: "3D Model Web UI",
          year: "2023",
          category: "Frontend",
          status: "Live",
          tags: ["Three.js", "WebGL"],
          link: "#",
          github: "#",
          order: 3
        }
      ]
    });

    await portfolio.save();
    console.log('✅ Portfolio seeded with default data.');
  } catch (err) {
    console.error('Seed error:', err);
  }
};

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedData();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
