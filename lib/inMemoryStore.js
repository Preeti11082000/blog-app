import mongoose from 'mongoose';

// Shared in-memory store for serverless fallback when MONGODB_URI is missing or DB unreachable
// This mirrors the seed data in scripts/seed.js and server.js so deployed demo works

let inMemoryBlogs = null;

function createSeedBlogs() {
  const now = new Date();
  return [
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Mastering React Server Components in 2025",
      description: "Learn how React Server Components change the way we build performant applications and when to use them over client components.",
      content: "React Server Components (RSC) have fundamentally changed how we think about React architecture.\n\nIntroduced to reduce bundle size and improve initial load performance, RSC allows components to render on the server without sending JavaScript to the client.\n\nIn this article, we explore the mental model behind RSC, how they differ from traditional SSR, and practical patterns for adopting them in a Next.js or Vite application.\n\nWe will cover streaming, suspense boundaries, and how to compose server and client components effectively. You'll also learn common pitfalls, such as trying to use state inside a server component, and how to avoid them.\n\nBy the end, you'll have a clear decision framework for when to choose server vs client components.",
      author: "Aarav Patel",
      category: "React",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      tags: ["react", "server components", "performance"],
      readTime: "6 min read",
      publishedDate: new Date("2025-03-15"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "JavaScript Closures Explained Visually",
      description: "A visual guide to understanding closures, scope chains, and how they power modern JavaScript patterns.",
      content: "Closures are one of the most powerful yet misunderstood features of JavaScript.\n\nAt its core, a closure is formed when a function retains access to its lexical scope even when executed outside that scope. This simple mechanism enables data privacy, function factories, and module patterns.\n\nWe will walk through visual diagrams showing how the scope chain is created, how the garbage collector treats closed-over variables, and why closures are essential for callbacks and event handlers.\n\nPractical examples include creating private counters, memoization, and currying. We also discuss common memory leak scenarios and how to profile them.",
      author: "Sofia Martinez",
      category: "JavaScript",
      coverImage: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=800&auto=format&fit=crop",
      tags: ["javascript", "closures", "fundamentals"],
      readTime: "5 min read",
      publishedDate: new Date("2025-02-20"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "TypeScript 5.5: What’s New and Why It Matters",
      description: "Explore the newest TypeScript features including inferred type predicates, control flow improvements, and performance boosts.",
      content: "TypeScript 5.5 ships with meaningful improvements for everyday developers.\n\nHighlights include smarter control-flow analysis for type narrowing, inferred type predicates that reduce the need for manual type guards, and faster incremental builds.\n\nWe benchmark compilation times before and after, and show how the new JSDoc inference helps JavaScript users get better editor support without rewriting their codebase.\n\nThe article includes migration tips and explains which tsconfig flags you should enable to get the most benefit.",
      author: "Kenji Tanaka",
      category: "TypeScript",
      coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop",
      tags: ["typescript", "release", "tooling"],
      readTime: "4 min read",
      publishedDate: new Date("2025-04-02"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Building a Design System from Scratch",
      description: "A practical playbook for creating a scalable design system that bridges design and development.",
      content: "A design system is more than a component library; it is a shared language between designers and engineers.\n\nWe start by auditing existing UI inconsistencies, then define tokens for color, spacing, and typography. From there we build foundational components with accessibility and theming in mind.\n\nYou will learn how to document components with Storybook, enforce consistency with ESLint and stylelint, and version your system for multiple products.\n\nCase study: how a small team scaled a design system to support three products without increasing maintenance overhead.",
      author: "Emily Carter",
      category: "Frontend",
      coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
      tags: ["design system", "frontend", "accessibility"],
      readTime: "7 min read",
      publishedDate: new Date("2025-01-18"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Modern CSS: Container Queries and :has()",
      description: "How container queries and the :has() selector are revolutionizing responsive design without media queries.",
      content: "For years, responsive design meant media queries. Container queries change that by allowing components to adapt based on their container size, not viewport size.\n\nCombined with :has(), we can now style parents based on children — enabling layouts that were previously impossible without JavaScript.\n\nThis guide walks through real-world examples: card grids that reflow based on sidebar width, and navigation that collapses intelligently. We also cover browser support and progressive enhancement strategies.",
      author: "Liam O'Connor",
      category: "CSS",
      coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
      tags: ["css", "container queries", "responsive"],
      readTime: "5 min read",
      publishedDate: new Date("2025-03-28"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Web Performance: Fixing Your Core Web Vitals",
      description: "A deep dive into LCP, INP, and CLS — and actionable fixes that improved our performance score from 62 to 98.",
      content: "Core Web Vitals are now a ranking factor and a user experience imperative.\n\nWe share a real audit of an e-commerce site that struggled with Largest Contentful Paint and Interaction to Next Paint. Step by step, we optimized image loading with priority hints, reduced JavaScript execution time via code splitting, and eliminated layout shift with size attributes.\n\nYou will see before/after Lighthouse scores, filmstrip comparisons, and the exact Vite and React changes we made. Includes a checklist you can apply today.",
      author: "Priya Nair",
      category: "Web Development",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      tags: ["performance", "web vitals", "optimization"],
      readTime: "8 min read",
      publishedDate: new Date("2025-02-10"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Practical AI for Frontend Developers",
      description: "How to integrate AI features into your frontend without needing a PhD in machine learning.",
      content: "AI is no longer just for backend teams. Frontend developers can now embed embeddings, vector search, and LLM-powered features directly in the browser.\n\nWe explore using the WebGPU API for on-device inference, calling OpenAI and open-source models via edge functions, and building RAG experiences with vector databases.\n\nA tutorial builds a smart documentation search that understands natural language queries. We also discuss cost, latency, and privacy trade-offs of client-side vs server-side AI.",
      author: "David Kim",
      category: "AI",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      tags: ["ai", "frontend", "llm"],
      readTime: "6 min read",
      publishedDate: new Date("2025-04-10"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "From Junior to Senior: The Career Ladder Nobody Talks About",
      description: "What actually distinguishes a senior engineer beyond years of experience.",
      content: "Promotion to senior is not about knowing more syntax; it is about scope, ownership, and communication.\n\nWe interviewed 30 engineering managers to understand what they look for: the ability to break down ambiguous problems, mentor others, and drive technical decisions with data.\n\nThe article maps out a 12-month plan covering system design, code review quality, and stakeholder management. It also debunks myths like 'you must know algorithms to be senior' and shows alternative paths through specialization.",
      author: "Rachel Green",
      category: "Career",
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      tags: ["career", "growth", "mentorship"],
      readTime: "7 min read",
      publishedDate: new Date("2025-01-30"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "The Ultimate Guide to React Performance",
      description: "Memo, useMemo, useCallback — when to use them and when they actually hurt performance.",
      content: "Premature optimization is the root of many React performance issues.\n\nWe profile a real dashboard that used memo everywhere and still lagged. Through React DevTools and the Profiler API, we identified that excessive memoization caused more work than it saved.\n\nLearn the rules of thumb: measure first, understand referential equality, and only memoize when you have a proven bottleneck. Includes benchmarks and a decision flowchart.",
      author: "Omar Hassan",
      category: "React",
      coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop",
      tags: ["react", "performance", "memoization"],
      readTime: "6 min read",
      publishedDate: new Date("2025-03-05"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "TypeScript for React: Patterns That Scale",
      description: "Type-safe React patterns including discriminated unions, generic components, and exhaustive checks.",
      content: "TypeScript and React are a powerful combination when used correctly.\n\nWe cover patterns that keep large codebases maintainable: discriminated unions for variant props, generic components for reusable lists, and exhaustive switch checks to catch missing cases at compile time.\n\nEach pattern includes a before/after code comparison. You will also learn how to type compound components and context providers without resorting to any.",
      author: "Nina Patel",
      category: "TypeScript",
      coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
      tags: ["typescript", "react", "patterns"],
      readTime: "5 min read",
      publishedDate: new Date("2025-02-28"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "CSS Architecture at Scale: CUBE and Beyond",
      description: "How to structure CSS for large teams without losing your mind.",
      content: "As teams grow, CSS can quickly become unmanageable. We compare methodologies like BEM, CUBE CSS, and utility-first approaches.\n\nThrough a case study of refactoring a 50k-line stylesheet, we show how CUBE CSS brought order without a full rewrite. You will learn how to layer utilities, blocks, and exceptions, and enforce the architecture with linters.\n\nTakeaways include naming conventions, file organization, and how Tailwind fits into a CUBE strategy.",
      author: "Alex Rivera",
      category: "CSS",
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop",
      tags: ["css", "architecture", "tailwind"],
      readTime: "6 min read",
      publishedDate: new Date("2025-04-18"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "JavaScript Runtimes: Node vs Deno vs Bun",
      description: "A practical comparison of Node, Deno, and Bun for building modern web applications.",
      content: "The JavaScript runtime landscape has evolved beyond Node.js.\n\nWe benchmark startup time, file I/O, and package installation across Node 22, Deno 2, and Bun 1.1. Beyond numbers, we compare developer experience: permission models, TypeScript support, and native tooling.\n\nShould you switch? We provide a migration guide and highlight where each runtime shines — from edge functions to CLI tools.",
      author: "Tom Wilson",
      category: "JavaScript",
      coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop",
      tags: ["javascript", "runtimes", "node"],
      readTime: "7 min read",
      publishedDate: new Date("2025-03-22"),
      createdAt: now,
      updatedAt: now,
    },
  ];
}

// Use global to persist across hot reloads / serverless invocations where possible
export function getInMemoryBlogs() {
  if (global._inMemoryBlogs && global._inMemoryBlogs.length) {
    return global._inMemoryBlogs;
  }
  if (inMemoryBlogs && inMemoryBlogs.length) {
    return inMemoryBlogs;
  }
  const seed = createSeedBlogs();
  inMemoryBlogs = seed;
  global._inMemoryBlogs = seed;
  return seed;
}

export function setInMemoryBlogs(blogs) {
  inMemoryBlogs = blogs;
  global._inMemoryBlogs = blogs;
}
