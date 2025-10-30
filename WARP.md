# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository type: static multi-page site (HTML + Tailwind via CDN + minimal JS). No build system, linter, or test tooling is configured.

Commands
- Serve locally (choose one):
  - Python: python -m http.server 8000
  - Node.js: npx serve . -l 8000
- Open directly: index.html in a browser (no server required).

Architecture overview
- Pages: index.html (home/hero, features, CTA), about.html, team.html, contact.html. Each duplicates a shared navbar and footer; links use relative paths and a data-nav attribute for active-state highlighting.
- Styling: Tailwind loaded from CDN; custom styles in assets/css/styles.css provide glassmorphism, reveal-on-scroll (.reveal/.show), button glow (.btn-glow), and CSS variables for Solana-themed colors. Reduced-motion media query disables animation transitions.
- Behavior (assets/js/main.js):
  - Mobile menu toggle for #mobile-menu via #menu-btn.
  - Active nav highlighting based on the current filename; anchors with data-nav get text-[#00FFA3] and font-medium on match.
  - Smooth scrolling for same-page hash links.
  - Reveal-on-scroll using IntersectionObserver; elements marked [data-animate] receive classes to animate in; graceful fallback applies .show when IO is unavailable.
- External assets: Google Fonts (Inter, Poppins) and Font Awesome via CDN.

Development notes for Agents
- There is no build step. Keep links and assets as relative paths that match the current file layout.
- When adding a new page, include the shared navbar/footer and mark navbar links with data-nav so active-state logic continues to work.
- For new animated sections, add data-animate and rely on existing IntersectionObserver logic and .reveal/.show styles.
- Accessibility choices called out in README: high contrast theme, keyboard-friendly navigation, reduced-motion support.

Key references
- README.md: tech stack summary and run instructions.
- assets/css/styles.css: theme variables, animation classes, glow effect.
- assets/js/main.js: nav/menu/scroll/reveal behavior.
