"use strict";

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------- Variables ------------------------------- */
  const body = document.querySelector('body');
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const headerImage = document.querySelector('.header-content a');
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hamburgerInertElements = document.querySelectorAll('body > :not(header)');
  const cartButton = document.querySelector('.cart-button');
  const cartModal = document.querySelector('.cart-modal');
  const cartModalBackground = document.querySelector('.cart-modal-background');
  const carouselButtons = document.querySelectorAll('[data-carousel-button]');

  /* ----------------------------- Hamburger menu ----------------------------- */
  function  checkTabindex(){
    if(window.innerWidth > 991){
      headerImage.removeAttribute('tabindex');
      hamburgerButton.removeAttribute('tabindex');
      cartButton.removeAttribute('tabindex');
    }
    else{
      hamburgerButton.setAttribute('tabindex', '1');
      headerImage.setAttribute('tabindex', '2');
      cartButton.setAttribute('tabindex', '3');
    }
  }

  checkTabindex();

  function updateScrollbarWidth(){
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  updateScrollbarWidth();
  window.addEventListener('resize', () =>{
    updateScrollbarWidth();
    if (window.innerWidth > 991 && nav.dataset.open === "true"){
      nav.dataset.open = "false";
      hamburgerInertElements.forEach(element => {
        element.inert = false;
      });
      headerImage.inert = false;
      cartButton.inert = false;
    }
    if(window.innerWidth > 991 && headerImage.hasAttribute('tabindex')){
      headerImage.removeAttribute('tabindex');
      hamburgerButton.removeAttribute('tabindex');
      cartButton.removeAttribute('tabindex');
    }
    else if(window.innerWidth < 992 && !headerImage.hasAttribute('tabindex')){
      hamburgerButton.setAttribute('tabindex', '1');
      headerImage.setAttribute('tabindex', '2');
      cartButton.setAttribute('tabindex', '3');
    }
  });

  hamburgerButton.addEventListener('click', () => {
    const isOpen = nav.dataset.open !== "true";
    nav.dataset.open = isOpen;
    headerImage.inert = isOpen;
    cartButton.inert = isOpen;
    hamburgerInertElements.forEach(element => {
      element.inert = isOpen;
    });
  });

  /* --------------------------- Cart button & modal -------------------------- */
  cartButton.addEventListener('click', () => {
    const isOpen = cartModal.dataset.open !== "true";
    cartModal.dataset.open = isOpen;
  });

  cartModal.addEventListener('click', (event) => {
    if(event.target === cartModalBackground){
      cartModal.dataset.open = "false";
    }
  });

  /* ---------------------------- Product carousel ---------------------------- */
  carouselButtons.forEach(button => {
    button.addEventListener('click', () =>{
      const prevOrNext = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button.closest("[data-carousel]").querySelector('[data-slides]');
      const indicators = button.closest("[data-carousel]").querySelector('[data-indicators]');
      
      const activeSlide = slides.querySelector('[data-active-slide]');
      const activeIndicator = indicators.querySelector('[data-active-indicator]');
      let newIndex = ([...slides.children].indexOf(activeSlide) + prevOrNext);
      if (newIndex < 0) {newIndex = slides.children.length - 1}
      if (newIndex >= slides.children.length) {newIndex = 0}
      
      slides.children[newIndex].dataset.activeSlide = true;
      delete activeSlide.dataset.activeSlide;
      indicators.children[newIndex].dataset.activeIndicator = true;
      delete activeIndicator.dataset.activeIndicator;
    });
  });
});