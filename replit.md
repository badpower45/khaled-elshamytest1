# Modern Landing Page Design

## Overview
Professional photographer portfolio website built with React, TypeScript, Vite, and Supabase. Features a modern, responsive design with photography-focused visuals and bilingual support (English/Arabic).

## Project Information
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Library**: Radix UI components
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion fork)
- **Backend**: Supabase (Database + Auth)
- **Default Language**: English (switchable to Arabic)

## Recent Changes
**October 31, 2025**
- Configured for Replit environment (port 5000, host 0.0.0.0)
- Added TypeScript configuration files (tsconfig.json, tsconfig.node.json)
- Updated Tailwind CSS to v4 with @tailwindcss/postcss plugin
- Changed default language from Arabic to English
- Replaced hero image with dark, artistic photography-themed image
- Added package.json "type": "module" for ES modules support

## Project Structure
```
src/
├── assets/          # Image assets
├── components/      # React components
│   ├── admin/      # Admin panel components
│   ├── figma/      # Figma-imported components
│   ├── photographer/ # Main portfolio sections
│   └── ui/         # Reusable UI components (Radix-based)
├── context/        # React context providers
│   ├── AuthContext.tsx
│   ├── LanguageContext.tsx
│   └── SiteDataContext.tsx
├── lib/            # Utility libraries
│   └── supabase.ts # Supabase client configuration
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## Features
- Bilingual support (English/Arabic) with RTL layout
- Admin panel for content management (/admin route)
- Supabase integration for data storage
- Responsive design (mobile-first)
- Animated hero section with rotating backgrounds
- Portfolio showcase with image gallery
- Contact form integration
- Dark theme with gold accents (#FFC107)

## Environment Variables
The project uses Supabase with the following environment variables (optional, has fallbacks):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Development
- Server runs on port 5000
- Hot module replacement enabled
- Dev server configured for Replit proxy

## Supabase Database Schema
Expected table structure in Supabase:
```sql
create table public.site (
  id int primary key,
  data jsonb,
  updated_at timestamptz default now()
);
```

## User Preferences
- Default language: English (en)
- User can switch to Arabic via language toggle button
- Hero image: Dark, artistic photography theme
