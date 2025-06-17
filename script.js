'use strict';

// Initialize boxes and start website functions
document.addEventListener('DOMContentLoaded', () => {
    // Veilig elementen ophalen
    const safeQuerySelector = (selector) => {
        try {
            return document.querySelector(selector);
        } catch (e) {
            console.warn(`Error selecting ${selector}:`, e);
            return null;
        }
    };

    const safeQuerySelectorAll = (selector) => {
        try {
            return document.querySelectorAll(selector);
        } catch (e) {
            console.warn(`Error selecting all ${selector}:`, e);
            return [];
        }
    };

    // Hoofdelementen
    const pixelDividers = safeQuerySelectorAll('.pixel-divider');
    const navbar = safeQuerySelector('nav');
    const loadingScreen = safeQuerySelector('#loading-screen');
    const hasVisited = sessionStorage.getItem('hasVisitedPortfolio');
    
    // Zorg ervoor dat de navbar initieel verborgen is
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'none';

        // Reset de transitie na een korte vertraging
        setTimeout(() => {
            navbar.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);
    }

    // Functie om de navbar zichtbaar te maken
    const showNavbar = () => {
        if (!navbar) return;

        try {
            // Gebruik een timeout om de browser tijd te geven om de transitie te resetten
            setTimeout(() => {
                requestAnimationFrame(() => {
                    navbar.classList.add('visible');
                    navbar.style.opacity = '1';
                });
            }, 150);
        } catch (e) {
            console.warn('Error showing navbar:', e);
            // Fallback
            if (navbar) {
                navbar.classList.add('visible');
                navbar.style.opacity = '1';
            }
        }
    };

    // Direct de navbar voorbereiden
    if (!hasVisited) {
        // Eerste bezoek: wacht op loading screen
        setTimeout(showNavbar, 2800); // Start transitie iets voor loading screen eindigt
    } else {
        // Herhalend bezoek: direct tonen
        showNavbar();
    }

    if (pixelDividers.length > 0) {
        // Check screen width
        const screenWidth = window.innerWidth;
        const pixelSize = 10; // each pixel is 10px wide
        const numberOfPixels = Math.ceil(screenWidth / pixelSize) + 1; 
        
        // Loop through all pixel rows and create boxes
        pixelDividers.forEach(pixelDivider => {
            // Clear the row first
            pixelDivider.innerHTML = '';
            
            // Create a new box for each piece
            for (let i = 0; i < numberOfPixels; i++) {
                const pixelItem = document.createElement('div');
                pixelItem.classList.add('pixel-divider-item');
                pixelDivider.appendChild(pixelItem);
            }
        });
    }

    // Loading screen handling
    if (loadingScreen) {
        if (hasVisited) {
            // If already visited, hide immediately
            loadingScreen.style.display = 'none';
        } else {
            // First visit: show loading screen
            sessionStorage.setItem('hasVisitedPortfolio', 'true');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 3100);
        }
    }

    // Mobile navigation
    const nav = safeQuerySelector('.nav-links');
    const navLinks = safeQuerySelectorAll('.nav-links li');

    // Smooth scroll when clicking menu links - verbeterde versie
    const allAnchorLinks = safeQuerySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = safeQuerySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            } catch (e) {
                console.warn('Error in smooth scroll:', e);
            }
        });
    });

    // Scroll reveal animation
    function revealOnScroll() {
        const sections = safeQuerySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Update active menu item on scroll
    window.addEventListener('scroll', () => {
        const sections = safeQuerySelectorAll('.section');
        const navLinks = safeQuerySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
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

    // Scroll behavior met throttling
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        // Gebruik een timeout om de scroll handler te throttlen
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                try {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    
                    lastScrollY = currentScrollY;
                } catch (e) {
                    console.warn('Error in scroll handler:', e);
                }
                
                scrollTimeout = null;
            }, 16); // ~60fps throttling
        }
    });

    // Hover zone aan de top van de pagina (van script-Blaze.js)
    try {
        const hoverZone = document.createElement('div');
        hoverZone.style.position = 'fixed';
        hoverZone.style.top = '0';
        hoverZone.style.left = '0';
        hoverZone.style.width = '100%';
        hoverZone.style.height = '20px';
        hoverZone.style.zIndex = '999';
        hoverZone.style.pointerEvents = 'auto';
        document.body.appendChild(hoverZone);
        
        // Show navbar on hover
        hoverZone.addEventListener('mouseenter', () => {
            if (navbar) {
                navbar.classList.remove('scrolled');
            }
        });
    } catch (e) {
        console.warn('Error creating hover zone:', e);
    }

    // Window resize handler voor responsive pixel dividers
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(() => {
            if (pixelDividers.length > 0) {
                const screenWidth = window.innerWidth;
                const pixelSize = 10;
                const numberOfPixels = Math.ceil(screenWidth / pixelSize) + 1;
                
                pixelDividers.forEach(pixelDivider => {
                    pixelDivider.innerHTML = '';
                    
                    for (let i = 0; i < numberOfPixels; i++) {
                        const pixelItem = document.createElement('div');
                        pixelItem.classList.add('pixel-divider-item');
                        pixelDivider.appendChild(pixelItem);
                    }
                });
            }
        }, 250); // Debounce resize events
    });
});
