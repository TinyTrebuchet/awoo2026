# Replit MD

## Overview

This is a vintage-themed Valentine's Day website built for "Manshika." It's a quirky, nostalgic digital scrapbook inspired by 1990s GeoCities aesthetics with a cream/dusty rose/sage green color palette, pixel fonts, Polaroid-style image frames, and retro UI elements (Winamp-style music player, typewriter fonts).

The site features:
- **Hero section** with a "Will you be my Valentine?" prompt — the "No" button runs away on hover, the "Yes" button triggers confetti
- **Winamp-style music player** fixed in the corner with a "Vibe Level" volume slider
- **Secret "LOVE" code** — typing "love" anywhere reveals a hidden love blog with a typewriter letter, progress report table, and "Manshika-to-English" dictionary
- **Compliment generator** — random compliments fetched from the database
- **Gallery page** with Polaroid-style photo frames
- **Reports page** with a "Simp Progress Report" and dictionary
- **Guestbook page** with commitment statements and approval flow

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS with CSS variables for theming, custom retro color palette (cream, dusty rose, sage, vintage black)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for the runaway "No" button, page transitions, and Polaroid effects
- **Data Fetching**: TanStack React Query for server state management
- **Effects**: canvas-confetti for celebration effects
- **Fonts**: Press Start 2P (pixel display), Caveat (handwriting), Courier New (typewriter/monospace)
- **Build Tool**: Vite with React plugin

Path aliases:
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets/`

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, compiled with tsx (dev) and esbuild (production)
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Routes defined**: `/api/compliments`, `/api/songs`, `/api/guestbook` (GET and POST)
- **Route definitions**: Shared route contracts in `shared/routes.ts` using Zod schemas
- **Database seeding**: Automatic seed on startup if compliments/songs tables are empty

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema location**: `shared/schema.ts` (shared between client and server)
- **Migration tool**: Drizzle Kit (`db:push` command)
- **Connection**: `pg` Pool via `DATABASE_URL` environment variable
- **Tables**:
  - `compliments` — id (serial), text (text)
  - `songs` — id (serial), title (text), url (text)
  - `guestbook_entries` — id (serial), name (text), message (text), approved (boolean)

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` — Drizzle table definitions, Zod insert schemas, TypeScript types
- `routes.ts` — API route path/method constants with Zod response schemas

### Build & Deploy
- **Dev**: `tsx server/index.ts` with Vite middleware for HMR
- **Production build**: Vite builds client to `dist/public/`, esbuild bundles server to `dist/index.cjs`
- **Production start**: `node dist/index.cjs` serves static files from `dist/public/`

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Required for the app to start.
- **Google Fonts** — Press Start 2P, Caveat, Architects Daughter, DM Sans loaded via CDN
- **Transparent Textures** — Cream paper background texture loaded from `transparenttextures.com`
- **Unsplash** — Placeholder images in Gallery page
- **SoundHelix** — Fallback placeholder MP3 URLs for music player
- **Replit Plugins** (dev only) — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`