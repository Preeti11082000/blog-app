const categories = ['All', 'React', 'JavaScript', 'TypeScript', 'Frontend', 'CSS', 'Web Development', 'AI', 'Career'];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap border-2 transition-all ${
            active === cat ? 'bg-ink-900 text-white border-ink-900 shadow-hard-sm' : 'bg-white text-zinc-600 border-ink-900 hover:bg-paper hover:text-ink-900'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
