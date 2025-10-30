// Interactive Homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Interactive Background Canvas
    const canvas = document.getElementById('interactive-bg');
    const ctx = canvas.getContext('2d');
    
    let mouse = { x: 0, y: 0 };
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class for interactive background
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        
        update() {
            // Move toward mouse position with some randomness
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.speedX += (dx / distance) * force * 0.03;
                this.speedY += (dy / distance) * force * 0.03;
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Add some friction
            this.speedX *= 0.98;
            this.speedY *= 0.98;
            
            // Decrease life
            this.life--;
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.life = 0;
            }
        }
        
        draw() {
            const lifeRatio = this.life / this.maxLife;
            ctx.save();
            ctx.globalAlpha = this.opacity * lifeRatio;
            ctx.fillStyle = '#666666';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create geometric shapes that follow mouse
    class GeometricShape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 40 + 20;
            this.rotation = 0;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.1 + 0.05;
            this.type = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
        }
        
        update() {
            // Subtle movement toward mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            
            this.x += dx * 0.001;
            this.y += dy * 0.001;
            
            this.rotation += this.rotationSpeed;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 1;
            
            switch(this.type) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                case 1: // Square
                    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    break;
                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.closePath();
                    ctx.stroke();
                    break;
            }
            ctx.restore();
        }
    }
    
    // Initialize
    resizeCanvas();
    
    // Create initial geometric shapes
    const shapes = [];
    for (let i = 0; i < 8; i++) {
        shapes.push(new GeometricShape());
    }
    
    // Mouse movement handler
    function handleMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Create particles at mouse position
        if (Math.random() > 0.7) {
            particles.push(new Particle(
                mouse.x + (Math.random() - 0.5) * 20,
                mouse.y + (Math.random() - 0.5) * 20
            ));
        }
        
        // Limit particles
        if (particles.length > 50) {
            particles = particles.slice(-50);
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update geometric shapes
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        // Draw and update particles
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });
        
        // Connect nearby particles with lines
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    ctx.save();
                    ctx.globalAlpha = (80 - distance) / 80 * 0.3;
                    ctx.strokeStyle = '#cccccc';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation
    animate();
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            if (!name || !email || !service || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message (Netlify will handle the actual submission)
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Service button interactions
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Create burst of particles on hover
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(
                    centerX + (Math.random() - 0.5) * 100,
                    centerY + (Math.random() - 0.5) * 100
                ));
            }
        });
    });
    
    // Smooth entrance animations
    const elementsToAnimate = document.querySelectorAll('.header-section, .services-section, .contact-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
});