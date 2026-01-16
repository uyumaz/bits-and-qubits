# Bits & Qubits

A modern Astro-powered blog exploring AI-driven software engineering, architecture decisions, and the occasional journey into space and quantum realms.

## Tech Stack

- **Framework**: Astro 4.x with MDX support
- **Styling**: Tailwind CSS with dark mode (class strategy)
- **Typography**: @tailwindcss/typography for prose content
- **Syntax Highlighting**: Shiki with Dracula theme
- **Fonts**: Inter (sans) + JetBrains Mono (monospace)
- **Integrations**: @astrojs/sitemap, @astrojs/rss

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
bits-and-qubits/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro      # Navigation with dark mode toggle
│   │   ├── Footer.astro      # Social links and copyright
│   │   ├── BlogCard.astro    # Post preview card
│   │   └── FormattedDate.astro
│   ├── content/
│   │   ├── config.ts         # Content collection schema
│   │   └── blog/             # Blog posts (Markdown/MDX)
│   ├── layouts/
│   │   ├── BaseLayout.astro  # HTML head, meta tags, OG tags
│   │   └── BlogPost.astro    # Individual post layout
│   ├── pages/
│   │   ├── index.astro       # Homepage with hero and categories
│   │   ├── about.astro       # Author bio
│   │   ├── blog/
│   │   │   ├── index.astro   # Blog listing with category filter
│   │   │   └── [...slug].astro
│   │   └── rss.xml.ts
│   └── consts.ts             # Site configuration
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Writing Blog Posts

Create new posts in `src/content/blog/` as Markdown or MDX files:

```markdown
---
title: 'Your Post Title'
description: 'A brief description'
pubDate: 2024-12-15
category: 'ai-engineering'
tags: ['AI', 'productivity']
draft: false
heroImage: '/images/hero.jpg'  # Optional
updatedDate: 2024-12-16        # Optional
---

Your content here...
```

### Categories

| Slug | Name | Color |
|------|------|-------|
| `ai-engineering` | AI-Driven Engineering | Indigo |
| `architecture` | Software Architecture | Emerald |
| `leadership` | Engineering Leadership | Amber |
| `curiosity` | The Curiosity Corner | Pink |

## Customization

### Site Configuration

Edit `src/consts.ts` to update:
- Site title and description
- Author name
- Navigation links
- Category definitions
- Social media links

### Styling

- **Tailwind Config**: `tailwind.config.mjs` - fonts, colors, typography
- **Component Styles**: Scoped within each `.astro` file using Tailwind classes
- **Dark Mode**: Toggle button in header, persisted to localStorage

### Features

- **MDX Support**: Import components into your posts
- **Syntax Highlighting**: Automatic via Shiki (Dracula theme)
- **RSS Feed**: Auto-generated at `/rss.xml`
- **Sitemap**: Auto-generated for SEO
- **Category Filtering**: Client-side filtering on the blog page
- **Responsive Design**: Mobile-first with proper breakpoints

## Deployment

Build the site for any static hosting provider:

```bash
npm run build
# Output in dist/
```

### Popular Platforms

**Vercel**:
```bash
npm i -g vercel && vercel
```

**Netlify**:
- Connect your repository
- Set build command: `npm run build`
- Set publish directory: `dist`

**GitHub Pages**:
- Add `@astrojs/gh-pages` adapter
- Configure in `astro.config.mjs`

## License

MIT
