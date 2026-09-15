import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, PenLine, Mail } from 'lucide-react';
import useBlogs from '../hooks/useBlogs';
import BlogGrid from '../components/BlogGrid';
import { SkeletonGrid } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { useState } from 'react';
import toast from 'react-hot-toast';

const categories = [
  { name: 'React', color: 'bg-[#61DAFB] border-ink-900', text: 'text-ink-900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', color: 'bg-[#F2C94C] border-ink-900', text: 'text-ink-900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', color: 'bg-[#3178C6] border-ink-900', text: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Frontend', color: 'bg-[#FF4D2E] border-ink-900', text: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', color: 'bg-[#264DE4] border-ink-900', text: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'AI', color: 'bg-[#8B5CF6] border-ink-900', text: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Career', color: 'bg-[#EC4899] border-ink-900', text: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg' },
];

export default function Home() {
  const { blogs, loading, error, refetch } = useBlogs();
  const [email, setEmail] = useState('');
  const featured = blogs.slice(0, 4);
  const latest = blogs.slice(0, 8);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Subscribed! Check your inbox.');
    setEmail('');
  };

  return (
    <div className="bg-paper">
      {/* Hero — editorial masthead */}
      <section className="relative overflow-hidden border-b-2 border-ink-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1111110a_1px,transparent_1px),linear-gradient(to_bottom,#1111110a_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-mustard rounded-full blur-[120px] opacity-30" />
          <div className="absolute -bottom-32 -left-32 w-[640px] h-[640px] bg-accent rounded-full blur-[130px] opacity-15" />
        </div>
        <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10 sm:py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-10 lg:gap-12 items-start">
            <div className="relative">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-900 text-white text-[11px] font-black uppercase tracking-widest rounded-full mb-5 border-2 border-ink-900 shadow-hard-sm rotate-[-1deg]">
                <Sparkles className="w-3.5 h-3.5 text-mustard" /> New: AI-assisted writing tips
              </div> */}
              <h1 className="font-display font-black tracking-[-0.05em] leading-[0.86] text-[42px] sm:text-[62px] lg:text-[74px] xl:text-[84px]">
                <span className="block">Ideas,</span>
                <span className="block italic font-normal tracking-[-0.04em] text-zinc-400">Stories</span>
                <span className="relative inline-block">
                  <span className="relative z-10">& Insights</span>
                  <span className="absolute left-0 right-0 bottom-2 h-3 bg-mustard -rotate-1 -z-0" />
                  <span className="absolute left-0 right-0 bottom-2 h-3 bg-accent/20 rotate-1 -z-0 translate-x-1" />
                </span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-zinc-700 max-w-[560px] font-medium">
                A <span className="bg-white border border-ink-900 px-1.5 py-0.5 rounded-full text-[13px] font-black">publishing platform</span> for developers. Discover in-depth articles on React, JavaScript, CSS, AI and career growth — written by the community, not AI slop.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/blogs" className="inline-flex items-center gap-2 bg-ink-900 text-white pl-6 pr-2 py-2 rounded-full font-black uppercase tracking-widest text-[13px] border-2 border-ink-900 shadow-hard hover:translate-y-[-2px] transition-transform">
                  Explore Archive <span className="w-9 h-9 bg-mustard text-ink-900 rounded-full flex items-center justify-center"><ArrowRight className="w-4 h-4" /></span>
                </Link>
                <Link to="/create-blog" className="inline-flex items-center gap-2 bg-white border-2 border-ink-900 px-6 py-3 rounded-full font-black uppercase tracking-widest text-[13px] shadow-hard-sm hover:shadow-hard transition-shadow">
                  <PenLine className="w-4 h-4" /> Start Writing
                </Link>
              </div>

            </div>

            {/* Right editorial stack */}
            <div className="relative lg:sticky lg:top-24 space-y-4">
              <div className="bg-ink-900 text-white rounded-[28px] p-6 sm:p-7 border-2 border-ink-900 shadow-hard overflow-hidden relative rotate-[0.7deg]">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-mustard rounded-full blur-3xl opacity-20" />
                <div className="absolute top-0 right-0 bg-mustard text-ink-900 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-2xl border-l-2 border-b-2 border-ink-900">Editor’s Pick</div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-mustard mt-4">Featured Insight</p>
                <h3 className="font-display font-black text-[22px] leading-tight mt-3">“The best way to predict the future is to create it — with clean code, thoughtful design, and continuous learning.”</h3>
                <div className="flex items-center gap-3 mt-6">
                  <img src="https://i.pravatar.cc/100?img=12" alt="author" className="w-10 h-10 rounded-full border-2 border-white" />
                  <div>
                    <p className="text-sm font-black">Sarah Chen</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Senior Frontend Engineer</p>
                  </div>
                  <span className="ml-auto w-8 h-8 bg-white text-ink-900 rounded-full flex items-center justify-center"><ArrowUpRight className="w-4 h-4" /></span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/15 text-center">
                  <div><p className="text-xl font-black">4.9</p><p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Rating</p></div>
                  <div><p className="text-xl font-black">2.4k</p><p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Reads</p></div>
                  <div><p className="text-xl font-black">98%</p><p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Helpful</p></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-stretch">
                <div className="bg-mustard border-2 border-ink-900 rounded-[20px] p-4 shadow-hard-sm flex flex-col justify-center min-h-[96px]">
                  <p className="text-[11px] font-black uppercase tracking-widest">Trending Now</p>
                  <p className="font-display font-black text-[16px] leading-tight mt-1">React 19 is here</p>
                  <p className="text-xs font-bold text-zinc-700">1.2k reading now • 8 min</p>
                </div>
                <div className="bg-white border-2 border-ink-900 rounded-[20px] p-4 shadow-hard-sm flex flex-col justify-center min-h-[96px]">
                  <p className="text-[11px] font-black uppercase tracking-widest text-accent">Up Next</p>
                  <p className="font-black text-sm leading-tight">CSS Container Queries</p>
                  <p className="text-xs font-medium text-zinc-500">Tomorrow • 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — colorful pills */}
      <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10 bg-white border-b-2 border-ink-900">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display font-black text-[22px] tracking-tight flex items-center gap-3"><span className="w-2 h-6 bg-accent rounded-full" /> Categories <span className="hidden sm:inline text-[12px] font-bold uppercase tracking-widest bg-paper border-2 border-ink-900 rounded-full px-3 py-1 ml-2">7 Topics</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link key={cat.name} to="/blogs" className={`border-2 border-ink-900 rounded-[18px] p-4 text-center shadow-hard-sm hover:shadow-hard hover:-translate-y-1 transition-all group ${cat.color}`}>
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink-900 flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform p-1.5">
                <img src={cat.icon} alt={cat.name} className="w-6 h-6 object-contain" loading="lazy" />
              </div>
              <p className={`text-sm font-black mt-2 ${cat.text}`}>{cat.name}</p>

            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">Curated • Vol II</p>
            <h2 className="font-display font-black text-[28px] sm:text-[34px] tracking-[-0.03em] leading-none">Featured Articles <span className="font-normal italic text-zinc-400">— editor’s choice</span></h2>
          </div>
          <Link to="/blogs" className="inline-flex items-center gap-2 bg-ink-900 text-white px-5 py-2.5 rounded-full font-black uppercase tracking-widest text-xs border-2 border-ink-900 shadow-hard-sm">See all <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
        {loading && <SkeletonGrid />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && featured.length > 0 && (
          <BlogGrid blogs={featured} onDelete={() => toast('Delete from Archive page', { icon: 'ℹ️' })} />
        )}
        {!loading && !error && featured.length === 0 && <p className="text-center text-zinc-500 py-10 font-medium">No blogs yet. Be the first to publish!</p>}
      </section>

      {/* Latest Articles — halftone */}
      <section className="bg-white border-y-2 border-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(#111 1px, transparent 1px)`, backgroundSize: '18px 18px'}} />
        <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-display font-black text-[28px] tracking-tight">Latest Drops</h2>
            <span className="h-px flex-1 bg-ink-900/20 hidden sm:block" />
            <span className="text-xs font-black uppercase tracking-widest bg-mustard border-2 border-ink-900 rounded-full px-3 py-1">Fresh Ink</span>
          </div>
          {loading && <SkeletonGrid />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {!loading && !error && <BlogGrid blogs={latest} onDelete={() => toast('Delete from Archive')} />}
        </div>
      </section>

      {/* Newsletter — newspaper classifieds */}
      <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10">
        <div className="relative bg-ink-900 rounded-[32px] p-1 border-2 border-ink-900 shadow-hard overflow-hidden">
          <div className="bg-mustard rounded-[24px] p-[1px]">
            <div className="bg-ink-900 rounded-[22px] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px)`}} />
              <div className="relative flex-1">
                <div className="inline-flex items-center gap-2 bg-white text-ink-900 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-ink-900 mb-3">✦ Join 12k+ Readers</div>
                <h3 className="font-display font-black text-[28px] sm:text-[34px] tracking-tight text-white leading-none">Stay in the <span className="text-mustard italic">loop</span></h3>
                <p className="text-zinc-400 mt-2 max-w-xl font-medium">Get the latest articles, tutorials and career insights delivered straight to your inbox. No spam, unsubscribe anytime.</p>
              </div>
              <form onSubmit={handleNewsletter} className="relative flex w-full lg:w-auto gap-3 bg-white p-1.5 rounded-full border-2 border-white shadow-hard-sm">
                <div className="relative flex-1 lg:w-72">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-zinc-100 border-2 border-ink-900 text-sm font-bold focus:outline-none focus:bg-white"
                  />
                </div>
                <button type="submit" className="px-7 py-3 bg-accent text-white border-2 border-ink-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-accent-light shadow-hard-sm">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
