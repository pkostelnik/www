// Lebenslauf specific JavaScript

// Initialize circular charts when document is ready
$(document).ready(function() {
    // Initialize circular progress charts
    initializeCharts();
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Function to initialize circular charts
function initializeCharts() {
    $('.chart').each(function() {
        var chart = $(this);
        var percent = chart.data('percent') || 0;
        var barColor = chart.data('bar-color') || '#427AEB';
        var trackColor = chart.data('track-color') || '#EEEEEE';
        
        // Create SVG circle
        var svg = '<svg class="circular-chart" viewBox="0 0 36 36">' +
                  '<path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" ' +
                  'fill="none" stroke="' + trackColor + '" stroke-width="2"/>' +
                  '<path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" ' +
                  'fill="none" stroke="' + barColor + '" stroke-width="2" stroke-linecap="round" ' +
                  'stroke-dasharray="' + percent + ', 100"/>' +
                  '</svg>';
        
        chart.prepend(svg);
        
        // Animate the circle
        setTimeout(function() {
            chart.find('.circle').css({
                'transition': 'stroke-dasharray 1.5s ease-in-out',
                'stroke-dasharray': percent + ', 100'
            });
        }, 500);
    });
}

// Function to initialize typing animation
function initializeTypingAnimation() {
    var typingElements = $('.typing');
    
    typingElements.each(function() {
        var element = $(this);
        var text = element.text();
        var speed = 50; // milliseconds per character
        
        element.text('');
        element.css('border-right', '0.15em solid #427AEB');
        
        var i = 0;
        var typeTimer = setInterval(function() {
            if (i < text.length) {
                element.text(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typeTimer);
                // Keep cursor blinking
                setInterval(function() {
                    element.css('border-right-color', 
                        element.css('border-right-color') === 'rgb(66, 122, 235)' ? 
                        'transparent' : '#427AEB'
                    );
                }, 750);
            }
        }, speed);
    });
}

// Function to initialize scroll animations
function initializeScrollAnimations() {
    $(window).scroll(function() {
        $('.animated').each(function() {
            var element = $(this);
            var animation = element.data('animation');
            var elementTop = element.offset().top;
            var windowTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (elementTop < windowTop + windowHeight - 100) {
                if (!element.hasClass('animate__animated')) {
                    element.addClass('animate__animated animate__' + animation);
                }
            }
        });
    });
}

// Progress bar animations
function animateProgressBars() {
    $('.progress-bar').each(function() {
        var progressBar = $(this);
        var width = progressBar.css('width');
        
        progressBar.css('width', '0%');
        
        setTimeout(function() {
            progressBar.animate({
                width: width
            }, 1500, 'easeOutCubic');
        }, 500);
    });
}

// Call progress bar animation when section comes into view
$(window).scroll(function() {
    var skillsSection = $('.resume-box').first();
    if (skillsSection.length > 0) {
        var sectionTop = skillsSection.offset().top;
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        
        if (sectionTop < windowTop + windowHeight - 200 && !skillsSection.hasClass('animated-progress')) {
            skillsSection.addClass('animated-progress');
            animateProgressBars();
        }
    }
});

// CSS for circular charts
var chartCSS = `
<style>
.circular-chart {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
}

.circle-bg {
    opacity: 0.3;
}

.circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>
`;

$('head').append(chartCSS);