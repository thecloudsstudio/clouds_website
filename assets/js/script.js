document.addEventListener('DOMContentLoaded', function() {
    console.log('CLOUDS website loading...');
    
    // Create simple floating elements
    function createFloatingElements() {
        for (let i = 0; i < 6; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'fixed';
            dot.style.width = '3px';
            dot.style.height = '3px';
            dot.style.background = 'rgba(120, 119, 198, 0.3)';
            dot.style.borderRadius = '50%';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animation = 'float ' + (10 + Math.random() * 5) + 's ease-in-out infinite';
            dot.style.zIndex = '1';
            dot.style.pointerEvents = 'none';
            document.body.appendChild(dot);
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            25% { transform: translateY(-15px) rotate(90deg); opacity: 0.5; }
            50% { transform: translateY(-5px) rotate(180deg); opacity: 0.7; }
            75% { transform: translateY(-20px) rotate(270deg); opacity: 0.4; }
        }
        .service-button:hover {
            transform: translateY(-5px) scale(1.01) !important;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Contact form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const service = this.querySelector('select[name="service"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !service || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
            
            const btn = this.querySelector('.submit-btn');
            btn.textContent = 'Sending...';
            btn.disabled = true;
        });
    }
    
    // Smooth entrance animations
    const sections = document.querySelectorAll('.header-section, .services-section, .contact-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease ' + (index * 0.2) + 's, transform 0.6s ease ' + (index * 0.2) + 's';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
    
    // Initialize
    createFloatingElements();
    
    console.log('CLOUDS website loaded successfully!');
});