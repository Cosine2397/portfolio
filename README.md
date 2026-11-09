# Sai Myint Lu Portfolio
A modern, minimalist personal developer portfolio showcasing software engineering projects, technical capabilities, and academic background with editorial typography and interactive micro-animations.

## Features
- Editorial Typography: Paired with Fraunces, Inter, and IBM Plex Mono.
- Custom Dual Cursor: Custom dot and trailing elastic ring with context-aware sizing.
- Magnetic Physics: Interactive magnetic pull on buttons and navigation links.
- Project Previews: Floating contextual preview card following cursor movements.
- Animated Metric Counters: Smooth numeric easing on statistics when scrolled into view.
- Language Proficiency Bars: Animated progress indicators.
- Accessible Design: Fully supports reduced motion preferences and touchscreen devices.

## Project Structure

portfolio/
├── index.html                   # Semantic HTML5 structure
├── README.md                    # Project documentation and deployment guide
├── .gitignore                   # Ignored files (system, editors, logs)
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── css/
│   └── style.css                # Stylesheet (tokens, components, keyframes)
├── js/
│   └── main.js                  # Interactions, observers, animations, and custom cursor
└── assets/
    ├── images/
    │   └── profile.jpg          # Profile portrait image
    └── docs/
        └── Sai_Myint_Lu_Resume.pdf  # Downloadable resume

## Tech Stack

- Markup: Semantic HTML5
- Styling: Modern CSS3 (Custom properties, Flexbox, CSS Grid, keyframes)
- Scripting: Vanilla JavaScript (ES6+, DOM APIs, IntersectionObserver, requestAnimationFrame)
- Fonts: Fraunces, Inter, IBM Plex Mono via Google Fonts
- Hosting: GitHub Pages / GitHub Actions

## Local Development

You can preview the portfolio locally with any static web server:
1. Open index.html directly in your web browser, or
2. Use VS Code with the Live Server extension, or
3. Run Python simple server: python3 -m http.server 8000 and visit http://localhost:8000.

## Deployment to GitHub Pages

This repository is pre-configured for GitHub Pages deployment. You can deploy it using either of the following approaches:

### Method 1: Automated GitHub Actions (Pre-configured)
1. Push all files to the main branch of your GitHub repository.
2. In your repository on GitHub, navigate to Settings > Pages.
3. Under Build and deployment > Source, select GitHub Actions.
4. The workflow in .github/workflows/deploy.yml will automatically build and publish your site on every push.

### Method 2: Classic Branch Deployment (1-Click)
1. Push your files to the main branch.
2. In your repository on GitHub, navigate to Settings > Pages.
3. Under Build and deployment > Source, choose Deploy from a branch.
4. Select the main branch and /(root) folder, then click Save.
5. GitHub Pages will build and deploy the site in 1 to 2 minutes.

## Author

Sai Myint Lu
- Education: University of Information Technology (UIT), Yangon
- Degree: B.C.Sc. Software Engineering (2024 - 2026)
- GitHub: Cosine2397
- LinkedIn: cosine2397

## License

This project is licensed under the MIT License.
