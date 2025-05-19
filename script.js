// Maak vakjes aan en start de functies van de website
document.addEventListener('DOMContentLoaded', () => {
    const pixelDividers = document.querySelectorAll('.pixel-divider');
    
    if (pixelDividers.length > 0) {
        // Kijk hoe breed het scherm is
        const screenWidth = window.innerWidth;
        const pixelSize = 10; // elk pixel is 10px wijd
        const numberOfPixels = Math.ceil(screenWidth / pixelSize) + 1; 
        
        // Loop door alle pixel-rijen en maak vakjes aan
        pixelDividers.forEach(pixelDivider => {
            // Maak de rij eerst leeg
            pixelDivider.innerHTML = '';
            
            // Maak een nieuw vakje voor elk stukje
            for (let i = 0; i < numberOfPixels; i++) {
                const pixelItem = document.createElement('div');
                pixelItem.classList.add('pixel-divider-item');
                pixelDivider.appendChild(pixelItem);
            }
        });
    }

    // Laadscherm: Wacht tot de animatie klaar is (3s) voordat het verdwijnt
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0'; // maak langzaam onzichtbaar
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // helemaal verbergen
            }, 500); // wacht nog een halve seconde
        }
    }, 3100); // wacht iets langer dan de animatie (3 seconden)

    // Navigatie voor mobiel
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Soepel scrollen als je op een menu link klikt
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Sluit het menu op mobiel als het open is
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                
                navLinks.forEach(link => {
                    link.style.animation = ''; // stop de animatie van de menu items
                });
            }
            
            const targetId = this.getAttribute('href'); // haal de naam op van waar je naartoe moet scrollen
            const targetElement = document.querySelector(targetId); // zoek het element dat bij die naam hoort
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // scroll naar dat element, 70 pixels omhoog om ruimte te laten voor het menu
                behavior: 'smooth'
            });
        });
    });

    // Scroll reveal animatie
    function revealOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top; // kijk hoe ver het onderdeel van boven is
            const windowHeight = window.innerHeight; // hoogte van het scherm
            const revealPoint = 150; // wanneer het 150 pixels van onderen is, mag het zichtbaar worden
            
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('active'); // voeg 'active' toe zodat de animatie start
            }
        });
    }

    // Als je scrollt, laat dan onderdelen zien
    window.addEventListener('scroll', revealOnScroll);

    // Als je scrollt, maak het menu actiever (laat zien waar je bent)
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = ''; // hier slaan we op waar we nu zijn
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Als we voorbij het onderdeel zijn (100px erboven), dan is dit het huidige onderdeel
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Verwijder eerst de actieve stijl bij alle links
        navLinks.forEach(link => {
            link.classList.remove('active');

            // Voeg 'active' toe aan de link die past bij waar we zijn
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar scroll 
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // aantal pixels die je moet scrollen voor de navbar verdwijnt
    
    // Pijltjes om naar beneden te scrollen
    const scrollArrows = document.querySelectorAll('.scroll-arrows-container');
    if (scrollArrows.length > 0) {
        scrollArrows.forEach(arrows => {
            // Als er op een pijltje geklikt wordt
            arrows.addEventListener('click', () => {
                // Bepaal de volgende sectie op basis van de huidige sectie
                const currentSection = arrows.closest('.section');
                let targetSection;
                
                if (currentSection.id === 'home') {
                    targetSection = document.querySelector('#about');
                } else if (currentSection.id === 'about') {
                    targetSection = document.querySelector('#projects');
                }
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20, // Verlaagd van 70 naar 20 voor meer scroll
                        behavior: 'smooth'
                    });
                }
            });
            
            arrows.style.cursor = 'pointer';
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Als je naar beneden scrolt en voorbij het drempelpunt bent
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Verberg de navbar
            navbar.classList.add('scrolled');
            navbar.classList.remove('visible');
        } else {
            // Je scrolt omhoog of bent bovenaan
            navbar.classList.remove('scrolled');
            if (currentScrollY > scrollThreshold) {
                // Laat de navbar zien (maar alleen als je niet helemaal bovenaan bent)
                navbar.classList.add('visible');
            } else {
                // Helemaal bovenaan? Laat navbar altijd zien
                navbar.classList.add('visible');
            }
        }
        
        lastScrollY = currentScrollY; // sla de huidige scrollpositie op
    });
    
    // Maak de navbar zichtbaar zodra de pagina is geladen
    window.addEventListener('load', () => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    });

    // Maak de navbar zichtbaar zodra de laadscherm is verdwenen
    setTimeout(() => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    }, 3200); 

    // Maak een hover-zone bovenaan de pagina
    const hoverZone = document.createElement('div');
    hoverZone.style.position = 'fixed'; // Zet het vast bovenaan de pagina
    hoverZone.style.top = '0'; 
    hoverZone.style.left = '0';
    hoverZone.style.width = '100%';
    hoverZone.style.height = '20px';
    hoverZone.style.zIndex = '99';
    document.body.appendChild(hoverZone);
    
    // Maak de navbar zichtbaar als je met de muis bovenaan de pagina komt
    hoverZone.addEventListener('mouseenter', () => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    });

    // Functionaliteit voor het projectdetails modal
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsModal = document.getElementById('project-details-modal');
    const projectDetailsClose = document.querySelector('.project-details-close');
    const projectDetailsTabs = document.querySelectorAll('.project-details-tab');
    const projectDetailsPanes = document.querySelectorAll('.project-details-pane');
    const projectDetailsTitle = document.querySelector('.project-details-title');

    // Project data 
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

    // Open project details modal 
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
            document.body.style.overflow = 'hidden'; // Voorkomt scrollen als het open is
        });
    });

    // Sluit het projectdetails modal
    projectDetailsClose.addEventListener('click', () => {
        projectDetailsModal.style.display = 'none';
        document.body.style.overflow = ''; // herstel scrolling
    });

    // Sluit het modaal wanneer je buiten de inhoud klikt
    projectDetailsModal.addEventListener('click', (e) => {
        if (e.target === projectDetailsModal) {
            projectDetailsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Project details tab functionality
    projectDetailsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
             // Verwijder de 'active' klasse van alle tabs en bijbehorende inhoud
            projectDetailsTabs.forEach(t => t.classList.remove('active'));
            projectDetailsPanes.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
                  
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Evidence modal functionality
    const evidenceModal = document.getElementById('evidence-modal');
    const evidenceButtons = document.querySelectorAll('.view-evidence-btn');
    const evidenceClose = document.querySelector('.evidence-close');
    const evidenceSections = document.querySelectorAll('.evidence-section');

    // Open evidence modal
    evidenceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const outcomeId = button.getAttribute('data-outcome');
            
            // Hide all sections first
            evidenceSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected section
            const selectedSection = document.querySelector(`.evidence-section[data-outcome="${outcomeId}"]`);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
            
            // Show modal
            evidenceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close evidence modal
    evidenceClose.addEventListener('click', () => {
        evidenceModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    evidenceModal.addEventListener('click', (e) => {
        if (e.target === evidenceModal) {
            evidenceModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
