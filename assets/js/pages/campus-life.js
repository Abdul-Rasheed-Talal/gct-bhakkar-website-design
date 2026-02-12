/**
 * Campus Life Page Scripts
 * Handles event filtering and "Load More" functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.event-filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const loadMoreBtn = document.getElementById('load-more-events');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const sections = document.querySelectorAll('section[id]');

    // Configuration
    const INITIAL_SHOW = 6;
    const LOAD_BATCH = 6;

    // State
    let currentFilter = 'all';
    let visibleLimit = INITIAL_SHOW;

    /**
     * Renders the event cards based on current filter and visibility limit
     */
    function renderEvents() {
        let matchCount = 0;
        let visibleCount = 0;

        // Reset visibility for all cards first
        eventCards.forEach(card => card.classList.add('hidden'));

        eventCards.forEach(card => {
            const category = card.dataset.category;
            const matchesFilter = currentFilter === 'all' || category === currentFilter;

            if (matchesFilter) {
                matchCount++;
                if (matchCount <= visibleLimit) {
                    card.classList.remove('hidden');
                    // Trigger animation if it was hidden
                    if (card.style.display === 'none' || card.classList.contains('hidden')) {
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = 'fadeInUp 0.4s ease forwards';
                    }
                    visibleCount++;
                }
            }
        });

        // Update Load More/Show Less button
        if (loadMoreBtn) {
            if (matchCount <= INITIAL_SHOW) {
                // If total items are less than initial limit, hide button
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';

                if (visibleLimit >= matchCount) {
                    // All items shown, switch to "Show Less"
                    loadMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up ms-2"></i>';
                    loadMoreBtn.classList.remove('btn-primary');
                    loadMoreBtn.classList.add('btn-outline-light');
                } else {
                    // More items to show, keep "Load More"
                    loadMoreBtn.innerHTML = 'Load More Events <i class="fas fa-chevron-down ms-2"></i>';
                    loadMoreBtn.classList.add('btn-primary');
                    loadMoreBtn.classList.remove('btn-outline-light');
                }
            }
        }
    }

    // Initialize Event Listeners for Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update filter state
            currentFilter = btn.dataset.filter;
            visibleLimit = INITIAL_SHOW; // Reset limit when filter changes

            renderEvents();
        });
    });

    // Initialize Event Listener for Load More / Show Less
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Calculate total matches for current filter
            let totalMatches = 0;
            eventCards.forEach(card => {
                if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                    totalMatches++;
                }
            });

            if (visibleLimit >= totalMatches) {
                // Currently showing all, so "Show Less" action
                visibleLimit = INITIAL_SHOW;

                // Scroll back to events section top smoothly
                document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
            } else {
                // "Load More" action
                visibleLimit += LOAD_BATCH;
            }
            renderEvents();
        });
    }

    // Timeline Navigation Scroll Spy
    function updateTimeline() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 300)) {
                currentSection = section.getAttribute('id');
            }
        });

        timelineDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').includes(currentSection)) {
                dot.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);

    // Initial Render
    renderEvents();
    updateTimeline();
});
