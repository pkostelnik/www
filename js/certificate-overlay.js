// Certificate Overlay Functionality - Simplified Version
console.log('Loading certificate overlay script...');

// Simple, direct approach to avoid conflicts
function initCertificateOverlay() {
    console.log('Initializing certificate overlay...');
    
    // Create overlay HTML
    const overlayHTML = `
        <div id="certificateOverlay" class="certificate-overlay" style="display: none;">
            <div class="certificate-overlay-content">
                <span class="certificate-close" onclick="closeCertificateOverlay()">&times;</span>
                <img id="overlayImage" src="" alt="Certificate">
                <div class="certificate-info" id="certificateInfo">
                    <h4 id="certificateTitle"></h4>
                    <p id="certificateDescription"></p>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing overlay
    const existing = document.getElementById('certificateOverlay');
    if (existing) {
        existing.remove();
    }
    
    // Add overlay to body
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    // Add click listeners to certificate images
    const images = document.querySelectorAll('.card-img-top');
    console.log('Found images:', images.length);
    
    images.forEach((img, index) => {
        console.log(`Setting up image ${index + 1}:`, img.src);
        img.style.cursor = 'pointer';
        img.title = 'Klicken für Vollbild';
        
        // Remove existing click handlers
        img.onclick = null;
        
        // Add new click handler
        img.onclick = function(e) {
            e.preventDefault();
            console.log('Image clicked:', img.src);
            
            const card = img.closest('.card');
            const title = card.querySelector('.card-title')?.textContent || 'Zertifikat';
            const description = card.querySelector('.card-text')?.textContent || '';
            
            openCertificateOverlay(img.src, title, description);
        };
    });
    
    console.log('Certificate overlay initialized successfully');
}

// Open overlay function
function openCertificateOverlay(imageSrc, title, description) {
    console.log('Opening overlay:', imageSrc);
    
    const overlay = document.getElementById('certificateOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const certificateTitle = document.getElementById('certificateTitle');
    const certificateDescription = document.getElementById('certificateDescription');
    
    if (!overlay || !overlayImage) {
        console.error('Overlay elements not found');
        return;
    }
    
    overlayImage.src = imageSrc;
    if (certificateTitle) certificateTitle.textContent = title;
    if (certificateDescription) certificateDescription.textContent = description;
    
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    }, 10);
}

// Close overlay function
function closeCertificateOverlay() {
    console.log('Closing overlay');
    
    const overlay = document.getElementById('certificateOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Handle ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCertificateOverlay();
    }
});

// Handle clicks outside overlay
document.addEventListener('click', function(e) {
    const overlay = document.getElementById('certificateOverlay');
    if (overlay && e.target === overlay) {
        closeCertificateOverlay();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCertificateOverlay);
} else {
    initCertificateOverlay();
}

// Also initialize on window load as backup
window.addEventListener('load', function() {
    // Only initialize if not already done
    if (!document.getElementById('certificateOverlay')) {
        initCertificateOverlay();
    }
});

console.log('Certificate overlay script loaded');