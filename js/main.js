// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navActions = document.querySelector('.nav-actions');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupScrollEffect();
        this.setupActiveLink();
    }
    
    setupEventListeners() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.navActions.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navActions.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add background on scroll
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        });
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupButtons();
    }
    
    setupButtons() {
        // Chat buttons
        document.querySelectorAll('.chat-btn, .chat-btn-hero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openChat();
            });
        });
        
        // Quote buttons
        document.querySelectorAll('.quote-btn, .quote-btn-hero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openQuoteForm();
            });
        });
        
        // Plan demo buttons
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.bookDemo(e.target);
            });
        });
        
        // Contact buttons
        document.querySelectorAll('.contact-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.classList.contains('primary')) {
                    this.openConsultation();
                } else {
                    this.viewPortfolio();
                }
            });
        });
    }
    
    openChat() {
        // Simulate chat opening
        this.showNotification('Chat feature would open here. Connect with our support team!');
    }
    
    openQuoteForm() {
        // Simulate quote form
        this.showNotification('Quote form would open here. Get your custom pricing!');
    }
    
    bookDemo(button) {
        const planCard = button.closest('.plan-card');
        const planName = planCard.querySelector('h3').textContent;
        this.showNotification(`Demo booking for ${planName} would open here!`);
    }
    
    openConsultation() {
        this.showNotification('Free consultation booking would open here!');
    }
    
    viewPortfolio() {
        this.showNotification('Portfolio showcase would open here!');
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">ℹ️</span>
                <span class="notification-text">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #40916c, #74c69d);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 350px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation keyframe
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: auto;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 5000);
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe all animatable elements
        document.querySelectorAll('.plan-card, .service-card, .solution-item, .analysis-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    addAnimationClasses() {
        // Add CSS for scroll animations
        if (!document.querySelector('#scroll-animations')) {
            const style = document.createElement('style');
            style.id = 'scroll-animations';
            style.textContent = `
                .plan-card, .service-card, .solution-item, .analysis-item {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease;
                }
                .plan-card.animate-in, .service-card.animate-in, 
                .solution-item.animate-in, .analysis-item.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .plan-card:nth-child(2) { transition-delay: 0.1s; }
                .plan-card:nth-child(3) { transition-delay: 0.2s; }
                .service-card:nth-child(2) { transition-delay: 0.1s; }
                .service-card:nth-child(3) { transition-delay: 0.2s; }
                .service-card:nth-child(4) { transition-delay: 0.1s; }
                .service-card:nth-child(5) { transition-delay: 0.2s; }
                .service-card:nth-child(6) { transition-delay: 0.3s; }
            `;
            document.head.appendChild(style);
        }
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLazyLoading();
        this.optimizeScrollEvents();
        this.preloadCriticalResources();
    }
    
    setupLazyLoading() {
        // Lazy load images when they come into view
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeScrollEvents() {
        // Throttle scroll events for better performance
        let ticking = false;
        
        function updateScrollElements() {
            // Update any scroll-dependent elements here
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    preloadCriticalResources() {
        // Preload important resources
        const criticalResources = [
            // Add any critical resource URLs here
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
}

// FAQ functionality
class FAQHandler {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                this.toggleFAQ(item);
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleFAQ(item);
                }
            });
            
            // Make question focusable
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
        });
    }
    
    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        
        if (isActive) {
            // Close the FAQ
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
        } else {
            // Close all other FAQs
            this.faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Open this FAQ
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SmoothScroll();
    new FormHandler();
    new ScrollAnimations();
    new PerformanceOptimizer();
    new FAQHandler();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations or refresh data if needed
        document.body.classList.add('page-visible');
    } else {
        // Pause non-essential operations
        document.body.classList.remove('page-visible');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        SmoothScroll,
        FormHandler,
        ScrollAnimations,
        PerformanceOptimizer,
        FAQHandler
    };
}
