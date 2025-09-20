/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Modern, Interactive Features for Calvine Dasilver's Portfolio
 * Author: Calvine Dasilver Mugunda
 * Version: 1.0.0
 */

'use strict';

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let scrollPosition = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    handlePageLoad();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    // Initialize all components
    initializeLoadingAnimation();
    initializeMobileMenu();
    initializeNavigation();
    initializeThemeToggle();
    initializeTypewriter();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeContactForm();
    initializePerformanceOptimizations();
    initializeEasterEggs();
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Console welcome message
    displayWelcomeMessage();
}

// ===== LOADING ANIMATION =====
function initializeLoadingAnimation() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (!loadingOverlay) return;
    
    // Hide loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    });
}

function handlePageLoad() {
    // Trigger initial scroll animations for elements in view
    triggerScrollAnimations();
    
    // Initialize performance monitoring
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    }
}

// ===== MOBILE MENU TOGGLE =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    isMenuOpen = !isMenuOpen;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    
    // Add ARIA attributes for accessibility
    hamburger.setAttribute('aria-expanded', isMenuOpen.toString());
    navMenu.setAttribute('aria-hidden', (!isMenuOpen).toString());
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!isMenuOpen) return;
    
    isMenuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Update ARIA attributes
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
}

// ===== NAVIGATION SCROLL EFFECTS =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        // Uncomment the following lines if you want to hide navbar on scroll down
        /*
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollY = currentScrollY;
        
        // Update active nav link
        updateActiveNavLink(sections, navLinks);
        
    }, 16)); // ~60fps
}

function updateActiveNavLink(sections, navLinks) {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Set initial theme icon
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    
    // Dispatch custom event for theme change
    const themeChangeEvent = new CustomEvent('themeChanged', {
        detail: { theme }
    });
    document.dispatchEvent(themeChangeEvent);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (!typewriterElement) return;
    
    const words = JSON.parse(typewriterElement.getAttribute('data-words') || '[]');
    
    if (words.length > 0) {
        new TypeWriter(typewriterElement, words, 3000);
    }
}

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 120;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with reveal class
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', throttle(triggerScrollAnimations, 16));
    }
}

function triggerScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    const triggerBottom = window.innerHeight / 5 * 4;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            
            smoothScrollTo(offsetTop, 800);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                closeMobileMenu();
            }
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (!isValid) {
        showFormMessage('Please correct the errors above.', 'error');
        return;
    }
    
    // Get form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'Contact from Portfolio',
        message: formData.get('message')
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Create mailto link
        const mailtoLink = `mailto:Calvinedasilver96@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
        
        // Open email client
        window.open(mailtoLink, '_blank');
        
        // Show success message
        showFormMessage('Thank you for your message! Your email client should open now.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${capitalize(fieldName)} is required.`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value && value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long.';
        isValid = false;
    }
    
    // Message validation
    if (fieldName === 'message' && value && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long.';
        isValid = false;
    }
    
    // Display error
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        field.classList.toggle('error', !isValid);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        field.classList.remove('error');
    }
}

function showFormMessage(message, type = 'info') {
    // Create or update message element
    let messageElement = document.getElementById('formMessage');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'formMessage';
        messageElement.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            text-align: center;
            transition: all 0.3s ease;
        `;
        document.getElementById('contactForm').appendChild(messageElement);
    }
    
    // Set message and styling based on type
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    const colors = {
        success: { bg: '#d4edda', text: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', text: '#721c24', border: '#f5c6cb' },
        info: { bg: '#d1ecf1', text: '#0c5460', border: '#bee5eb' }
    };
    
    const color = colors[type] || colors.info;
    messageElement.style.backgroundColor = color.bg;
    messageElement.style.color = color.text;
    messageElement.style.border = `1px solid ${color.border}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (messageElement) {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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

        // Observe images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Monitor performance
    if ('performance' in window && 'PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        console.log('Navigation timing:', entry);
                    }
                });
            });
            observer.observe({ entryTypes: ['navigation'] });
        } catch (e) {
            console.log('Performance observer not supported');
        }
    }
}

function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
    ];

    criticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
}

// ===== EASTER EGGS =====
function initializeEasterEggs() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            triggerKonamiEasterEgg();
            konamiCode = []; // Reset
        }
    });
    
    // Click counter easter egg
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 10) {
                triggerClickEasterEgg();
                clickCount = 0;
            }
        });
    }
}

function triggerKonamiEasterEgg() {
    // Create party effect
    document.body.style.animation = 'party 2s ease-in-out';
    
    // Show celebration message
    showEasterEggMessage('🎉 Konami Code Activated! You found the secret! 🎉');
    
    // Add party CSS if not exists
    if (!document.getElementById('partyStyles')) {
        const style = document.createElement('style');
        style.id = 'partyStyles';
        style.textContent = `
            @keyframes party {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(1deg) scale(1.02); }
                50% { transform: rotate(-1deg) scale(0.98); }
                75% { transform: rotate(1deg) scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reset animation
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

function triggerClickEasterEgg() {
    showEasterEggMessage('🎯 You\'re persistent! That\'s exactly what makes a great developer! 🎯');
}

function showEasterEggMessage(message) {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = message;
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 50px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: bounce 1s ease-in-out;
        text-align: center;
        max-width: 90vw;
    `;
    
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.style.opacity = '0';
        easterEgg.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            easterEgg.remove();
        }, 500);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomColor() {
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#f5576c',
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== WELCOME MESSAGE =====
function displayWelcomeMessage() {
    const styles = [
        'color: #667eea',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.1)'
    ].join(';');
    
    console.log(`%c🚀 Welcome to Calvine's Portfolio!`, styles);
    console.log(`
    Thanks for exploring the code! This portfolio was built with:
    
    ✨ Modern HTML5, CSS3, and Vanilla JavaScript
    🎨 Custom CSS Grid and Flexbox layouts
    🌙 Dark/Light theme toggle with localStorage
    📱 Fully responsive design
    ⚡ Performance optimizations
    🎭 Smooth animations and transitions
    🔍 Intersection Observer API
    ♿ Accessibility features
    🎪 Fun easter eggs (try the Konami code!)
    
    Tech Stack:
    • No heavy frameworks - pure performance
    • Modern ES6+ JavaScript features
    • CSS Custom Properties for theming
    • Progressive enhancement
    
    Feel free to reach out for collaboration:
    📧 Calvinedasilver96@gmail.com
    💼 https://linkedin.com/in/calvine-dasilver-047849188/
    🐱 https://github.com/Cdasilver29
    
    Have a great day! 🌟
    `);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== EXPORT FOR MODULE USAGE (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setTheme,
        TypeWriter
    };
}