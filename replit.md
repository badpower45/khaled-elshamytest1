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
- ✅ **Project Migration**: Successfully migrated project to Replit environment
  - Installed all npm dependencies (201 packages)
  - Configured dev server for port 5000 with host 0.0.0.0
  - Verified Supabase connection and credentials
- ✅ **Video Display Fix**: Fixed portfolio video thumbnails not showing
  - Added automatic Vimeo thumbnail fetching using Vimeo oEmbed API
  - Created `src/lib/vimeoThumbnails.ts` utility for thumbnail extraction
  - Modified `PortfolioShowcase.tsx` VideoCard component to display thumbnails
  - Videos now show proper preview images before clicking
- ✅ **Admin Panel**: Verified admin panel functionality at `/admin` route
  - Can edit portfolio videos, titles, descriptions (Arabic/English)
  - Can manage services, testimonials, awards, contact info
  - Supports cloud save/load with Supabase
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
│   ├── supabase.ts          # Supabase client configuration
│   └── vimeoThumbnails.ts   # Vimeo thumbnail fetching utilities
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## Features
- Bilingual support (English/Arabic) with RTL layout
- Admin panel for content management (/admin route)
- Supabase integration for data storage and real-time sync
- **Automatic Vimeo Thumbnail Fetching**: Portfolio videos automatically fetch thumbnails from Vimeo
- Responsive design (mobile-first)
- Animated hero section with rotating backgrounds
- Portfolio showcase with video carousel (Instagram Reels style)
- Contact form with Supabase integration
- Dark theme with gold accents (#FFC107)
- Video lightbox modal for fullscreen playback

## Portfolio Videos
The portfolio section displays Vimeo videos with the following features:
- **Automatic Thumbnails**: When a portfolio item has a `videoUrl` but no `image`, the system automatically fetches the thumbnail from Vimeo using the oEmbed API
- **Carousel Display**: Videos are shown in a responsive carousel with featured center item
- **Click to Play**: Clicking a video opens a lightbox modal with fullscreen iframe player
- **Admin Editable**: All video URLs, titles, and descriptions can be edited via the admin panel

### How to Add Videos:
1. Go to `/admin` and login
2. Navigate to "معرض" (Portfolio) tab
3. For each video, add:
   - Video URL: Use Vimeo embed URL (e.g., `https://player.vimeo.com/video/1126504175?...`)
   - Titles in Arabic and English
   - Descriptions in Arabic and English
   - (Optional) Custom thumbnail image URL
4. Click "حفظ على السحابة" (Save to Cloud) to persist changes
5. Thumbnails will be automatically fetched from Vimeo if not provided

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
