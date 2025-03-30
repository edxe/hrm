document.addEventListener('DOMContentLoaded', () => {
    console.log('Academic Leadership Portfolio loaded successfully!');
    
    // Initialize core functionality
    initCore();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Core initialization function
function initCore() {
    initLanguageSystem();
    createScrollProgressIndicator();
    createBackgroundPattern();
    createVisionPillars();
    initializeInteractions();
    highlightNav();
    initPublicationFilters();
    enhanceResearchCards();
    initCredentialsTooltips();
    addLeadershipBadges();
    initPublicationsFilter();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Set up global event listeners
function setupEventListeners() {
    // Apply scroll-based animations
    window.addEventListener('scroll', handleScroll);
    
    // Handle mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const sideNav = document.querySelector('.side-nav');
            if (sideNav) {
                sideNav.classList.toggle('active');
                sideNav.classList.remove('hidden'); // Remove hidden class when toggling mobile menu
                document.body.classList.remove('sidebar-hidden');
            }
        });
    }
    
    // Handle sidebar indicator click
    const sidebarIndicator = document.querySelector('.sidebar-indicator');
    if (sidebarIndicator) {
        sidebarIndicator.addEventListener('click', () => {
            const sideNav = document.querySelector('.side-nav');
            if (sideNav) {
                sideNav.classList.remove('hidden');
                document.body.classList.remove('sidebar-hidden');
            }
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Variables to track scroll position
let lastScrollTop = 0;
let scrollThreshold = 50; // Minimum scroll amount before triggering hide/show
let scrollDirection = 'none'; // Track scroll direction for more stable behavior
let scrollDirectionChangeCount = 0; // Count direction changes to prevent flickering

// Handle all scroll events in one function to improve performance
function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    updateScrollProgress();
    animateOnScroll();
    headerScrollEffect();
    
    // Determine scroll direction with some stability
    const newDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
    
    // Only change direction after consistent movement in the same direction
    if (newDirection !== scrollDirection) {
        scrollDirectionChangeCount++;
        if (scrollDirectionChangeCount > 3) { // Require 3 consistent scroll events in the same direction
            scrollDirection = newDirection;
            scrollDirectionChangeCount = 0;
        }
    } else {
        scrollDirectionChangeCount = 0; // Reset counter if continuing in same direction
    }
    
    // Hide/show sidebar based on scroll direction
    const sideNav = document.querySelector('.side-nav');
    if (sideNav && !sideNav.classList.contains('active')) { // Don't hide if mobile menu is active
        if (scrollDirection === 'down' && currentScrollTop > scrollThreshold) {
            // Scrolling down - hide sidebar
            sideNav.classList.add('hidden');
            document.body.classList.add('sidebar-hidden');
        } else if (scrollDirection === 'up' || currentScrollTop <= scrollThreshold) {
            // Scrolling up or at top - show sidebar
            sideNav.classList.remove('hidden');
            document.body.classList.remove('sidebar-hidden');
        }
    }
    
    // Hide scroll indicator when user starts scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && currentScrollTop > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else if (scrollIndicator && currentScrollTop <= 100) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
    
    // Update last scroll position
    lastScrollTop = currentScrollTop;
}

// Initialize language system for bilingual support
function initLanguageSystem() {
    // Get language toggle buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    if (!langButtons.length) return;
    
    // Check if user has a language preference stored
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Set initial language
    switchLanguage(savedLang);
    
    // Highlight the active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        }
    });
    
    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
}

// Switch language function
function switchLanguage(lang) {
    // Update all elements with data-lang-* attributes
    document.querySelectorAll('[data-lang-en], [data-lang-es]').forEach(element => {
        const translation = element.getAttribute(`data-lang-${lang}`);
        if (translation) {
            // If it's an input with placeholder
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } 
            // If it's an element with value (like buttons)
            else if (element.hasAttribute('value')) {
                element.setAttribute('value', translation);
            }
            // For regular elements
            else {
                element.innerHTML = translation;
            }
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const descriptions = {
            'en': 'Dr. Jane Smith - Economist & Academic Leader. Portfolio showcasing research, publications, and leadership experience.',
            'es': 'Dra. Jane Smith - Economista y Líder Académica. Portafolio que muestra investigación, publicaciones y experiencia de liderazgo.'
        };
        metaDescription.setAttribute('content', descriptions[lang]);
    }
    
    // Update page title
    const titles = {
        'en': 'Dr. Jane Smith | Economist & Academic Leader',
        'es': 'Dra. Jane Smith | Economista y Líder Académica'
    };
    document.title = titles[lang];
}

// Create scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) {
        // Create progress container if it doesn't exist
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';
        
        const progress = document.createElement('div');
        progress.id = 'scrollProgress';
        progress.className = 'scroll-progress';
        
        progressContainer.appendChild(progress);
        document.body.appendChild(progressContainer);
    }
    
    // Set up scroll indicator click event
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const visionSection = document.getElementById('vision');
            if (visionSection) {
                visionSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Initial update
    updateScrollProgress();
}

// Update scroll progress indicator
function updateScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
}

// Create subtle background pattern for a professional look
function createBackgroundPattern() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Only add patterns to certain sections for a clean look
        if (section.classList.contains('vision-section') || 
            section.classList.contains('research-section') || 
            section.classList.contains('leadership-section')) {
            
            // Check if pattern already exists
            if (section.querySelector('.bg-pattern')) return;
            
            // Create a subtle dot pattern
            const pattern = document.createElement('div');
            pattern.classList.add('bg-pattern');
            pattern.style.position = 'absolute';
            pattern.style.top = '0';
            pattern.style.left = '0';
            pattern.style.width = '100%';
            pattern.style.height = '100%';
            pattern.style.opacity = '0.03';
            pattern.style.pointerEvents = 'none';
            pattern.style.zIndex = '0';
            
            // Create grid of dots
            for (let i = 0; i < 50; i++) {
                const dot = document.createElement('div');
                dot.style.position = 'absolute';
                dot.style.width = '4px';
                dot.style.height = '4px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = '#4a4a4a';
                
                // Random positioning
                dot.style.top = Math.random() * 100 + '%';
                dot.style.left = Math.random() * 100 + '%';
                
                pattern.appendChild(dot);
            }
            
            // Add a few floating elements for subtle movement
            createFloatingElements(pattern);
            
            // Add the pattern behind the content
            section.insertBefore(pattern, section.firstChild);
            
            // Add section-specific enhancements
            enhanceSection(section);
        }
    });
}

// Create floating elements for subtle animation
function createFloatingElements(container) {
    // Create 3 floating elements with different sizes and speeds
    for (let i = 0; i < 3; i++) {
        const floater = document.createElement('div');
        
        // Size varies by element
        const size = 30 + (i * 20);
        
        floater.style.position = 'absolute';
        floater.style.width = size + 'px';
        floater.style.height = size + 'px';
        floater.style.borderRadius = '50%';
        floater.style.border = '1px solid rgba(74, 74, 74, 0.1)';
        floater.style.pointerEvents = 'none';
        
        // Random starting positions
        floater.style.top = Math.random() * 80 + 10 + '%';
        floater.style.left = Math.random() * 80 + 10 + '%';
        
        // Store original position for animation
        const originalTop = parseFloat(floater.style.top);
        const originalLeft = parseFloat(floater.style.left);
        
        // Different speeds for each element
        const speed = 0.5 + (i * 0.2);
        
        // Animation range
        const range = 5 + (i * 2);
        
        // Animation timestamp
        let timestamp = 0;
        
        // Animation function
        function move() {
            timestamp += 0.01;
            
            // Gentle sine wave movement
            const newTop = originalTop + Math.sin(timestamp * speed) * range;
            const newLeft = originalLeft + Math.cos(timestamp * speed) * range;
            
            floater.style.top = newTop + '%';
            floater.style.left = newLeft + '%';
            
            requestAnimationFrame(move);
        }
        
        // Start animation
        requestAnimationFrame(move);
        
        container.appendChild(floater);
    }
}

// Initialize all interactions
function initializeInteractions() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile nav if open
            const sideNav = document.querySelector('.side-nav');
            if (sideNav) {
                sideNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Initialize scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const visionSection = document.getElementById('vision');
            if (visionSection) {
                window.scrollTo({
                    top: visionSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Add leadership badges to timeline items
function addLeadershipBadges() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;
    
    const badges = [
        { icon: 'star', text: 'Senior Leadership' },
        { icon: 'star', text: 'Academic Leadership' },
        { icon: 'star', text: 'Department Leadership' },
        { icon: 'star', text: 'Research Leadership' }
    ];
    
    timelineItems.forEach((item, index) => {
        // Create badge if it doesn't exist
        if (!item.querySelector('.leadership-badge')) {
            const badge = document.createElement('div');
            badge.className = 'leadership-badge';
            
            const icon = document.createElement('i');
            icon.className = `fas fa-${badges[index % badges.length].icon}`;
            
            const text = document.createElement('span');
            text.textContent = badges[index % badges.length].text;
            
            badge.appendChild(icon);
            badge.appendChild(text);
            
            // Add the badge to the timeline content
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.appendChild(badge);
            }
        }
        
        // Add animation classes
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Animate on scroll
        observeElement(item, () => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 200);
        });
    });
}

// Enhance sections with additional visual elements
function enhanceSection(section) {
    // Add specific enhancements based on section type
    if (section.classList.contains('vision-section')) {
        // Add subtle university icon watermark
        const watermark = document.createElement('div');
        watermark.style.position = 'absolute';
        watermark.style.bottom = '10%';
        watermark.style.right = '5%';
        watermark.style.width = '150px';
        watermark.style.height = '150px';
        watermark.style.opacity = '0.03';
        watermark.style.pointerEvents = 'none';
        watermark.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path fill=\'%231d3557\' d=\'M12 3L1 9l11 6l11-6L12 3m0 15c-3.33 0-6-1.34-6-3v4c0 1.66 2.67 3 6 3s6-1.34 6-3v-4c0 1.66-2.67 3-6 3z\'/></svg>")';
        watermark.style.backgroundSize = 'contain';
        watermark.style.backgroundRepeat = 'no-repeat';
        watermark.style.backgroundPosition = 'center';
        watermark.style.zIndex = '0';
        
        section.appendChild(watermark);
    } else if (section.classList.contains('research-section')) {
        // Add subtle graph lines
        const graphLines = document.createElement('div');
        graphLines.style.position = 'absolute';
        graphLines.style.top = '0';
        graphLines.style.right = '0';
        graphLines.style.width = '200px';
        graphLines.style.height = '200px';
        graphLines.style.opacity = '0.03';
        graphLines.style.pointerEvents = 'none';
        graphLines.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path fill=\'none\' stroke=\'%231d3557\' stroke-width=\'2\' d=\'M10,90 L90,10 M30,90 L90,30 M50,90 L90,50 M70,90 L90,70\'/></svg>")';
        graphLines.style.backgroundSize = 'contain';
        graphLines.style.backgroundRepeat = 'no-repeat';
        graphLines.style.backgroundPosition = 'top right';
        graphLines.style.zIndex = '0';
        
        section.appendChild(graphLines);
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.timeline-item)');
    fadeElements.forEach((element, index) => {
        observeElement(element, () => {
            setTimeout(() => {
                element.classList.add('show');
            }, index * 100);
        });
    });
    
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach((element, index) => {
        observeElement(element, () => {
            setTimeout(() => {
                element.classList.add('show');
            }, index * 100);
        });
    });
    
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach((element, index) => {
        observeElement(element, () => {
            setTimeout(() => {
                element.classList.add('show');
            }, index * 100);
        });
    });
    
    // Also animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
        timelineItems.forEach((item, index) => {
            observeElement(item, () => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 200);
            });
        });
    }
}

// Helper function to observe elements and trigger callback when they enter viewport
function observeElement(element, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(element);
}

// Highlight active navigation based on scroll position
function highlightNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If we've scrolled past the top of the section
            if (pageYOffset >= sectionTop - 200) {
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
}

// Add subtle header effect on scroll
function headerScrollEffect() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;
    
    if (window.scrollY > 100) {
        sideNav.style.boxShadow = '2px 0 20px rgba(0, 0, 0, 0.2)';
    } else {
        sideNav.style.boxShadow = '2px 0 10px rgba(0, 0, 0, 0.1)';
    }
}

// Initialize publication filters
function initPublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    if (!filterButtons.length || !publicationItems.length) return;
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter publications
            publicationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-type').includes(filterValue)) {
                    item.style.display = 'flex';
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Enhance research cards with subtle effects
function enhanceResearchCards() {
    const cards = document.querySelectorAll('.research-card');
    
    if (!cards.length) return;
    
    cards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 20px rgba(74, 74, 74, 0.15)';
            
            // Highlight icon
            const icon = card.querySelector('.icon');
            if (icon) {
                icon.style.color = '#c45108';
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(74, 74, 74, 0.1)';
            
            // Reset icon
            const icon = card.querySelector('.icon');
            if (icon) {
                icon.style.color = '#8b2703';
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize tooltips for academic credentials
function initCredentialsTooltips() {
    const credentials = document.querySelectorAll('.credential');
    
    if (!credentials.length) return;
    
    credentials.forEach(credential => {
        // Add click handler for mobile
        credential.addEventListener('click', () => {
            const tooltip = credential.getAttribute('data-tooltip');
            if (tooltip) {
                showNotification(tooltip, 'success');
            }
        });
    });
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        const errorMessage = document.documentElement.lang === 'en' 
            ? 'Please fill in all fields.' 
            : 'Por favor, complete todos los campos.';
        showNotification(errorMessage, 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const errorMessage = document.documentElement.lang === 'en' 
            ? 'Please enter a valid email address.' 
            : 'Por favor, ingrese una dirección de correo electrónico válida.';
        showNotification(errorMessage, 'error');
        return;
    }
    
    // Simulate form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.reset();
    }
    
    // Show success message
    const successMessage = document.documentElement.lang === 'en' 
        ? 'Thank you for your message! We will get back to you soon.' 
        : 'Gracias por su mensaje! Nos pondremos en contacto con usted pronto.';
    showNotification(successMessage, 'success');
}

// Show notification
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        document.body.removeChild(notification);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add to the DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Create vision pillars
function createVisionPillars() {
    const visionPillarsContainer = document.querySelector('.vision-pillars');
    if (!visionPillarsContainer) return;
    
    // Check if pillars already exist
    if (visionPillarsContainer.children.length > 0) {
        // Enhance existing pillars
        const pillars = visionPillarsContainer.querySelectorAll('.vision-pillar');
        pillars.forEach(pillar => {
            // Add animation classes
            pillar.classList.add('fade-in');
            
            // Update icons to match the design
            const icon = pillar.querySelector('.icon');
            if (icon) {
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    // Make sure icons are using the correct classes
                    if (iconElement.classList.contains('fa-graduation-cap')) {
                        iconElement.className = 'fas fa-graduation-cap';
                    } else if (iconElement.classList.contains('fa-globe')) {
                        iconElement.className = 'fas fa-globe';
                    } else if (iconElement.classList.contains('fa-balance-scale')) {
                        iconElement.className = 'fas fa-balance-scale';
                    } else if (iconElement.classList.contains('fa-handshake')) {
                        iconElement.className = 'fas fa-handshake';
                    }
                }
            }
        });
        
        // Trigger animations when scrolled into view
        animateOnScroll();
        return;
    }
    
    // Vision pillar data
    const pillars = [
        {
            icon: 'graduation-cap',
            title: {
                en: 'Academic Excellence',
                es: 'Excelencia Académica'
            },
            description: {
                en: 'Strengthening our commitment to rigorous scholarly inquiry and outstanding teaching.',
                es: 'Fortaleciendo nuestro compromiso con la investigación académica rigurosa y la enseñanza sobresaliente.'
            }
        },
        {
            icon: 'globe',
            title: {
                en: 'Global Perspective',
                es: 'Perspectiva Global'
            },
            description: {
                en: 'Expanding our international partnerships and preparing students for global citizenship.',
                es: 'Ampliando nuestras asociaciones internacionales y preparando a los estudiantes para la ciudadanía global.'
            }
        },
        {
            icon: 'balance-scale',
            title: {
                en: 'Financial Sustainability',
                es: 'Sostenibilidad Financiera'
            },
            description: {
                en: 'Ensuring responsible resource management while expanding opportunities for all students.',
                es: 'Asegurando una gestión responsable de los recursos mientras se amplían las oportunidades para todos los estudiantes.'
            }
        },
        {
            icon: 'handshake',
            title: {
                en: 'Community Engagement',
                es: 'Compromiso Comunitario'
            },
            description: {
                en: 'Strengthening ties with our local community through meaningful collaboration.',
                es: 'Fortaleciendo los lazos con nuestra comunidad local a través de una colaboración significativa.'
            }
        }
    ];
    
    // Get current language
    const currentLang = document.documentElement.lang || 'en';
    
    // Create pillars
    pillars.forEach((pillar, index) => {
        const pillarElement = document.createElement('div');
        pillarElement.className = 'vision-pillar fade-in';
        pillarElement.style.animationDelay = `${index * 0.2}s`;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'icon';
        iconElement.innerHTML = `<i class="fas fa-${pillar.icon}"></i>`;
        
        const titleElement = document.createElement('h4');
        titleElement.textContent = pillar.title[currentLang];
        titleElement.setAttribute('data-lang-en', pillar.title.en);
        titleElement.setAttribute('data-lang-es', pillar.title.es);
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = pillar.description[currentLang];
        descriptionElement.setAttribute('data-lang-en', pillar.description.en);
        descriptionElement.setAttribute('data-lang-es', pillar.description.es);
        
        pillarElement.appendChild(iconElement);
        pillarElement.appendChild(titleElement);
        pillarElement.appendChild(descriptionElement);
        
        visionPillarsContainer.appendChild(pillarElement);
    });
    
    // Trigger animations
    animateOnScroll();
}

// Initialize publications filtering
function initPublicationsFilter() {
    const filterButtons = document.querySelectorAll('.publications-filter .filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    if (!filterButtons.length || !publicationItems.length) return;
    
    // Add animation classes to publication items
    publicationItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        setTimeout(() => {
            item.classList.add('show');
        }, 100 + (index * 100));
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter publications
            publicationItems.forEach(item => {
                item.classList.remove('show');
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-type').includes(filterValue)) {
                        item.style.display = 'flex';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}