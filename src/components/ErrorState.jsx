import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-16 px-6 bg-red-50 rounded-2xl border border-red-200">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
        <AlertCircle className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="font-semibold text-red-900">Something went wrong</h3>
      <p className="text-sm text-red-700 mt-1 max-w-md mx-auto">{message || 'Failed to load data. Please try again.'}</p>
      {onRetry && <button onClick={onRetry} className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800">Try again</button>}
    </div>
  );
}
