/**
 * Admissions Page Script
 * Handles Fee Structure Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    const feeToggle = document.getElementById('feeToggle');
    const toggleOptions = document.querySelectorAll('.fee-toggle-option');
    const feeCards = document.querySelectorAll('.card-price');

    if (!feeToggle) return;

    // Helper to update visibility
    const updateVisibility = (selectedShift) => {
        feeCards.forEach(card => {
            const cardShifts = card.dataset.shifts ? card.dataset.shifts.split(' ') : [];

            if (cardShifts.includes(selectedShift)) {
                // Show card
                card.style.display = 'block';
                // Small timeout to allow display:block to apply before opacity transition
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Hide card
                card.classList.add('hidden');
                card.classList.remove('visible');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                // Wait for transition then hide
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    // Click handler for the options
    toggleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling if needed

            const selectedShift = option.dataset.shift;

            // Update Toggle State
            if (selectedShift === 'evening') {
                feeToggle.classList.add('evening-selected');
            } else {
                feeToggle.classList.remove('evening-selected');
            }

            // Update Active Class on Options
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Update Cards
            updateVisibility(selectedShift);
        });
    });

    // Initialize (Morning is default)
    updateVisibility('morning');
});
