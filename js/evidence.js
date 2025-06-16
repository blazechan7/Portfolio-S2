// Evidence page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabs = document.querySelectorAll('.evidence-tab');
    const tabPanes = document.querySelectorAll('.evidence-tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // PDF viewer functionality - Same pattern as project modals
    const pdfViewerModal = document.getElementById('pdf-viewer-modal');
    const pdfViewerClose = document.querySelector('#pdf-viewer-modal .project-details-close');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfViewerTitle = document.querySelector('.pdf-viewer-title');
    const embedButtons = document.querySelectorAll('.embed-pdf-btn');

    // PDF viewer functionality - Same as LO1
    if (pdfViewerModal && pdfViewerClose && pdfIframe && pdfViewerTitle) {
        // Open PDF viewer
        embedButtons.forEach(button => {
            button.addEventListener('click', () => {
                const pdfPath = button.getAttribute('data-pdf');
                const documentTitle = button.closest('.document-card').querySelector('h3').textContent;
                
                // Update modal content
                pdfViewerTitle.textContent = documentTitle;
                pdfIframe.src = pdfPath;
                
                // Show modal
                pdfViewerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close PDF viewer
        pdfViewerClose.addEventListener('click', () => {
            pdfViewerModal.style.display = 'none';
            document.body.style.overflow = '';
            pdfIframe.src = '';
        });

        // Close modal when clicking outside
        pdfViewerModal.addEventListener('click', (e) => {
            if (e.target === pdfViewerModal) {
                pdfViewerModal.style.display = 'none';
                document.body.style.overflow = '';
                pdfIframe.src = '';
            }
        });
    }

    // Navbar hover functionality
    const navbar = document.querySelector('nav');
    const hoverZone = document.createElement('div');
    hoverZone.style.position = 'fixed';
    hoverZone.style.top = '0';
    hoverZone.style.left = '0';
    hoverZone.style.width = '100%';
    hoverZone.style.height = '80px';
    hoverZone.style.zIndex = '150';
    document.body.appendChild(hoverZone);

    hoverZone.addEventListener('mouseenter', () => {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'var(--color-primary-nav)';
        navbar.style.backdropFilter = 'blur(5px)';
    });

    document.addEventListener('mousemove', (e) => {
        if (e.clientY > 80) {
            navbar.style.transform = 'translateY(-100%)';
        }
    });

    // Pixel border effects for buttons
    const buttons = document.querySelectorAll('.back-button, .view-pdf-btn, .embed-pdf-btn');
    
    buttons.forEach(button => {
        const borders = {
            top: document.createElement('span'),
            right: document.createElement('span'),
            bottom: document.createElement('span'),
            left: document.createElement('span')
        };

        borders.top.className = 'pixel-border-top';
        borders.right.className = 'pixel-border-right';
        borders.bottom.className = 'pixel-border-bottom';
        borders.left.className = 'pixel-border-left';

        Object.values(borders).forEach(border => {
            button.appendChild(border);
        });
    });
}); 

// Project data - same as main site
const projectsData = {
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
    "5": {
        "title": "My Portfolio",
        "preview": "img/projects/portfolio-preview.jpg",
        "info": {
            "title": "Project Information",
            "content": `<p>Documentation of the process of creating my portfolio website, including design decisions, technical implementation, and iterative improvements based on feedback.</p>`
        },
        "process": {
            "title": "Development Process",
            "content": `<h4>Portfolio Development Process</h4>
            <p>The development of this portfolio involved multiple iterations, user testing, and continuous refinement to create an effective showcase of my work and skills.</p>`
        }
    },
    "6": {
        "title": "Valentine's Interactive Card",
        "preview": "img/projects/valentine-preview.jpg",
        "info": {
            "title": "Project Information",
            "content": `<p>I made a fun Valentine's card website after seeing a cool idea on TikTok. On my website, you can choose 'Yes' or 'No', see happy or sad cats, and open a special Valentine's letter if you know the password. I made this to practice my JavaScript skills after learning about it in semester 2.</p>`
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
                         </ul>`
        }
    },
    "8": {
        "title": "SXSW Grid Practice",
        "preview": "img/projects/sxsw-preview.jpg",
        "info": {
            "title": "Project Information",
            "content": `<p>A practice project recreating the SXSW website layout, focusing on CSS Grid techniques, responsive design, and modern web development practices for event-based websites.</p>
            <p><a href="https://github.com/blazechan7/Development-2" target="_blank" class="reference-link">View GitHub Repository</a></p>`
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

// Function to open project details modal from LO2 evidence page
function openProjectDetails(projectKey) {
    const projectMapping = {
        'development-cardan': '3',
        'portfolio-development': '5', 
        'valentine-card': '6',
        'sxsw-grid': '8'
    };
    
    const projectId = projectMapping[projectKey];
    const projectData = projectsData[projectId];
    
    if (!projectData) return;
    
    // Create modal with the same structure as main site
    const modal = document.createElement('div');
    modal.className = 'project-details-container';
    modal.id = 'evidence-project-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="project-details">
            <button class="project-details-close">X</button>
            <div class="project-details-header">
                <h2 class="project-details-title">${projectData.title}</h2>
            </div>
            <div class="project-details-preview">
                <div class="preview-image-container">
                    <img src="${projectData.preview}" alt="${projectData.title} Preview" class="project-preview-image">
                </div>
            </div>
            <div class="project-details-tabs">
                <button class="project-details-tab active" data-tab="project-info">Info</button>
                <button class="project-details-tab" data-tab="project-process">Process</button>
            </div>
            <div class="project-details-content">
                <div id="project-info" class="project-details-pane active">
                    <h3>Project Information</h3>
                    <div class="info-content">${projectData.info.content}</div>
                </div>
                <div id="project-process" class="project-details-pane">
                    <h3>Development Process</h3>
                    <div class="process-content">${projectData.process.content}</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add close functionality
    const closeBtn = modal.querySelector('.project-details-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
    
    // Tab functionality
    const tabs = modal.querySelectorAll('.project-details-tab');
    const panes = modal.querySelectorAll('.project-details-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const targetPane = modal.querySelector(`#${tabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
} 