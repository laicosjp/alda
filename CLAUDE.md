# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a T3 Stack application built with Next.js, tRPC, Prisma, and NextAuth. It appears to be a learning platform focused on YouTube-based lessons.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with Turbo
pnpm dev

# Database operations
pnpm db:generate    # Generate Prisma migrations
pnpm db:migrate     # Deploy migrations
pnpm db:push        # Push schema changes without migrations
pnpm db:studio      # Open Prisma Studio
pnpm db:seed        # Seed database with initial data

# Code quality
pnpm check          # Run Biome linter/formatter check
pnpm check:write    # Auto-fix linting/formatting issues
pnpm typecheck      # TypeScript type checking

# Build and preview
pnpm build          # Production build
pnpm preview        # Build and start production server
pnpm start          # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **API Layer**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5 (beta) with Discord provider
- **Styling**: Tailwind CSS v4 with DaisyUI
- **Code Quality**: Biome for linting/formatting, TypeScript for type safety

### Project Structure
- `/src/app/` - Next.js App Router pages and components
  - `_components/` - Shared React components
  - `lessons/` - Lesson-related pages
  - `api/` - API routes (auth, trpc)
- `/src/server/` - Server-side code
  - `api/` - tRPC routers and procedures
  - `auth/` - NextAuth configuration
  - `db.ts` - Prisma client instance
- `/src/trpc/` - tRPC client configuration
- `/prisma/` - Database schema and migrations

### Key Patterns

**tRPC Router Structure**: All API endpoints are defined in `/src/server/api/routers/` and combined in `/src/server/api/root.ts`. Current routers include:
- `post` - Post management
- `user` - User operations  
- `lesson` - Lesson CRUD operations
- `youtube` - YouTube API integration

**Environment Variables**: Validated through `/src/env.js` using Zod schemas. Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - NextAuth secret
- `AUTH_DISCORD_ID` & `AUTH_DISCORD_SECRET` - Discord OAuth
- `YOUTUBE_API_KEY` - YouTube Data API access

**Database Models**: Defined in `prisma/schema.prisma`:
- User, Account, Session (NextAuth)
- Post (example model with user relation)
- Lesson (YouTube video lessons)

## Testing

Run a single test file (when tests are implemented):
```bash
pnpm test [test-file-path]
```

## Important Notes

- Package manager is pnpm v10.12.1 (enforced)
- Biome is configured for code formatting and linting with Tailwind class sorting
- Database migrations should be generated with `pnpm db:generate` before deploying
- The project uses server components by default; use `"use client"` directive for client components
- Always response in Japanese
