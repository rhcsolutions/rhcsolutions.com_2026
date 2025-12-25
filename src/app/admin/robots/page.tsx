"use client";
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

export default function RobotsPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRobots(); }, []);

  const fetchRobots = async () => {
    try {
      const res = await fetch('/api/robots');
      if (res.ok) setText(await res.text());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const save = async () => {
    await fetch('/api/robots', { method: 'PUT', body: text });
    alert('Saved');
  };

  const addAhrefs = async () => {
    const code = prompt('Enter Ahrefs verification code');
    if (!code) return;
    const res = await fetch('/api/robots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ahrefs: code }) });
    if (res.ok) alert('Verification file created');
  };

  return (
    <AdminShell title="Robots.txt">
      <div className="mb-6">
        <h1 className="heading-xl text-gradient mb-2">robots.txt</h1>
        <p className="text-text-secondary">Edit the site robots.txt</p>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="card-cyber p-6">
          <textarea className="w-full h-64 bg-dark-card p-4 rounded" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={addAhrefs} className="btn-secondary">Add Ahrefs verification file</button>
            <button onClick={save} className="btn-primary">Save robots.txt</button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
