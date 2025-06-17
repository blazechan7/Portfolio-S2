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

    // PDF viewer functionality
    const pdfViewerModal = document.getElementById('pdf-viewer-modal');
    const pdfViewerClose = document.querySelector('#pdf-viewer-modal .project-details-close');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfViewerTitle = document.querySelector('.pdf-viewer-title');
    const embedButtons = document.querySelectorAll('.embed-pdf-btn');

    // PDF viewer functionality
    if (pdfViewerModal && pdfViewerClose && pdfIframe && pdfViewerTitle) {
        // Open PDF viewer
        embedButtons.forEach(button => {
            button.addEventListener('click', () => {
                const pdfPath = button.getAttribute('data-pdf');
                let documentTitle = 'Document Viewer';
                
                // Try to get title from document card if it exists
                const documentCard = button.closest('.document-card');
                if (documentCard) {
                    const cardTitle = documentCard.querySelector('h3');
                    if (cardTitle) {
                        documentTitle = cardTitle.textContent;
                    }
                }
                
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
            "content": `<p>Documentation of the process of creating my portfolio website, including design decisions, technical implementation, and iterative improvements based on feedback.</p>
            <iframe src="docs/Portfolio S2.pdf" style="width: 100%; height: 600px; border: none;"></iframe>`
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

// Project mapping
const projectMapping = {
    'development-cardan': '3',
    'portfolio-development': '5', 
    'valentine-card': '6',
    'sxsw-grid': '8',
    'agatha-coven': '1'
};

// Function to open project details modal
function openProjectDetails(projectKey) {
    console.log('DEBUG: Function called with key:', projectKey);
    console.log('DEBUG: projectMapping:', projectMapping);
    const projectId = projectMapping[projectKey];
    console.log('DEBUG: Found project ID:', projectId);
    console.log('DEBUG: projectsData:', projectsData);
    const projectData = projectsData[projectId];
    console.log('DEBUG: Found project data:', projectData);

    if (!projectData) {
        console.error('No project data found for key:', projectKey);
        return;
    }

    // Check if modal already exists
    let modal = document.getElementById('evidence-project-modal');
    console.log('DEBUG: Existing modal:', modal);

    if (!modal) {
        console.log('DEBUG: Creating new modal');
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.className = 'project-details-container';
        modal.id = 'evidence-project-modal';
        document.body.appendChild(modal);
    }
    
    // Create modal content
    console.log('DEBUG: Setting up modal content');
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
    
    document.body.style.overflow = 'hidden';
    
    console.log('DEBUG: Setting up event listeners');
    // Add close functionality
    const closeBtn = modal.querySelector('.project-details-close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
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
    console.log('DEBUG: Modal setup complete');
}

// Function to open PDF viewer
function openPdfViewer(pdfPath) {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-iframe');
    
    if (modal && iframe) {
        iframe.src = pdfPath;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
} 