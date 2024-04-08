/**
 * Utility Functions
 * 
 */

function isHidden(element) {

    return window.getComputedStyle(element).getPropertyValue('display') === 'none';
  
  };
  
  function selectElement(selector, isSingle = true) {
  
    selector = selector.trim();
    const is_whitespace = /\s/.test(selector);
  
    if (isSingle) {
      if (selector.startsWith('#') && !is_whitespace ) {
        return document.getElementById(selector.slice(1));
      } else {
        return document.querySelector(selector);
      }
    } else {
      return document.querySelectorAll(selector);
    }
  
  };
  
  /**
   * Header Functions
   * 
   */
  
  const blogHeader = selectElement('.top-header');
  const navbar = selectElement('.menu-fixed');
  
  const headerFixed = () => {
    const isScrolled = window.scrollY > 80;
  
    blogHeader.style.position = isScrolled ? 'sticky' : 'static';
    blogHeader.style.top = isScrolled ? '0' : '0';
  
    navbar.style.position = isScrolled ? 'fixed' : 'static';
    navbar.style.top = isScrolled ? '0' : '0';
    navbar.style.left = isScrolled ? '0' : '0';
    navbar.style.zIndex = isScrolled ? '1000' : 'auto';
    navbar.style.width = isScrolled ? '100%' : 'auto';
    navbar.style.boxShadow = isScrolled ? '0 .125rem .25rem rgba(0, 0, 0, .075)' : 'none';
  }
  window.addEventListener('scroll', headerFixed);
  
  /**
   * Offcanvas Functions
   * 
   */
  
  const offcanvas = selectElement('.offcanvas-menu');
  
  if (offcanvas) {
    const offCanvasShowBtn = selectElement('.bar-icon .rd-as-btn');
    const offCanvasCloseBtn = selectElement('#close_offcanvas');
    const backdrop = selectElement('.backdrop');
  
    offCanvasShowBtn.addEventListener('click', function () {
      openOffcanvas();
    });
  
    offCanvasCloseBtn.addEventListener('click', function () {
      closeOffcanvas();
    });
  
    function openOffcanvas() {
      offcanvas.style.left = '0px';
      offcanvas.style.transition = 'all .3s ease';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      backdrop.classList.add('show');
      backdrop.classList.remove('fade');
    }
  
    function closeOffcanvas() {
      offcanvas.style.left = '-250px';
      offcanvas.style.transition = 'all .3s ease';
      document.body.style.overflow = '';
      document.body.style.height = '';
      backdrop.classList.remove('show');
      backdrop.classList.add('fade');
    }
  
    // Add a click event listener to the document to close the offcanvas when clicking outside of it
    document.addEventListener('click', function (event) {
      if (!offcanvas.contains(event.target) && !offCanvasShowBtn.contains(event.target)) {
        closeOffcanvas();
      }
    });
  
  }
  
  /**
   * Mobile Search Bar Functions
   * 
   */
  const searchForm = selectElement('.search-form');
  
  if (searchForm) {
  
    const searchBox = selectElement('.search-box');
    const crossSvg = `
      <svg fill="none" viewBox="0 0 17 16" width="17" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="m12.709 4.3677-8 8" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        <path d="m4.709 4.3677 8 8" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>
    `;
  
    const searchSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path d="M16.4077 13.8339L13.292 10.7183C13.1514 10.5776 12.9608 10.4995 12.7608 10.4995H12.2514C13.1139 9.39639 13.6264 8.00889 13.6264 6.49951C13.6264 2.90889 10.717 -0.000488281 7.12642 -0.000488281C3.53579 -0.000488281 0.626419 2.90889 0.626419 6.49951C0.626419 10.0901 3.53579 12.9995 7.12642 12.9995C8.63579 12.9995 10.0233 12.487 11.1264 11.6245V12.1339C11.1264 12.3339 11.2045 12.5245 11.3452 12.6651L14.4608 15.7808C14.7545 16.0745 15.2295 16.0745 15.5202 15.7808L16.4045 14.8964C16.6983 14.6026 16.6983 14.1276 16.4077 13.8339ZM7.12642 10.4995C4.91704 10.4995 3.12642 8.71201 3.12642 6.49951C3.12642 4.29014 4.91392 2.49951 7.12642 2.49951C9.33579 2.49951 11.1264 4.28701 11.1264 6.49951C11.1264 8.70889 9.33892 10.4995 7.12642 10.4995Z" fill="#1E6F5C"></path>
      </svg>
    `;
  
    function searchEvent() {
  
      if (isHidden(searchBox)) {
        searchBox.style.display = "block";
        const searchIcon = searchForm.querySelector(":scope > svg");
        if (searchIcon) {
          searchIcon.remove();
        }
        searchForm.insertAdjacentHTML("beforeend", crossSvg);
      } else {
        searchBox.style.display = "none";
        const searchIcon = searchForm.querySelector(":scope > svg");
        if (searchIcon) {
          searchIcon.remove();
        }
        searchForm.insertAdjacentHTML("beforeend", searchSvg);
      }
  
      const searchIconElement = searchForm.querySelector(":scope > svg");
      if (searchIconElement) {
        searchIconElement.addEventListener("click", searchEvent);
      }
    }
  
    const initialSearchIcon = searchForm.querySelector(":scope > svg");
    if (initialSearchIcon) {
      initialSearchIcon.addEventListener("click", searchEvent);
    }
  
  }
  
  /**
   * Scroll to Top Functions
   * 
   */
  
  function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scroll_to_top.style.display = "block";
    } else {
      scroll_to_top.style.display = "none";
    }
  };
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  
  // When the user scrolls down 200px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction()
  };
  
  // Onclick
  scroll_to_top.addEventListener( 'click', topFunction );
  
  /**
   * Table of Content Functions
   * 
   */
  
  if (selectElement('#tableofcontent')) {
  
    // Toggle button
    const toggleBtn = selectElement(".tb-head");
    const content = selectElement("#tableofcontent ul");
  
    // Check the screen width and set the initial display style
    if (window.innerWidth > 300 && window.innerWidth < 768) {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  
    toggleBtn.addEventListener("click", function () {
      if (content.style.display === "none") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  
    // Scroll to section on navigation link click
    const headings = selectElement("h2, h3, h4", false);
    const navLinks = selectElement("#tableofcontent ul li a", false);
  
    navLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetHeading = document.getElementById(targetId);
        if (targetHeading) {
          targetHeading.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    });
  
    window.addEventListener("scroll", () => {
      headings.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 20;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            // Remove "active" class from all parent elements
            link.closest('li').classList.remove("active");
  
            if (link.getAttribute("href") === `#${id}`) {
              // Add "active" class to the parent element (closest <li>)
              link.closest('li').classList.add("active");
            }
          });
        }
      });
    });
  
  }
  
  /**
   * FAQ Functions
   * 
   */
  const detailsElements = selectElement("details", false);
  
  if (detailsElements) {
  
    const summaryElements = selectElement("summary", false);
    
    summaryElements.forEach((summary, index) => {
      summary.addEventListener("click", () => {
        // Close other open details elements
        detailsElements.forEach((details, i) => {
  
          if (i !== index) {
            details.open = false;
          }
        });
      });
    });
  
  }
  
   /* hero slider 
  -------------------------------------------------*/
  function initializeGASlider(className, slidesPerView = 1, spaceBetween = 20) {
    const sliderParent = document.querySelector('.' + className);
  
    if (sliderParent) {
      
      const sliderWrap = sliderParent.querySelector('.slider-wrap');
      const slideCards = sliderWrap.querySelectorAll('.slide-card');
      const slideCount = slideCards.length;
      let currentIndex = 0;
  
      function calculateSlideSize() {
        if (window.innerWidth >= 600 && window.innerWidth < 1024) {
          slidesPerView = 2;
        } else if (window.innerWidth <= 600) {
          slidesPerView = 1;
        }
  
        const containerWidth = sliderWrap.clientWidth;
        const slideWidth = (containerWidth / slidesPerView) - ((slidesPerView - 1) * spaceBetween / slidesPerView);
  
        slideCards.forEach(function (slideCard) {
          slideCard.style.width = slideWidth + 'px';
          slideCard.style.marginRight = spaceBetween + 'px';
        });
  
        updateButtonState();
      }
  
      calculateSlideSize();
  
      window.addEventListener('resize', calculateSlideSize);
  
      function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
        updateButtonState();
      }
  
      function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
        updateButtonState();
      }
  
      function updateSliderPosition() {
        const translateValue = -currentIndex * (slideCards[0].offsetWidth + spaceBetween);
        sliderWrap.style.transform = `translateX(${translateValue}px)`;
      }
  
      function updateButtonState() {
        const previousArrow = sliderParent.querySelector('#previous-arrow');
        const nextArrow = sliderParent.querySelector('#next-arrow');
        const svgPrev = sliderParent.querySelector('#previous-arrow > svg');
        const svgNext = sliderParent.querySelector('#next-arrow > svg');
  
        if (currentIndex > 0) {
          previousArrow.disabled = false;
          svgPrev.style.fill = '#ffffff';
          previousArrow.style.backgroundColor = '#096761';
          previousArrow.style.border = 'none';
        } else {
          previousArrow.disabled = true;
          previousArrow.style.border = '1px solid #096761';
          previousArrow.style.backgroundColor = '#ffffff';
          svgPrev.style.fill = '#096761';
        }
  
        if (window.innerWidth <= 600) {
          if (currentIndex < slideCount - 1) {
            nextArrow.disabled = false;
          } else {
            nextArrow.disabled = true;
          }
        } else {
          if ((slideCount - currentIndex - 1) < slidesPerView) {
            nextArrow.disabled = true;
            nextArrow.style.border = '1px solid #096761';
            nextArrow.style.backgroundColor = '#ffffff';
            svgNext.style.fill = '#096761';
          } else {
            nextArrow.disabled = false;
            nextArrow.style.border = 'none';
            nextArrow.style.backgroundColor = '#096761';
            svgNext.style.fill = '#ffffff';
          }
        }
  
        if (slideCount <= slidesPerView) {
          nextArrow.disabled = true;
          nextArrow.style.border = '1px solid #096761';
          nextArrow.style.backgroundColor = '#ffffff';
          svgNext.style.fill = '#096761';
        }
      }
  
      sliderParent.querySelector('#next-arrow').addEventListener('click', function () {
        if (currentIndex < slideCount - 1) {
          goToNextSlide();
        }
      });
  
      sliderParent.querySelector('#previous-arrow').addEventListener('click', function () {
        if (currentIndex > 0) {
          goToPrevSlide();
        }
      });
  
    }
  
  }
  
  initializeGASlider("wp-rd-product-slider");