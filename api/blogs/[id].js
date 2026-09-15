import mongoose from 'mongoose';
import { connectDB } from '../../lib/mongodb.js';
import Blog from '../../models/Blog.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
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

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }

  try {
    await connectDB();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Database connection failed', error: err.message });
  }

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.status(200).json({ success: true, data: blog });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch blog', error: err.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      if (typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      const errors = validateBlog(data);
      if (errors.length) {
        return res.status(400).json({ success: false, message: errors.join(', '), errors });
      }
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          title: data.title.trim(),
          description: data.description.trim(),
          content: data.content,
          author: data.author.trim(),
          category: data.category,
          coverImage: data.coverImage.trim(),
          tags: Array.isArray(data.tags) ? data.tags : [],
          readTime: data.readTime.trim(),
          publishedDate: new Date(data.publishedDate),
        },
        { new: true, runValidators: true }
      );
      if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.status(200).json({ success: true, data: blog });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ success: false, message: messages.join(', '), errors: messages });
      }
      return res.status(500).json({ success: false, message: 'Failed to update blog', error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.status(200).json({ success: true, message: 'Blog deleted successfully', data: blog });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to delete blog', error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
}
