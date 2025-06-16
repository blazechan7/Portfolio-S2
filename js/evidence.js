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