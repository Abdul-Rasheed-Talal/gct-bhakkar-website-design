/**
 * GCT Bhakkar - Premium Footer Component
 * Dynamic footer rendering with modern design
 */

class Footer {
  constructor(options = {}) {
    this.container = options.container || 'footer';
    this.basePath = options.basePath || './';
    this.init();
  }

  init() {
    this.render();
  }

  getSocialLinks() {
    return [
      { 
        name: 'Facebook', 
        icon: 'fab fa-facebook-f', 
        href: 'https://facebook.com/gctbhakkar',
        className: 'facebook'
      },
      { 
        name: 'Instagram', 
        icon: 'fab fa-instagram', 
        href: 'https://www.instagram.com/gctbhakkar/',
        className: 'instagram'
      },
      { 
        name: 'YouTube', 
        icon: 'fab fa-youtube', 
        href: 'https://youtube.com/@gctbhakkar',
        className: 'youtube'
      }
    ];
  }

  getQuickLinks() {
    return [
      { name: 'Home', href: `${this.basePath}index.html`, icon: 'fas fa-home' },
      { name: 'About Us', href: `${this.basePath}pages/about.html`, icon: 'fas fa-info-circle' },
      { name: 'Programs', href: `${this.basePath}pages/programs.html`, icon: 'fas fa-graduation-cap' },
      { name: 'Admissions', href: `${this.basePath}pages/admissions.html`, icon: 'fas fa-user-plus' },
      { name: 'CBS', href: `${this.basePath}pages/cbs.html`, icon: 'fas fa-hand-holding-heart' },
      { name: 'Related Studies', href: `${this.basePath}pages/related-studies.html`, icon: 'fas fa-book-open' },
      { name: 'Contact', href: `${this.basePath}pages/contact.html`, icon: 'fas fa-envelope' }
    ];
  }

  getPrograms() {
    return [
      { name: 'Computer Technology', href: `${this.basePath}pages/departments/cit.html`, icon: 'fas fa-laptop-code' },
      { name: 'Electrical Technology', href: `${this.basePath}pages/departments/electrical.html`, icon: 'fas fa-bolt' },
      { name: 'Mechanical Technology', href: `${this.basePath}pages/departments/mechanical.html`, icon: 'fas fa-cogs' },
      { name: 'Civil Technology', href: `${this.basePath}pages/departments/civil.html`, icon: 'fas fa-hard-hat' },
      { name: 'Electronics Technology', href: `${this.basePath}pages/departments/electronics.html`, icon: 'fas fa-microchip' }
    ];
  }

  render() {
    const container = document.querySelector(this.container);
    if (!container) return;

    const socialLinks = this.getSocialLinks();
    const quickLinks = this.getQuickLinks();
    const programs = this.getPrograms();
    const currentYear = new Date().getFullYear();

    container.innerHTML = `
      <footer class="footer site-footer no-theme">
        <!-- Decorative Wave -->
        <div class="footer-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>

        <div class="container">
          <!-- Footer Top Section -->
          <div class="footer-top">
            <div class="footer-grid">
              <!-- Brand Section -->
              <div class="footer-brand">
                <a href="${this.basePath}index.html" class="footer-logo">
                  <img src="${this.basePath}assets/favicon/favicon.png" alt="GCT Bhakkar Logo" class="footer-logo-img">
                  <div class="footer-logo-text">
                    <span class="footer-logo-title">GCT Bhakkar</span>
                    <span class="footer-logo-subtitle">Excellence in Technology</span>
                  </div>
                </a>
                <p class="footer-description">
                  Government College of Technology, Bhakkar is committed to providing quality technical education 
                  and fostering innovation. We prepare students for successful careers in technology and engineering.
                </p>
                <div class="footer-social">
                  ${socialLinks.map(link => `
                    <a href="${link.href}" class="social-link ${link.className}" target="_blank" rel="noopener noreferrer" aria-label="${link.name}">
                      <i class="${link.icon}"></i>
                    </a>
                  `).join('')}
                </div>
              </div>
              
              <!-- Quick Links -->
              <div class="footer-section">
                <h4 class="footer-title">Quick Links</h4>
                <ul class="footer-links">
                  ${quickLinks.map(link => `
                    <li>
                      <a href="${link.href}" class="footer-link">
                        <i class="fas fa-chevron-right"></i>
                        ${link.name}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
              
              <!-- Programs -->
              <div class="footer-section">
                <h4 class="footer-title">Programs</h4>
                <ul class="footer-links">
                  ${programs.map(link => `
                    <li>
                      <a href="${link.href}" class="footer-link">
                        <i class="fas fa-chevron-right"></i>
                        ${link.name}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
              
              <!-- Contact Info -->
              <div class="footer-section">
                <h4 class="footer-title">Contact Info</h4>
                <div class="footer-contact">
                  <div class="footer-contact-item">
                    <div class="footer-contact-icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="footer-contact-text">
                      <span class="footer-contact-label">Address</span>
                      <span class="footer-contact-value">GCT Campus, DHQ Road, Near Thal Univeristy,<br>Bhakkar, Punjab, Pakistan</span>
                    </div>
                  </div>
                  <div class="footer-contact-item">
                    <div class="footer-contact-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="footer-contact-text">
                      <span class="footer-contact-label">Phone</span>
                      <span class="footer-contact-value"><a href="tel:0453220141">0453-220141</a></span>
                    </div>
                  </div>
                  <div class="footer-contact-item">
                    <div class="footer-contact-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="footer-contact-text">
                      <span class="footer-contact-label">Email</span>
                      <span class="footer-contact-value"><a href="mailto:gct786bhakkar@gmail.com">gct786bhakkar@gmail.com</a></span>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
          
          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <div class="footer-bottom-content">
              <div class="footer-credits">
                <p class="footer-copyright">
                  © ${currentYear} <a href="${this.basePath}index.html">GCT Bhakkar</a>. All Rights Reserved.
                </p>
                <p class="footer-made-by">
                  Made with <i class="fas fa-heart"></i> by 
                  <a href="${this.basePath}pages/developers.html" class="developers-link">CIT Department</a>
                </p>
              </div>
              <div class="footer-bottom-links">
                <a href="${this.basePath}pages/developers.html" class="footer-bottom-link">
                  <i class="fas fa-code"></i> Meet Developers
                </a>
                <a href="${this.basePath}pages/campus-life.html" class="footer-bottom-link">
                  <i class="fas fa-university"></i> Campus Life
                </a>
                <a href="${this.basePath}pages/contact.html" class="footer-bottom-link">
                  <i class="fas fa-headset"></i> Support
                </a>
              </div>
            </div>
            <div class="footer-report">
              <span class="footer-report-label"><i class="fas fa-exclamation-circle"></i> Report Issue / Give Feedback</span>
              <div class="footer-report-links">
                <a href="mailto:mabdulrasheedtalal@gmail.com" class="footer-report-link">
                  <i class="fas fa-envelope"></i> mabdulrasheedtalal@gmail.com
                </a>
                <a href="tel:03361115907" class="footer-report-link">
                  <i class="fas fa-phone"></i> 0336-1115907
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
 // Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Footer;
}
const footer = document.querySelector('.site-footer');

// Freeze variables/colors — brighter defaults
footer.style.setProperty('--text-muted', '#b0bec5');
footer.style.setProperty('--text-primary', '#f1f5f9');
footer.style.setProperty('--bg-primary', 'transparent');

// Fix element colors
footer.querySelector('.footer-made-by').style.color = '#b0bec5';
footer.querySelector('.fa-heart').style.color = '#ef4444';
footer.querySelector('a.developers-link').style.color = '#60a5fa';

// Ensure report links stay bright (prevent theme.css global overrides)
footer.querySelectorAll('.footer-report-link').forEach(link => {
  link.style.color = '#b0bec5';
});
footer.querySelectorAll('.footer-bottom-link').forEach(link => {
  link.style.color = '#b0bec5';
});
footer.querySelectorAll('.footer-link').forEach(link => {
  link.style.color = '#b0bec5';
});
footer.querySelectorAll('.footer-contact-value a').forEach(link => {
  link.style.color = '#f1f5f9';
});


  }
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('[data-footer]');
  if (footer) {
    const basePath = footer.dataset.basePath || './';
    new Footer({
      container: '[data-footer]',
      basePath
    });
  }
});

