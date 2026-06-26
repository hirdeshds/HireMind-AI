# HireMind AI - Frontend

HireMind AI is an AI-powered Applicant Tracking System (ATS) that intelligently parses resumes, matches candidates to job descriptions, and provides actionable analytics for recruiters.

This directory contains the **Frontend** application, built on modern React practices to provide a sleek, fast, and interactive dashboard for recruiters and administrators.

## Tech Stack
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & custom glassmorphism effects
- **Authentication:** [Better Auth](https://better-auth.com) (JWT based)
- **Database ORM:** [Prisma](https://www.prisma.io/) (PostgreSQL via Supabase)
- **State & Data Fetching:** React Server Components + Client Hooks
- **Charting:** ApexCharts

## Core Features
- **Recruiter Dashboard:** Real-time metrics and dynamic data aggregation.
- **Admin Dashboard:** Role-based access control and user management.
- **Authentication:** Secure sign-in and sign-up with email and OAuth capabilities.
- **Dynamic Visuals:** Custom AI-themed components, interactive hovering panels, and fluid animations.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Supabase PostgreSQL database (or any PostgreSQL instance)

### 1. Environment Setup
Create a `.env` file in the root of the `frontend/` directory with the following variables:
```env
# Authentication configuration
BETTER_AUTH_SECRET="your_secure_random_string"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database connection
DATABASE_URL="postgresql://user:password@host:5432/postgres"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Sync Database Schema
Ensure your database tables are created according to the Prisma schema:
```bash
npm run db:generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Structure Highlights
- `src/app/`: Next.js App Router pages (Auth routes, Dashboards).
- `src/components/`: Reusable React components (Charts, Layouts, Interactive UI).
- `src/lib/`: Core utilities including Prisma DB initialization (`db/index.ts`) and Auth configuration (`auth/auth.ts`).
- `prisma/`: Database schema and generated client.

## Contributing
When developing, ensure you follow standard linting guidelines. Run `npm run lint` before committing any changes. CI workflows are automatically triggered via GitHub Actions on PRs to the `main` branch.
