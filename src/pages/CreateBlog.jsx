import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createBlog } from '../services/blogService';
import toast from 'react-hot-toast';

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createBlog(data);
      toast.success('Blog created successfully');
      navigate(`/blogs/${res.data._id}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper">
      <div className="mb-6 border-l-4 border-accent pl-4">
        <h1 className="font-display font-black text-[36px] tracking-[-0.03em] leading-none">Create a new <span className="italic font-normal text-zinc-400">story</span></h1>
        <p className="text-zinc-600 mt-2 font-medium">Share your knowledge with the community. All fields marked with * are required.</p>
      </div>
      <BlogForm onSubmit={handleSubmit} loading={loading} submitLabel="Publish Blog" />
    </div>
  );
}
