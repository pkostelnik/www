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

/* sideloading */
function projekte_target() {
  $.get('projekte.html', function (data) {
    $('#target').html(data);
  })
}

function portfolio_target() {
  $.get('portfolio.html', function (data) {
    $('#target').html(data);
  })
}

function cert_target() {
  $.get('zertifikate.html', function (data) {
    $('#target').html(data);
  })
}

function projekte_en_target() {
  $.get('projekte_en.html', function (data) {
    $('#target').html(data);
  })
}

function portfolio_en_target() {
  $.get('portfolio_en.html', function (data) {
    $('#target').html(data);
  })
}

function cert_en_target() {
  $.get('zertifikate_en.html', function (data) {
    $('#target').html(data);
  })
}

function home_target() {
  $.get('index.html', function (data) {
    $('#target').html(data);
  })
}

function language_target() {
  $.get('index_en.html', function (data) {
    $('#target').html(data);
  })
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