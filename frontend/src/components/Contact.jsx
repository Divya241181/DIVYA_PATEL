import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-neon/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
        <div className="text-center mb-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4"
          >
            Launch <span className="text-accent-neon">Project</span>
          </motion.h2>
          <p className="text-zinc-400 text-lg font-mono">
            {'>_ Initiate a connection sequence.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="absolute left-4 -top-2.5 bg-black px-2 text-xs font-mono text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-accent-neon">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-accent-neon transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="relative group">
              <label className="absolute left-4 -top-2.5 bg-black px-2 text-xs font-mono text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-accent-neon">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-accent-neon transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="relative group">
            <label className="absolute left-4 -top-2.5 bg-black px-2 text-xs font-mono text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-accent-neon">Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5"
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-accent-neon transition-colors resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'Sending...'}
            className="w-full keycap border-b-[6px] py-6 font-black text-xl tracking-widest uppercase hover:text-accent-neon disabled:opacity-50 mt-6"
          >
            {status === 'Sending...' ? 'Transmitting...' : 'Send Message'}
          </button>
          
          {status && <p className={`mt-4 text-center font-mono ${status.includes('success') ? 'text-green-400' : 'text-red-500'}`}>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
