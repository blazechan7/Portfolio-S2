// Generate pixel divider elements and initialize website functionality
document.addEventListener('DOMContentLoaded', () => {
    const pixelDividers = document.querySelectorAll('.pixel-divider');
    
    if (pixelDividers.length > 0) {
        // Calculate how many pixels we need for the screen width
        const screenWidth = window.innerWidth;
        const pixelSize = 10; // Each pixel is 10px wide
        const numberOfPixels = Math.ceil(screenWidth / pixelSize) + 1; // +1 to be sure
        
        // Loop through all pixel dividers and create elements
        pixelDividers.forEach(pixelDivider => {
            // Clear any existing pixel divider items first
            pixelDivider.innerHTML = '';
            
            // Create the pixel elements for each divider
            for (let i = 0; i < numberOfPixels; i++) {
                const pixelItem = document.createElement('div');
                pixelItem.classList.add('pixel-divider-item');
                pixelDivider.appendChild(pixelItem);
            }
        });
    }

    // Loading Screen - wait for full animation (3s) before disappearing
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 3100); // Wait slightly longer than the animation (3s) to ensure it's fully loaded

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for menu links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for the navigation bar
                behavior: 'smooth'
            });
        });
    });

    // Tab functionality for projects
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remove active class from all panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Scroll Reveal Animation
    function revealOnScroll() {
        const sections = document.querySelectorAll('.section');
        
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

    // Add active section class to the navigation menu during scrolling
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
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
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Pixels to scroll before hiding navbar
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Check if user is scrolling down and past threshold
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('visible');
        } else {
            // User is scrolling up or at the top
            navbar.classList.remove('scrolled');
            if (currentScrollY > scrollThreshold) {
                navbar.classList.add('visible');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Create a hover detection zone at the top of the page
    const hoverZone = document.createElement('div');
    hoverZone.style.position = 'fixed';
    hoverZone.style.top = '0';
    hoverZone.style.left = '0';
    hoverZone.style.width = '100%';
    hoverZone.style.height = '20px';
    hoverZone.style.zIndex = '99';
    document.body.appendChild(hoverZone);
    
    // Show navbar when hovering at the top
    hoverZone.addEventListener('mouseenter', () => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    });
});
