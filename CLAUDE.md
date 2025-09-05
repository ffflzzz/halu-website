# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "哈卤卤肉饭" (Halu Braised Pork Rice), a Chinese restaurant chain specializing in Southern-style braised pork rice. The website is built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks are used.

## Project Structure

- **index.html** - Main homepage with hero carousel, brand story, features, and contact form
- **about.html** - Brand story page with detailed company history
- **menu.html** - Menu page showcasing signature dishes with real product photos
- **join.html** - Franchise partnership page with investment information
- **contact.html** - Contact page with location and communication details
- **assets/style.css** - Main stylesheet (1,286 lines) with responsive design
- **assets/script.js** - JavaScript functionality for interactions and API calls
- **assets/** - Image assets including product photos, logos, and brand materials

## Key Features

### Interactive Elements
- Hero carousel with auto-rotation (6-second intervals)
- Product slider with manual controls and auto-rotation
- Mobile-responsive hamburger menu
- Scroll-triggered animations using Intersection Observer
- Interactive chat widget connected to backend API
- Parallax effects on hero section
- Back-to-top button
- Contact form (frontend only)

### Design System
- **Color Scheme**: Orange gradient theme (#ff9a3c to #ff6e00) representing the brand
- **Typography**: Noto Sans CJK SC for Chinese text readability
- **Layout**: Responsive design with CSS Grid and Flexbox
- **Components**: Reusable card layouts, navigation, buttons, and forms

### JavaScript Architecture
- **Modular Structure**: Event listeners organized by functionality
- **API Integration**: Chat widget connects to `http://127.0.0.1:8000/chat`
- **Session Management**: Uses localStorage for chat session persistence
- **Performance**: Lazy loading and optimized animations

## Development Workflow

### Local Development
Since this is a static site, no build process is required:
1. Use any local web server (Python's `http.server`, Live Server, etc.)
2. Open HTML files directly in browser for basic testing
3. Test responsive design using browser dev tools

### Testing Considerations
- Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Verify responsive design on mobile/tablet/desktop
- Test chat widget functionality with backend API
- Validate form submissions and user interactions
- Check image loading and optimization

### Deployment
- Simply copy files to any web server
- Ensure proper MIME types for static assets
- Configure backend API endpoint for chat functionality
- Optimize images for production (current images are high-resolution)

## Code Conventions

### HTML
- Semantic HTML5 structure
- Chinese content with `lang="zh-cn"` attribute
- Accessible ARIA labels where needed
- Consistent indentation and structure

### CSS
- CSS custom properties for theming
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Smooth transitions and animations
- Organized by sections with clear comments

### JavaScript
- Vanilla ES6+ JavaScript
- Event delegation for dynamic elements
- Async/await for API calls
- Proper error handling
- Clean code organization with logical sections

## Important Notes

- The chat widget requires a backend API running on `http://127.0.0.1:8000/chat`
- Images are currently high-resolution and should be optimized for production
- The site uses Chinese content throughout - ensure proper character encoding
- No package.json or build tools - pure static site
- Consider adding a .gitignore file for future development