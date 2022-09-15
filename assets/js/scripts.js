//Navbar
const navbarMenu = document.getElementById("navbar");
const burgerMenu = document.getElementById("burger");
const overlayMenu = document.querySelector(".overlay");


const toggleMenu = () => {
   navbarMenu.classList.toggle("active");
   overlayMenu.classList.toggle("active");
};


const collapseSubMenu = () => {
   navbarMenu
      .querySelector(".menu-dropdown.active .submenu")
      .removeAttribute("style");
   navbarMenu.querySelector(".menu-dropdown.active").classList.remove("active");
};


const toggleSubMenu = (e) => {
   if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
      e.preventDefault();
      const menuDropdown = e.target.parentElement;

      // If Dropdown is Expanded, then Collapse It
      if (menuDropdown.classList.contains("active")) {
         collapseSubMenu();
      } else {
         // Collapse Existing Expanded Dropdown
         if (navbarMenu.querySelector(".menu-dropdown.active")) {
            collapseSubMenu();
         }

         // Expanded the New Dropdown
         menuDropdown.classList.add("active");
         const subMenu = menuDropdown.querySelector(".submenu");
         subMenu.style.maxHeight = subMenu.scrollHeight + "px";
      }
   }
};


const resizeWindow = () => {
   if (window.innerWidth > 992) {
      if (navbarMenu.classList.contains("active")) {
         toggleMenu();
      }
      if (navbarMenu.querySelector(".menu-dropdown.active")) {
         collapseSubMenu();
      }
   }
};

burgerMenu.addEventListener("click", toggleMenu);
overlayMenu.addEventListener("click", toggleMenu);
navbarMenu.addEventListener("click", toggleSubMenu);
window.addEventListener("resize", resizeWindow);


//Effects Navbar
var myBanner = $("#img-banner");
var myNav = $("#header");

$(window).on('scroll', function() {
  "use strict";
  if ($(window).scrollTop() > 50) {
   myBanner.addClass("banner-top")
    myNav.addClass("header");
  } else {
   myBanner.removeClass("banner-top")
    myNav.removeClass("header");

  }
});


//Slider
document.addEventListener('DOMContentLoaded', () => {
   const slider = document.querySelector('#slider');
   setTimeout(function moveSlide() {
       const max = slider.scrollWidth - slider.clientWidth;
       const left = slider.clientWidth;

       if (max === slider.scrollLeft) {
           slider.scrollTo({left: 0, behavior: 'smooth'})
       } else {
           slider.scrollBy({left, behavior: 'smooth'})
       }

       setTimeout(moveSlide, 9000)
   }, 9000)

})
function count(){
   var counter = { var: 0 };
   TweenMax.to(counter, 3, {
     var: 200, 
     onUpdate: function () {
       var number = Math.ceil(counter.var);
       $('.counter').html(number);
       if(number === counter.var){ count.kill(); }
     },
     onComplete: function(){
       count();
     },    
     ease:Circ.easeOut
   });
 }
 
 count();