// ===================================
// Initialize AOS Animation
// ===================================

AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ===================================
// Popup Notification
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popupNotification');
    const popupClose = document.getElementById('popupClose');
    
    // Show popup after 5 seconds
    setTimeout(function() {
        if (popup) {
            popup.classList.add('show');
        }
    }, 5000);
    
    // Close popup when clicking X button
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            popup.classList.remove('show');
        });
    }
    
    // Close popup when clicking on overlay (outside the content)
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('show');
            }
        });
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// ===================================
// Smooth Scrolling for Navigation
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    });
});

// ===================================
// Active Section Detection on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showMessage('error', 'الرجاء ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('error', 'الرجاء إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Phone validation (Saudi format)
    const phoneRegex = /^(\+966|00966|0)?5[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        showMessage('error', 'الرجاء إدخال رقم جوال سعودي صحيح');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ms-2"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success message
        showMessage('success', 'تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Optional: Send to WhatsApp
        const whatsappMessage = `مرحبًا، أنا ${formData.name}%0A
البريد: ${formData.email}%0A
الجوال: ${formData.phone}%0A
الخدمة: ${formData.service}%0A
التفاصيل: ${formData.message}`;
        
        // Auto-open WhatsApp after successful form submission
        setTimeout(() => {
            window.open(`https://wa.me/+966539072987?text=${whatsappMessage}`, '_blank');
        }, 1000);
        
    }, 1500);
});

// Show form message
function showMessage(type, message) {
    formMessage.className = '';
    
    if (type === 'success') {
        formMessage.className = 'alert alert-success';
        formMessage.innerHTML = `<i class="fas fa-check-circle ms-2"></i> ${message}`;
    } else {
        formMessage.className = 'alert alert-danger';
        formMessage.innerHTML = `<i class="fas fa-exclamation-circle ms-2"></i> ${message}`;
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
            formMessage.className = '';
            formMessage.style.opacity = '1';
        }, 300);
    }, 5000);
}

// ===================================
// Counter Animation for Stats
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    };
    
    updateCounter();
}

function checkStatsInView() {
    const statsSection = document.querySelector('.hero-section');
    
    if (!statsSection || hasAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isInView = (rect.top <= window.innerHeight && rect.bottom >= 0);
    
    if (isInView) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
            setTimeout(() => {
                animateCounter(stat);
            }, 500);
        });
    }
}

window.addEventListener('scroll', checkStatsInView);
window.addEventListener('load', checkStatsInView);

// ===================================
// Service Cards Hover Effect
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-purple)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

// ===================================
// Portfolio Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else if (item.classList.contains(filterValue)) {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.classList.add('hide');
                }, 300);
            }
        });
    });
});

// Portfolio Cards Click
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('click', function() {
        // Can add lightbox or modal functionality here
        console.log('Portfolio item clicked');
    });
});

// ===================================
// Pricing Card Interaction
// ===================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'var(--primary-light)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'transparent';
        }
    });
});

// ===================================
// Lazy Loading for Images (if used)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===================================
// Testimonial Carousel Enhancement
// ===================================

const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// WhatsApp Button Click Tracking
// ===================================

const whatsappBtn = document.querySelector('.whatsapp-float');

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here if needed
    });
}

// ===================================
// Form Field Validation Feedback
// ===================================

const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('is-invalid');
        }
    });
});

// Email validation on blur
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        } else if (this.value) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
}

// Phone validation on blur
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        const phoneRegex = /^(\+966|00966|0)?5[0-9]{8}$/;
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        } else if (this.value) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
}

// ===================================
// Navbar Mobile Menu Close on Outside Click
// ===================================

document.addEventListener('click', (e) => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// ===================================
// Prevent Form Double Submission
// ===================================

let formSubmitting = false;

contactForm.addEventListener('submit', (e) => {
    if (formSubmitting) {
        e.preventDefault();
        return false;
    }
    formSubmitting = true;
    
    setTimeout(() => {
        formSubmitting = false;
    }, 3000);
});

// ===================================
// Hero Typing Effect (Optional Enhancement)
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// Back Button Browser History
// ===================================

window.addEventListener('popstate', () => {
    // Handle back button navigation if needed
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    checkStatsInView();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// ===================================
// Print Styles (for future use)
// ===================================

window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
});

// ===================================
// Accessibility Enhancements
// ===================================

// Focus management for keyboard navigation
const focusableElements = document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
);

// Add skip to main content link functionality
const skipLink = document.querySelector('.skip-to-main');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('home');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===================================
// Service Worker Registration (PWA)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/service-worker.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// ===================================
// Analytics Event Tracking
// ===================================

function trackEvent(category, action, label) {
    // Add your analytics code here (Google Analytics, etc.)
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        trackEvent('Button', 'Click', text);
    });
});

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👩‍🎓 د. زينب - خدمات أكاديمية احترافية', 'color: #7c3aed; font-size: 24px; font-weight: bold;');
console.log('%cموقع تم تطويره بأحدث التقنيات', 'color: #d4af37; font-size: 14px;');
console.log('%c© 2025 جميع الحقوق محفوظة', 'color: #6b7280; font-size: 12px;');

// ===================================
// Easter Egg (Hidden Feature)
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================

const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ===================================
// Mobile Touch Gestures
// ===================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            console.log('Swiped left');
        } else {
            // Swipe right
            console.log('Swiped right');
        }
    }
}

// ===================================
// Testimonials Carousel Auto-play
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#testimonialsCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            ride: 'carousel'
        });
    }
});

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website initialized successfully!');
    
    // Check for saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    
    // Animate elements in viewport
    AOS.refresh();
});

// ===================================
// Export functions for testing
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showMessage,
        animateCounter,
        debounce,
        trackEvent
    };
}
