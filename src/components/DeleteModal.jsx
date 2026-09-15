import { AlertTriangle, X } from 'lucide-react';

export default function DeleteModal({ open, onClose, onConfirm, title, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
          <AlertTriangle className="w-7 h-7 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-center">Delete Blog?</h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed text-center">Are you sure you want to delete <span className="font-semibold text-slate-900">"{title}"</span>? This action cannot be undone.</p>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} disabled={loading} className="flex-1 py-2.5 rounded-full border border-slate-200 font-medium text-sm hover:bg-slate-50 disabled:opacity-50">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 disabled:opacity-50">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
