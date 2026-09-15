export default function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex items-center justify-center py-16">
      <div className={`${sizes[size]} border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-4 animate-pulse">
      <div className="h-48 bg-slate-100 rounded-xl mb-4" />
      <div className="h-4 bg-slate-100 rounded w-1/3 mb-3" />
      <div className="h-5 bg-slate-100 rounded w-full mb-2" />
      <div className="h-4 bg-slate-100 rounded w-5/6" />
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
