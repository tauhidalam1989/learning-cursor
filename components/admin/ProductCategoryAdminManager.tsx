'use client';

import React, { useState, useEffect } from 'react';
import {
  ProductCategory,
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
} from '@/lib/products';

export default function ProductCategoryAdminManager() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ProductCategory | null>(null);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getProductCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    setName('');
    setNameAr('');
    setSlug('');
    setIcon('fas fa-box');
    setOrder(categories.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (cat: ProductCategory) => {
    setEditItem(cat);
    setName(cat.name);
    setNameAr(cat.nameAr || '');
    setSlug(cat.slug);
    setIcon(cat.icon || 'fas fa-box');
    setOrder(cat.order || 0);
    setIsActive(cat.isActive);
    setModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editItem) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await deleteProductCategory(id);
      if (res.success) loadData();
      else alert(res.message || 'Error deleting category');
    } catch (error) {
      alert('An error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { name, nameAr, slug, icon, order: Number(order), isActive };
      const res = editItem
        ? await updateProductCategory(editItem.id, payload)
        : await createProductCategory(payload);

      if (res.success) {
        setModalOpen(false);
        loadData();
      } else {
        alert(res.message || 'Error saving category');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-black text-corematrix-text tracking-tight">Product Categories</h2>
          <p className="text-corematrix-textMuted text-xs mt-1">Manage categories used to group your products on the homepage and products page.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <i className="fas fa-plus"></i> Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-corematrix-bg1 border border-corematrix-border rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-corematrix-textMuted text-[11px] font-bold uppercase tracking-widest border-b border-corematrix-border bg-corematrix-bg0/30">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Name (EN)</th>
                <th className="px-6 py-4">Name (AR)</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-corematrix-border/50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-corematrix-textMuted">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-corematrix-textMuted font-medium italic">
                    No categories created yet. Click "Add Category" above to get started.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-corematrix-bg0/40 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                        #{cat.order || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <i className={cat.icon || 'fas fa-box'} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-corematrix-text">{cat.name}</td>
                    <td className="px-6 py-4 text-corematrix-textMuted" dir="rtl">{cat.nameAr || '—'}</td>
                    <td className="px-6 py-4 font-mono text-xs text-corematrix-textMuted">{cat.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        cat.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.isActive ? 'bg-emerald-400' : 'bg-zinc-500'}`}></span>
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 text-corematrix-textMuted hover:text-cyan-400 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-corematrix-textMuted hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-6 shadow-2xl flex flex-col my-auto">
            <div className="flex items-center justify-between border-b border-corematrix-border pb-4 shrink-0">
              <h3 className="text-xl font-bold text-corematrix-text">
                {editItem ? 'Edit Category' : 'Create New Category'}
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
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Category Name (English) *</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Surveillance Systems"
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Category Name (Arabic)</label>
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="نظم المراقبة"
                  dir="rtl"
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">URL Slug *</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="surveillance-systems"
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm font-mono text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">FontAwesome Icon Class</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <i className={icon || 'fas fa-box'} />
                  </div>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="fas fa-box"
                    className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm font-mono text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Display Order</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="categoryIsActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-corematrix-border bg-corematrix-bg0 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="categoryIsActive" className="text-sm font-medium text-corematrix-text cursor-pointer">
                  Active (Visible in categories filters)
                </label>
              </div>
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
                {submitting ? 'Saving...' : editItem ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
