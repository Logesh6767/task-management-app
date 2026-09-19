# 📋 TaskFlow — Task Management Application

> Built for the **Thiranex Online Internship** program

A modern, full-stack task management web application built with **Next.js 14** and **Supabase**.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Features

| Feature | Implementation |
|---|---|
| 🔐 User Authentication | Supabase Auth (email + password) |
| ✅ Task CRUD | Next.js API Routes + Supabase DB |
| 🔴 Real-time Updates | Supabase Realtime (WebSockets) |
| 📱 Responsive Design | Tailwind CSS (mobile-first) |
| 🛡️ Route Protection | Next.js Middleware + JWT |
| 🔒 Row-Level Security | Supabase RLS policies |
| 🏷️ Tags & Priorities | Full metadata per task |
| 📊 Kanban Board | Todo → In Progress → Done |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (WebSockets)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📁 Project Structure

```
task-management-app/
├── app/
│   ├── api/tasks/          # REST API routes (backend)
│   │   ├── route.ts        # GET (list) + POST (create)
│   │   └── [id]/route.ts   # GET + PUT (update) + DELETE
│   ├── dashboard/page.tsx  # Main dashboard with real-time
│   ├── login/page.tsx      # Authentication
│   ├── signup/page.tsx     # Registration
│   └── layout.tsx
├── components/
│   ├── Navbar.tsx          # Top nav with search
│   ├── StatsCards.tsx      # Task statistics
│   ├── TaskBoard.tsx       # Kanban columns
│   ├── TaskCard.tsx        # Individual task card
│   └── TaskModal.tsx       # Create / Edit modal
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   └── server.ts       # Server Supabase client
│   └── utils.ts            # Helper functions
├── types/index.ts           # TypeScript types
├── middleware.ts            # Route protection
└── supabase/schema.sql      # Database schema
```

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- A free [Supabase](https://supabase.com) account

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/task-management-app.git
cd task-management-app
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. Go to **Settings → API** and copy your `URL` and `anon` key

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install & run

```bash
npm install
npm run dev
```

Visit **http://localhost:3000** 🚀

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 📄 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | List all tasks (supports `?status=`, `?priority=`, `?search=`) |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## 📄 License

MIT — Built as part of the Thiranex Internship Program.
