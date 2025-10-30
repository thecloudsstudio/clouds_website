// Simple form handling for CLOUDS website
document.addEventListener('DOMContentLoaded', function() {
    console.log('CLOUDS - Simple website loaded');
    
    // Contact form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const service = this.querySelector('select[name="service"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Basic validation
            if (!name || !email || !service || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const btn = this.querySelector('.submit-btn');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Netlify will handle the form submission
        });
    }
});