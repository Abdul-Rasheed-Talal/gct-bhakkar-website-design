/**
 * GCT Bhakkar - Main JavaScript Entry Point
 * Initializes all components and utilities
 */

// Import components (for module bundlers)
// In standard HTML, these are loaded via script tags

/**
 * Main Application Controller
 */
const App = {
  /**
   * Initialize the application
   */
  init() {
    this.initComponents();
    this.initBackToTop();
    this.initPageTransition();
    this.initPreloader();
    console.log('GCT Bhakkar Website Initialized');
  },

  /**
   * Initialize dynamic components
   */
  initComponents() {
    // Navbar and Footer are auto-initialized via their own scripts
    // Initialize curriculum tabs
    this.initCurriculumTabs();
  },

  /**
   * Initialize curriculum tabs for department pages
   */
  initCurriculumTabs() {
    const tabs = document.querySelectorAll('.curriculum-tab');
    const contents = document.querySelectorAll('.curriculum-content');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const year = tab.dataset.year;

        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const content = document.querySelector(`[data-year-content="${year}"]`);
        if (content) {
          content.classList.add('active');
        }
      });
    });
  },

  /**
   * Initialize back to top button
   */
  initBackToTop() {
    // Create back to top button if not exists
    if (!document.querySelector('.back-to-top')) {
      const button = document.createElement('button');
      button.className = 'back-to-top';
      button.innerHTML = '<i class="fas fa-chevron-up"></i>';
      button.setAttribute('aria-label', 'Back to top');
      document.body.appendChild(button);
    }

    const button = document.querySelector('.back-to-top');

    // Show/hide on scroll
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Scroll to top on click
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /**
   * Add page transition effect
   */
  initPageTransition() {
    // Add transition class to main content
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('page-transition');
    }
  },

  /**
   * Initialize Preloader
   */
  initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.classList.add('loaded');
          // Optional: remove after transition
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 500);
        }, 500); // Minimum load time
      });
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}





document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('campusVideo');
  const playBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const progress = document.getElementById('videoProgress');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');

  // Start video muted
  video.muted = true;
  muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';


  // Update time display
  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
  });

  // Play/Pause button
  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Mute/Unmute button
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
  });

  // Video progress bar
  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.value = percent;
    currentTimeEl.textContent = formatTime(video.currentTime);
  });

  progress.addEventListener('input', () => {
    video.currentTime = (progress.value / 100) * video.duration;
  });

  // Scroll-based autoplay/pause
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => console.log("Autoplay blocked"));
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        video.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
});


function updateOfficeStatus() {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ...
  const hour = now.getHours();
  const minute = now.getMinutes();

  let isOpen = false;

  // Mon - Fri: 8 AM - 4 PM
  if (day >= 1 && day <= 5) {
    if (hour >= 8 && hour < 16) {
      isOpen = true;
    }
  }
  // Sat: 8 AM - 1 PM
  else if (day === 6) {
    if (hour >= 8 && hour < 13) {
      isOpen = true;
    }
  }

  const statusEl = document.getElementById("contact-status");
  if (isOpen) {
    statusEl.innerHTML = '<i class="fas fa-circle"></i> Currently Open';
    statusEl.classList.add("open");
    statusEl.classList.remove("closed");
  } else {
    statusEl.innerHTML = '<i class="fas fa-circle"></i> Currently Closed';
    statusEl.classList.add("closed");
    statusEl.classList.remove("open");
  }
}

// Run on page load
updateOfficeStatus();

// Optional: Update every 5 minutes automatically
setInterval(updateOfficeStatus, 5 * 60 * 1000);
