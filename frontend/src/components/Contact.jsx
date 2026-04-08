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
    <section id="contact" className="py-32 px-4 relative max-w-[1200px] mx-auto min-h-screen flex flex-col justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-neon/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="relative z-10 mb-16 text-center md:text-left">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-white mb-2 leading-none"
        >
          Let's <span className="text-accent-neon">Talk.</span>
        </motion.h2>
      </div>

      <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden backdrop-blur-xl bg-zinc-950/40">
        <form onSubmit={handleSubmit} className="relative z-10">
          
          {/* Madlibs style inputs for Name and Email */}
          <div className="text-3xl md:text-5xl font-medium leading-[2.2] md:leading-[1.8] text-zinc-400">
             Hello! My name is <br className="hidden sm:block md:hidden" />
             <input 
               type="text" 
               name="name" 
               value={formData.name}
               onChange={handleChange}
               placeholder="Your Name"
               required
               className="inline-block mx-2 bg-transparent border-b-2 border-zinc-700/80 focus:border-accent-purple text-white placeholder-zinc-700 outline-none w-48 md:w-80 text-center transition-colors font-bold mt-2 md:mt-0"
             /> 
             <br className="hidden lg:block"/>
             and I'm looking to connect. <br className="hidden sm:block md:hidden" /> You can reach me at 
             <input 
               type="email" 
               name="email" 
               value={formData.email}
               onChange={handleChange}
               placeholder="Email Address"
               required
               className="inline-block mx-2 bg-transparent border-b-2 border-zinc-700/80 focus:border-accent-gold text-white placeholder-zinc-700 outline-none w-[90%] md:w-96 text-center transition-colors font-bold mt-4 md:mt-0"
             />.
          </div>
          
          <div className="mt-20 md:mt-24">
             <label className="text-zinc-500 uppercase tracking-widest font-mono text-sm mb-4 block">Here are the details of my inquiry:</label>
             <textarea 
               name="message" 
               value={formData.message}
               onChange={handleChange}
               placeholder="Tell me all about your idea..."
               required
               rows="2"
               className="w-full bg-transparent border-b-2 border-zinc-700/80 focus:border-accent-neon text-white text-2xl md:text-4xl font-light placeholder-zinc-800 outline-none resize-none transition-colors pb-4"
             ></textarea>
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
             {status && (
               <p className={`font-mono text-sm tracking-wide ${status.includes('success') ? 'text-[#39FF14]' : 'text-red-500'} order-2 md:order-1`}>
                 {status}
               </p>
             )}
             
             <div className="w-full md:w-auto order-1 md:order-2 ml-auto">
               <button 
                  type="submit" 
                  disabled={status === 'Sending...'}
                  className="w-full md:w-auto overflow-hidden group button-calypso bg-zinc-100 text-black px-12 py-6 rounded-full font-black text-lg md:text-xl tracking-wider uppercase transition-colors duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg"
                  style={{ '--hover-bg': '#00FFFF' }}
               >
                  <span className="calypso-text flex items-center gap-3 group-hover:text-black">
                    {status === 'Sending...' ? 'Transmitting...' : 'Send Message'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </span>
               </button>
             </div>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default Contact;
