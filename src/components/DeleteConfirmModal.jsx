import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  lead,
  onClose,
  onConfirm
}) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center space-x-3 text-rose-400 mb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Delete CRM Lead?</h3>
            <p className="text-xs text-slate-400">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Are you sure you want to permanently remove <strong className="text-white font-semibold">"{lead.companyName}"</strong> from your CRM records? All associated deal history, outreach notes, and customer feedback will be removed.
        </p>

        <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(lead.id)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition shadow-md shadow-rose-600/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirm Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
}
