
// Initialize Lucide icons
lucide.createIcons();

// Navigation functionality
class PortfolioApp {
    constructor() {
        this.activeSection = 'about';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollSpy();
        this.setupAnimations();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const sectionId = e.target.getAttribute('data-section');
                this.scrollToSection(sectionId);
            });
        });
    }

    scrollToSection(sectionId) {
        this.activeSection = sectionId;
        this.updateActiveNavLink();
        
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === this.activeSection) {
                link.classList.add('active');
            }
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.activeSection = sectionId;
                    this.updateActiveNavLink();
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupAnimations() {
        // Animate elements when they come into view
        const animatedElements = document.querySelectorAll('.card, .achievement-item, .section-title');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

// Utility functions for smooth interactions
class Utils {
    static smoothScroll(element, duration = 600) {
        const start = window.pageYOffset;
        const target = element.offsetTop - 80;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, start + distance * Utils.easeInOutQuad(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    static easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Enhanced scroll effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', Utils.debounce(() => {
            this.updateParallax();
            this.updateNavbarOpacity();
        }, 10));
    }

    updateParallax() {
        const scrollY = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    updateNavbarOpacity() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.pageYOffset;
        const opacity = Math.min(scrollY / 100, 1);
        
        navbar.style.background = `rgba(255, 255, 255, ${0.1 + (opacity * 0.05)})`;
    }
}

// Contact form handler (if needed in future)
class ContactHandler {
    static openEmail() {
        window.open('mailto:pravallikabandaru6@gmail.com', '_blank');
    }

    static openLinkedIn() {
        window.open('https://linkedin.com/in/pravallikabandaru', '_blank');
    }

    static openGitHub() {
        window.open('https://github.com/pravallikabandaru', '_blank');
    }

    static downloadResume() {
        // Create a temporary link to download resume
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Bandaru_Pravallika_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Performance optimization
class PerformanceOptimizer {
    static init() {
        // Lazy load images if any are added later
        this.setupLazyLoading();
        
        // Optimize animations for better performance
        this.optimizeAnimations();
    }

    static setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    static optimizeAnimations() {
        // Use transform and opacity for better performance
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.willChange = 'transform, opacity';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new PortfolioApp();
    
    // Initialize scroll effects
    const scrollEffects = new ScrollEffects();
    
    // Initialize performance optimizations
    PerformanceOptimizer.init();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            document.activeElement.blur();
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });

    // Console log for successful initialization
    console.log('🎉 Portfolio website initialized successfully!');
    console.log('✨ All features loaded and ready to use');
});

// Export for potential external use
window.PortfolioApp = {
    ContactHandler,
    Utils,
    ScrollEffects,
    PerformanceOptimizer
};