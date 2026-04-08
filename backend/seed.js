const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

const projects = [
  {
    title: "Movie Landing Page",
    description: "A dynamic and responsive landing page created for a movie promotion. This project features smooth animations, an engaging video element, and a modern UI to captivate the audience and provide essential film details.",
    link: "https://divya241181.github.io/Movie-Slider/",
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Quick Notes Website",
    description: "A sleek and intuitive note-taking application designed for efficiency. This project allows users to quickly create, edit, and organize notes with a clean, minimalist interface, ensuring a seamless user experience.",
    link: "https://divya241181.github.io/Quick-Notes/",
    technologies: ["React", "JavaScript", "CSS"]
  },
  {
    title: "3D-Model Integrated Web-Page",
    description: "An interactive web experience featuring a stunning 3D model. This project demonstrates the integration of 3D graphics on the web, allowing users to manipulate and explore the model in real-time for a deeply engaging interface.",
    link: "https://divya241181.github.io/3D-Model-Web-Design/",
    technologies: ["Three.js", "HTML", "CSS"]
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Seeding');
    
    // Clear existing
    await Project.deleteMany({});
    
    // Insert new
    await Project.insertMany(projects);
    
    console.log('Data Imported!');
    process.exit();
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
