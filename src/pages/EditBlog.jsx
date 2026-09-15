import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { getBlogById, updateBlog } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import toast from 'react-hot-toast';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setSaving(true);
      const res = await updateBlog(id, data);
      toast.success('Blog updated');
      navigate(`/blogs/${res.data._id}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8"><LoadingSpinner /></div>;
  if (error) return <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>;

  return (
    <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-paper">
      <div className="mb-6 border-l-4 border-mustard pl-4">
        <h1 className="font-display font-black text-[36px] tracking-[-0.03em] leading-none">Edit <span className="italic font-normal text-zinc-400">story</span></h1>
        <p className="text-zinc-600 mt-2 font-medium">Update your article and keep it fresh.</p>
      </div>
      <BlogForm initialData={blog} onSubmit={handleSubmit} loading={saving} submitLabel="Update Blog" />
    </div>
  );
}
