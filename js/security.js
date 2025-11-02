// Secure Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners instead of inline onclick
    
    // Language switcher
    const langSwitchers = document.querySelectorAll('[data-action="language_target"]');
    langSwitchers.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof language_target === 'function') {
                language_target();
            }
        });
    });
    
    // Home navigation
    const homeNavs = document.querySelectorAll('[data-action="home_target"]');
    homeNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof home_target === 'function') {
                home_target();
            }
        });
    });
    
    // CV navigation
    const cvNavs = document.querySelectorAll('[data-action="cv_target"], [data-action="lebenslauf_target"]');
    cvNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            const action = elem.getAttribute('data-action');
            if (action === 'cv_target' && typeof cv_target === 'function') {
                cv_target();
            } else if (action === 'lebenslauf_target' && typeof lebenslauf_target === 'function') {
                lebenslauf_target();
            }
        });
    });
    
    // Projects navigation
    const projectsNavs = document.querySelectorAll('[data-action="projekte_target"]');
    projectsNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof projekte_target === 'function') {
                projekte_target();
            }
        });
    });
    
    // Portfolio navigation
    const portfolioNavs = document.querySelectorAll('[data-action="portfolio_target"]');
    portfolioNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof portfolio_target === 'function') {
                portfolio_target();
            }
        });
    });
    
    // Certificates navigation
    const certNavs = document.querySelectorAll('[data-action="cert_target"]');
    certNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof cert_target === 'function') {
                cert_target();
            }
        });
    });
    
    // Certificate overlay close
    const certificateCloses = document.querySelectorAll('[data-action="closeCertificateOverlay"]');
    certificateCloses.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof closeCertificateOverlay === 'function') {
                closeCertificateOverlay();
            }
        });
    });
    
    // Back navigation
    const backNavs = document.querySelectorAll('[data-action="back_target"]');
    backNavs.forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof back_target === 'function') {
                back_target();
            }
        });
    });
});

// Input validation and sanitization helpers
const SecurityUtils = {
    // HTML escape function
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    
    // URL validation
    isValidUrl: function(string) {
        try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
        }
    },
    
    // Email validation
    isValidEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};