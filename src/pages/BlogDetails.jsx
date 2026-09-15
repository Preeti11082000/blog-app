import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog, getBlogs } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import DeleteModal from '../components/DeleteModal';
import BlogCard from '../components/BlogCard';
import { Calendar, Clock, User, ArrowLeft, Edit3, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBlogById(id);
      setBlog(res.data);
      const all = await getBlogs();
      const rel = (all.data || []).filter(b => b._id !== id && b.category === res.data.category).slice(0, 3);
      setRelated(rel.length ? rel : (all.data || []).filter(b => b._id !== id).slice(0, 3));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteBlog(id);
      toast.success('Blog deleted');
      navigate('/blogs');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper"><LoadingSpinner /></div>;
  if (error) return <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper"><ErrorState message={error} onRetry={fetch} /></div>;
  if (!blog) return null;

  const date = new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper">
      <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white border-2 border-ink-900 rounded-full px-4 py-2 shadow-hard-sm hover:shadow-hard mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Archive
      </Link>

      <div className="bg-white rounded-[32px] overflow-hidden border-2 border-ink-900 shadow-hard">
        <div className="relative">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-64 sm:h-80 lg:h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-mustard text-ink-900 text-xs font-black uppercase tracking-widest border-2 border-ink-900 shadow-hard-sm">{blog.category}</span>
            <span className="px-3 py-1.5 rounded-full bg-white text-ink-900 text-xs font-bold border-2 border-ink-900 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readTime}</span>
            <span className="px-3 py-1.5 rounded-full bg-white text-ink-900 text-xs font-bold border-2 border-ink-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{date}</span>
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <h1 className="font-display font-black text-[28px] sm:text-[38px] lg:text-[44px] leading-[0.95] tracking-[-0.04em]">{blog.title}</h1>
          <p className="text-[18px] text-zinc-600 mt-4 leading-relaxed font-medium border-l-4 border-mustard pl-4">{blog.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 p-4 bg-paper border-2 border-ink-900 rounded-[20px] shadow-hard-sm">
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/100?u=${blog.author}`} alt={blog.author} className="w-12 h-12 rounded-full border-2 border-ink-900" />
              <div>
                <p className="text-sm font-black flex items-center gap-1"><User className="w-3.5 h-3.5" />{blog.author}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Author • Inkwell Journal</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/blogs/edit/${blog._id}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-ink-900 text-sm font-black uppercase tracking-widest hover:bg-paper shadow-hard-sm">
                <Edit3 className="w-4 h-4" /> Edit
              </Link>
              <button onClick={() => setShowDelete(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent border-2 border-ink-900 text-white text-sm font-black uppercase tracking-widest hover:bg-accent-light shadow-hard-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          <div className="prose max-w-none mt-8">
            {blog.content.split('\n').map((para, i) => (
              <p key={i} className="mb-5 leading-8 text-zinc-800 whitespace-pre-wrap font-medium border-b border-dashed border-zinc-200 pb-5 last:border-0">{para}</p>
            ))}
          </div>

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t-2 border-ink-900">
              {blog.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-paper border-2 border-ink-900 rounded-full text-xs font-black uppercase tracking-widest text-ink-900">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="font-display font-black text-2xl flex items-center gap-3"><span className="w-2 h-7 bg-accent rounded-full" /> Related Articles <span className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-2">— keep reading</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {related.map(b => (
              <BlogCard key={b._id} blog={b} onDelete={() => {}} />
            ))}
          </div>
        </div>
      )}

      <DeleteModal open={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} title={blog.title} loading={deleting} />
    </div>
  );
}
