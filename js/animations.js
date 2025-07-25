// Modern Hero Animation System
class HeroAnimation {
    constructor() {
        this.heroVisual = document.querySelector('.hero-visual');
        this.floatingElements = document.querySelectorAll('.floating-circle');
        this.dataFlows = document.querySelectorAll('.data-flow');
        this.hubCore = document.querySelector('.hub-core');
        this.isIntersecting = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupMouseInteraction();
        this.startAnimations();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isIntersecting = entry.isIntersecting;
                if (this.isIntersecting) {
                    this.startInteractiveAnimations();
                } else {
                    this.pauseInteractiveAnimations();
                }
            });
        }, { threshold: 0.3 });
        
        if (this.heroVisual) {
            observer.observe(this.heroVisual);
        }
    }
    
    setupMouseInteraction() {
        if (!this.heroVisual) return;
        
        this.heroVisual.addEventListener('mouseenter', () => {
            this.enhanceAnimations();
        });
        
        this.heroVisual.addEventListener('mouseleave', () => {
            this.normalizeAnimations();
        });
        
        this.heroVisual.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }
    
    handleMouseMove(e) {
        if (!this.isIntersecting) return;
        
        const rect = this.heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Make floating elements responsive to mouse
        this.floatingElements.forEach((element, index) => {
            const offsetX = (x - 0.5) * 20 * (index + 1);
            const offsetY = (y - 0.5) * 20 * (index + 1);
            
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
    
    startAnimations() {
        // Add staggered entrance animations
        this.floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
        });
        
        this.dataFlows.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    startInteractiveAnimations() {
        if (this.hubCore) {
            this.hubCore.style.animationPlayState = 'running';
        }
        
        this.dataFlows.forEach(flow => {
            flow.style.animationPlayState = 'running';
        });
    }
    
    pauseInteractiveAnimations() {
        if (this.hubCore) {
            this.hubCore.style.animationPlayState = 'paused';
        }
        
        this.dataFlows.forEach(flow => {
            flow.style.animationPlayState = 'paused';
        });
    }
    
    enhanceAnimations() {
        if (!this.isIntersecting) return;
        
        // Speed up animations on hover
        if (this.hubCore) {
            this.hubCore.style.animationDuration = '1s';
        }
        
        this.dataFlows.forEach(flow => {
            flow.style.animationDuration = '1s';
        });
        
        document.querySelectorAll('.ring').forEach(ring => {
            const currentDuration = parseFloat(ring.style.animationDuration || 8);
            ring.style.animationDuration = `${currentDuration * 0.5}s`;
        });
    }
    
    normalizeAnimations() {
        // Reset to normal speeds
        if (this.hubCore) {
            this.hubCore.style.animationDuration = '2s';
        }
        
        this.dataFlows.forEach(flow => {
            flow.style.animationDuration = '2s';
        });
        
        document.querySelectorAll('.ring').forEach((ring, index) => {
            const normalDurations = ['6s', '8s', '10s'];
            ring.style.animationDuration = normalDurations[index] || '8s';
        });
        
        // Reset floating element transforms
        this.floatingElements.forEach(element => {
            element.style.transform = '';
        });
    }
}

// Particle background animation
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.startAnimation();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-background';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 240 // Purple to blue range
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    startAnimation() {
        const animate = () => {
            this.clearCanvas();
            this.updateParticles();
            this.drawParticles();
            this.drawConnections();
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.0001;
                particle.vy += dy * force * 0.0001;
            }
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Velocity damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(64, 145, 108, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Text animation effects
class TextAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypewriterEffect();
        this.setupCounterAnimations();
        this.setupGlitchEffect();
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid #40916c';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }
    
    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
        
        // Animate counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counterElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    setupGlitchEffect() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            const originalText = element.textContent;
            
            element.addEventListener('mouseenter', () => {
                this.startGlitch(element, originalText);
            });
        });
    }
    
    startGlitch(element, originalText) {
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iterations = 0;
        
        const glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }
}

// Loading animations
class LoadingAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createLoadingOverlay();
        this.setupPageLoadAnimation();
    }
    
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="logo-icon pulse"></div>
                    <h2>CODENAK</h2>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <p class="loading-text">Connecting to the future...</p>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #081c15 0%, #1b4332 100%);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-content {
                text-align: center;
                color: white;
            }
            .loading-logo {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .loading-logo .logo-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #40916c, #74c69d);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: pulse 2s infinite;
            }
            .loading-logo .logo-icon::after {
                content: '⚡';
                font-size: 24px;
            }
            .loading-logo h2 {
                font-size: 2rem;
                font-weight: 700;
                margin: 0;
            }
            .loading-bar {
                width: 300px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                margin: 2rem auto;
                overflow: hidden;
            }
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #40916c, #74c69d);
                border-radius: 2px;
                animation: loadingProgress 3s ease-in-out infinite;
            }
            .loading-text {
                font-size: 1.1rem;
                opacity: 0.8;
                margin: 0;
            }
            @keyframes loadingProgress {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupPageLoadAnimation() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const overlay = document.getElementById('loading-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                        this.animatePageElements();
                    }, 500);
                }
            }, 1000);
        });
    }
    
    animatePageElements() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                navbar.style.transition = 'transform 0.6s ease';
                navbar.style.transform = 'translateY(0)';
            }, 800);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only create resource-intensive animations on desktop
    if (window.innerWidth > 768) {
        new HeroAnimation();
        new ParticleBackground();
    }
    
    new TextAnimations();
    new LoadingAnimations();
});

// Clean up animations when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Pause animations to save resources
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HeroAnimation,
        ParticleBackground,
        TextAnimations,
        LoadingAnimations
    };
}
