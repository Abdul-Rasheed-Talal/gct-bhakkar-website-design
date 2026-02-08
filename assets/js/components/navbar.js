/**
 * GCT Bhakkar - Header Component
 * Complete header with top bar and navbar
 */

class Header {
    constructor(options = {}) {
        this.container = options.container || 'header';
        this.basePath = options.basePath || './';
        this.currentPage = options.currentPage || 'home';
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    getNavigation() {
        return [
            { name: 'Home', href: `${this.basePath}index.html`, id: 'home' },
            { name: 'About', href: `${this.basePath}pages/about.html`, id: 'about' },
            {
                name: 'Programs',
                href: `${this.basePath}pages/programs.html`,
                id: 'programs',
                dropdown: [
                    { name: 'Computer Information Technology', href: `${this.basePath}pages/departments/cit.html`, icon: 'fa-laptop-code' },
                    { name: 'Electrical Technology', href: `${this.basePath}pages/departments/electrical.html`, icon: 'fa-bolt' },
                    { name: 'Mechanical Technology', href: `${this.basePath}pages/departments/mechanical.html`, icon: 'fa-cogs' },
                    { name: 'Civil Technology', href: `${this.basePath}pages/departments/civil.html`, icon: 'fa-building' },
                    { name: 'Electronics Technology', href: `${this.basePath}pages/departments/electronics.html`, icon: 'fa-microchip' }
                ]
            },
            { name: 'Admissions', href: `${this.basePath}pages/admissions.html`, id: 'admissions' },
            { name: 'Campus Life', href: `${this.basePath}pages/campus-life.html`, id: 'campus-life' },
            { name: 'Projects', href: `${this.basePath}pages/projects.html`, id: 'projects' },
            { name: 'Contact', href: `${this.basePath}pages/contact.html`, id: 'contact' }
        ];
    }

    renderNavItems() {
        const navigation = this.getNavigation();

        return navigation.map(item => {
            const isActive = item.id === this.currentPage;
            const activeClass = isActive ? 'active' : '';

            if (item.dropdown) {
                return `
                    <li class="nav-item dropdown">
                        <a class="nav-link ${activeClass}" href="${item.href}">
                            ${item.name}
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        <ul class="dropdown-menu">
                            ${item.dropdown.map(subItem => `
                                <li>
                                    <a class="dropdown-item" href="${subItem.href}">
                                        <i class="fas ${subItem.icon}"></i>
                                        ${subItem.name}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </li>
                `;
            }

            return `
                <li class="nav-item">
                    <a class="nav-link ${activeClass}" href="${item.href}">${item.name}</a>
                </li>
            `;
        }).join('');
    }

    render() {
        const container = document.querySelector(this.container);
        if (!container) return;

        container.innerHTML = `
            <!-- Top Bar -->
            <div class="top-bar">
                <div class="top-bar-container">
                    <div class="top-bar-left">
                        <div class="top-bar-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Main Road, Bhakkar, Punjab</span>
                        </div>
                        <div class="top-bar-item">
                            <i class="fas fa-phone-alt"></i>
                            <a href="tel:0453220141">0453-220141</a>
                        </div>
                        <div class="top-bar-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:gct786bhakkar@gmail.com">gct786bhakkar@gmail.com</a>
                        </div>
                    </div>
                    <div class="top-bar-right">
                        <div class="top-bar-social">
                            <a href="https://facebook.com/gctbhakkar" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/gctbhakkar/" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://youtube.com/@gctbhakkar" aria-label="YouTube" target="_blank"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Navbar -->
            <nav class="main-navbar" id="mainNavbar">
                <div class="navbar-container">
                    <!-- Brand -->
                    <a class="navbar-brand" href="${this.basePath}index.html">
                        <img src="${this.basePath}assets/favicon/favicon.png" alt="GCT Bhakkar Logo">
                        <div class="navbar-brand-text">
                            <span class="navbar-brand-name">GCT Bhakkar</span>
                            <span class="navbar-brand-tagline">Excellence in Technical Education</span>
                        </div>
                    </a>
                    
                    <!-- Mobile Toggle -->
                    <button class="navbar-toggle" id="navbarToggle" aria-label="Toggle navigation">
                        <span class="navbar-toggle-bar"></span>
                        <span class="navbar-toggle-bar"></span>
                        <span class="navbar-toggle-bar"></span>
                    </button>

                    <!-- Mobile Overlay -->
                    <div class="navbar-overlay" id="navbarOverlay"></div>
                    
                    <!-- Navigation Wrapper -->
                    <div class="navbar-nav-wrapper" id="navbarNavWrapper">
                        <!-- Mobile Close Button -->
                        <button class="navbar-close" id="navbarClose" aria-label="Close menu">
                            <i class="fas fa-times"></i>
                        </button>
                        <ul class="navbar-nav">
                            ${this.renderNavItems()}
                        </ul>
                        
                        <!-- Theme Toggle -->
                        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                            <i class="fas fa-sun icon-sun"></i>
                            <i class="fas fa-moon icon-moon"></i>
                        </button>
                        
                        <!-- CTA Button -->
                        <div class="navbar-cta">
                            <a href="${this.basePath}pages/admissions.html" class="btn">Apply Now</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    attachEventListeners() {
        const toggle = document.getElementById('navbarToggle');
        const navWrapper = document.getElementById('navbarNavWrapper');
        const overlay = document.getElementById('navbarOverlay');
        const closeBtn = document.getElementById('navbarClose');

        // Helper function to close mobile menu
        const closeMobileMenu = () => {
            toggle?.classList.remove('active');
            navWrapper?.classList.remove('show');
            overlay?.classList.remove('show');
            document.body.style.overflow = '';
        };

        // Mobile toggle
        if (toggle && navWrapper) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                navWrapper.classList.toggle('show');
                overlay?.classList.toggle('show');
                document.body.style.overflow = navWrapper.classList.contains('show') ? 'hidden' : '';
            });
        }

        // Mobile close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', () => {
                toggle?.classList.remove('active');
                navWrapper?.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            });
        }

        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');

            link?.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('open');
                    });

                    dropdown.classList.toggle('open');
                }
            });
        });

        // Close mobile menu on link click
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown .nav-link), .dropdown-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    toggle?.classList.remove('active');
                    navWrapper?.classList.remove('show');
                    overlay?.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                toggle?.classList.remove('active');
                navWrapper?.classList.remove('show');
                overlay?.classList.remove('show');
                document.body.style.overflow = '';
                dropdowns.forEach(d => d.classList.remove('open'));
            }
        });

        // Sticky navbar on scroll - hide top bar and fix navbar
        const topBar = document.querySelector('.top-bar');
        const mainNavbar = document.getElementById('mainNavbar');

        if (topBar && mainNavbar) {
            const topBarHeight = topBar.offsetHeight;

            window.addEventListener('scroll', () => {
                if (window.scrollY > topBarHeight) {
                    mainNavbar.classList.add('navbar-fixed');
                    document.body.style.paddingTop = mainNavbar.offsetHeight + 'px';
                } else {
                    mainNavbar.classList.remove('navbar-fixed');
                    document.body.style.paddingTop = '';
                }
            });
        }
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-navbar]');
    if (header) {
        const basePath = header.dataset.basePath || './';
        const currentPage = header.dataset.currentPage || 'home';
        new Header({
            container: '[data-navbar]',
            basePath,
            currentPage
        });
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}
const shareBtn = document.getElementById("shareBtn");
const shareOptions = document.getElementById("shareOptions");

shareBtn.addEventListener("click", () => {
  shareBtn.classList.toggle("active");
  shareOptions.classList.toggle("show");
});
