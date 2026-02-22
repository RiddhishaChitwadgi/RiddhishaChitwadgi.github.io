// ============================================
// Portfolio Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initTypingAnimation();
    initScrollAnimations();
    initCounterAnimation();
    initSkillProgress();
    initExperienceTabs();
    initProjectFilter();
    initSkillFilter();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initModal();
});

// ============================================
// Loader
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

// ============================================
// Custom Cursor
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX - 6 + 'px';
        cursor.style.top = cursorY - 6 + 'px';
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .timeline-item');
    
    interactiveElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ============================================
// Navbar
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let scrollY = window.scrollY;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) return;
    
    const titles = [
        'Data Engineer',
        'Analytics Expert',
        'SQL Developer',
        'Python Developer',
        'BI Specialist'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .about-stats, .highlight-item, ' +
        '.timeline-item, .skill-card, .project-card, .education-card, ' +
        '.contact-info, .contact-form-container'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                function updateCounter() {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

// ============================================
// Skill Progress Animation
// ============================================
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                
                if (progressBar) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    progressBar.style.width = progress;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillCards.forEach(function(card) {
        observer.observe(card);
    });
}

// ============================================
// Experience Tabs
// ============================================
function initExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (tabButtons.length === 0 || timelineItems.length === 0) return;
    
    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter timeline items
            timelineItems.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory.includes(category)) {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.classList.add('visible');
                    }, 10);
                } else {
                    item.classList.remove('visible');
                    setTimeout(function() {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Project Filter
// ============================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter project cards
            projectCards.forEach(function(card) {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// Skill Filter
// ============================================
function initSkillFilter() {
    const skillNavButtons = document.querySelectorAll('.skill-nav-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillNavButtons.length === 0 || skillCards.length === 0) return;
    
    skillNavButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            skillNavButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter skill cards
            skillCards.forEach(function(card) {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<span>' + message + '</span><button class="notification-close"><i class="fas fa-times"></i></button>';
    
    // Add styles
    notification.style.cssText = 'position: fixed; top: 100px; right: 30px; padding: 15px 20px; background: ' + 
        (type === 'success' ? '#2d7d46' : '#d32f2f') + 
        '; color: white; border-radius: 8px; display: flex; align-items: center; gap: 15px; z-index: 10001; ' +
        'animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Project Modal
// ============================================
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    if (!modal || !modalClose) return;
    
    // Project data
    const projectData = {
        sneaker: {
            title: 'Sneaker Resale Price Prediction',
            description: 'A comprehensive machine learning project that predicts sneaker resale prices with high accuracy.',
            features: [
                'Data collection and preprocessing from multiple sources',
                'Feature engineering for brand, size, and demand indices',
                'Multiple model comparison (Linear, Ridge, Random Forest, XGBoost)',
                'Hyperparameter tuning using GridSearchCV',
                'Interactive Tableau dashboard for visualization'
            ],
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Tableau'],
            metrics: [
                { label: 'R² Score', value: '0.89' },
                { label: 'MAE', value: '$45' },
                { label: 'Improvement', value: '20%' }
            ]
        },
        geospatial: {
            title: 'Boston Utilities Geospatial Analysis',
            description: 'Geospatial analysis project to identify service coverage gaps in Boston utility data.',
            features: [
                'Data collection and cleaning from multiple utility sources',
                'Geospatial analysis using GeoPandas and Folium',
                'Clustering algorithms for pattern discovery',
                'Interactive map visualizations',
                'Resource allocation optimization recommendations'
            ],
            technologies: ['Python', 'GeoPandas', 'Folium', 'Power BI', 'Tableau'],
            metrics: [
                { label: 'Coverage Analysis', value: '100%' },
                { label: 'Resource Optimization', value: '25%' },
                { label: 'Patterns Found', value: '15+' }
            ]
        }
    };
    
    // Open modal on demo button click
    demoButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectKey = this.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                let metricsHTML = '';
                project.metrics.forEach(function(metric) {
                    metricsHTML += '<div class="modal-metric"><span class="metric-value">' + metric.value + '</span><span class="metric-label">' + metric.label + '</span></div>';
                });
                
                let techHTML = '';
                project.technologies.forEach(function(tech) {
                    techHTML += '<span class="modal-tech-tag">' + tech + '</span>';
                });
                
                modalBody.innerHTML = '<h2 class="modal-title">' + project.title + '</h2><p class="modal-description">' + project.description + '</p><div class="modal-section"><h4>Key Features</h4><ul class="modal-features">' + 
                    project.features.map(function(feature) { return '<li><i class="fas fa-check"></i>' + feature + '</li>'; }).join('') + 
                    '</ul></div><div class="modal-section"><h4>Technologies</h4><div class="modal-tech">' + techHTML + '</div></div><div class="modal-metrics">' + metricsHTML + '</div>';
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Add CSS for modal and notifications (continued)
// ============================================
(function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .modal-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--color-text);
            margin-bottom: 15px;
        }
        .modal-description {
            font-size: 1rem;
            color: var(--color-text-secondary);
            margin-bottom: 25px;
            line-height: 1.7;
        }
        .modal-section {
            margin-bottom: 25px;
        }
        .modal-section h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--color-text);
            margin-bottom: 15px;
        }
        .modal-features {
            list-style: none;
            padding: 0;
        }
        .modal-features li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 10px;
            color: var(--color-text-secondary);
        }
        .modal-features li i {
            color: var(--color-primary);
            margin-top: 3px;
        }
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .modal-tech-tag {
            padding: 6px 14px;
            background: var(--color-bg-alt);
            border-radius: var(--border-radius-sm);
            font-size: 0.9rem;
            color: var(--color-text-secondary);
        }
        .modal-metrics {
            display: flex;
            gap: 30px;
            padding-top: 20px;
            border-top: 1px solid var(--color-border);
        }
        .modal-metric {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .modal-metric .metric-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-primary);
        }
        .modal-metric .metric-label {
            font-size: 0.85rem;
            color: var(--color-text-muted);
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @media (max-width: 768px) {
            .modal {
                padding: 15px;
            }
            .modal-content {
                max-height: 95vh;
            }
            .modal-body {
                padding: 25px;
            }
            .modal-title {
                font-size: 1.4rem;
            }
            .modal-metrics {
                flex-wrap: wrap;
                gap: 20px;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ============================================
// Parallax Effect for Hero Shapes
// ============================================
(function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    if (shapes.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        shapes.forEach(function(shape, index) {
            const speed = 0.05 * (index + 1);
            const yPos = scrollY * speed;
            shape.style.transform = 'translateY(' + yPos + 'px)';
        });
    });
})();

// ============================================
// Lazy Loading Images
// ============================================
(function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
})();

// ============================================
// Keyboard Navigation
// ============================================
(function initKeyboardNav() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            const modal = document.getElementById('project-modal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
})();

// ============================================
// Performance Optimization
// ============================================
(function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    
    function debounceScroll(func, wait) {
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Throttle animation frames
    let animationFrameId;
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // Optimize scroll-based animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = throttle(function() {
        animatedElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !el.classList.contains('animated')) {
                el.classList.add('animated');
                // Trigger custom animation
                el.style.animationPlayState = 'running';
            }
        });
    }, 100);
    
    window.addEventListener('scroll', animateOnScroll, { passive: true });
})();

// ============================================
// Accessibility Enhancements
// ============================================
(function enhanceAccessibility() {
    // Add aria-labels to icon-only buttons
    const iconButtons = document.querySelectorAll('.social-link, .project-btn, .footer-social-link');
    
    iconButtons.forEach(function(btn) {
        if (!btn.getAttribute('aria-label')) {
            const icon = btn.querySelector('i');
            if (icon) {
                const iconClass = icon.className.replace('fas ', '').replace('fab ', '');
                btn.setAttribute('aria-label', iconClass);
            }
        }
    });
    
    // Improve focus visibility
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add visible focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 3px solid var(--color-primary) !important;
            outline-offset: 2px !important;
        }
        .keyboard-navigation *:focus:not(:focus-visible) {
            outline: none !important;
        }
        .keyboard-navigation *:focus-visible {
            outline: 3px solid var(--color-primary) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);
})();

// ============================================
// Console Welcome Message
// ============================================
(function showWelcomeMessage() {
    const styles = [
        'color: #2d2d2d',
        'font-size: 14px',
        'font-weight: bold',
        'background: #f5f5f5',
        'padding: 10px 20px',
        'border-radius: 5px'
    ].join(';');
    
    console.log(
        '%c👋 Welcome to Riddhisha\'s Portfolio!',
        styles
    );
    console.log(
        '%cBuilt with ❤️ using HTML, CSS, and JavaScript',
        'color: #666; font-size: 12px;'
    );
    console.log(
        '%cFeel free to explore and connect!',
        'color: #2d2d2d; font-size: 12px;'
    );
})();
