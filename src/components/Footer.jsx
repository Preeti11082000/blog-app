import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-zinc-300 border-t-2 border-ink-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, white 20px, white 21px)`}} />
      </div>
      {/* watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none leading-none">
        <p className="font-display font-black text-[18vw] tracking-[-0.06em] text-white/[0.04] whitespace-nowrap text-center">INKWELL JOURNAL</p>
      </div>
      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 bg-white rounded-[12px] flex items-center justify-center rotate-[-3deg] border-2 border-white shadow-hard-sm">
                <span className="font-display font-black text-ink-900 text-[18px] leading-none tracking-tighter">I<span className="text-accent">.</span></span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-ink-900" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-[24px] tracking-tight text-white leading-none">Inkwell<span className="text-mustard">.</span></span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 leading-none">Est. 2024 — Journal</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed font-medium">
              A modern publishing platform for developers, designers and thinkers. Share ideas, stories and insights with a community that cares about craft — not content mills.
            </p>
            <div className="flex gap-2.5 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white text-ink-900 border-2 border-white flex items-center justify-center hover:bg-mustard transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-transparent border-2 border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-ink-900 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-transparent border-2 border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-ink-900 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent border-2 border-white text-white flex items-center justify-center hover:bg-accent-light transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2"><span className="w-6 h-0.5 bg-mustard" /> Navigation</h4>
            <ul className="space-y-2.5 text-sm mt-4">
              <li><Link to="/" className="hover:text-mustard font-bold inline-flex items-center gap-1">Home <ArrowUpRight className="w-3 h-3 opacity-50" /></Link></li>
              <li><Link to="/blogs" className="hover:text-mustard font-bold inline-flex items-center gap-1">Archive <ArrowUpRight className="w-3 h-3 opacity-50" /></Link></li>
              <li><Link to="/create-blog" className="hover:text-mustard font-bold inline-flex items-center gap-1">Write Story <ArrowUpRight className="w-3 h-3 opacity-50" /></Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2"><span className="w-6 h-0.5 bg-accent" /> Topics</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-400 mt-4 font-bold">
              <li className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-center">React</li>
              <li className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-center">JavaScript</li>
              <li className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-center">TypeScript</li>
              <li className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-center">AI & Career</li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <p>© {new Date().getFullYear()} Inkwell Journal — All rights reserved.</p>
          <p className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full" /> Crafted with React, Tailwind & MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
