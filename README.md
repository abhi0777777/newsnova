# NewsNova 📰

A fast, clean news blog built with **Next.js 14 App Router**, **MongoDB**, and **ImgBB**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.local` and fill in your values:
```
MONGODB_URI=mongodb+srv://...
SECRET_POST_TOKEN=any-long-random-string
IMGBB_API_KEY=get-free-key-from-imgbb.com
NEXT_PUBLIC_APP_URL=https://newsnova.online
```

### 3. Run development server
```bash
npm run dev
```
Open http://localhost:3000

---

## 📁 Project Structure

```
newsnova/
├── app/
│   ├── (public)/          ← Public pages (Home, About, Contact, etc.)
│   │   ├── page.jsx       ← Home — all posts
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   ├── terms-conditions/
│   │   ├── category/[slug]/  ← /category/technology
│   │   └── post/[slug]/      ← Individual post
│   ├── secret-post/       ← Admin panel (protected by token)
│   ├── api/               ← REST API
│   │   ├── posts/         ← GET (list), POST (create)
│   │   ├── posts/[id]/    ← GET, PUT, DELETE
│   │   ├── categories/    ← GET, POST
│   │   └── upload/        ← Image upload → ImgBB
│   ├── layout.jsx
│   └── globals.css
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PostCard.jsx
│   ├── CategoryFilter.jsx
│   ├── PostEditor.jsx     ← Tiptap rich text editor
│   └── ImageUploader.jsx  ← Drag & drop → ImgBB
├── lib/
│   ├── mongodb.js
│   ├── auth.js
│   └── utils.js
└── models/
    ├── Post.js
    └── Category.js
```

---

## 🔐 Admin Panel

Go to `/secret-post` and enter your `SECRET_POST_TOKEN`.

From the admin panel you can:
- Create categories (with custom colors)
- Upload cover images (→ ImgBB, free)
- Write posts with a full rich text editor
- Publish or save as draft

---

## 🖼️ Image Size Guide

For fast loading, keep images optimized:

| Usage | Recommended Size | Format |
|-------|-----------------|--------|
| Cover / Featured | ≤ 150 KB | WebP or JPEG |
| Thumbnail | ≤ 50 KB | WebP |
| Logo | ≤ 20 KB | SVG or WebP |

Use [Squoosh](https://squoosh.app) (free) to compress before uploading.
Aim for **1200×630px** for cover images (ideal for social sharing too).

---

## 📦 Deploy to Vercel

```bash
npm run build
# Push to GitHub, connect to Vercel
# Add environment variables in Vercel dashboard
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List posts (query: `?category=tech&page=1&limit=20`) |
| POST | `/api/posts` | Create post (Bearer token required) |
| GET | `/api/posts/:id` | Get post by ID or slug |
| PUT | `/api/posts/:id` | Update post (Bearer token required) |
| DELETE | `/api/posts/:id` | Delete post (Bearer token required) |
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category (Bearer token required) |
| POST | `/api/upload` | Upload image to ImgBB (Bearer token required) |
