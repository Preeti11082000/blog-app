import { useState, useEffect, useCallback } from 'react';
import { getBlogs } from '../services/blogService';

export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs, setBlogs };
}
