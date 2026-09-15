# Inkwell — Blog Application

A production-ready, full-stack blog platform built with React + Vite frontend and Vercel Serverless Functions backend, using MongoDB Atlas.

**Architecture:**
```
React (Vite) → Axios (/api) → Vercel Serverless Functions → MongoDB Atlas
```

---

## Features
- CRUD for blogs (create, read, update, delete)
- Responsive modern UI (Tailwind CSS)
- Search, category filter, sorting (latest/oldest/A–Z)
- Polished Home with hero, featured, categories, newsletter
- Blog details with related articles, tags, content rendering
- Reusable BlogForm for create/edit with validation
- Loading skeletons, error & empty states
- Delete confirmation modal, toast notifications
- SPA routing with Vercel rewrites

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router DOM 6, Axios, Lucide React, React Hot Toast
- **Backend:** Node.js Vercel Serverless Functions, Mongoose
- **Database:** MongoDB Atlas

## Folder Structure
```
blog-application/
├── api/blogs/index.js        # GET all, POST create
├── api/blogs/[id].js         # GET one, PUT update, DELETE
├── lib/mongodb.js            # reusable cached connection
├── models/Blog.js            # Mongoose schema
├── scripts/seed.js           # seed 12 realistic blogs
├── src/
│   ├── components/           # Navbar, Footer, BlogCard, etc.
│   ├── pages/                # Home, Blogs, BlogDetails, Create, Edit, NotFound
│   ├── services/             # api.js, blogService.js
│   ├── hooks/useBlogs.js
│   ├── App.jsx & main.jsx
│   └── index.css
├── vercel.json
├── vite.config.js
└── package.json
```

## Environment Variables
Create `.env` locally (and add in Vercel Dashboard):
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blogdb?retryWrites=true&w=majority
VITE_API_URL=/api
```
See `.env.example`. Never commit `.env`.

## MongoDB Setup
1. Create account at https://cloud.mongodb.com
2. Create a free cluster → Create Database `blogdb`
3. Database Access → Add user (username/password)
4. Network Access → Allow `0.0.0.0/0` (or Vercel IPs)
5. Connect → Drivers → Copy connection string
6. Replace `<password>` and set as `MONGODB_URI`

## Local Setup
```bash
npm install
# Option A: with Vercel CLI (tests serverless functions locally)
npm i -g vercel
vercel dev
# runs both frontend + /api at http://localhost:3000

# Option B: Vite only (frontend only, needs deployed API or vercel dev for /api)
npm run dev
```

To seed data:
```bash
# set MONGODB_URI in .env first
npm run seed
# or: node scripts/seed.js
```

## Production Build
```bash
npm run build
npm run preview
```

## API Documentation
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get single blog |
| POST | `/api/blogs` | Create blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

**Success response:**
```json
{ "success": true, "data": {} }
```
**Error response:**
```json
{ "success": false, "message": "Blog not found" }
```
Status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.

## Vercel Deployment
1. Push to GitHub
2. Vercel → Add New Project → Import GitHub repo
3. Framework preset: Vite
4. Environment Variables → Add `MONGODB_URI` and `VITE_API_URL=/api`
5. Deploy
6. Verify: `https://your-app.vercel.app/api/blogs` returns JSON
7. Test frontend routes refresh (`/blogs`, `/blogs/:id`, `/create-blog`) — handled by `vercel.json` rewrites

## vercel.json
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
 Ensures `/api/*` hits serverless functions and SPA routes fallback to `index.html`.

## Security Notes
- `MONGODB_URI` server-side only (never `VITE_` prefix)
- Backend validates all fields; frontend validation is not trusted
- `.env` in `.gitignore`
