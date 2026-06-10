'use client';

import { useEffect } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Handle escape key to close dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onCancel}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl border border-corematrix-border bg-corematrix-card p-6 sm:p-8 shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent ${isDanger ? 'via-red-500' : 'via-corematrix-green500'} to-transparent`} />
        
        <div className="flex flex-col items-center text-center">
          {/* Icon Badge */}
          <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
            isDanger 
              ? 'bg-red-500/10 text-red-500 border border-red-500/25' 
              : 'bg-corematrix-green900/40 text-corematrix-green400 border border-corematrix-green700/30'
          }`}>
            <i className={`fas ${isDanger ? 'fa-trash-alt' : 'fa-exclamation-triangle'} text-base`} />
          </div>
          
          <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold uppercase tracking-wider text-corematrix-textPrimary mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-corematrix-textMuted leading-relaxed mb-6">
            {message}
          </p>
          
          <div className="flex gap-3 w-full sm:flex-row flex-col-reverse justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border border-corematrix-border hover:border-corematrix-green700 text-corematrix-textSecondary hover:text-corematrix-textPrimary hover:bg-corematrix-green700/[0.05] transition-all duration-200 cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer text-white border ${
                isDanger 
                  ? 'bg-red-950/60 hover:bg-red-700 border-red-700/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] animate-pulse-subtle' 
                  : 'bg-corematrix-green700 hover:bg-corematrix-green500 border-corematrix-green500 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
