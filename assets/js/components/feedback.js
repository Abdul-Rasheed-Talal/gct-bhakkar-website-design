/**
 * GCT Bhakkar - Smart Feedback Component
 * Dynamically injected modal for user feedback
 */

const Feedback = {
    // Configuration
    config: {
        scrollThreshold: 60, // % scrolled
        timeThreshold: 30000, // ms (30 seconds)
        snoozeTime: 30 * 60 * 1000, // 30 minutes
        localStorageKey: 'gct_feedback_state'
    },

    state: {
        isVisible: false,
        rating: 0,
        hasSubmitted: false
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
        if (this.state.hasSubmitted) return false;
        if (this.state.snoozeUntil && Date.now() < this.state.snoozeUntil) return false;
        return true;
    },

    setupTriggers() {
        // Time Trigger
        setTimeout(() => {
            if (this.shouldShow() && !this.state.isVisible) {
                this.show();
            }
        }, this.config.timeThreshold);

        // Scroll Trigger
        window.addEventListener('scroll', () => {
            if (this.state.isVisible || !this.shouldShow()) return;

            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > this.config.scrollThreshold) {
                this.show();
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
                    <textarea class="feedback-input" placeholder="Tell us more (optional) or report a bug..." rows="3"></textarea>
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
        const input = modal.querySelector('.feedback-input');

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
                submitBtn.textContent = `Submit`;
            });
        });

        // Submit
        submitBtn.addEventListener('click', () => {
            this.submit();
        });
    },

    show() {
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
            setTimeout(() => {
                modal.remove();
                this.state.isVisible = false;
            }, 500);
        }

        if (isSnooze) {
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

        this.state.hasSubmitted = true;
        this.saveState();

        // Close after 2 seconds
        setTimeout(() => {
            this.close();
        }, 2000);

        // Here you would typically send the data to a server
        console.log(`Feedback submitted: ${this.state.rating} stars`, `Comment: ${comment}`);
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Feedback.init());
} else {
    Feedback.init();
}
