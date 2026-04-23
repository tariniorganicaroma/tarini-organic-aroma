/* ============================================================
   TARINI ORGANIC AROMA — JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== DOM ELEMENTS ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const newsletterForm = document.getElementById('newsletter-form');

    // ========== CREATE OVERLAY ==========
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    // ========== MOBILE MENU TOGGLE ==========
    function openMenu() {
        navMenu.classList.add('open');
        navToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // ========== STICKY NAVBAR ON SCROLL ==========
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animationObserver.observe(el));

    // ========== COLLECTION CARDS STAGGER ANIMATION ==========
    const collectionCards = document.querySelectorAll('.collection-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animation for each card
                const cards = entry.target.parentElement.querySelectorAll('.collection-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 80);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    // Only observe the first card to trigger all
    if (collectionCards.length > 0) {
        cardObserver.observe(collectionCards[0]);
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== NEWSLETTER FORM ==========
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const submitBtn = document.getElementById('newsletter-submit');
            const email = emailInput.value.trim();

            if (email) {
                // Simulate submission
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = '✓ Subscribed!';
                    submitBtn.style.background = '#25D366';
                    submitBtn.style.borderColor = '#25D366';
                    emailInput.value = '';

                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribe';
                        submitBtn.style.background = '';
                        submitBtn.style.borderColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1200);
            }
        });
    }

    // ========== PARALLAX HERO (subtle) ==========
    const heroBg = document.querySelector('.hero-bg img');

    function handleParallax() {
        if (window.innerWidth > 768 && heroBg) {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrollY <= heroHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
            }
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ========== COUNTER ANIMATION FOR TRUST BADGES ==========
    const badgeItems = document.querySelectorAll('.badge-item');

    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    badgeItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`;
        badgeObserver.observe(item);
    });

    // ========== TESTIMONIAL CARDS ANIMATION ==========
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = document.querySelectorAll('.testimonial-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 120);
                });
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    if (testimonialCards.length > 0) {
        testimonialObserver.observe(testimonialCards[0]);
    }

    // ========== TYPING EFFECT FOR HERO (optional subtle enhancement) ==========
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';

        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 100);
    }

    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        heroButtons.style.transition = 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s';

        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 100);
    }

    // ========== IMAGE LAZY LOADING FADE-IN ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // ========== RESIZE HANDLER ==========
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });

    console.log('🌿 Tarini Organic Aroma — Website loaded successfully.');
});
