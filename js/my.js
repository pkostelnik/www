// Initializations -->
// Animations initialization
/*  new WOW().init(); */
// transparent Nav on scroll -->
/**
 * Listen to scroll to change header opacity class
 */
function checkScroll() {
  var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

  if ($(window).scrollTop() > startY) {
    $('.navbar').addClass("scrolled");
  } else {
    $('.navbar').removeClass("scrolled");
  }
}

if ($('.navbar').length > 0) {
  $(window).on("scroll load resize", function () {
    checkScroll();
  });
}

/* Tooltip init */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function loadPartial(url, callback) {
  $.ajax({
    url: url,
    dataType: 'html',
    cache: false
  }).done(function (data) {
    var tempContainer = $('<div>');
    tempContainer.append($.parseHTML(data, document, false));

    var hostContainsNav = $('#target').find('nav.navbar').length > 0;
    if (!hostContainsNav) {
      tempContainer.find('nav.navbar').first().remove();
    }

    var bodyElement = tempContainer.find('body');
    var contentSource = bodyElement.length ? bodyElement : tempContainer;

    if (bodyElement.length && typeof bodyElement.attr('class') === 'string') {
      $('#target').attr('class', bodyElement.attr('class'));
    }

    $('#target').html(contentSource.html());

    reinitializeDynamicUi();

    if (typeof callback === 'function') {
      callback();
    }

    if (window.SecurityLogger && typeof SecurityLogger.logSecurityEvent === 'function') {
      SecurityLogger.logSecurityEvent('ajax_load_success', { url: url });
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error('Failed to load ' + url + ':', textStatus || errorThrown);
    if (window.SecurityLogger && typeof SecurityLogger.logSecurityEvent === 'function') {
      SecurityLogger.logSecurityEvent('ajax_load_failed', {
        url: url,
        status: textStatus,
        error: errorThrown
      });
    }
  });
}

function reinitializeDynamicUi() {
  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip();
  }
  checkScroll();
  if (typeof initializeLebenslaufPage === 'function' && $('#Lebenslauf').length) {
    initializeLebenslaufPage();
  }
}

/* sideloading */
function lebenslauf_target() {
  loadPartial('lebenslauf.html');
}

function projekte_target() {
  loadPartial('projekte.html');
}

function portfolio_target() {
  loadPartial('portfolio.html');
}

function cert_target() {
  loadPartial('zertifikate.html');
}

function cv_target() {
  loadPartial('cv.html');
}

function projekte_en_target() {
  loadPartial('projekte_en.html');
}

function portfolio_en_target() {
  loadPartial('portfolio_en.html');
}

function cert_en_target() {
  loadPartial('zertifikate_en.html');
}

function home_target() {
  loadPartial('index.html');
}

function language_target() {
  loadPartial('index_en.html');
}

/* clock */
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
}

/* Time Counter
  // Set the date we're counting down to
  var countDownDate = new Date();
  countDownDate.setDate(countDownDate.getDate() + 90);

  // Update the count down every 1 second
  var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("time-counter").innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("time-counter").innerHTML = "EXPIRED";
    }
  }, 1000);
*/