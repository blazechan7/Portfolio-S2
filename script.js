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
    // Verwijderd omdat er nu maar één tab is (overview)

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
            } else {
                // User is at the top of the page, always show navbar
                navbar.classList.add('visible');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Make the navbar visible by default when the page loads
    window.addEventListener('load', () => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    });

    // Make sure navbar is visible once loading screen is removed
    setTimeout(() => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    }, 3200); // Slightly longer than the loading screen timeout

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

    // Project details modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsModal = document.getElementById('project-details-modal');
    const projectDetailsClose = document.querySelector('.project-details-close');
    const projectDetailsTabs = document.querySelectorAll('.project-details-tab');
    const projectDetailsPanes = document.querySelectorAll('.project-details-pane');
    const projectDetailsTitle = document.querySelector('.project-details-title');

    // Project data - hier kun je de echte data voor elk project toevoegen
    const projectsData = {
        "1": {
            "title": "Project 1",
            "info": {
                "title": "Project 1 Informatie",
                "content": "Dit is gedetailleerde informatie over Project 1. Je kunt hier alle belangrijke aspecten van het project beschrijven, zoals het doel, de gebruikte technologieën, en de resultaten die je hebt bereikt. Je kunt deze tekst aanpassen aan je eigen project inhoud."
            },
            "process": {
                "title": "Project 1 Proces",
                "content": "Hier kun je het proces beschrijven dat je hebt doorlopen om Project 1 te maken. Dit kan onderzoek, ontwerp, implementatie, en evaluatie omvatten. Je kunt ook uitdagingen vermelden die je hebt overwonnen en wat je hebt geleerd van het project."
            }
        },
        "2": {
            "title": "Project 2",
            "info": {
                "title": "Project 2 Informatie",
                "content": "Dit is gedetailleerde informatie over Project 2. Een langere beschrijving van het project, met meer details over de implementatie, functionaliteiten en technische aspecten. Hier kun je dieper ingaan op de details van je project."
            },
            "process": {
                "title": "Project 2 Proces",
                "content": "Het werkproces voor Project 2 omvatte verschillende fases. Eerst heb ik onderzoek gedaan naar de behoeften van de gebruikers, vervolgens heb ik wireframes en prototypes gemaakt, en uiteindelijk de implementatie gedaan. Tijdens het project heb ik verschillende iteraties doorlopen en feedback verwerkt."
            }
        },
        "3": {
            "title": "Project 3",
            "info": {
                "title": "Project 3 Informatie",
                "content": "Project 3 is een interactief ontwerp gericht op het verbeteren van gebruikerservaringen. In dit project heb ik gewerkt aan het ontwikkelen van een intuïtieve interface die zowel functioneel als esthetisch aantrekkelijk is."
            },
            "process": {
                "title": "Project 3 Proces",
                "content": "Voor Project 3 heb ik een gebruikersgericht ontwerpproces gevolgd. Dit omvatte het verzamelen van gebruikersfeedback, het itereren van ontwerpen op basis van deze feedback, en het implementeren van het uiteindelijke ontwerp met behulp van moderne technieken."
            }
        }
    };

    // Open project details modal when clicking on a project card
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.view-project-btn');
        
        viewButton.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            // Update modal content with project data
            projectDetailsTitle.textContent = projectData.title;
            
            // Update Info tab content
            const infoPane = document.getElementById('project-info');
            infoPane.querySelector('h3').textContent = projectData.info.title;
            infoPane.querySelector('p').textContent = projectData.info.content;
            
            // Update Process tab content
            const processPane = document.getElementById('project-process');
            processPane.querySelector('h3').textContent = projectData.process.title;
            processPane.querySelector('p').textContent = projectData.process.content;
            
            // Show the first tab (Info) by default
            projectDetailsTabs.forEach(tab => tab.classList.remove('active'));
            projectDetailsPanes.forEach(pane => pane.classList.remove('active'));
            projectDetailsTabs[0].classList.add('active');
            projectDetailsPanes[0].classList.add('active');
            
            // Show modal
            projectDetailsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close project details modal
    projectDetailsClose.addEventListener('click', () => {
        projectDetailsModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside of content
    projectDetailsModal.addEventListener('click', (e) => {
        if (e.target === projectDetailsModal) {
            projectDetailsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Project details tab functionality
    projectDetailsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            projectDetailsTabs.forEach(t => t.classList.remove('active'));
            projectDetailsPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
