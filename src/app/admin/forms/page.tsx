'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaEnvelope, FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import { SiteSettings } from '@/lib/cms/database';

export default function FormsManagement() {
  const [activeTab, setActiveTab] = useState('submissions');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Builder State
  const [builderMode, setBuilderMode] = useState(false);
  const [forms, setForms] = useState<any[]>([]);
  const [currentFormId, setCurrentFormId] = useState<string | null>(null);

  // Current Form Editing State
  const [editingForm, setEditingForm] = useState<{
    id: string;
    name: string;
    placement: { pageSlug: string; position: 'top' | 'bottom' };
    settings: { notificationEmail: string; autoResponse: string; enableWhatsApp: boolean; enableTelegram: boolean };
    fields: any[];
  } | null>(null);

  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    fetchSubs();
    fetchSettings();
  }, []);

  const fetchSubs = async () => {
    try {
      const res = await fetch('/api/forms');
      if (res.ok) setSubmissions(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings');
      if (res.ok) {
        const settings: SiteSettings = await res.json();
        let loadedForms = settings.forms || [];

        // Migration: If no forms exist but legacy formBuilder is present, convert it
        if (loadedForms.length === 0 && settings.formBuilder) {
          const legacyForm = {
            id: 'contact_form_default',
            name: 'Contact Form',
            placement: { pageSlug: '/contact', position: 'bottom' as 'top' | 'bottom' },
            settings: {
              notificationEmail: settings.formBuilder.settings?.notificationEmail || 'info@rhcsolutions.com',
              autoResponse: settings.formBuilder.settings?.autoResponse || 'Thank you for your message.',
              enableWhatsApp: settings.formBuilder.settings?.enableWhatsApp || false,
              enableTelegram: settings.formBuilder.settings?.enableTelegram || false
            },
            fields: settings.formBuilder.contactForm || []
          };
          loadedForms = [legacyForm as any];

          // Persist the migration immediately
          // Note: We use the fetch API directly here to avoid dependency on saveAllForms before it's defined
          // or circular dependencies if we move plain functions around.
          fetch('/api/cms/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ forms: loadedForms }),
          }).catch(err => console.error('Migration save failed', err));
        }

        setForms(loadedForms);
      }
    } catch (e) { console.error(e); }
    finally { setSettingsLoading(false); }
  };

  const handleEditForm = (form: any) => {
    setEditingForm(JSON.parse(JSON.stringify(form))); // deep copy
    setCurrentFormId(form.id);
    setBuilderMode(true);
  };

  const handleCreateForm = () => {
    const newForm = {
      id: `form_${Date.now()}`,
      name: 'New Form',
      placement: { pageSlug: '', position: 'bottom' },
      settings: {
        notificationEmail: 'info@rhcsolutions.com',
        autoResponse: 'Thank you for your message.',
        enableWhatsApp: false,
        enableTelegram: false
      },
      fields: [
        { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your Name' },
        { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' }
      ]
    };
    setEditingForm(newForm as any);
    setCurrentFormId(newForm.id);
    setBuilderMode(true);
  };

  const handleDeleteForm = async (id: string) => {
    if (!confirm('Delete this form?')) return;
    const newForms = forms.filter(f => f.id !== id);
    setForms(newForms);

    // Save immediately
    await saveAllForms(newForms);
  };

  const saveAllForms = async (updatedForms: any[]) => {
    try {
      const res = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forms: updatedForms }),
      });
      if (!res.ok) alert('Failed to save changes');
    } catch (e) { console.error(e); alert('Failed to save changes'); }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Delete submission?')) return;
    await fetch(`/api/forms?id=${id}`, { method: 'DELETE' });
    fetchSubs();
  };

  const saveCurrentForm = async () => {
    if (!editingForm) return;

    // Update the forms list
    let updatedForms = [...forms];
    const index = updatedForms.findIndex(f => f.id === editingForm.id);
    if (index >= 0) {
      updatedForms[index] = editingForm;
    } else {
      updatedForms.push(editingForm);
    }

    setForms(updatedForms);

    try {
      const res = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forms: updatedForms }),
      });
      if (res.ok) alert('Form saved successfully!');
    } catch (e) { console.error(e); alert('Failed to save form'); }
  };

  const addField = () => {
    if (!editingForm) return;
    const id = `field_${Date.now()}`;
    const newFields = [...editingForm.fields, { id, label: 'New Field', type: 'text', required: false, placeholder: '' }];
    setEditingForm({ ...editingForm, fields: newFields });
  };

  const removeField = (index: number) => {
    if (!editingForm) return;
    const newFields = [...editingForm.fields];
    newFields.splice(index, 1);
    setEditingForm({ ...editingForm, fields: newFields });
  };

  const updateField = (index: number, key: string, value: any) => {
    if (!editingForm) return;
    const newFields = [...editingForm.fields];
    newFields[index] = { ...newFields[index], [key]: value };
    // auto-update ID
    if (key === 'label' && newFields[index].id.startsWith('field_')) {
      newFields[index].id = value.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
    setEditingForm({ ...editingForm, fields: newFields });
  };

  return (
    <AdminShell title="Forms Management">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Forms Management</h1>
        <p className="text-text-secondary">Manage form submissions and configure form settings</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-border">
        <button
          onClick={() => { setActiveTab('submissions'); setBuilderMode(false); }}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'submissions'
            ? 'text-cyber-green border-b-2 border-cyber-green'
            : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          Submissions
        </button>
        <button
          onClick={() => setActiveTab('forms')}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'forms'
            ? 'text-cyber-green border-b-2 border-cyber-green'
            : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          Forms
        </button>
      </div>

      {activeTab === 'submissions' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-cyber p-6">
              <FaEnvelope className="text-3xl text-cyber-green mb-3" />
              <h3 className="text-2xl font-bold text-text-primary">{submissions.length}</h3>
              <p className="text-text-secondary text-sm">Total Submissions</p>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="card-cyber overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-lighter">
                  <tr>
                    <th className="text-left p-4 text-text-primary font-semibold">Form</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Name</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Email</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Date</th>
                    <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr><td colSpan={5} className="p-4 text-center text-text-secondary">No submissions found.</td></tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr key={sub.id} className="border-t border-dark-border hover:bg-dark-lighter transition-colors">
                        <td className="p-4 text-text-primary">{sub.form || 'Contact'}</td>
                        <td className="p-4 text-text-secondary">{sub.name || 'N/A'}</td>
                        <td className="p-4 text-text-secondary font-mono text-sm">{sub.email || 'N/A'}</td>
                        <td className="p-4 text-text-secondary">
                          {new Date(sub.receivedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Submission"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'forms' && !builderMode && (
        <div className="card-cyber overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-lighter">
                <tr>
                  <th className="text-left p-4 text-text-primary font-semibold">Form Name</th>
                  <th className="text-left p-4 text-text-primary font-semibold">Placement</th>
                  <th className="text-left p-4 text-text-primary font-semibold">Fields</th>
                  <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} className="border-t border-dark-border hover:bg-dark-lighter transition-colors">
                    <td className="p-4 text-text-primary font-bold">{form.name}</td>
                    <td className="p-4 text-text-secondary">
                      {form.placement?.pageSlug ? `Page: ${form.placement.pageSlug}` : 'Manual/Default'}
                      {form.placement?.position ? ` (${form.placement.position})` : ''}
                    </td>
                    <td className="p-4 text-text-secondary">{form.fields.length} Fields</td>
                    <td className="p-4 text-right flex justify-end space-x-3">
                      <button
                        onClick={() => handleEditForm(form)}
                        className="btn-secondary text-sm py-1 px-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                        title="Delete Form"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {forms.length === 0 && (
                  <tr><td colSpan={4} className="p-4 text-center text-text-secondary">No forms created yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-dark-border">
            <button onClick={handleCreateForm} className="btn-primary flex items-center space-x-2">
              <FaPlus /> <span>Create New Form</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'forms' && builderMode && editingForm && (
        <div className="card-cyber p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBuilderMode(false)}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm underline"
              >
                &larr; Back to Forms
              </button>
              <h2 className="heading-md text-gradient">Edit: {editingForm.name}</h2>
            </div>
            <button onClick={saveCurrentForm} className="btn-primary flex items-center space-x-2">
              <FaSave /> <span>Save Changes</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-lighter p-6 rounded-lg border border-dark-border mb-8">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Form Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Form Name</label>
                  <input
                    type="text"
                    value={editingForm.name}
                    onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded px-4 py-2 text-text-primary focus:border-cyber-green outline-none"
                  />
                </div>
              </div>

              <h4 className="text-md font-medium text-text-primary mb-3">Placement Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Target Page Slug</label>
                  <input
                    type="text"
                    value={editingForm.placement?.pageSlug || ''}
                    onChange={(e) => setEditingForm({ ...editingForm, placement: { ...editingForm.placement, pageSlug: e.target.value } })}
                    className="w-full bg-dark-card border border-dark-border rounded px-4 py-2 text-text-primary focus:border-cyber-green outline-none"
                    placeholder="e.g. /contact or /about"
                  />
                  <p className="text-xs text-text-secondary mt-1">Enter the URL slug where this form should appear.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Position on Page</label>
                  <select
                    value={editingForm.placement?.position || 'bottom'}
                    onChange={(e) => setEditingForm({ ...editingForm, placement: { ...editingForm.placement, position: e.target.value as any } })}
                    className="w-full bg-dark-card border border-dark-border rounded px-4 py-2 text-text-primary focus:border-cyber-green outline-none"
                  >
                    <option value="top">Top (Before Content)</option>
                    <option value="bottom">Bottom (After Content)</option>
                  </select>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-4 border-t border-dark-border pt-6">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Notification Email</label>
                  <input
                    type="email"
                    aria-label="Notification Email"
                    value={editingForm.settings.notificationEmail}
                    onChange={(e) => setEditingForm({ ...editingForm, settings: { ...editingForm.settings, notificationEmail: e.target.value } })}
                    className="w-full bg-dark-card border border-dark-border rounded px-4 py-2 text-text-primary focus:border-cyber-green outline-none"
                    placeholder="Where to send form submissions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Success Message</label>
                  <input
                    type="text"
                    aria-label="Success Message"
                    value={editingForm.settings.autoResponse}
                    onChange={(e) => setEditingForm({ ...editingForm, settings: { ...editingForm.settings, autoResponse: e.target.value } })}
                    className="w-full bg-dark-card border border-dark-border rounded px-4 py-2 text-text-primary focus:border-cyber-green outline-none"
                    placeholder="Message shown to user after submission"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={editingForm.settings.enableWhatsApp}
                        onChange={(e) => setEditingForm({ ...editingForm, settings: { ...editingForm.settings, enableWhatsApp: e.target.checked } })}
                      />
                      <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">Enable WhatsApp Notifications</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={editingForm.settings.enableTelegram}
                        onChange={(e) => setEditingForm({ ...editingForm, settings: { ...editingForm.settings, enableTelegram: e.target.checked } })}
                      />
                      <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">Enable Telegram Notifications</span>
                  </label>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary mb-4">Form Fields</h3>
            {editingForm.fields.map((field: any, idx: number) => (
              <div key={idx} className="bg-dark-lighter p-4 rounded-lg border border-dark-border flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs text-text-secondary mb-1">Label</label>
                  <input
                    type="text"
                    aria-label="Field Label"
                    value={field.label}
                    onChange={(e) => updateField(idx, 'label', e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary focus:border-cyber-green outline-none"
                  />
                </div>

                <div className="w-full md:w-32">
                  <label className="block text-xs text-text-secondary mb-1">Type</label>
                  <select
                    aria-label="Field Type"
                    value={field.type}
                    onChange={(e) => updateField(idx, 'type', e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary focus:border-cyber-green outline-none"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="textarea">Textarea</option>
                    <option value="tel">Phone</option>
                  </select>
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-xs text-text-secondary mb-1">Placeholder</label>
                  <input
                    type="text"
                    aria-label="Field Placeholder"
                    value={field.placeholder || ''}
                    onChange={(e) => updateField(idx, 'placeholder', e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary focus:border-cyber-green outline-none"
                  />
                </div>

                <div className="flex items-center h-10">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      aria-label="Required Field"
                      checked={field.required}
                      onChange={(e) => updateField(idx, 'required', e.target.checked)}
                      className="form-checkbox text-cyber-green rounded bg-dark-card border-dark-border"
                    />
                    <span className="text-sm text-text-primary">Required</span>
                  </label>
                </div>

                <button
                  onClick={() => removeField(idx)}
                  className="p-3 text-red-500 hover:text-red-400 transition-colors h-10 flex items-center"
                  title="Remove Field"
                  aria-label="Remove Field"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button onClick={addField} className="mt-6 btn-secondary flex items-center space-x-2 justify-center w-full border-dashed">
            <FaPlus /> <span>Add Field</span>
          </button>
        </div>
      )}
    </AdminShell>
  );
}
