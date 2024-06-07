'use strict';
//Add event on element
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

//Navbar toggle
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);

const backTopBtn = document.querySelector("[data-back-top-btn]");

const toggleBackToTopBtn = function () {
    if (window.scrollY > 100) {
        backTopBtn.classList.add("active");
    } else {
        backTopBtn.classList.remove("active");
    }
};

const scrollToTop = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Event listeners
window.addEventListener("scroll", toggleBackToTopBtn);
backTopBtn.addEventListener("click", scrollToTop);

//Animation: Typing
var typed = new Typed(".text-typings", {
  strings:["Conjunction (and)", "Disjunction (or)", "Negation (not)", "Implication (If..then)", "Biconditional (If and only if)", "Compound Proposition"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
})

//Manual slideshow
var slideIndexManual = 1;
showSlidesManual(slideIndexManual);

function plusSlidesManual(n) {
  showSlidesManual(slideIndexManual += n);
}

function currentSlideManual(n) {
  showSlidesManual(slideIndexManual = n);
}

function showSlidesManual(n) {
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndexManual = 1;
  }

  if (n < 1) {
    slideIndexManual = slides.length;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndexManual - 1].style.display = "block";
  dots[slideIndexManual - 1].classList.add("active");
}

//Automatic slideshow
var slideIndexAuto = 0;
showSlidesAuto();

function showSlidesAuto() {
  var slidesAuto = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");

  for (var i = 0; i < slidesAuto.length; i++) {
    slidesAuto[i].style.display = "none";
  }

  slideIndexAuto++;

  if (slideIndexAuto > slidesAuto.length) {
    slideIndexAuto = 1;
  }

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slidesAuto[slideIndexAuto - 1].style.display = "block";
  dots[slideIndexAuto - 1].classList.add("active");

  setTimeout(showSlidesAuto, 5000);
}

//Bind manual navigation buttons
var prevButton = document.getElementById('prevButton');
var nextButton = document.getElementById('nextButton');

if (prevButton && nextButton) {
  prevButton.addEventListener('click', function() {
    plusSlidesManual(-1);
  });

  nextButton.addEventListener('click', function() {
    plusSlidesManual(1);
  });
}