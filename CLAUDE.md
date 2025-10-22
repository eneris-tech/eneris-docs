# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Eneris documentation website built with Docusaurus v3. It provides user guides and documentation for the Eneris property inspection software platform.

## Development Commands

### Install dependencies
```bash
yarn install --frozen-lockfile
```

### Local development server
```bash
yarn start
# Opens at http://localhost:3000
```

### Build production site
```bash
yarn build
# Generates static content in build/ directory
```

### Type checking
```bash
yarn typecheck
```

### Serve built site locally
```bash
yarn serve
# Test production build locally
```

### Deploy (CI/CD automated via GitHub Actions)
```bash
# Manual deployment if needed:
USE_SSH=true yarn deploy
# or
GIT_USER=<username> yarn deploy
```

## Architecture & Structure

### Versioning System
The documentation supports multiple versions:
- **Current/Latest version (Elevate)**: Serves at root path `/`
- **Legacy version**: Serves at `/legacy` path
- Version switching impacts navigation paths and sidebar structure

### Key Configuration Files
- `docusaurus.config.ts`: Main configuration including versioning logic, navbar items, theme settings, and Algolia search
- `sidebars.ts`: Auto-generated sidebar from docs folder structure
- `versions.json`: Tracks available documentation versions

### Content Structure
- `/docs/`: Current/Latest documentation (Elevate)
- `/versioned_docs/version-legacy/`: Legacy documentation
- `/versioned_sidebars/`: Version-specific sidebar configurations
- `/static/`: Static assets including images and icons
- `/src/`: React components and custom pages
  - `components/HomepageFeatures/`: Landing page feature cards
  - `pages/index.tsx`: Homepage implementation
  - `css/custom.css`: Global custom styles

### Deployment
- GitHub Actions workflow (`.github/workflows/deploy.yml`) handles automatic deployment to GitHub Pages
- Deploys to `gh-pages` branch on push to `main`
- Site is served at https://docs.ener.is

### Special Features
- **Algolia Search**: Integrated search with app ID `0Q77U1C8IY`
- **MDX Support**: Documentation supports MDX for interactive components
- **Responsive Design**: Mobile-friendly documentation site
- **Dark Mode**: Theme switching support with system preference detection