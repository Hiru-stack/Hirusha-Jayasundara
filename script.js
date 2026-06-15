/**
 * Next-Generation Dark Cyber-Minimalist Portfolio Engine
 * Alex Carter - Full-Stack Engineer & Data Architect
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypewriter();
    initNodes();
    initSkillsTabs();
    initCarousel();
    initScrollAnimations();
    initFormValidation();
});

// ==========================================================================
// 1. Navigation Controller (Mobile Menu & Scroll Active States)
// ==========================================================================
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinksList = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Toggle mobile menu
    if (navToggle && navLinksList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinksList.classList.toggle('nav-active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navLinksList) {
                navToggle.classList.remove('open');
                navLinksList.classList.remove('nav-active');
            }
        });
    });

    // Scroll active link state
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120; // Offset for sticky nav header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ==========================================================================
// 2. Typewriter Effect for Hero Subsection Roles
// ==========================================================================
function initTypewriter() {
    const typedTextEl = document.getElementById('typed-text');
    if (!typedTextEl) return;

    const words = ["Data Scientist", "ML Researcher", "Data Engineer", "ICT Undergraduate"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deletion
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Standard typing pace
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Wait before starting deletion
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Brief pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing loop
    setTimeout(type, 500);
}

// ==========================================================================
// 3. SVG Node & Vector Line Highlight Linkages
// ==========================================================================
function initNodes() {
    const socialNodes = document.querySelectorAll('.social-node');
    
    socialNodes.forEach(node => {
        const lineId = node.getAttribute('data-line');
        const lineElement = document.getElementById(lineId);
        
        if (!lineElement) return;

        // Associate matching path circles
        let dotIndex = 0;
        if (lineId === 'line-github') dotIndex = 1;
        if (lineId === 'line-email') dotIndex = 2;
        if (lineId === 'line-linktree') dotIndex = 3;
        
        const dots = document.querySelectorAll('.node-dot');
        const targetDot = dots[dotIndex];

        node.addEventListener('mouseenter', () => {
            if (lineId === 'line-email') {
                lineElement.classList.add('active-orange');
            } else if (lineId === 'line-linktree') {
                lineElement.classList.add('active-green');
            } else {
                lineElement.classList.add('active');
            }
            if (targetDot) {
                targetDot.classList.add('active');
            }
        });

        node.addEventListener('mouseleave', () => {
            if (lineId === 'line-email') {
                lineElement.classList.remove('active-orange');
            } else if (lineId === 'line-linktree') {
                lineElement.classList.remove('active-green');
            } else {
                lineElement.classList.remove('active');
            }
            if (targetDot) {
                targetDot.classList.remove('active');
            }
        });
    });
}

// ==========================================================================
// 4. Custom Lightweight Javascript Project Carousel / Slider
// ==========================================================================
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    const cards = document.querySelectorAll('.project-card');

    if (!track || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) return;

    let currentIndex = 0;
    let cardWidth = getCardWidth();

    // Create Navigation Indicator Dots
    cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = idx;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function getCardWidth() {
        const firstCard = cards[0];
        const computedStyle = window.getComputedStyle(firstCard);
        const margin = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        // Include direct grid / element gap if any
        return firstCard.offsetWidth + 32; // 32px is standard flex gap in CSS layout
    }

    function updateCarousel() {
        // Handle boundary limits
        const maxIndex = cards.length - getVisibleCardsCount();
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        // Apply visual transformation
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Highlight active dots
        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentIndex) dot.classList.add('active');
        });

        // Toggle navigation button visibility states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'all';
    }

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Button event listeners
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // Handle window resizing events
    window.addEventListener('resize', () => {
        cardWidth = getCardWidth();
        updateCarousel();
    });

    // Initialize layout positions
    updateCarousel();
}

// ==========================================================================
// 5. Scroll Animations using Intersection Observer API
// ==========================================================================
function initScrollAnimations() {
    const targetCards = document.querySelectorAll('.success-card, .service-item, .skill-card, .capability-card, .research-card, .volunteer-card');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-visible');
                observer.unobserve(entry.target); // Trigger animation once per scroll life
            }
        });
    }, observerOptions);
    
    targetCards.forEach(card => {
        card.classList.add('element-hidden');
        animationObserver.observe(card);
    });
}

// ==========================================================================
// 6. Client-Side Input Form Validation with Premium Feedback UX
// ==========================================================================
function initFormValidation() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const inputWrap = document.getElementById('newsletter-input-wrap');
        
        if (!emailInput || !inputWrap) return;

        const emailValue = emailInput.value.trim();

        if (validateEmail(emailValue)) {
            // Save state & visual transition success UX indicator
            inputWrap.style.borderColor = 'var(--accent-green)';
            inputWrap.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.2)';
            
            const prevText = emailInput.placeholder;
            emailInput.value = '';
            emailInput.placeholder = 'Successfully Subscribed!';
            emailInput.disabled = true;

            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '✓ Done';
                submitBtn.style.background = 'var(--accent-green)';
                submitBtn.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.2)';
            }

            // Restore state after 4 seconds
            setTimeout(() => {
                inputWrap.style.borderColor = '';
                inputWrap.style.boxShadow = '';
                emailInput.placeholder = prevText;
                emailInput.disabled = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Subscribe';
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                }
            }, 4000);
        } else {
            // Apply error feedback states
            inputWrap.style.borderColor = 'var(--accent-orange)';
            inputWrap.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.2)';
            
            emailInput.classList.add('shake');
            setTimeout(() => {
                emailInput.classList.remove('shake');
            }, 500);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// ==========================================================================
// 7. Interactive Skills Tab Panel Switcher
// ==========================================================================
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-cat-btn');
    const panels = document.querySelectorAll('.skills-panel');
    if (tabs.length === 0 || panels.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}
