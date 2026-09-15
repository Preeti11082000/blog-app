import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import { connectDB } from './lib/mongodb.js';
import Blog from './models/Blog.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory fallback when MONGODB_URI not set (for local dev without Atlas)
let inMemoryBlogs = [];
let useMemory = false;

const seedMemory = () => {
  const now = new Date();
  inMemoryBlogs = [
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Mastering React Server Components in 2025",
      description: "Learn how React Server Components change the way we build performant applications.",
      content: "React Server Components (RSC) have fundamentally changed how we think about React architecture.\n\nIntroduced to reduce bundle size and improve initial load performance, RSC allows components to render on the server without sending JavaScript to the client.\n\nIn this article, we explore the mental model behind RSC, how they differ from traditional SSR, and practical patterns for adopting them.",
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
      description: "A visual guide to understanding closures, scope chains, and how they power modern JS.",
      content: "Closures are one of the most powerful yet misunderstood features of JavaScript.\n\nAt its core, a closure is formed when a function retains access to its lexical scope even when executed outside that scope.",
      author: "Sofia Martinez",
      category: "JavaScript",
      coverImage: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=800&auto=format&fit=crop",
      tags: ["javascript", "closures"],
      readTime: "5 min read",
      publishedDate: new Date("2025-02-20"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "TypeScript 5.5: What’s New and Why It Matters",
      description: "Explore the newest TypeScript features including inferred type predicates and performance boosts.",
      content: "TypeScript 5.5 ships with meaningful improvements for everyday developers.\n\nHighlights include smarter control-flow analysis, inferred type predicates, and faster incremental builds.",
      author: "Kenji Tanaka",
      category: "TypeScript",
      coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop",
      tags: ["typescript", "tooling"],
      readTime: "4 min read",
      publishedDate: new Date("2025-04-02"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Modern CSS: Container Queries and :has()",
      description: "How container queries and :has() are revolutionizing responsive design.",
      content: "For years, responsive design meant media queries. Container queries change that by allowing components to adapt based on their container size, not viewport size.",
      author: "Liam O'Connor",
      category: "CSS",
      coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
      tags: ["css", "responsive"],
      readTime: "5 min read",
      publishedDate: new Date("2025-03-28"),
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: "Practical AI for Frontend Developers",
      description: "How to integrate AI features into your frontend without needing a PhD in ML.",
      content: "AI is no longer just for backend teams. Frontend developers can now embed embeddings, vector search, and LLM-powered features directly in the browser.",
      author: "David Kim",
      category: "AI",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      tags: ["ai", "frontend"],
      readTime: "6 min read",
      publishedDate: new Date("2025-04-10"),
      createdAt: now,
      updatedAt: now,
    },
  ];
};

function validateBlog(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) errors.push('Title must be at least 3 characters');
  if (!data.description || data.description.trim().length < 10) errors.push('Description must be at least 10 characters');
  if (!data.content || data.content.trim().length < 20) errors.push('Content must be at least 20 characters');
  if (!data.author || !data.author.trim()) errors.push('Author is required');
  if (!data.category) errors.push('Category is required');
  const valid = ['React', 'JavaScript', 'TypeScript', 'Frontend', 'CSS', 'Web Development', 'AI', 'Career'];
  if (data.category && !valid.includes(data.category)) errors.push('Invalid category');
  if (!data.coverImage) errors.push('Cover image URL is required');
  else { try { new URL(data.coverImage); } catch { errors.push('Cover image must be a valid URL'); } }
  if (!data.readTime) errors.push('Read time is required');
  if (!data.publishedDate) errors.push('Published date is required');
  return errors;
}

// Try to connect to MongoDB, fallback to memory
try {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not set -> using in-memory store (data resets on restart)');
    console.warn('   Add MONGODB_URI to .env to use MongoDB Atlas');
    useMemory = true;
    seedMemory();
  } else {
    await connectDB();
    console.log('✅ MongoDB connected');
    // seed if empty
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log('Seeding DB with sample data...');
      seedMemory();
      await Blog.insertMany(inMemoryBlogs.map(b => ({ ...b, _id: undefined })));
      console.log('Seeded');
    }
  }
} catch (e) {
  console.error('MongoDB connection failed, falling back to memory:', e.message);
  useMemory = true;
  if (inMemoryBlogs.length === 0) seedMemory();
}

// Health
app.get('/api/health', (req, res) => res.json({ success: true, message: 'API running', useMemory, count: useMemory ? inMemoryBlogs.length : undefined }));

// GET all
app.get('/api/blogs', async (req, res) => {
  try {
    if (useMemory) return res.json({ success: true, data: inMemoryBlogs.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)), count: inMemoryBlogs.length });
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs, count: blogs.length });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET one
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id) && useMemory) {
    // for memory, check if id exists anyway
  } else if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }
  try {
    if (useMemory) {
      const b = inMemoryBlogs.find(x => x._id === id);
      if (!b) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.json({ success: true, data: b });
    }
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST
app.post('/api/blogs', async (req, res) => {
  let data = req.body;
  if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t=>t.trim()).filter(Boolean);
  const errors = validateBlog(data);
  if (errors.length) return res.status(400).json({ success: false, message: errors.join(', '), errors });
  try {
    if (useMemory) {
      const now = new Date();
      const blog = {
        _id: new mongoose.Types.ObjectId().toString(),
        title: data.title.trim(),
        description: data.description.trim(),
        content: data.content,
        author: data.author.trim(),
        category: data.category,
        coverImage: data.coverImage.trim(),
        tags: data.tags || [],
        readTime: data.readTime.trim(),
        publishedDate: new Date(data.publishedDate),
        createdAt: now,
        updatedAt: now,
      };
      inMemoryBlogs.unshift(blog);
      return res.status(201).json({ success: true, data: blog });
    }
    const blog = await Blog.create({
      title: data.title.trim(),
      description: data.description.trim(),
      content: data.content,
      author: data.author.trim(),
      category: data.category,
      coverImage: data.coverImage.trim(),
      tags: data.tags || [],
      readTime: data.readTime.trim(),
      publishedDate: new Date(data.publishedDate),
    });
    res.status(201).json({ success: true, data: blog });
  } catch (e) {
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: Object.values(e.errors).map(x=>x.message).join(', ') });
    res.status(500).json({ success: false, message: e.message });
  }
});

// PUT
app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id) && !useMemory) return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  let data = req.body;
  if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t=>t.trim()).filter(Boolean);
  const errors = validateBlog(data);
  if (errors.length) return res.status(400).json({ success: false, message: errors.join(', '), errors });
  try {
    if (useMemory) {
      const idx = inMemoryBlogs.findIndex(x=>x._id===id);
      if (idx===-1) return res.status(404).json({ success: false, message: 'Blog not found' });
      inMemoryBlogs[idx] = { ...inMemoryBlogs[idx], ...data, title: data.title.trim(), description: data.description.trim(), author: data.author.trim(), coverImage: data.coverImage.trim(), readTime: data.readTime.trim(), tags: data.tags||[], publishedDate: new Date(data.publishedDate), updatedAt: new Date() };
      return res.json({ success: true, data: inMemoryBlogs[idx] });
    }
    const blog = await Blog.findByIdAndUpdate(id, {
      title: data.title.trim(),
      description: data.description.trim(),
      content: data.content,
      author: data.author.trim(),
      category: data.category,
      coverImage: data.coverImage.trim(),
      tags: data.tags||[],
      readTime: data.readTime.trim(),
      publishedDate: new Date(data.publishedDate),
    }, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// DELETE
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id) && !useMemory) return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  try {
    if (useMemory) {
      const idx = inMemoryBlogs.findIndex(x=>x._id===id);
      if (idx===-1) return res.status(404).json({ success: false, message: 'Blog not found' });
      const [deleted] = inMemoryBlogs.splice(idx,1);
      return res.json({ success: true, message: 'Blog deleted successfully', data: deleted });
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted successfully', data: blog });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/blogs`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
