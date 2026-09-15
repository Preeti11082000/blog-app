import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, PenLine, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative text-[13px] font-bold uppercase tracking-[0.14em] pb-1 transition-colors ${isActive ? 'text-ink-900 after:w-full' : 'text-zinc-500 hover:text-ink-900 after:w-0 hover:after:w-full'} after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-accent after:transition-all after:duration-300`;

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-xl border-b-2 border-ink-900">
      {/* top accent stripe */}
      <div className="h-[4px] w-full bg-gradient-to-r from-accent via-mustard to-forest" />
      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex h-[72px] items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-ink-900 rounded-[12px] flex items-center justify-center rotate-[-3deg] group-hover:rotate-[0deg] transition-transform border-2 border-ink-900 shadow-hard-sm">
              <span className="font-display font-black text-white text-[18px] leading-none tracking-tighter">I<span className="text-mustard">.</span></span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-paper" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-[22px] tracking-[-0.04em] leading-none">Inkwell<span className="text-accent">.</span></span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 -mt-0.5">Est. 2026 — Journal</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/blogs" className={linkClass}>Archive</NavLink>
            <Link
              to="/create-blog"
              className="inline-flex items-center gap-2 bg-ink-900 text-white pl-6 pr-2 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest hover:bg-black transition-colors border-2 border-ink-900 shadow-hard-sm group/btn"
            >
              Write Story
              <span className="w-8 h-8 bg-mustard rounded-full flex items-center justify-center text-ink-900 group-hover/btn:rotate-45 transition-transform">
                <PenLine className="w-4 h-4" />
              </span>
            </Link>
          </nav>

          <button
            className="md:hidden w-10 h-10 border-2 border-ink-900 rounded-xl flex items-center justify-center bg-white shadow-hard-sm"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-ink-900 bg-paper px-6 py-6 space-y-4">
          <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center justify-between py-3 text-sm font-bold uppercase tracking-widest border-b border-zinc-200">Home <ArrowUpRight className="w-4 h-4" /></NavLink>
          <NavLink to="/blogs" onClick={() => setOpen(false)} className="flex items-center justify-between py-3 text-sm font-bold uppercase tracking-widest border-b border-zinc-200">Archive <ArrowUpRight className="w-4 h-4" /></NavLink>
          <Link
            to="/create-blog"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-ink-900 text-white px-6 py-4 rounded-full text-sm font-bold uppercase tracking-widest border-2 border-ink-900 shadow-hard-sm"
          >
            <PenLine className="w-4 h-4" /> Write Story
          </Link>
        </div>
      )}
    </header>
  );
}
