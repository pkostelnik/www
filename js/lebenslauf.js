// Lebenslauf specific JavaScript
(function ($) {
    'use strict';

    var scrollHandlerBound = false;
    var chartStylesInjected = false;

    function injectChartStyles() {
        if (chartStylesInjected) {
            return;
        }

        chartStylesInjected = true;
        if ($('#lebenslauf-chart-styles').length) {
            return;
        }

        $('head').append('<style id="lebenslauf-chart-styles">' +
            '.circular-chart{position:absolute;inset:0;width:100%;height:100%;}' +
            '.circle-bg,.circle{fill:none;stroke-width:3.6;}' +
            '.circle-bg{opacity:0.25;}' +
            '.circle{transform:rotate(-90deg);transform-origin:50% 50%;stroke-linecap:round;}' +
            '</style>');
    }

    function initializeCharts() {
        injectChartStyles();

        $('.chart').each(function () {
            var chart = $(this);

            if (chart.data('chart-initialized')) {
                return;
            }

            var percent = parseFloat(chart.data('percent'));
            if (isNaN(percent)) {
                percent = 0;
            }
            percent = Math.max(0, Math.min(100, percent));
            var barColor = chart.data('bar-color') || '#427AEB';
            var trackColor = chart.data('track-color') || '#EEEEEE';

            var svg = '<svg class="circular-chart" viewBox="0 0 36 36" role="presentation" aria-hidden="true">' +
                '<path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="' + trackColor + '" stroke-width="3.6" fill="none"/>' +
                '<path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="' + barColor + '" stroke-width="3.6" fill="none" stroke-dasharray="100" stroke-dashoffset="100"/>' +
                '</svg>';

            chart.prepend(svg);
            chart.data('chart-initialized', true);

            setTimeout(function () {
                chart.find('.circle')
                    .css({
                        transition: 'stroke-dashoffset 1.3s ease-in-out',
                        'will-change': 'stroke-dashoffset'
                    })
                    .attr('stroke-dashoffset', (100 - percent).toFixed(2));
            }, 500);
        });
    }

    function initializeTypingAnimation() {
        $('.typing').each(function () {
            var element = $(this);

            if (element.data('typing-initialized')) {
                return;
            }

            var text = element.text();
            var speed = 50;

            element.data('typing-initialized', true);
            element.text('');
            element.css('border-right', '0.15em solid #427AEB');

            var i = 0;
            var typeTimer = setInterval(function () {
                if (i < text.length) {
                    element.text(text.slice(0, i + 1));
                    i += 1;
                } else {
                    clearInterval(typeTimer);
                    setInterval(function () {
                        var borderColor = element.css('border-right-color');
                        element.css('border-right-color', borderColor === 'rgba(0, 0, 0, 0)' || borderColor === 'transparent' ? '#427AEB' : 'transparent');
                    }, 750);
                }
            }, speed);
        });
    }

    function prepareProgressBars() {
        $('.progress-bar').each(function () {
            var bar = $(this);

            if (bar.attr('data-target-width')) {
                return;
            }

            var targetWidth = this.style.width || (bar.attr('aria-valuenow') ? bar.attr('aria-valuenow') + '%' : '0%');
            bar.attr('data-target-width', targetWidth);
            this.style.width = '0%';
            this.classList.add('animate-from-zero');
                this.style.transition = 'width 1.2s ease-in-out';
        });
    }

    function animateProgressBars() {
        var bars = $('.progress-bar').filter(function () {
            return !$(this).attr('data-progress-animated') && $(this).attr('data-target-width');
        });

        if (!bars.length) {
            return;
        }

        setTimeout(function () {
            bars.each(function (index) {
                var bar = this;
                var $bar = $(bar);
                $bar.attr('data-progress-animated', 'true');

                setTimeout(function () {
                    bar.classList.add('animate-to-target');
                    bar.style.width = $bar.attr('data-target-width') || '0%';
                }, index * 300);
            });
        }, 300);
    }

    function handleScrollAnimations() {
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        $('.animated').each(function () {
            var element = $(this);
            var animation = element.data('animation');

            if (!animation || element.hasClass('animate__animated')) {
                return;
            }

            var elementTop = element.offset().top;
            if (elementTop < windowTop + windowHeight - 100) {
                element.addClass('animate__animated animate__' + animation);
            }
        });

        var skillsSection = $('.resume-box').first();
        if (skillsSection.length && !skillsSection.data('progress-triggered')) {
            var sectionTop = skillsSection.offset().top;
            if (sectionTop < windowTop + windowHeight - 200) {
                skillsSection.data('progress-triggered', true);
                animateProgressBars();
            }
        }
    }

    function bindScrollHandler() {
        if (scrollHandlerBound) {
            return;
        }

        scrollHandlerBound = true;
        $(window).on('scroll.lebenslauf resize.lebenslauf', handleScrollAnimations);
    }

    function initializeLebenslaufPage() {
        initializeCharts();
        initializeTypingAnimation();
        prepareProgressBars();
        bindScrollHandler();
        handleScrollAnimations();
    }

    $(function () {
        initializeLebenslaufPage();
    });

    window.initializeLebenslaufPage = initializeLebenslaufPage;
})(jQuery);