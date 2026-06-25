'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCandidate } from '../lib/api';

export default function AddCandidate() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCandidate({
        name,
        email,
        skills: skills.split(',').map(s => s.trim()).filter(s => s),
        experience_years: parseInt(experience, 10) || 0,
      });
      router.push('/');
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to add candidate. Make sure the backend is running!');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/" className="nav-logo">HireMind AI</Link>
      </nav>

      <header className="header">
        <h1 className="header-title">Add New Candidate</h1>
        <p className="header-subtitle">Enter details to add a candidate to the database</p>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              required
              type="text" 
              className="form-input" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              required
              type="email" 
              className="form-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills (comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. React, Python, Machine Learning"
              value={skills} 
              onChange={e => setSkills(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input 
              type="number" 
              min="0"
              className="form-input" 
              value={experience} 
              onChange={e => setExperience(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Adding...' : 'Add Candidate'}
          </button>
        </form>
      </div>
    </div>
  );
}
