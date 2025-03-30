# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-03-30

### Added
- New responsive landing page with agricultural theme
- Authentication system with login and signup pages
- Dark mode support throughout the application
- Reusable UI components using Tailwind CSS:
  - Button component with multiple variants and sizes
  - Card component with hover effects
  - Form components (Input, Checkbox, Label)
  - Header with responsive navigation
  - Footer with multi-column layout
- Landing page sections:
  - Hero section with call-to-action buttons
  - Features grid showing platform capabilities
  - Value proposition section highlighting open-source benefits
  - Product showcase with dashboard preview
  - Technology platform overview
  - Pricing and product details sections
  - Final call-to-action section

### Fixed
- ESLint and TypeScript type errors
- Docker deployment issues with Next.js static export
- NGINX configuration to properly serve static files
- Form validation and error handling
- Dark mode styling inconsistencies across components

### Changed
- Updated Docker deployment to use NGINX for serving static files
- Modified build process to include static export
- Improved responsive design for mobile and tablet views
- Enhanced typography and color system using CSS variables
- Transformed OpenWebUI design into agricultural-themed platform

## [0.0.1] - 2025-02-22

### Fixed
- Set up project

### Changed
- Updating Open TutorAI from Open WebUI base.