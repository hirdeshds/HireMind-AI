<p align="center">
  <img src="https://img.shields.io/badge/HireMind-AI-blueviolet?style=for-the-badge&logo=brain&logoColor=white" alt="HireMind AI" />
</p>

<h1 align="center">HireMind AI</h1>

<p align="center">
  <strong>Intelligent Recruitment Platform — AI-Powered Candidate Screening & Talent Acquisition</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Core Architecture & Innovations](#core-architecture--innovations)
- [System Design](#system-design)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Operation](#installation--operation)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [CI/CD Pipeline](#cicd-pipeline)
- [Infrastructure](#infrastructure)
- [Monitoring & Observability](#monitoring--observability)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**HireMind AI** is an enterprise-grade, AI-powered recruitment and talent acquisition platform designed to revolutionize how organizations screen, evaluate, and manage candidates. The platform leverages machine learning for intelligent resume parsing, automated skill extraction, and candidate-job matching — enabling recruiters to make faster, data-driven hiring decisions.

### Key Features

| Feature | Description |
|---|---|
| **AI Resume Parsing** | Automated extraction of skills, experience, education, and certifications from candidate resumes |
| **Smart Candidate Matching** | ML-driven scoring engine that computes multi-dimensional compatibility scores (skills, experience, education, projects) |
| **Job Lifecycle Management** | Full CRUD for job postings with status tracking (`OPEN` → `CLOSED` → `ARCHIVED`) |
| **Application Pipeline** | End-to-end candidate pipeline: `NEW` → `REVIEWED` → `SHORTLISTED` → `INTERVIEWING` → `HIRED`/`REJECTED` |
| **Role-Based Access Control** | Two-tier RBAC system with `ADMIN` and `RECRUITER` roles |
| **Authentication Suite** | Email/password + Google OAuth via Better Auth with session management, password reset via email |
| **Analytics Dashboard** | Interactive charts and data visualizations for recruitment metrics |
| **Containerized Deployment** | Production-ready Docker + Nginx configuration with monitoring stack |

---

## Core Architecture & Innovations

### Architectural Principles

HireMind AI follows a **decoupled microservice-oriented architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                 │
│                                                                        │
│   Next.js 16 (React 19)  ·  Server Components  ·  TailwindCSS v4     │
│   Better Auth Client  ·  ApexCharts  ·  Prisma ORM                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │  HTTPS / REST
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         GATEWAY LAYER                                  │
│                                                                        │
│   Nginx Reverse Proxy                                                  │
│   ├── /        → Frontend (Next.js :3000)                             │
│   └── /api/    → Backend  (FastAPI :8000)                             │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              ▼                                 ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│      FRONTEND SERVICE    │    │      BACKEND SERVICE     │
│                          │    │                          │
│  Next.js 16 App Router   │    │  FastAPI (Python 3.11)   │
│  ├── Server Actions      │    │  ├── API Layer           │
│  ├── Auth (Better Auth)  │    │  ├── Service Layer       │
│  ├── Prisma Client       │    │  ├── Repository Layer    │
│  └── React Server Comps  │    │  ├── ML Pipeline         │
│                          │    │  └── Schema Validation   │
└──────────┬───────────────┘    └──────────┬───────────────┘
           │                               │
           ▼                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                    │
│                                                                        │
│   PostgreSQL (Frontend/Auth)    ·    SQLite (Backend/Dev)              │
│   Prisma Migrations             ·    SQLAlchemy ORM                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Innovation Highlights

1. **Dual-ORM Strategy**: Prisma (frontend, TypeScript) + SQLAlchemy (backend, Python) — each service uses the ORM best suited to its runtime, connected to its own data store.

2. **ML-Ready Pipeline**: The `backend/app/ml/` module is architected as a pluggable pipeline. The current mock parser can be swapped with production NLP models (OpenAI, Hugging Face) without changing the service or API layers.

3. **Multi-Dimensional Scoring Engine**: The Application model computes independent match scores across 4 axes — `skillsMatch`, `experienceMatch`, `educationMatch`, `projectMatch` — producing an `overallScore` with an AI-generated summary and recommendation.

4. **Zero-Config Auth**: Better Auth integration with cookie-based session caching (`compact` strategy), auto-refresh, and 7-day expiry. Supports email/password + Google OAuth out of the box.

---

## System Design

### Request Flow

```
User Request
    │
    ▼
┌─────────┐     ┌──────────┐     ┌──────────────┐     ┌────────────┐
│  Nginx  │ ──► │ Next.js  │ ──► │ Server       │ ──► │ PostgreSQL │
│  :80    │     │ :3000    │     │ Actions/API  │     │            │
└─────────┘     └──────────┘     └──────────────┘     └────────────┘
    │
    │  /api/*
    ▼
┌──────────┐     ┌──────────────┐     ┌──────────┐     ┌────────┐
│ FastAPI  │ ──► │ Service      │ ──► │ Repository│ ──► │ SQLite │
│ :8000   │     │ Layer        │     │ Layer     │     │        │
└──────────┘     └──────┬───────┘     └──────────┘     └────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ ML Pipeline  │
                 │ (Parser)     │
                 └──────────────┘
```

### Backend Layered Architecture

| Layer | Responsibility | Files |
|---|---|---|
| **API Layer** | Request handling, validation, HTTP concerns | `app/api/endpoints.py`, `app/api/v1/` |
| **Service Layer** | Business logic, orchestration, ML integration | `app/services/candidate_service.py` |
| **Repository Layer** | Data access, query abstraction | `app/repositories/candidate_repository.py` |
| **Schema Layer** | Pydantic models for request/response validation | `app/schemas/models.py` |
| **ML Layer** | Machine learning pipeline, resume parsing | `app/ml/parser.py` |
| **Core Layer** | Configuration, settings, constants | `app/core/config.py` |
| **DB Layer** | SQLAlchemy models, sessions, migrations | `app/db/models.py`, `app/db/session.py` |

### Frontend Architecture

| Module | Purpose |
|---|---|
| **App Router** | Next.js 16 file-based routing with route groups `(with-layout)` / `(without-layout)` |
| **Components** | Reusable UI: Auth, Charts, Tables, FormElements, Layouts, Breadcrumbs |
| **Lib** | Core utilities: auth config, DB client, email service, server actions |
| **Services** | API integration layer (`charts.services.ts`) |
| **Hooks** | Custom React hooks (`use-click-outside`, `use-mobile`) |
| **Types** | TypeScript type definitions |
| **Proxy** | API proxy configuration for backend communication |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | React framework with App Router and Server Components |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| TailwindCSS | 4.x | Utility-first CSS framework |
| Prisma | 7.8 | Type-safe PostgreSQL ORM |
| Better Auth | 1.6.x | Authentication (Email/Password + OAuth) |
| ApexCharts | 4.5 | Interactive data visualizations |
| Zod | 4.x | Runtime schema validation |
| Sonner | 2.x | Toast notifications |
| Nodemailer | 9.x | Email delivery (password reset) |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11 | Runtime |
| FastAPI | latest | High-performance async API framework |
| Uvicorn | latest | ASGI server |
| SQLAlchemy | latest | Python ORM |
| Pydantic Settings | latest | Configuration management |

### Infrastructure

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |
| Nginx | Reverse proxy & load balancer |
| GitHub Actions | CI/CD pipeline |
| Prometheus | Metrics collection |
| Grafana | Monitoring dashboards |

---

## Project Structure

```
HireMind-AI/
│
├── .github/                          # GitHub configuration
│   └── workflows/
│       ├── ci.yml                    # CI pipeline (lint + test)
│       ├── deploy.yml                # CD pipeline (Docker build & push)
│       ├── backend-ci.yml            # Backend-specific CI
│       ├── frontend-ci.yml           # Frontend-specific CI
│       └── ml-training.yml           # ML model training pipeline
│
├── backend/                          # Python FastAPI microservice
│   ├── app/
│   │   ├── api/
│   │   │   ├── endpoints.py          # Route handlers
│   │   │   ├── dependencies.py       # Dependency injection
│   │   │   └── v1/                   # API v1 versioned routes
│   │   ├── core/
│   │   │   └── config.py             # App settings (Pydantic)
│   │   ├── db/
│   │   │   ├── base.py               # SQLAlchemy Base
│   │   │   ├── models.py             # ORM models
│   │   │   └── session.py            # DB session factory
│   │   ├── ml/
│   │   │   └── parser.py             # Resume parsing ML pipeline
│   │   ├── repositories/
│   │   │   └── candidate_repository.py  # Data access layer
│   │   ├── schemas/
│   │   │   └── models.py             # Pydantic schemas
│   │   ├── services/
│   │   │   └── candidate_service.py  # Business logic
│   │   └── main.py                   # FastAPI application entry point
│   ├── Dockerfile                    # Backend container image
│   ├── requirements.txt              # Python dependencies
│   └── .env.example                  # Environment template
│
├── frontend/                         # Next.js 16 application
│   ├── prisma/
│   │   └── schema.prisma             # Database schema (PostgreSQL)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (with-layout)/        # Authenticated routes
│   │   │   │   ├── (home)/           # Dashboard
│   │   │   │   ├── candidates/       # Candidate management
│   │   │   │   │   ├── [id]/         # Candidate detail (dynamic)
│   │   │   │   │   ├── upload/       # Resume upload
│   │   │   │   │   └── page.tsx      # Candidates list
│   │   │   │   ├── jobs/             # Job postings
│   │   │   │   │   ├── [id]/         # Job detail (dynamic)
│   │   │   │   │   ├── create/       # Create new job
│   │   │   │   │   └── page.tsx      # Jobs list
│   │   │   │   ├── admin/            # Admin panel
│   │   │   │   ├── profile/          # User profile
│   │   │   │   ├── calendar/         # Scheduling
│   │   │   │   ├── charts/           # Analytics
│   │   │   │   ├── add-candidate/    # Quick candidate add
│   │   │   │   └── tables/           # Data tables
│   │   │   ├── (without-layout)/     # Unauthenticated routes
│   │   │   │   └── auth/
│   │   │   │       ├── sign-in/      # Login page
│   │   │   │       ├── sign-up/      # Registration page
│   │   │   │       ├── forgot-password/
│   │   │   │       └── reset-password/
│   │   │   ├── api/                  # Next.js API routes
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── providers.tsx         # Context providers
│   │   ├── components/
│   │   │   ├── Auth/                 # Auth UI components
│   │   │   ├── Charts/               # Chart components
│   │   │   ├── FormElements/         # Form inputs
│   │   │   ├── Layouts/              # Page layouts
│   │   │   ├── Tables/               # Data tables
│   │   │   ├── Breadcrumbs/          # Navigation
│   │   │   ├── CalenderBox/          # Calendar widget
│   │   │   ├── ui/                   # Shared UI primitives
│   │   │   └── ui-elements/          # Extended UI components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/
│   │   │   ├── auth/                 # Better Auth config
│   │   │   │   ├── auth.ts           # Server-side auth
│   │   │   │   └── auth-client.ts    # Client-side auth
│   │   │   ├── actions/              # Server Actions
│   │   │   ├── db/                   # Prisma client
│   │   │   ├── email.ts              # Nodemailer config
│   │   │   ├── api.ts                # API utilities
│   │   │   └── utils.ts              # General utilities
│   │   ├── services/                 # API integration
│   │   ├── types/                    # TypeScript definitions
│   │   ├── css/                      # Global styles
│   │   ├── fonts/                    # Custom fonts
│   │   ├── assets/                   # Static assets
│   │   └── proxy.ts                  # Backend API proxy
│   ├── Dockerfile                    # Frontend container image
│   ├── package.json                  # Node.js dependencies
│   └── tsconfig.json                 # TypeScript config
│
├── infrastructure/                   # Deployment configuration
│   ├── docker/
│   │   ├── docker-compose.dev.yml    # Development environment
│   │   └── docker-compose.prod.yml   # Production environment
│   └── nginx/
│       └── nginx.conf                # Reverse proxy config
│
├── monitoring/                       # Observability stack
│   ├── docker-compose.monitoring.yml # Monitoring services
│   ├── prometheus/
│   │   └── prometheus.yml            # Metrics scraping config
│   └── grafana/
│       └── provisioning/
│           ├── datasources/
│           │   └── datasource.yml    # Prometheus data source
│           └── dashboards/
│               └── dashboard.yml     # Dashboard provisioning
│
├── Makefile                          # Build automation
├── LICENSE                           # License
├── .gitignore                        # Git ignore rules
└── README.md                         # ← You are here
```

---

## Installation & Operation

### Prerequisites

| Tool | Version | Required |
|---|---|---|
| Node.js | ≥ 18.x | ✅ |
| Python | ≥ 3.11 | ✅ |
| Docker & Docker Compose | Latest | ✅ (for containerized setup) |
| PostgreSQL | ≥ 15 | ✅ (frontend database) |
| Git | Latest | ✅ |

### Option 1: Docker (Recommended)

The fastest way to get the entire platform running:

```bash
# 1. Clone the repository
git clone https://github.com/hirdeshds/HireMind-AI.git
cd HireMind-AI

# 2. Configure environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# Edit both .env files with your credentials (see Environment Variables section)

# 3. Start the development environment
docker-compose -f infrastructure/docker/docker-compose.dev.yml up --build

# 4. (Optional) Start the monitoring stack
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |

### Option 2: Manual Setup

#### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
.\venv\Scripts\Activate.ps1     # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm ci

# Configure environment
cp .env.example .env
# Fill in required values (see Environment Variables)

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### Production Deployment

```bash
# Build and run with production compose
docker-compose -f infrastructure/docker/docker-compose.prod.yml up --build -d
```

This starts the **Nginx reverse proxy** on port `80`, routing traffic to the frontend and backend containers.

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|---|---|---|
| `BETTER_AUTH_SECRET` | Secret key for Better Auth session encryption | ✅ |
| `BETTER_AUTH_URL` | Base URL for auth service (e.g., `http://localhost:3000`) | ✅ |
| `NEXT_PUBLIC_APP_URL` | Public-facing application URL | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ❌ |

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Database connection string | `sqlite:///./hiremind.db` |
| `ENVIRONMENT` | Runtime environment (`development`/`production`) | `development` |

---

## API Reference

### Base URL

```
Development: http://localhost:8000/api
Production:  https://your-domain.com/api
```

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root health check |
| `GET` | `/api/health` | Service health status |
| `POST` | `/api/candidates/` | Create a new candidate |
| `GET` | `/api/candidates/` | List all candidates (paginated) |
| `GET` | `/api/candidates/{id}` | Get candidate by ID |
| `POST` | `/api/analyze-resume/` | Analyze resume text via ML pipeline |

### Example: Create Candidate

```bash
curl -X POST http://localhost:8000/api/candidates/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "skills": "Python,FastAPI,Machine Learning",
    "experience_years": 5
  }'
```

### Example: Analyze Resume

```bash
curl -X POST "http://localhost:8000/api/analyze-resume/?text=Experienced+Python+developer"
```

**Response:**
```json
{
  "extracted_skills": ["Python", "FastAPI", "Machine Learning"],
  "confidence_score": 0.92
}
```

> **Note:** Full interactive API documentation is auto-generated at `/docs` (Swagger UI) and `/redoc` (ReDoc) when the backend is running.

---

## Database Schema

### Frontend (PostgreSQL via Prisma)

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     User     │       │     Job      │       │  Candidate   │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id           │──┐    │ id           │──┐    │ id           │──┐
│ name         │  │    │ title        │  │    │ firstName    │  │
│ email        │  │    │ description  │  │    │ lastName     │  │
│ role (RBAC)  │  │    │ skillsReq[]  │  │    │ email        │  │
│ phoneNumber  │  │    │ expLevel     │  │    │ skills[]     │  │
│ bio          │  │    │ location     │  │    │ experience   │  │
│ sessions[]   │  │    │ salaryRange  │  │    │ education    │  │
│ accounts[]   │  │    │ status       │  │    │ projects     │  │
│ jobs[]       │  │    │ recruiterId  │◄─┘    │ resumeUrl    │  │
└──────────────┘  │    │ applications │       │ resumeText   │  │
                  │    └──────────────┘       │ applications │  │
                  │           │               └──────────────┘  │
                  │           ▼                       │         │
                  │    ┌──────────────┐                │         │
                  │    │ Application  │                │         │
                  │    ├──────────────┤                │         │
                  │    │ id           │                │         │
                  │    │ jobId        │◄───────────────┘         │
                  │    │ candidateId  │◄────────────────────────-┘
                  │    │ status       │
                  │    │ overallScore │
                  │    │ skillsMatch  │
                  │    │ expMatch     │
                  │    │ eduMatch     │
                  │    │ aiSummary    │
                  │    └──────────────┘
                  │
                  ▼
          ┌──────────────┐    ┌──────────────┐
          │   Session    │    │   Account    │
          ├──────────────┤    ├──────────────┤
          │ id           │    │ id           │
          │ token        │    │ providerId   │
          │ expiresAt    │    │ accessToken  │
          │ userId       │    │ userId       │
          └──────────────┘    └──────────────┘
```

### Enumerations

| Enum | Values |
|---|---|
| `Role` | `ADMIN`, `RECRUITER` |
| `JobStatus` | `OPEN`, `CLOSED`, `ARCHIVED` |
| `AppStatus` | `NEW`, `REVIEWED`, `SHORTLISTED`, `INTERVIEWING`, `REJECTED`, `HIRED` |

---

## CI/CD Pipeline

### Continuous Integration (`ci.yml`)

Triggered on every **push** and **pull request** to `main`:

```
Push / PR to main
       │
       ├── test-frontend
       │   ├── Checkout
       │   ├── Setup Node.js 18
       │   ├── npm ci
       │   ├── npm run lint
       │   └── npm test
       │
       └── test-backend
           ├── Checkout
           ├── Setup Python 3.11
           ├── pip install -r requirements.txt
           └── pytest
```

### Continuous Deployment (`deploy.yml`)

Triggered on every **push** to `main`:

```
Push to main
       │
       ├── Login to GitHub Container Registry (ghcr.io)
       ├── Build & Push: ghcr.io/<repo>/frontend:latest
       ├── Build & Push: ghcr.io/<repo>/backend:latest
       └── Deploy via SSH (configurable)
```

### Additional Workflows

| Workflow | Trigger | Purpose |
|---|---|---|
| `frontend-ci.yml` | PR/Push | Frontend-specific quality checks |
| `backend-ci.yml` | PR/Push | Backend-specific quality checks |
| `ml-training.yml` | Manual/Scheduled | ML model retraining pipeline |

---

## Infrastructure

### Docker Services

#### Development (`docker-compose.dev.yml`)

| Service | Port | Features |
|---|---|---|
| `frontend` | 3000 | Volume mounts, hot reload via `npm run dev` |
| `backend` | 8000 | Volume mounts, hot reload via `uvicorn --reload` |

#### Production (`docker-compose.prod.yml`)

| Service | Port | Features |
|---|---|---|
| `nginx` | 80 | Reverse proxy, SSL termination ready |
| `frontend` | 3000 (internal) | Production build (`npm start`) |
| `backend` | 8000 (internal) | Production ASGI server |

### Nginx Configuration

```
Port 80
  ├── /        → Proxy to frontend:3000
  └── /api/    → Proxy to backend:8000
```

---

## Monitoring & Observability

### Stack

| Component | Port | Purpose |
|---|---|---|
| **Prometheus** | 9090 | Metrics collection and time-series database |
| **Grafana** | 3001 | Visualization dashboards |

### Quick Start

```bash
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
```

### Prometheus Targets

| Job | Target | Scrape Interval |
|---|---|---|
| `prometheus` | `localhost:9090` | 15s |
| `backend` | `backend:8000` | 15s |
| `frontend` | `frontend:3000` | 15s |

### Grafana Access

- **URL**: http://localhost:3001
- **Username**: `admin`
- **Password**: `admin`
- **Data Source**: Prometheus (auto-provisioned)

---

## Contributing

We welcome contributions from the community. Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Build process, dependencies |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the <strong>HireMind AI</strong> team
</p>
