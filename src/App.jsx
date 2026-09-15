import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/blogs/edit/:id" element={<EditBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: { background: '#0f172a', color: '#fff', borderRadius: '9999px', fontSize: '14px' },
        success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } }
      }} />
    </BrowserRouter>
  );
}
