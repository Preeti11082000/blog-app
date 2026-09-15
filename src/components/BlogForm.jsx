import { useState, useEffect } from 'react';

const categories = ['React', 'JavaScript', 'TypeScript', 'Frontend', 'CSS', 'Web Development', 'AI', 'Career'];

export default function BlogForm({ initialData, onSubmit, loading, submitLabel = 'Publish Blog' }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: 'React',
    coverImage: '',
    tags: '',
    readTime: '',
    publishedDate: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        author: initialData.author || '',
        category: initialData.category || 'React',
        coverImage: initialData.coverImage || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        readTime: initialData.readTime || '',
        publishedDate: initialData.publishedDate ? new Date(initialData.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.title.trim() || form.title.trim().length < 3) e.title = 'Title must be at least 3 characters';
    if (!form.description.trim() || form.description.trim().length < 10) e.description = 'Description must be at least 10 characters';
    if (!form.content.trim() || form.content.trim().length < 20) e.content = 'Content must be at least 20 characters';
    if (!form.author.trim()) e.author = 'Author is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.coverImage.trim()) e.coverImage = 'Cover image URL is required';
    else {
      try { new URL(form.coverImage); } catch { e.coverImage = 'Must be a valid URL'; }
    }
    if (!form.readTime.trim()) e.readTime = 'Read time is required';
    if (!form.publishedDate) e.publishedDate = 'Published date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  const inputClass = (hasError) => `w-full px-4 py-3 rounded-[14px] border-2 bg-white text-sm font-bold focus:outline-none focus:bg-paper ${hasError ? 'border-accent bg-accent-muted' : 'border-ink-900 focus:border-accent'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-[24px] border-2 border-ink-900 shadow-hard">
      <div className="inline-flex items-center gap-2 bg-mustard border-2 border-ink-900 rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest">Compose • New Story</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Title *</label>
          <input className={inputClass(errors.title)} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Mastering React Server Components" />
          {errors.title && <p className="text-xs font-bold text-accent mt-1">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Description *</label>
          <textarea className={inputClass(errors.description)} rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Short summary for card and SEO..." />
          {errors.description && <p className="text-xs font-bold text-accent mt-1">{errors.description}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Content *</label>
          <textarea className={inputClass(errors.content)} rows={8} value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Write your blog content in plain text or markdown..." />
          {errors.content && <p className="text-xs font-bold text-accent mt-1">{errors.content}</p>}
          <p className="text-xs font-bold text-zinc-500 mt-1">You can use line breaks to separate paragraphs.</p>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Author *</label>
          <input className={inputClass(errors.author)} value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Jane Doe" />
          {errors.author && <p className="text-xs font-bold text-accent mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Category *</label>
          <select className={inputClass(errors.category)} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs font-bold text-accent mt-1">{errors.category}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Cover Image URL *</label>
          <input className={inputClass(errors.coverImage)} value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} placeholder="https://images.unsplash.com/..." />
          {errors.coverImage && <p className="text-xs font-bold text-accent mt-1">{errors.coverImage}</p>}
          {form.coverImage && (
            <img src={form.coverImage} alt="preview" className="mt-3 h-40 w-full object-cover rounded-[16px] border-2 border-ink-900" onError={e => e.target.style.display='none'} />
          )}
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Tags <span className="text-zinc-400 font-bold normal-case">(comma separated)</span></label>
          <input className={inputClass(false)} value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="react, hooks, performance" />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Read Time *</label>
          <input className={inputClass(errors.readTime)} value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} placeholder="5 min read" />
          {errors.readTime && <p className="text-xs font-bold text-accent mt-1">{errors.readTime}</p>}
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-1.5">Published Date *</label>
          <input type="date" className={inputClass(errors.publishedDate)} value={form.publishedDate} onChange={e => setForm({...form, publishedDate: e.target.value})} />
          {errors.publishedDate && <p className="text-xs font-bold text-accent mt-1">{errors.publishedDate}</p>}
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-ink-900 text-white font-black uppercase tracking-widest text-sm border-2 border-ink-900 shadow-hard hover:translate-y-[-2px] hover:shadow-hard-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
        {loading ? 'Saving...' : submitLabel} →
      </button>
    </form>
  );
}
