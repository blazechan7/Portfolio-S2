// Initialize boxes and start website functions
document.addEventListener('DOMContentLoaded', () => {
    const pixelDividers = document.querySelectorAll('.pixel-divider');
    
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

    // Loading screen: Only show on first visit
    const loadingScreen = document.getElementById('loading-screen');
    const hasVisited = sessionStorage.getItem('hasVisitedPortfolio');
    
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
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Smooth scroll when clicking menu links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Scroll reveal animation
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

    // Update active menu item on scroll
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

    // Project data
    const projectsData = {
        "1": {
            "title": "Agatha's Coven",
            "preview": "img/projects/agatha-preview.jpg",
            "info": {
                "title": "Project Information",
                "content": `<p>During my fall break in 2024, I made a website about Agatha from Disney+. I was inspired by how popular the "Agatha All Along" song was. I made tarot cards for each character, and when you click on them, you can read more about that character.</p>
                <p>I got the idea for the image slider from TikTok (<a href="https://www.tiktok.com/@nobody.nobody_01/video/7398778317240945926" target="_blank" class="reference-link">@nobody.nobody_01</a>). When you move your mouse over the images, they get bigger. Since I was new to making websites, this was a great way for me to learn HTML and CSS.</p>`
            },
            "process": {
                "title": "Development Process",
                "content": `<h4>1. Setup</h4>
                <p>I started by making six tarot cards that sit next to each other. I used Marvel pictures (just for learning, not for real use). When you move your mouse over a card, it gets bigger just like in the TikTok video that inspired me.</p>

                <h4>2. Text Design</h4>
                <p>I wanted to make sure people could read the text easily. I asked ChatGPT about good fonts and how to make text stand out better. I ended up using colors that look good together and become brighter when you hover over them.</p>

                <h4>3. Features</h4>
                <ul>
                    <li>Each card takes you to a page about that character</li>
                    <li>The website works well on phones and computers</li>
                    <li>Everything stays in the right place no matter how you look at it</li>
                </ul>

                <h4>4. Sound</h4>
                <p>I added music from the show. The music player has:</p>
                <ul>
                    <li>Play and pause buttons that look nice</li>
                    <li>A volume control you can slide</li>
                    <li>Music that can play again and again</li>
                    <li>Buttons that match the website's style</li>
                </ul>

                <h4>5. Skills Gained</h4>
                <ul>
                    <li>How to build basic websites with HTML and CSS</li>
                    <li>How to make things move when you hover over them</li>
                    <li>How to make websites work on all screen sizes</li>
                    <li>How to make multiple pages work together</li>
                    <li>How to add and style music controls</li>
                    <li>How to make everything look like it belongs together</li>
                </ul>

                <p>This was my first big website project. I did it because I wanted to learn, not because I had to for school. It shows how much I enjoy learning new things and making websites.</p>`
            }
        },
        "2": {
            "title": "Valentine's Interactive Card",
            "preview": "img/projects/valentine-preview.jpg",
            "info": {
                "title": "Project Information",
                "content": `<p>I made a fun Valentine's card website after seeing a cool idea on TikTok (<a href="https://www.tiktok.com/@ivy.sone5/video/7466179280360279329?q=valentine%20website&t=1742823646685" target="_blank" class="reference-link">@ivy.sone5</a>). On my website, you can choose 'Yes' or 'No', see happy or sad cats, and open a special Valentine's letter if you know the password. I made this to practice my JavaScript skills after learning about it in semester 2.</p>`
            },
            "process": {
                "title": "Development Process",
                "content": `<h4>1. Choice System</h4>
                <ul>
                    <li>The 'No' button gets smaller and the 'Yes' button gets bigger</li>
                    <li>Cats look happy or sad based on your choice</li>
                    <li>Confetti appears when you pick 'Yes'</li>
                    <li>It's made so you have to pick 'Yes' eventually (in a fun way!)</li>
                </ul>

                <h4>2. Secret Letter</h4>
                <ul>
                    <li>You need a password to open the letter</li>
                    <li>Hints show up when you hover over things</li>
                    <li>The envelope opens with a nice animation</li>
                    <li>The message stays safe until you enter the right password</li>
                </ul>

                <h4>3. Visual Effects</h4>
                <ul>
                    <li>Hearts float around the screen using JavaScript</li>
                    <li>Everything moves smoothly</li>
                    <li>Confetti falls when you make the right choice</li>
                    <li>Colors change to match the mood</li>
                </ul>

                <h4>4. Challenges</h4>
                <ul>
                    <li>Sometimes the animations are a bit slow</li>
                    <li>The website doesn't always look perfect on all screens</li>
                    <li>Making all the interactive parts work together was tricky</li>
                </ul>

                <h4>5. Learning</h4>
                <ul>
                    <li>Better JavaScript Skills:
                        <ul>
                            <li>Making and changing website parts with code</li>
                            <li>Making buttons and other things work</li>
                            <li>Keeping track of what users do</li>
                        </ul>
                    </li>
                    <li>Making Things Move:
                        <ul>
                            <li>Creating smooth movements with CSS</li>
                            <li>Using animation tools</li>
                            <li>Making my own animations</li>
                        </ul>
                    </li>
                    <li>Making Things Easy to Use:
                        <ul>
                            <li>Showing users when something happens</li>
                            <li>Revealing things bit by bit</li>
                            <li>Making the website fun to use</li>
                        </ul>
                    </li>
                    <li>Solving Problems:
                        <ul>
                            <li>Fixing animation timing issues</li>
                            <li>Keeping the password system safe</li>
                            <li>Making everything work together nicely</li>
                        </ul>
                    </li>
                </ul>

                <p>While some things could be better, like how it looks on different screens and how fast things move, this project helped me learn a lot about making interactive websites.</p>`
            }
        },
        "3": {
            "title": "Cardan Experience Platform",
            "preview": "img/projects/cardan-preview.jpg",
            "info": {
                "title": "Project Information",
                "content": `<p>An interactive website that allows users to experience web browsing with various disabilities, focusing on digital accessibility and inclusivity. This project demonstrates the challenges faced by people with visual impairments in their daily digital interactions.</p>
                <p><a href="https://www.figma.com/design/WkqRhlysMfou34FWQrZkSV/dev-cardan?node-id=0-1&t=zOP3pew8JHo4SGFB-1" target="_blank" class="reference-link">View Figma Prototype</a></p>
                <p><a href="docs/dev.pdf" target="_blank" class="reference-link">View Development Documentation</a></p>`
            },
            "process": {
                "title": "Development Process",
                "content": `<h4>1. Fresh Start with New Concept</h4>
                <p>For the development phase, we started over with a new idea and designed a new prototype. We focused on color blindness in daily life and particularly took on the topic of grocery shopping.</p>

                <h4>2. Empathy Through Experience</h4>
                <p>We wanted to create better empathy by showing how difficult it can be to not be able to distinguish colors in the simplest things that are "normal" for us. This approach helped users understand the daily challenges faced by people with color vision deficiencies.</p>

                <h4>3. Coding Phase</h4>
                <p>After finalizing the concept, we began coding the interactive experience. The development process involved creating realistic scenarios that simulate color blindness challenges in everyday situations.</p>

                <h4>4. Team Collaboration & Communication</h4>
                <p>There was a miscommunication towards the end where I was supposed to do the part that Noortje was going to do, but we quickly resolved this. This taught us the importance of clear communication in team projects.</p>

                <h4>5. Feedback & Learning</h4>
                <p>The feedback from Carolina was positive, and I learned a lot more about CSS and JavaScript during this project. The experience enhanced my technical skills while also deepening my understanding of accessibility in web development.</p>

                <h4>6. Key Takeaways</h4>
                <ul>
                    <li>Improved CSS and JavaScript skills</li>
                    <li>Better understanding of accessibility challenges</li>
                    <li>Enhanced team communication and problem-solving abilities</li>
                    <li>Experience in user empathy through interactive design</li>
                </ul>`
            }
        },
        "6": {
            "title": "Valentine's Interactive Card",
            "preview": "img/projects/valentine-preview.jpg",
            "info": {
                "title": "Project Information",
                "content": `<p>I made a fun Valentine's card website after seeing a cool idea on TikTok (<a href="https://www.tiktok.com/@ivy.sone5/video/7466179280360279329?q=valentine%20website&t=1742823646685" target="_blank" class="reference-link">@ivy.sone5</a>). On my website, you can choose 'Yes' or 'No', see happy or sad cats, and open a special Valentine's letter if you know the password. I made this to practice my JavaScript skills after learning about it in semester 2.</p>`
            },
            "process": {
                "title": "Development Process",
                "content": `<h4>1. Choice System</h4>
                <ul>
                    <li>The 'No' button gets smaller and the 'Yes' button gets bigger</li>
                    <li>Cats look happy or sad based on your choice</li>
                    <li>Confetti appears when you pick 'Yes'</li>
                    <li>It's made so you have to pick 'Yes' eventually (in a fun way!)</li>
                </ul>

                <h4>2. Secret Letter</h4>
                <ul>
                    <li>You need a password to open the letter</li>
                    <li>Hints show up when you hover over things</li>
                    <li>The envelope opens with a nice animation</li>
                    <li>The message stays safe until you enter the right password</li>
                </ul>

                <h4>3. Visual Effects</h4>
                <ul>
                    <li>Hearts float around the screen using JavaScript</li>
                    <li>Everything moves smoothly</li>
                    <li>Confetti falls when you make the right choice</li>
                    <li>Colors change to match the mood</li>
                </ul>

                <h4>4. Challenges</h4>
                <ul>
                    <li>Sometimes the animations are a bit slow</li>
                    <li>The website doesn't always look perfect on all screens</li>
                    <li>Making all the interactive parts work together was tricky</li>
                </ul>

                <h4>5. Learning</h4>
                <ul>
                    <li>Better JavaScript Skills:
                        <ul>
                            <li>Making and changing website parts with code</li>
                            <li>Making buttons and other things work</li>
                            <li>Keeping track of what users do</li>
                        </ul>
                    </li>
                    <li>Making Things Move:
                        <ul>
                            <li>Creating smooth movements with CSS</li>
                            <li>Using animation tools</li>
                            <li>Making my own animations</li>
                        </ul>
                    </li>
                    <li>Making Things Easy to Use:
                        <ul>
                            <li>Showing users when something happens</li>
                            <li>Revealing things bit by bit</li>
                            <li>Making the website fun to use</li>
                        </ul>
                    </li>
                    <li>Solving Problems:
                        <ul>
                            <li>Fixing animation timing issues</li>
                            <li>Keeping the password system safe</li>
                            <li>Making everything work together nicely</li>
                        </ul>
                    </li>
                </ul>

                <p>While some things could be better, like how it looks on different screens and how fast things move, this project helped me learn a lot about making interactive websites.</p>`
            }
        },
        "8": {
            "title": "SXSW Grid Practice",
            "preview": "img/projects/sxsw-preview.jpg",
            "info": {
                "title": "Project Information",
                "content": `<p>This project was a challenge to recreate the SXSW website layout using modern CSS Grid techniques. The goal was to practice advanced grid layouts and responsive design principles while building a complex, event-based website structure.</p>
                <p>The challenge focused on understanding how to effectively use CSS Grid for creating professional-looking websites with multiple content sections, navigation systems, and responsive breakpoints that work across different devices.</p>`
            },
            "process": {
                "title": "Development Process",
                "content": `<h4>1. Research and Analysis</h4>
                <p>Started by analyzing the original SXSW website structure, identifying key layout patterns, grid systems, and responsive behaviors that needed to be replicated.</p>

                <h4>2. Online Grid Learning</h4>
                <p>Used online CSS Grid tutorials and documentation to understand:</p>
                <ul>
                    <li>Grid container and grid item properties</li>
                    <li>Grid template areas and line naming</li>
                    <li>Responsive grid techniques using media queries</li>
                    <li>Grid gap and alignment properties</li>
                </ul>

                <h4>3. Step-by-Step Implementation</h4>
                <ul>
                    <li><strong>Step 1:</strong> Set up the basic HTML structure with semantic elements</li>
                    <li><strong>Step 2:</strong> Create the main grid container and define grid areas</li>
                    <li><strong>Step 3:</strong> Implement the header navigation with grid layout</li>
                    <li><strong>Step 4:</strong> Build the hero section using grid positioning</li>
                    <li><strong>Step 5:</strong> Create the content sections with nested grids</li>
                    <li><strong>Step 6:</strong> Add responsive breakpoints for mobile and tablet</li>
                    <li><strong>Step 7:</strong> Fine-tune spacing, typography, and visual elements</li>
                </ul>

                <h4>4. Grid Techniques Applied</h4>
                <ul>
                    <li>Used CSS Grid for overall page layout structure</li>
                    <li>Implemented grid template areas for semantic layout</li>
                    <li>Applied responsive grid changes with media queries</li>
                    <li>Combined Grid with Flexbox for component-level layouts</li>
                </ul>

                <h4>5. Learning Outcomes</h4>
                <ul>
                    <li>Mastered CSS Grid fundamentals and advanced techniques</li>
                    <li>Improved understanding of responsive design principles</li>
                    <li>Enhanced skills in recreating complex website layouts</li>
                    <li>Better knowledge of modern CSS layout methods</li>
                </ul>

                <p>This challenge project significantly improved my CSS Grid skills and gave me practical experience in building complex, responsive layouts.</p>`
            }
        }
    };

    // Navbar scroll behavior
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    // Scroll arrows functionality
    const scrollArrows = document.querySelectorAll('.scroll-arrows-container');
    if (scrollArrows.length > 0) {
        scrollArrows.forEach(arrows => {
            arrows.addEventListener('click', () => {
                const currentSection = arrows.closest('.section');
                let targetSection;
                
                if (currentSection.id === 'home') {
                    targetSection = document.querySelector('#about');
                } else if (currentSection.id === 'about') {
                    targetSection = document.querySelector('#learning-outcomes');
                } else if (currentSection.id === 'learning-outcomes') {
                    targetSection = document.querySelector('#projects');
                }
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
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
        
        // If scrolling down and past the threshold
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Hide the navbar
            navbar.classList.add('scrolled');
            navbar.classList.remove('visible');
        } else {
            // Scrolling up or at the top
            navbar.classList.remove('scrolled');
            if (currentScrollY > scrollThreshold) {
                // Show the navbar (but only if not at the top)
                navbar.classList.add('visible');
            } else {
                // At the top? Always show the navbar
                navbar.classList.add('visible');
            }
        }
        
        lastScrollY = currentScrollY; // save the current scroll position
    });
    
    // Make the navbar visible once the page is loaded
    window.addEventListener('load', () => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    });

    // Make the navbar visible once the loading screen is gone
    setTimeout(() => {
        navbar.classList.add('visible');
        navbar.classList.remove('scrolled');
    }, 3200); 

    // Make a hover-zone at the top of the page
    const hoverZone = document.createElement('div');
    hoverZone.style.position = 'fixed'; // Set it fixed at the top of the page
    hoverZone.style.top = '0'; 
    hoverZone.style.left = '0';
    hoverZone.style.width = '100%';
    hoverZone.style.height = '20px';
    hoverZone.style.zIndex = '99';
    document.body.appendChild(hoverZone);
    
    // Make the navbar visible when you hover over the top of the page
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

    // Open project details modal 
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.view-project-btn');
        
        viewButton.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            // Update modal content with project data
            projectDetailsTitle.textContent = projectData.title;
            
            // Update preview image
            const previewImage = document.querySelector('.project-preview-image');
            previewImage.src = projectData.preview;
            previewImage.alt = `${projectData.title} Preview`;
            
            // Update content
            const infoContent = document.querySelector('#project-info .info-content');
            const processContent = document.querySelector('#project-process .process-content');
            
            infoContent.innerHTML = projectData.info.content;
            processContent.innerHTML = projectData.process.content;
            
            // Show the first tab (Info) by default
            projectDetailsTabs.forEach(tab => tab.classList.remove('active'));
            projectDetailsPanes.forEach(pane => pane.classList.remove('active'));
            projectDetailsTabs[0].classList.add('active');
            projectDetailsPanes[0].classList.add('active');
            
            // Show modal
            projectDetailsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
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



});
