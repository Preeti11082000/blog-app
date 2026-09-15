import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [20, 'Content must be at least 20 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: [100, 'Author name too long'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['React', 'JavaScript', 'TypeScript', 'Frontend', 'CSS', 'Web Development', 'AI', 'Career'],
        message: '{VALUE} is not a valid category',
      },
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image URL is required'],
      validate: {
        validator: function (v) {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: 'Cover image must be a valid URL',
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published date is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Avoid OverwriteModelError in serverless
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
