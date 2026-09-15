import { FileSearch } from 'lucide-react';

export default function EmptyState({ title = 'No blogs found', description = 'Try changing your search or category filter.', action }) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200 border-dashed">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FileSearch className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
