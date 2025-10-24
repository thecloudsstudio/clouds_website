# Copilot Instructions

## Project Overview
Static website built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub and automatically deployed to Netlify. Optimized for performance and SEO with responsive design patterns.

## Architecture & Deployment Flow
- **Source**: GitHub repository (main branch)
- **Deployment**: Automatic via Netlify's GitHub integration
- **Build**: Static files served directly (no build process required)
- **Configuration**: `netlify.toml` defines headers, redirects, and environment settings

## Key Files & Structure
```
├── index.html              # Main entry point with semantic HTML5
├── assets/
│   ├── css/style.css       # Mobile-first responsive styles
│   ├── js/script.js        # Vanilla JS with smooth scrolling & form handling
│   └── images/             # Optimized web assets
├── netlify.toml            # Deployment config with security headers
├── _redirects              # URL routing and SPA fallbacks
└── .github/                # GitHub-specific configurations
```

## Development Patterns
- **CSS**: Mobile-first approach with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS with Intersection Observer for animations
- **Forms**: Netlify Forms integration (add `netlify` attribute to forms)
- **Navigation**: Smooth scroll behavior with preventDefault on hash links

## Deployment Workflow
1. Push changes to main branch on GitHub
2. Netlify automatically detects changes and deploys
3. Build settings defined in `netlify.toml`
4. Security headers and caching rules applied automatically

## Performance Optimizations
- CSS Grid for responsive layouts without media query complexity
- Intersection Observer for scroll-triggered animations
- Strategic caching headers in `netlify.toml` (31536000s for assets, 3600s for HTML)
- Semantic HTML5 for SEO and accessibility

## Form Handling
Contact forms use Netlify's built-in form processing:
- Add `netlify` attribute to `<form>` elements
- Submissions appear in Netlify dashboard
- Client-side validation in `script.js` before submission

## Customization Guidelines
- Edit content directly in `index.html`
- Styles follow BEM-like methodology in `style.css`
- Add new pages as separate HTML files in root directory
- Update `_redirects` for any new routing needs