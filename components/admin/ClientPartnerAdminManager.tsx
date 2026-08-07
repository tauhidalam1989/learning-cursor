'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  getAdminClients,
  getAdminPartners,
  getAdminCertificates,
  createClient,
  updateClient,
  deleteClient,
  createPartner,
  updatePartner,
  deletePartner,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  Client,
  Partner,
  Certificate
} from '@/lib/clientPartner';

type ItemType = 'client' | 'partner' | 'certificate';

export default function ClientPartnerAdminManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Client | Partner | Certificate | null>(null);
  const [activeType, setActiveType] = useState<ItemType>('client');

  // Form State
  const [name, setName] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, pRes, certRes] = await Promise.all([
        getAdminClients(),
        getAdminPartners(),
        getAdminCertificates()
      ]);
      setClients(cRes);
      setPartners(pRes);
      setCertificates(certRes);
    } catch (error) {
      console.error('Failed to fetch clients/partners/certs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFullImageUrl = (path: string) => {
    if (!path) return '/icon.png';
    if (path.startsWith('http')) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
  };

  const handleOpenAddModal = (type: ItemType) => {
    setActiveType(type);
    setEditItem(null);
    setName('');
    setOrder(0);
    setIsActive(true);
    setSelectedFile(null);
    setPreviewUrl(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: Client | Partner | Certificate, type: ItemType) => {
    setActiveType(type);
    setEditItem(item);
    setName(item.name);
    setOrder(item.order || 0);
    setIsActive(item.isActive);
    setSelectedFile(null);
    setPreviewUrl(getFullImageUrl((item as any).logo || (item as any).image));
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Name is required');

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('order', String(order));
      formData.append('isActive', String(isActive));

      if (selectedFile) {
        if (activeType === 'client' || activeType === 'partner') {
          formData.append('logo', selectedFile);
        } else {
          formData.append('certificate', selectedFile);
        }
      }

      let res;
      if (editItem) {
        if (activeType === 'client') res = await updateClient(editItem.id, formData);
        else if (activeType === 'partner') res = await updatePartner(editItem.id, formData);
        else res = await updateCertificate(editItem.id, formData);
      } else {
        if (!selectedFile) {
          setSubmitting(false);
          return alert('Image file is required for new items');
        }
        if (activeType === 'client') res = await createClient(formData);
        else if (activeType === 'partner') res = await createPartner(formData);
        else res = await createCertificate(formData);
      }

      if (res.success) {
        setModalOpen(false);
        fetchData();
      } else {
        alert(res.message || 'Operation failed');
      }
    } catch (error: any) {
      alert(error.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, type: ItemType) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      let res;
      if (type === 'client') res = await deleteClient(id);
      else if (type === 'partner') res = await deletePartner(id);
      else res = await deleteCertificate(id);

      if (res.success) fetchData();
      else alert(res.message || 'Error deleting');
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const toggleStatus = async (item: Client | Partner | Certificate, type: ItemType) => {
    try {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('isActive', String(!item.isActive));

      let res;
      if (type === 'client') res = await updateClient(item.id, formData);
      else if (type === 'partner') res = await updatePartner(item.id, formData);
      else res = await updateCertificate(item.id, formData);

      if (res.success) fetchData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const renderSection = (title: string, items: (Client | Partner | Certificate)[], type: ItemType) => (
    <div className="bg-corematrix-bg1 rounded-3xl border border-corematrix-border shadow-xl overflow-hidden mb-10">
      <div className="px-8 py-5 border-b border-corematrix-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-corematrix-bg0/50">
        <div>
          <h2 className="text-xl font-bold text-corematrix-text tracking-wide">{title}</h2>
          <p className="text-xs text-corematrix-textMuted mt-0.5">Total: {items.length} items</p>
        </div>
        <button
          onClick={() => handleOpenAddModal(type)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fas fa-plus"></i>
          Add New {type.toUpperCase()}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-corematrix-textMuted text-[11px] font-bold uppercase tracking-widest border-b border-corematrix-border bg-corematrix-bg0/30">
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Logo / Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-corematrix-border/50 text-sm">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-6">
                    <div className="h-5 bg-corematrix-border/50 rounded-xl w-full"></div>
                  </td>
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <p className="text-corematrix-textMuted font-medium italic">No {type} records found</p>
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const imgPath = (item as any).logo || (item as any).image;
                return (
                  <tr key={item.id} className="hover:bg-corematrix-bg0/40 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(item, type)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          item.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-emerald-400' : 'bg-zinc-500'}`}></span>
                        {item.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-xl bg-corematrix-bg0 border border-corematrix-border flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                          src={getFullImageUrl(imgPath)}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-corematrix-text">{item.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                        #{item.order || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(item, type)}
                          className="p-2 text-corematrix-textMuted hover:text-cyan-400 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, type)}
                          className="p-2 text-corematrix-textMuted hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      <div className="border-b border-corematrix-border pb-6">
        <h1 className="text-3xl font-extrabold text-corematrix-text tracking-tight">Trust, Clients & Partners</h1>
        <p className="text-corematrix-textMuted text-sm mt-1">
          Manage your high-profile clients, strategic tech partnerships, and industry certifications displayed on the homepage slider.
        </p>
      </div>

      {renderSection('Valued Clients', clients, 'client')}
      {renderSection('Strategic Partnerships', partners, 'partner')}
      {renderSection('Certifications & Awards', certificates, 'certificate')}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-6 shadow-2xl flex flex-col my-auto">
            <div className="flex items-center justify-between border-b border-corematrix-border pb-4 shrink-0">
              <h3 className="text-xl font-bold text-corematrix-text capitalize">
                {editItem ? `Edit ${activeType}` : `Add New ${activeType}`}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-corematrix-textMuted hover:text-white text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 py-4 overflow-y-auto corematrix-scrollbar pr-1.5 flex-1 min-h-0">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">
                  Name / Title *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`e.g. ${activeType === 'client' ? 'Google Inc.' : activeType === 'partner' ? 'AWS' : 'ISO 9001'}`}
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 py-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-corematrix-border bg-corematrix-bg0 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-sm font-medium text-corematrix-text cursor-pointer">
                  Visible on Homepage (Active)
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">
                  {activeType === 'certificate' ? 'Certificate Image *' : 'Company Logo *'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                  required={!editItem}
                />
              </div>

              {previewUrl && (
                <div className="mt-2 p-3 bg-corematrix-bg0 rounded-xl border border-corematrix-border flex items-center justify-center h-24 overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </form>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-corematrix-border shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-corematrix-border text-xs font-bold text-corematrix-textMuted hover:bg-corematrix-bg0 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editItem ? 'Update Item' : 'Create Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
