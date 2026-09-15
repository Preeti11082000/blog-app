import BlogCard from './BlogCard';

export default function BlogGrid({ blogs, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
      {blogs.map((blog, i) => (
        <div key={blog._id} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1' : ''}>
          <BlogCard blog={blog} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
