import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Helper: Tags Input Component ─────────────────────────────
const TagsInput = ({ tags = [], onChange }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 items-center p-2 bg-zinc-900 border border-zinc-700 rounded-lg min-h-[42px]">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800 border border-zinc-600 rounded-full text-xs text-zinc-300 font-mono"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="text-zinc-500 hover:text-red-400 transition-colors ml-0.5 text-sm leading-none cursor-pointer"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type + Enter"
        className="bg-transparent text-zinc-300 text-sm outline-none min-w-[100px] flex-1 placeholder-zinc-600"
      />
    </div>
  );
};

// ── Helper: Drag Handle ──────────────────────────────────────
const DragHandle = () => (
  <span className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing text-xl select-none transition-colors">
    ⠿
  </span>
);

// ── Section Card Templates ───────────────────────────────────

const AcademicCard = ({ item, index, onChange, onDelete }) => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
    <div className="flex items-center gap-3">
      <DragHandle />
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono">
        {String(index + 1).padStart(2, '0')}
      </span>
      <input
        type="text"
        value={item.degree}
        onChange={(e) => onChange({ ...item, degree: e.target.value })}
        placeholder="Degree"
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        type="text"
        value={item.institution}
        onChange={(e) => onChange({ ...item, institution: e.target.value })}
        placeholder="Institution"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
      <input
        type="text"
        value={item.period}
        onChange={(e) => onChange({ ...item, period: e.target.value })}
        placeholder="Period"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
    <div className="flex items-center gap-3">
      <select
        value={item.status}
        onChange={(e) => onChange({ ...item, status: e.target.value })}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
      >
        <option value="Current">Current</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1.5 block">Tags</label>
      <TagsInput tags={item.tags} onChange={(tags) => onChange({ ...item, tags })} />
    </div>
    <button
      type="button"
      onClick={onDelete}
      className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
    >
      Delete Entry
    </button>
  </div>
);

const ExperienceCard = ({ item, index, onChange, onDelete }) => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
    <div className="flex items-center gap-3">
      <DragHandle />
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold font-mono">
        {String(index + 1).padStart(2, '0')}
      </span>
      <input
        type="text"
        value={item.role}
        onChange={(e) => onChange({ ...item, role: e.target.value })}
        placeholder="Role"
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-500/50 transition-colors"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <input
        type="text"
        value={item.company}
        onChange={(e) => onChange({ ...item, company: e.target.value })}
        placeholder="Company"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-500/50 transition-colors"
      />
      <input
        type="text"
        value={item.period}
        onChange={(e) => onChange({ ...item, period: e.target.value })}
        placeholder="Period"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-500/50 transition-colors"
      />
      <select
        value={item.type}
        onChange={(e) => onChange({ ...item, type: e.target.value })}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
      >
        <option value="Full-time">Full-time</option>
        <option value="Internship">Internship</option>
        <option value="Freelance">Freelance</option>
        <option value="Part-time">Part-time</option>
      </select>
    </div>
    <textarea
      value={item.desc}
      onChange={(e) => onChange({ ...item, desc: e.target.value })}
      placeholder="Description"
      rows={3}
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-500/50 transition-colors resize-none"
    />
    <div>
      <label className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1.5 block">Tags</label>
      <TagsInput tags={item.tags} onChange={(tags) => onChange({ ...item, tags })} />
    </div>
    <button
      type="button"
      onClick={onDelete}
      className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
    >
      Delete Entry
    </button>
  </div>
);

const WorksCard = ({ item, index, onChange, onDelete }) => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
    <div className="flex items-center gap-3">
      <DragHandle />
      <span
        className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold font-mono"
        style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <input
        type="text"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        placeholder="Title"
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        type="text"
        value={item.category}
        onChange={(e) => onChange({ ...item, category: e.target.value })}
        placeholder="Category"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
      <div className="flex gap-2 items-center">
        <label className="text-zinc-500 text-xs font-mono uppercase shrink-0">Accent:</label>
        <input
          type="color"
          value={item.accent || '#00FFFF'}
          onChange={(e) => onChange({ ...item, accent: e.target.value })}
          className="w-10 h-10 rounded-lg border border-zinc-700 bg-transparent cursor-pointer"
        />
        <span className="text-zinc-500 text-xs font-mono">{item.accent}</span>
      </div>
    </div>
    <textarea
      value={item.desc}
      onChange={(e) => onChange({ ...item, desc: e.target.value })}
      placeholder="Description"
      rows={3}
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        type="text"
        value={item.link}
        onChange={(e) => onChange({ ...item, link: e.target.value })}
        placeholder="Live Link URL"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
      <input
        type="text"
        value={item.github}
        onChange={(e) => onChange({ ...item, github: e.target.value })}
        placeholder="GitHub URL"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
    <input
      type="text"
      value={item.image}
      onChange={(e) => onChange({ ...item, image: e.target.value })}
      placeholder="Image URL"
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
    />
    <div>
      <label className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1.5 block">Tags</label>
      <TagsInput tags={item.tags} onChange={(tags) => onChange({ ...item, tags })} />
    </div>
    <button
      type="button"
      onClick={onDelete}
      className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
    >
      Delete Entry
    </button>
  </div>
);

const ArchiveCard = ({ item, index, onChange, onDelete }) => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
    <div className="flex items-center gap-3">
      <DragHandle />
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold font-mono">
        {String(index + 1).padStart(2, '0')}
      </span>
      <input
        type="text"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        placeholder="Title"
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <input
        type="text"
        value={item.year}
        onChange={(e) => onChange({ ...item, year: e.target.value })}
        placeholder="Year"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors"
      />
      <input
        type="text"
        value={item.category}
        onChange={(e) => onChange({ ...item, category: e.target.value })}
        placeholder="Category"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors"
      />
      <select
        value={item.status}
        onChange={(e) => onChange({ ...item, status: e.target.value })}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors cursor-pointer"
      >
        <option value="Live">Live</option>
        <option value="In Progress">In Progress</option>
        <option value="Archived">Archived</option>
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        type="text"
        value={item.link}
        onChange={(e) => onChange({ ...item, link: e.target.value })}
        placeholder="Live Link URL"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors"
      />
      <input
        type="text"
        value={item.github}
        onChange={(e) => onChange({ ...item, github: e.target.value })}
        placeholder="GitHub URL"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-lime-500/50 transition-colors"
      />
    </div>
    <div>
      <label className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1.5 block">Tags</label>
      <TagsInput tags={item.tags} onChange={(tags) => onChange({ ...item, tags })} />
    </div>
    <button
      type="button"
      onClick={onDelete}
      className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
    >
      Delete Entry
    </button>
  </div>
);

// ── Main Admin Page ──────────────────────────────────────────

const TABS = [
  { key: 'academic', label: 'Academic Journey', color: '#00FFFF' },
  { key: 'experience', label: 'My Experience', color: '#B599FF' },
  { key: 'works', label: 'Selected Works', color: '#CCFF00' },
  { key: 'archive', label: 'Complete Archive', color: '#FF00FF' },
];

const AdminPage = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('admin_token'));
  const [passwordInput, setPasswordInput] = useState('');

  const [data, setData] = useState({ academic: [], experience: [], works: [], archive: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('academic');
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState('');

  // Drag state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Restore default Windows cursor on admin page
  useEffect(() => {
    document.body.classList.add('default-cursor');
    return () => {
      document.body.classList.remove('default-cursor');
    };
  }, []);

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim()) {
      localStorage.setItem('admin_token', passwordInput.trim());
      setToken(passwordInput.trim());
      setIsAuthed(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthed(false);
    setData({ academic: [], experience: [], works: [], archive: [] });
  };

  // Fetch data
  useEffect(() => {
    if (!isAuthed) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/portfolio`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthed, token]);

  // Save all
  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      setErrorMsg('');
      // Update order fields based on array position
      const payload = {
        academic: data.academic.map((item, i) => ({ ...item, order: i })),
        experience: data.experience.map((item, i) => ({ ...item, order: i })),
        works: data.works.map((item, i) => ({ ...item, order: i })),
        archive: data.archive.map((item, i) => ({ ...item, order: i })),
      };
      await axios.put(`${API_URL}/api/portfolio`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus('error');
      setErrorMsg(err.response?.data?.error || 'Failed to save');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  // Update a single item in the active section
  const updateItem = (section, index, updatedItem) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? updatedItem : item))
    }));
  };

  // Delete an item
  const deleteItem = (section, index) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Add new blank item
  const addItem = (section) => {
    const blanks = {
      academic: { degree: '', institution: '', period: '', status: 'Current', tags: [], order: 0 },
      experience: { role: '', company: '', period: '', type: 'Full-time', desc: '', tags: [], order: 0 },
      works: { title: '', category: '', desc: '', tags: [], accent: '#00FFFF', link: '#', github: '#', image: '', order: 0 },
      archive: { title: '', year: '', category: '', status: 'Live', tags: [], link: '#', github: '#', order: 0 },
    };
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], blanks[section]]
    }));
  };

  // Drag & drop reordering
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = (section) => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;

    setData((prev) => {
      const items = [...prev[section]];
      const draggedItem = items[dragItem.current];
      items.splice(dragItem.current, 1);
      items.splice(dragOverItem.current, 0, draggedItem);
      return { ...prev, [section]: items };
    });

    dragItem.current = null;
    dragOverItem.current = null;
  };

  // ── LOGIN SCREEN ───────────────────────────────────────────
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">DP</span>
              </div>
            </div>

            <h1 className="text-white text-2xl font-bold text-center mb-2 tracking-tight">
              Portfolio CMS
            </h1>
            <p className="text-zinc-500 text-sm text-center mb-8">
              Enter your admin token to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin Token"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder-zinc-600"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── LOADING STATE ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <span className="text-zinc-500 text-sm font-mono">Loading portfolio data...</span>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD ─────────────────────────────────────────
  const renderCards = () => {
    const section = activeTab;
    const items = data[section] || [];

    return (
      <div className="space-y-4">
        {items.map((item, index) => {
          const cardProps = {
            item,
            index,
            onChange: (updated) => updateItem(section, index, updated),
            onDelete: () => deleteItem(section, index),
          };

          return (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(section)}
              className="transition-transform"
            >
              {section === 'academic' && <AcademicCard {...cardProps} />}
              {section === 'experience' && <ExperienceCard {...cardProps} />}
              {section === 'works' && <WorksCard {...cardProps} />}
              {section === 'archive' && <ArchiveCard {...cardProps} />}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-lg mb-2">No entries yet</p>
            <p className="text-sm">Click "Add New" below to create one.</p>
          </div>
        )}

        {/* Add New Button */}
        <button
          type="button"
          onClick={() => addItem(section)}
          className="w-full py-4 border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-2xl text-zinc-500 hover:text-zinc-300 transition-all text-sm font-medium cursor-pointer hover:bg-zinc-900/30"
        >
          + Add New Entry
        </button>
      </div>
    );
  };

  const saveButtonLabel = {
    idle: 'Save All Changes',
    saving: 'Saving...',
    saved: '✓ Saved!',
    error: '✗ Error',
  };

  const saveButtonClass = {
    idle: 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90',
    saving: 'bg-zinc-700 cursor-wait',
    saved: 'bg-emerald-600',
    error: 'bg-red-600',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">DP</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight leading-tight">Portfolio CMS</h1>
              <p className="text-zinc-600 text-xs font-mono">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all cursor-pointer ${saveButtonClass[saveStatus]}`}
            >
              {saveButtonLabel[saveStatus]}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all text-sm cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Error Toast ── */}
      {saveStatus === 'error' && errorMsg && (
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            {errorMsg}
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800/50 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-fit px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-zinc-800 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={activeTab === tab.key ? { boxShadow: `0 0 20px ${tab.color}15` } : {}}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: activeTab === tab.key ? tab.color : '#52525b' }}
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {TABS.find((t) => t.key === activeTab)?.label}
            </h2>
            <p className="text-zinc-600 text-sm mt-1">
              {data[activeTab]?.length || 0} entries • Drag to reorder
            </p>
          </div>
        </div>
        {renderCards()}
      </div>
    </div>
  );
};

export default AdminPage;
