'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

//slide image

let slideIndex = 0;
showSlides();

// Next-previous control
function nextSlide() {
  slideIndex++;
  showSlides();
  timer = _timer; // reset timer
}

function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}

// Thumbnail image controlls
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

function showSlides() {
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dots");

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  
  // hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  
  // show one slide base on index number
  slides[slideIndex].style.display = "block";
  
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  
  dots[slideIndex].classList.add("active");
}

// autoplay slides --------
let timer = 7; // sec
const _timer = timer;

// this function runs every 1 second
setInterval(() => {
  timer--;

  if (timer < 1) {
    nextSlide();
    timer = _timer; // reset timer
  }
}, 1000); // 1sec



