import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, Calendar } from 'lucide-react';

const catColors = {
  React: 'bg-[#61DAFB] text-ink-900',
  JavaScript: 'bg-mustard text-ink-900',
  TypeScript: 'bg-[#3178C6] text-white',
  Frontend: 'bg-accent text-white',
  CSS: 'bg-[#264DE4] text-white',
  'Web Development': 'bg-forest text-white',
  AI: 'bg-[#8B5CF6] text-white',
  Career: 'bg-[#EC4899] text-white',
};

export default function BlogCard({ blog, onDelete }) {
  if (!blog) return null;
  const date = new Date(blog.publishedDate || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-white border-2 border-ink-900 rounded-[24px] overflow-hidden shadow-hard hover:shadow-hard-lg hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 flex flex-col h-full relative">
      {/* top accent bar per category */}
      <div className={`h-2 w-full ${catColors[blog?.category]?.split(' ')[0] || 'bg-ink-900'}`} />
      <Link to={`/blogs/${blog._id}`} className="block overflow-hidden relative">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className={`inline-flex px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border-2 border-ink-900 shadow-hard-sm ${catColors[blog?.category] || 'bg-ink-900 text-white'}`}>
            {blog.category || 'General'}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-paper border-2 border-ink-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -rotate-12 group-hover:rotate-0 duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
        <div className="h-52 overflow-hidden bg-zinc-100">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
            loading="lazy"
          />
        </div>
        {/* paper grain overlay on image */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`}} />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readTime}</span>
          <span className="w-1 h-1 bg-zinc-400 rounded-full" />
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{date}</span>
        </div>
        <Link to={`/blogs/${blog._id}`}>
          <h3 className="font-display font-black text-[20px] leading-[1.15] tracking-[-0.02em] line-clamp-2 group-hover:text-accent transition-colors">{blog.title}</h3>
        </Link>
        <p className="text-[13.5px] leading-[1.6] text-zinc-600 mt-2.5 line-clamp-2 font-medium">{blog.description}</p>
        
        <div className="flex items-center gap-3 mt-5 pt-4 border-t-2 border-dashed border-zinc-200">
          <img src={`https://i.pravatar.cc/100?u=${blog.author}`} alt={blog.author} className="w-8 h-8 rounded-full border-2 border-ink-900 object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-black tracking-tight truncate leading-none">{blog.author}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Author</p>
          </div>
          <div className="flex gap-1">
            <Link to={`/blogs/${blog._id}`} className="px-3 py-1.5 text-[12px] font-black uppercase tracking-widest bg-paper border-2 border-ink-900 rounded-full hover:bg-ink-900 hover:text-white transition-colors">Read</Link>
            <button onClick={() => onDelete(blog)} className="w-8 h-8 bg-white border-2 border-ink-900 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-xs font-black">×</button>
          </div>
        </div>
      </div>
    </article>
  );
}
