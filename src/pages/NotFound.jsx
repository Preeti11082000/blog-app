import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-20 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Compass className="w-10 h-10 text-slate-600" />
      </div>
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-xl font-semibold mt-2">Page not found</p>
      <p className="text-slate-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex justify-center gap-3 mt-8">
        <Link to="/" className="px-7 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800">Go Home</Link>
        <Link to="/blogs" className="px-7 py-3 bg-white border border-slate-200 rounded-full font-medium hover:bg-slate-50">Browse Blogs</Link>
      </div>
    </div>
  );
}
