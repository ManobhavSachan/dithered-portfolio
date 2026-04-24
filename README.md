# Portfolio

A personal portfolio site built with Next.js 16, React 19, Tailwind CSS v4, and Motion. It presents a concise personal brand, work history, projects, education, and achievements with a custom animated dithered hero image and theme-aware branding.

## Features

- Animated dithered hero image with pointer interactions
- Light and dark theme support
- Custom bottom tab navigation with social and utility actions
- Portfolio sections for about, experience, projects, education, achievements, skills, and contact
- Theme-specific favicons and app icons

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Motion

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - start the local development server
- `pnpm build` - build the production app
- `pnpm start` - run the production build
- `pnpm lint` - run ESLint

## Project Structure

- `app/layout.tsx` - root layout, metadata, and themed favicon links
- `app/page.tsx` - main portfolio page content
- `app/components/` - reusable UI components, including the dithered logo and bottom tab
- `public/` - static assets, including light and dark favicon sets

## Notes

The site is tuned for a personal portfolio presentation and uses a custom visual style rather than a default template layout.
