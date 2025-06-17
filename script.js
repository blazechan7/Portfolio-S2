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
    
    // Functie om de navbar zichtbaar te maken
    const showNavbar = () => {
        if (navbar) {
            try {
                requestAnimationFrame(() => {
                    navbar.classList.add('visible');
                });
            } catch (e) {
                console.warn('Error showing navbar:', e);
                // Fallback
                navbar.classList.add('visible');
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

    // Smooth scroll when clicking menu links
    navLinks.forEach(anchor => {
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

    // Navbar scroll behavior
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        try {
            if (!navbar) return;

            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Hide the navbar when scrolling down and past threshold
                navbar.classList.add('scrolled');
            } else {
                // Show the navbar when scrolling up or at top
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        } catch (e) {
            console.warn('Error in scroll behavior:', e);
        }
    });

    // Make a hover-zone at the top of the page
    try {
        const hoverZone = document.createElement('div');
        Object.assign(hoverZone.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '20px',
            zIndex: '999'
        });
        document.body.appendChild(hoverZone);
        
        // Show navbar on hover
        hoverZone.addEventListener('mouseenter', () => {
            navbar.classList.remove('scrolled');
        });
    } catch (e) {
        console.warn('Error creating hover zone:', e);
    }

});
