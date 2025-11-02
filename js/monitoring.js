// Error logging and monitoring
(function() {
    'use strict';
    
    // Global error handler
    window.addEventListener('error', function(e) {
        // Log client-side errors (in production, send to logging service)
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        
        // In production, you would send this to your logging service:
        // sendErrorToLoggingService(errorData);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        
        // In production, you would send this to your logging service:
        // sendErrorToLoggingService({type: 'promise_rejection', reason: e.reason});
    });
    
    // Performance monitoring
    if ('performance' in window && 'measure' in window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Performance:', {
                        loadTime: perfData.loadEventEnd - perfData.fetchStart,
                        domReady: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
                    });
                }
            }, 0);
        });
    }
    
    // Security event logging
    window.SecurityLogger = {
        logSecurityEvent: function(event, details) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                event: event,
                details: details,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            console.warn('Security Event:', logEntry);
            
            // In production, send to security monitoring service:
            // sendSecurityEventToService(logEntry);
        }
    };
    
})();