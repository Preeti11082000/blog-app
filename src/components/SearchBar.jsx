import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-900" />
      <input
        type="text"
        placeholder="Search title, author, tags…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-ink-900 bg-white text-sm font-bold placeholder:text-zinc-400 placeholder:font-bold focus:outline-none focus:bg-paper shadow-hard-sm"
      />
    </div>
  );
}
