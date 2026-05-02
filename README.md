<p align="center">
  <img src="./assets/favicon/favicon.png" alt="GCT Bhakkar Logo" width="120" />
</p>

<h1 align="center">Government College of Technology, Bhakkar</h1>

<p align="center">
  <strong>Official website for GCT Bhakkar — a modern, responsive, and accessible web experience for one of Punjab's leading technical institutions.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap 5" />
  <img src="https://img.shields.io/badge/License-Educational-blue?style=flat-square" alt="License" />
</p>

---

## ✨ Overview

A fully static, production-ready website for **Government College of Technology, Bhakkar**. Built with a modular component architecture, a custom CSS design system, dark/light theme support, and rich animations — all without a build step or framework.

---

## 🌟 Key Features

| Category | Highlights |
|----------|------------|
| **Theming** | Dark/light mode with smooth transition, custom scrollbar, and themed components |
| **Responsive** | Mobile-first design with horizontal scroll hints, infinite marquee, and adaptive layouts |
| **Components** | Dynamic navbar & footer injected via JS, reusable card & button systems |
| **Animations** | Scroll-triggered entrance animations, counter animations, hero carousel, and CSS transitions |
| **Accessibility** | Skip-to-content link, ARIA labels, `prefers-reduced-motion` support, keyboard navigation |
| **Performance** | Lazy-loaded images, GPU-accelerated animations, CSS containment, preloader |
| **Feedback** | Smart feedback modal with star ratings, snooze logic, and swipe-to-dismiss on mobile |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and page structure |
| **CSS3** | Custom properties, Flexbox, Grid, animations, `@import` modular architecture |
| **JavaScript (ES6+)** | Dynamic components, theme management, scroll animations, video player |
| **Bootstrap 5** | Grid system and utility classes (vendored locally) |
| **Font Awesome 6** | Primary icon library |
| **Bootstrap Icons** | Supplementary icons (loaded via CDN) |

---

## 📁 Project Structure

```
gct-bhakkar-website-design/
├── index.html                         # Home page
├── .gitignore                         # Git ignore rules
├── DEVELOPER_GUIDE.md                 # Technical documentation for developers
├── README.md                          # Project overview (this file)
│
├── pages/
│   ├── about.html                     # About Us — mission, vision, facilities
│   ├── programs.html                  # All programs overview & comparison
│   ├── admissions.html                # Admissions process & fee structure
│   ├── contact.html                   # Contact form, map, office hours
│   ├── campus-life.html               # Facilities, sports, student life
│   ├── cbs.html                       # Character Building Society
│   ├── related-studies.html           # Related studies & staff directory
│   ├── projects.html                  # Student projects showcase
│   ├── developers.html                # Development team credits
│   └── departments/
│       ├── cit.html                   # Computer Information Technology
│       ├── electrical.html            # Electrical Technology
│       ├── mechanical.html            # Mechanical Technology
│       ├── civil.html                 # Civil Technology
│       └── electronics.html           # Electronics Technology
│
├── assets/
│   ├── css/
│   │   ├── main.css                   # Global utilities, animations, forms
│   │   ├── styles.css                 # Page-specific & legacy styles
│   │   ├── base/
│   │   │   ├── variables.css          # Design tokens (colors, spacing, etc.)
│   │   │   ├── theme.css              # Light/dark theme system
│   │   │   ├── reset.css              # CSS reset / normalize
│   │   │   └── typography.css         # Font families & type scale
│   │   ├── components/
│   │   │   ├── navbar.css             # Header & navigation
│   │   │   ├── footer.css             # Footer styles
│   │   │   ├── buttons.css            # Button variants
│   │   │   ├── cards.css              # Card components
│   │   │   ├── hero.css               # Hero section
│   │   │   ├── preloader.css          # Page preloader
│   │   │   ├── feedback.css           # Feedback modal
│   │   │   ├── serenity.css           # Serenity UI effects
│   │   │   └── spotlight.css          # Spotlight effects
│   │   ├── layouts/
│   │   │   └── sections.css           # Section layout system
│   │   ├── pages/
│   │   │   ├── admissions.css         # Admissions page styles
│   │   │   ├── campus-life.css        # Campus life page styles
│   │   │   ├── cbs.css                # CBS page styles
│   │   │   ├── contact.css            # Contact page styles
│   │   │   ├── programs.css           # Programs page styles
│   │   │   └── related-studies.css    # Related studies page styles
│   │   └── vendor/
│   │       └── bootstrap.min.css      # Bootstrap 5 (vendored)
│   ├── js/
│   │   ├── main.js                    # App controller & global features
│   │   ├── components/
│   │   │   ├── navbar.js              # Dynamic header component
│   │   │   ├── footer.js              # Dynamic footer component
│   │   │   ├── feedback.js            # Feedback modal component
│   │   │   └── preloader.js           # Page preloader component
│   │   ├── utils/
│   │   │   ├── theme.js               # ThemeManager & smooth scroll
│   │   │   ├── animations.js          # Scroll-triggered animations
│   │   │   └── helpers.js             # Utility functions
│   │   ├── pages/
│   │   │   ├── admissions.js          # Admissions page logic
│   │   │   └── campus-life.js         # Campus life page logic
│   │   └── vendor/
│   │       └── bootstrap.bundle.min.js  # Bootstrap JS (vendored)
│   ├── images/                        # All image assets
│   ├── video/                         # Video assets
│   └── favicon/                       # Favicon files
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdul-Rasheed-Talal/gct-bhakkar-website-design.git
   cd gct-bhakkar-website-design
   ```

2. **Start a local server** (any of these options):
   ```bash
   # Using npx (no install required)
   npx http-server -p 5500

   # Using Python
   python -m http.server 5500

   # Using VS Code — install "Live Server" extension and click "Go Live"
   ```

3. **Open in browser:**
   ```
   http://127.0.0.1:5500
   ```

> **Note:** Opening `index.html` directly (via `file://`) will not work properly because the dynamic navbar/footer components use relative paths that require a server.

---

## 📄 Pages

| Page | Path | Description |
|------|------|-------------|
| **Home** | `/index.html` | Hero carousel, department cards, statistics, principal message, campus highlights |
| **About** | `/pages/about.html` | Mission, vision, values, history, and facilities |
| **Programs** | `/pages/programs.html` | All departments with program comparison table |
| **Admissions** | `/pages/admissions.html` | Admission process, requirements, fee structure, FAQs |
| **Campus Life** | `/pages/campus-life.html` | Facilities, sports, cultural events, student activities |
| **Contact** | `/pages/contact.html` | Contact form, interactive map, live office status |
| **CBS** | `/pages/cbs.html` | Character Building Society page |
| **Related Studies** | `/pages/related-studies.html` | Related studies information & staff directory |
| **Projects** | `/pages/projects.html` | Student projects showcase across departments |
| **Developers** | `/pages/developers.html` | Development team credits and contributions |
| **CIT** | `/pages/departments/cit.html` | Computer Information Technology program details |
| **Electrical** | `/pages/departments/electrical.html` | Electrical Technology program details |
| **Mechanical** | `/pages/departments/mechanical.html` | Mechanical Technology program details |
| **Civil** | `/pages/departments/civil.html` | Civil Technology program details |
| **Electronics** | `/pages/departments/electronics.html` | Electronics Technology program details |

---

## 🎨 Design System

### Color Palette

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--color-bg-primary` | `#0f172a` | `#ffffff` | Page background |
| `--color-bg-secondary` | `#1e293b` | `#f1f5f9` | Card/section backgrounds |
| `--color-text-primary` | `#ffffff` | `#0f172a` | Main text |
| `--color-text-secondary` | `#e2e8f0` | `#475569` | Secondary text |
| `--color-accent-primary` | `#3b82f6` | `#2563eb` | Primary accent / links |
| `--color-accent-secondary` | `#f59e0b` | `#d97706` | Highlights / gold accent |

### Typography

| Property | Value |
|----------|-------|
| Font Family | `Inter`, `system-ui`, `-apple-system`, `sans-serif` |
| Heading Range | `3rem` → `1.25rem` (responsive) |
| Body Size | `1rem` (16px) |

### Responsive Breakpoints

| Name | Max Width | Behavior |
|------|-----------|----------|
| Large | `1200px` | 4-col → 2-col grid |
| Medium | `991px` | 2-col → 1-col |
| Small | `768px` | Mobile layout, scroll hints |
| X-Small | `576px` | Compact mobile |

---

---

## 📝 License

This project was created for **educational purposes** for Government College of Technology, Bhakkar.

---

<p align="center">
  <strong>Government College of Technology, Bhakkar</strong><br />
  <em>Excellence in Technical Education</em><br /><br />
  📍 Main Road, Bhakkar, Punjab, Pakistan<br />
  📞 +92 453 123456<br />
  ✉️ info@gctbhakkar.edu.pk
</p>
