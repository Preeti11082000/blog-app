import mongoose from 'mongoose';
import { connectDB } from '../../lib/mongodb.js';
import Blog from '../../models/Blog.js';
import { getInMemoryBlogs } from '../../lib/inMemoryStore.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validateBlog(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) errors.push('Title must be at least 3 characters');
  if (!data.description || data.description.trim().length < 10) errors.push('Description must be at least 10 characters');
  if (!data.content || data.content.trim().length < 20) errors.push('Content must be at least 20 characters');
  if (!data.author || !data.author.trim()) errors.push('Author is required');
  if (!data.category) errors.push('Category is required');
  const validCategories = ['React', 'JavaScript', 'TypeScript', 'Frontend', 'CSS', 'Web Development', 'AI', 'Career'];
  if (data.category && !validCategories.includes(data.category)) errors.push('Invalid category');
  if (!data.coverImage) errors.push('Cover image URL is required');
  else {
    try { new URL(data.coverImage); } catch { errors.push('Cover image must be a valid URL'); }
  }
  if (!data.readTime) errors.push('Read time is required');
  if (!data.publishedDate) errors.push('Published date is required');
  return errors;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  let useMemory = false;
  try {
    await connectDB();
  } catch (err) {
    console.error('DB connection error (falling back to in-memory):', err.message);
    // Fallback to in-memory demo data so deployed site never shows "Database connection failed"
    // Fix permanently by adding MONGODB_URI in Vercel → Settings → Environment Variables
    useMemory = true;
  }

  if (req.method === 'GET') {
    try {
      if (useMemory) {
        const blogs = getInMemoryBlogs().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.status(200).json({ success: true, data: blogs, count: blogs.length, source: 'memory' });
      }
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: blogs, count: blogs.length });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      // tags can be string comma-separated or array
      if (typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      const errors = validateBlog(data);
      if (errors.length) {
        return res.status(400).json({ success: false, message: errors.join(', '), errors });
      }
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
          tags: Array.isArray(data.tags) ? data.tags : [],
          readTime: data.readTime.trim(),
          publishedDate: new Date(data.publishedDate),
          createdAt: now,
          updatedAt: now,
          __v: 0,
        };
        const store = getInMemoryBlogs();
        store.unshift(blog);
        return res.status(201).json({ success: true, data: blog, source: 'memory', warning: 'Using in-memory store. Add MONGODB_URI in Vercel for persistence.' });
      }
      const blog = await Blog.create({
        title: data.title.trim(),
        description: data.description.trim(),
        content: data.content,
        author: data.author.trim(),
        category: data.category,
        coverImage: data.coverImage.trim(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: data.readTime.trim(),
        publishedDate: new Date(data.publishedDate),
      });
      return res.status(201).json({ success: true, data: blog });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ success: false, message: messages.join(', '), errors: messages });
      }
      return res.status(500).json({ success: false, message: 'Failed to create blog', error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
}
