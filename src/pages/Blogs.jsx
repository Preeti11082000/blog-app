import { useState, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogGrid from '../components/BlogGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { SkeletonGrid } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import DeleteModal from '../components/DeleteModal';
import { deleteBlog } from '../services/blogService';
import toast from 'react-hot-toast';

export default function Blogs() {
  const { blogs, loading, error, refetch, setBlogs } = useBlogs();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('latest');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    let result = [...blogs];
    if (category !== 'All') result = result.filter(b => b.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (sort === 'latest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sort === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sort === 'az') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'za') result.sort((a, b) => b.title.localeCompare(a.title));
    return result;
  }, [blogs, search, category, sort]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteBlog(deleteTarget._id);
      toast.success('Blog deleted');
      setBlogs(prev => prev.filter(b => b._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper">
      <div className="mb-8 border-b-2 border-ink-900 pb-6">
        <div className="inline-flex items-center gap-2 bg-ink-900 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-ink-900 mb-3">Archive • {blogs.length} Stories</div>
        <h1 className="font-display font-black text-[36px] sm:text-[48px] tracking-[-0.04em] leading-none">All Articles <span className="font-normal italic text-zinc-400">— the stack</span></h1>
        <p className="text-zinc-600 mt-2 font-medium max-w-2xl">Discover stories, tutorials and insights from our community. Filter by craft, search by vibe, sort by freshness.</p>
      </div>

      <div className="bg-white rounded-[24px] border-2 border-ink-900 p-4 sm:p-5 mb-6 space-y-4 shadow-hard">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-3 rounded-full border-2 border-ink-900 bg-mustard text-sm font-black uppercase tracking-widest focus:outline-none shadow-hard-sm">
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </div>
        <CategoryFilter active={category} onChange={setCategory} />
        <p className="text-xs font-black uppercase tracking-widest text-zinc-500 bg-paper border-2 border-ink-900 rounded-full inline-block px-3 py-1">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found</p>
      </div>

      {loading && <SkeletonGrid />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && filtered.length === 0 && <EmptyState />}
      {!loading && !error && filtered.length > 0 && <BlogGrid blogs={filtered} onDelete={setDeleteTarget} />}

      <DeleteModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title={deleteTarget?.title} loading={deleting} />
    </div>
  );
}
