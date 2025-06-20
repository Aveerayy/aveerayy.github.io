// JavaScript for Sec-LLM Website

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const formContainer = this.closest('.contact-form');
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formContainer.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.stat-item, .driver-card, .problem-card, .feature-item, .competitor-item, .customer-segment, .marketing-card, .metrics-card, .phase-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.stat-item, .driver-card, .problem-card, .feature-item, .competitor-item, .customer-segment, .marketing-card, .metrics-card, .phase-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Counter animation for statistics
    const startCounters = function() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        statItems.forEach(item => {
            const target = parseFloat(item.textContent.replace(/[^\d.-]/g, ''));
            const suffix = item.textContent.replace(/[\d.-]/g, '');
            const duration = 2000; // 2 seconds
            const step = 30; // Update every 30ms
            const steps = duration / step;
            const increment = target / steps;
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    item.textContent = target + suffix;
                    clearInterval(counter);
                } else {
                    // Format based on whether it's a percentage or dollar amount
                    if (suffix.includes('%')) {
                        item.textContent = Math.round(current) + suffix;
                    } else if (suffix.includes('$')) {
                        item.textContent = '$' + Math.round(current).toLocaleString();
                    } else if (suffix.includes('B')) {
                        item.textContent = '$' + current.toFixed(1) + 'B';
                    } else {
                        item.textContent = Math.round(current) + suffix;
                    }
                }
            }, step);
        });
    };
    
    // Start counters when they come into view
    const observeCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observeCounters.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const marketStats = document.querySelector('.market-stats');
    if (marketStats) {
        observeCounters.observe(marketStats);
    }
});
