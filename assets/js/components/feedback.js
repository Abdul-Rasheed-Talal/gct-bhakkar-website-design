/**
 * GCT Bhakkar - Smart Feedback Component
 * Dynamically injected modal for user feedback
 * Mobile-optimized: swipe-to-dismiss, adjusted triggers, haptic feedback
 */

const Feedback = {
    // Configuration — mobile gets adjusted thresholds
    config: {
        scrollThreshold: window.innerWidth <= 767 ? 40 : 60, // % scrolled
        timeThreshold: window.innerWidth <= 767 ? 15000 : 30000, // ms
        snoozeTime: 30 * 60 * 1000, // 30 minutes
        localStorageKey: 'gct_feedback_state'
    },

    state: {
        isVisible: false,
        rating: 0,
        hasSubmitted: false,
        touchStartY: 0,
        touchDeltaY: 0
    },

    init() {
        console.log('Initializing Feedback Component...');
        this.loadState();

        if (this.shouldShow()) {
            this.setupTriggers();
        }
    },

    loadState() {
        const saved = localStorage.getItem(this.config.localStorageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            this.state.hasSubmitted = parsed.hasSubmitted;
            this.state.snoozeUntil = parsed.snoozeUntil;
        }
    },

    saveState() {
        localStorage.setItem(this.config.localStorageKey, JSON.stringify({
            hasSubmitted: this.state.hasSubmitted,
            snoozeUntil: this.state.snoozeUntil
        }));
    },

    shouldShow() {
        if (this.state.hasSubmitted) {
            console.log('Feedback: Not showing because already submitted.');
            return false;
        }
        if (this.state.snoozeUntil && Date.now() < this.state.snoozeUntil) {
            const minutesLeft = Math.ceil((this.state.snoozeUntil - Date.now()) / 60000);
            console.log(`Feedback: Snoozed for ${minutesLeft} more minutes.`);
            return false;
        }
        return true;
    },

    setupTriggers() {
        console.log(`Feedback: Triggers setup. Time: ${this.config.timeThreshold}ms, Scroll: ${this.config.scrollThreshold}%`);

        // Time Trigger
        setTimeout(() => {
            console.log('Feedback: Time threshold reached.');
            if (this.shouldShow() && !this.state.isVisible) {
                console.log('Feedback: Showing via Timer.');
                this.show();
            }
        }, this.config.timeThreshold);

        // Scroll Trigger
        window.addEventListener('scroll', () => {
            if (this.state.isVisible) return;

            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > this.config.scrollThreshold) {
                if (this.shouldShow()) {
                    console.log('Feedback: Showing via Scroll.');
                    this.show();
                }
            }
        }, { passive: true });
    },

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'feedback-modal';
        modal.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-header">
                    <h4 class="feedback-title">Quick Feedback</h4>
                    <button class="feedback-close" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="feedback-body">
                    <p class="feedback-text">How is your experience with our new website?</p>
                    <div class="feedback-stars">
                        <button class="star-btn" data-value="1"><i class="fas fa-star"></i></button>
                        <button class="star-btn" data-value="2"><i class="fas fa-star"></i></button>
                        <button class="star-btn" data-value="3"><i class="fas fa-star"></i></button>
                        <button class="star-btn" data-value="4"><i class="fas fa-star"></i></button>
                        <button class="star-btn" data-value="5"><i class="fas fa-star"></i></button>
                    </div>
                    <textarea class="feedback-input" placeholder="Tell us more (optional) or report a bug..." rows="2"></textarea>
                </div>
                <div class="feedback-actions">
                    <button class="btn-feedback btn-submit" disabled>Submit Feedback</button>
                </div>
            </div>
            <div class="feedback-success">
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your feedback!</p>
            </div>
        `;

        document.body.appendChild(modal);
        this.addEventListeners(modal);
        return modal;
    },

    addEventListeners(modal) {
        const stars = modal.querySelectorAll('.star-btn');
        const submitBtn = modal.querySelector('.btn-submit');
        const closeBtn = modal.querySelector('.feedback-close');

        // Close
        closeBtn.addEventListener('click', () => this.close(true));

        // Stars
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const val = parseInt(star.dataset.value);
                this.state.rating = val;

                // Update UI
                stars.forEach(s => {
                    const sVal = parseInt(s.dataset.value);
                    if (sVal <= val) s.classList.add('active');
                    else s.classList.remove('active');
                });

                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';

                // Haptic feedback on mobile
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });
        });

        // Submit
        submitBtn.addEventListener('click', () => {
            this.submit();
        });

        // Mobile: Swipe down to dismiss
        this.addSwipeToDismiss(modal);
    },

    /**
     * Swipe-down gesture to dismiss the modal on mobile
     */
    addSwipeToDismiss(modal) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        modal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            currentY = startY;
            isDragging = true;
            modal.style.transition = 'none';
        }, { passive: true });

        modal.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;

            // Only allow downward drag
            if (deltaY > 0) {
                modal.style.transform = `translateY(${deltaY}px)`;
                modal.style.opacity = Math.max(0, 1 - deltaY / 200);
            }
        }, { passive: true });

        modal.addEventListener('touchend', () => {
            isDragging = false;
            const deltaY = currentY - startY;
            modal.style.transition = 'all 0.3s ease';

            if (deltaY > 60) {
                // Dismiss
                this.close(true);
            } else {
                // Snap back
                modal.style.transform = '';
                modal.style.opacity = '';
            }
        }, { passive: true });
    },

    show() {
        console.log('Feedback: show() called');
        this.state.isVisible = true;
        let modal = document.querySelector('.feedback-modal');
        if (!modal) {
            modal = this.createModal();
        }

        // Small delay to allow DOM transition
        setTimeout(() => {
            modal.classList.add('visible');
        }, 100);
    },

    close(isSnooze = false) {
        const modal = document.querySelector('.feedback-modal');
        if (modal) {
            modal.classList.remove('visible');
            modal.style.transform = 'translateY(120%)';
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                this.state.isVisible = false;
            }, 500);
        }

        if (isSnooze) {
            console.log('Feedback: Snoozing...');
            this.state.snoozeUntil = Date.now() + this.config.snoozeTime;
            this.saveState();
        }
    },

    submit() {
        const modal = document.querySelector('.feedback-modal');
        const content = modal.querySelector('.feedback-content');
        const success = modal.querySelector('.feedback-success');
        const input = modal.querySelector('.feedback-input');
        const comment = input ? input.value : '';

        content.style.display = 'none';
        success.style.display = 'block';

        // Haptic feedback on submit
        if (navigator.vibrate) {
            navigator.vibrate([20, 30, 20]);
        }

        this.state.hasSubmitted = true;
        this.saveState();

        // Close after 2 seconds
        setTimeout(() => {
            this.close();
        }, 2000);

        // Here you would typically send the data to a server
        console.log(`Feedback submitted: ${this.state.rating} stars`, `Comment: ${comment}`);
    },

    // Debugging Utility
    reset() {
        console.log('Feedback: Resetting state.');
        this.state.hasSubmitted = false;
        this.state.snoozeUntil = null;
        this.state.isVisible = false;
        localStorage.removeItem(this.config.localStorageKey);

        // Remove existing modal if any
        const modal = document.querySelector('.feedback-modal');
        if (modal) modal.remove();

        alert('Feedback state reset. Refresh the page to test again.');
    }
};

// Expose to window for debugging
window.Feedback = Feedback;

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Feedback.init());
} else {
    Feedback.init();
}
