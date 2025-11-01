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
**November 1, 2025 - Latest Update**
- ✅ **Portfolio Grid Layout**: Removed carousel, videos now display side by side
  - Changed from carousel (embla-carousel) to responsive grid layout
  - Videos display in 2-5 columns depending on screen size (2 on mobile, 5 on desktop)
  - Maintained all interactive features: click to view, lightbox modal, thumbnails
  - Improved performance by removing carousel library dependency
  
- ✅ **Complete Replit Import & Setup**: Successfully completed full project migration
  - Installed all npm dependencies (201 packages)
  - Fixed Vite configuration for Replit proxy compatibility
  - Removed invalid `allowedHosts` config, added proper HMR settings
  - Enabled automatic Vimeo thumbnail fetching in SiteDataContext
  - Project is fully operational with all features working
  
- ✅ **Portfolio Video System**: 5 Vimeo videos in grid display
  - Auto-fetches thumbnails from Vimeo oEmbed API on page load
  - Responsive grid layout with videos displayed side by side
  - Click to play in fullscreen lightbox modal
  - All videos editable via admin panel at `/admin`
  
- ✅ **Admin Panel**: Full content management system
  - Password protected access (password: admin123)
  - Edit portfolio videos, titles, descriptions (Arabic/English)
  - Manage services, testimonials, awards, contact info
  - Cloud save/load with Supabase integration
  
- ✅ **Technical Setup**:
  - TypeScript configuration (tsconfig.json, tsconfig.node.json)
  - Tailwind CSS v4 with @tailwindcss/postcss plugin
  - Vite 6.3.5 dev server on port 5000
  - ES modules support in package.json
  - Default language: English (switchable to Arabic)

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
- Portfolio showcase with responsive grid layout (Instagram Reels style)
- Contact form with Supabase integration
- Dark theme with gold accents (#FFC107)
- Video lightbox modal for fullscreen playback

## Portfolio Videos
The portfolio section displays Vimeo videos with the following features:
- **Automatic Thumbnails**: When a portfolio item has a `videoUrl` but no `image`, the system automatically fetches the thumbnail from Vimeo using the oEmbed API
- **Grid Display**: Videos are shown in a responsive grid layout (2 columns on mobile, 3 on tablet, 4 on desktop, 5 on large screens)
- **Side by Side**: All videos are displayed together, making it easy to browse the entire portfolio at once
- **Click to Play**: Clicking a video opens a lightbox modal with fullscreen iframe player
- **Admin Editable**: All video URLs, titles, and descriptions can be edited via the admin panel

### How to Add Videos:
1. Go to `/admin` and login with password: `admin123`
2. Navigate to "معرض" (Portfolio) tab
3. For each video, add:
   - Video URL: Use Vimeo embed URL (e.g., `https://player.vimeo.com/video/1126504175?...`)
   - Titles in Arabic and English
   - Descriptions in Arabic and English
   - (Optional) Custom thumbnail image URL
4. Click "حفظ على السحابة" (Save to Cloud) to persist changes
5. Thumbnails will be automatically fetched from Vimeo if not provided

## Environment Variables
The project uses Supabase with the following environment variables stored securely in Replit Secrets:
- `VITE_SUPABASE_URL` - Supabase project URL (https://kbjdmogbswqsjzxldbka.supabase.co)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

These credentials are now stored in Replit Secrets for security and will be used automatically by the application.

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
