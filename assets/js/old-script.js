$(document).ready(function () {



  /* fixed  header on Scroll
---------------------------------------*/
  const navbar = $('.menu-fixed');

  const headerFixed = () => {
    const isScrolled = $(window).scrollTop() > 80;
    navbar.css({
      position: isScrolled ? 'fixed' : 'static',
      top: isScrolled ? '0' : '0',
      left: isScrolled ? '0' : '0',
      zIndex: isScrolled ? '1000' : 'auto',
      width: isScrolled ? '100%' : 'auto',
      boxShadow: isScrolled ? '0 .125rem .25rem rgba(0, 0, 0, .075)' : 'none',
    });
  }

  $(window).scroll(headerFixed);





  /* offcanvas menu
  ---------------------------------------*/
  const offcanvas = $(".offcanvas-menu");
  const showBtn = $("#show-offcanvas");
  const closeBtn = $(".close-offcanas");


  showBtn.on("click", function () {
    offcanvas.css({ "left": "0px", "transition": "all .3s ease" });
    $('body').css({ "overflow": "hidden", "height": "100%" });
    $('.backdrop ').addClass('show');
    $('.backdrop ').removeClass('fade');
  });
  closeBtn.on("click", function () {
    offcanvas.css({ "left": "-250px", "transition": "all .3s ease" });
    $('body').css({ "overflow": "", "height": "" });
    $('.backdrop ').removeClass('show');
    $('.backdrop ').addClass('fade');

  });





  /* search bar for ipad and  mobile 
  ---------------------------------------*/

  const IconBox = $(".search-form");
  const searchBox = $(".search-box");
  const crossSvg = `<svg id="search-icon" fill="none" viewBox="0 0 17 16" width="17" height="16" xmlns="http://www.w3.org/2000/svg">
  <path d="m12.709 4.3677-8 8" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
  <path d="m4.709 4.3677 8 8" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  </path>
  </svg>`;

  const searchSvg = `<svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M16.4077 13.8339L13.292 10.7183C13.1514 10.5776 12.9608 10.4995 12.7608 10.4995H12.2514C13.1139 9.39639 13.6264 8.00889 13.6264 6.49951C13.6264 2.90889 10.717 -0.000488281 7.12642 -0.000488281C3.53579 -0.000488281 0.626419 2.90889 0.626419 6.49951C0.626419 10.0901 3.53579 12.9995 7.12642 12.9995C8.63579 12.9995 10.0233 12.487 11.1264 11.6245V12.1339C11.1264 12.3339 11.2045 12.5245 11.3452 12.6651L14.4608 15.7808C14.7545 16.0745 15.2295 16.0745 15.5202 15.7808L16.4045 14.8964C16.6983 14.6026 16.6983 14.1276 16.4077 13.8339ZM7.12642 10.4995C4.91704 10.4995 3.12642 8.71201 3.12642 6.49951C3.12642 4.29014 4.91392 2.49951 7.12642 2.49951C9.33579 2.49951 11.1264 4.28701 11.1264 6.49951C11.1264 8.70889 9.33892 10.4995 7.12642 10.4995Z" fill="#1E6F5C"></path>
  </svg>`;

  function searchEvent() {
    if (searchBox) {
      searchBox.css("display", "block");
      IconBox.find("#search-icon").remove();
      IconBox.append(crossSvg);
    } else {
      searchBox.css("display", "none");
      IconBox.find("#search-icon").remove();
      IconBox.append(searchSvg);
    }

    $("#search-icon").on("click", searchEvent);
  }

  $("#search-icon").on("click", searchEvent);





  /* Accordian
  ---------------------------------------*/
  const detailsElements = $("details");
  const summaryElements = $("summary");

  summaryElements.each(function (index) {
    $(this).on("click", function () {
      detailsElements.each(function (i) {
        if (i !== index) {
          this.open = false;
        }
      });
    });
  });




  /* Table of content toggle btn
---------------------------------------*/

  const toggleBtn = $(".tb-head");
  const content = $("#tableofcontent ul");

  // Check the screen width and set the initial display style
  if (window.innerWidth > 300 && window.innerWidth < 768) {
    content.css("display", "none");
  } else {
    content.css("display", "block");
  }

  toggleBtn.click(function () {
    if (content.css("display") === "none") {
      content.css("display", "block");
    } else {
      content.css("display", "none");
    }
  });




  /* Scroll to section on navigation link click
-------------------------------------------------*/
  const headings = $("h2, h3, h4");
  const navLinks = $("#tableofcontent ul li a");

  navLinks.click(function (event) {
    event.preventDefault();
    const targetId = $(this).attr("href").substring(1);
    const targetHeading = $("#" + targetId);
    if (targetHeading.length) {
      targetHeading[0].scrollIntoView({
        behavior: "smooth"
      });
    }
  });

  $(window).scroll(function () {
    headings.each(function () {
      const top = $(window).scrollTop();
      const offset = $(this).offset().top - 100;
      const height = $(this).outerHeight();
      const id = $(this).attr("id");

      if (top >= offset && top < offset + height) {
        navLinks.each(function () {
          // Remove "active" class from all parent elements
          $(this).closest('li').removeClass("active");

          if ($(this).attr("href") === `#${id}`) {
            // Add "active" class to the parent element (closest <li>)
            $(this).closest('li').addClass("active");
          }
        });
      }
    });
  });




  /* hero slider 
-------------------------------------------------*/
  function initializeGASlider(className, slidesPerView = 1, spaceBetween = 20) {
    const sliderParent = $('.' + className);
    const sliderWrap = sliderParent.find('.slider-wrap');
    const slideCount = sliderWrap.find('.slide-card').length;
    let currentIndex = 0;

    if (window.innerWidth >= 600 && window.innerWidth < 1024) {
      slidesPerView = 2;
    } else if (window.innerWidth <= 600) {
      slidesPerView = 1;
    }

    const containerWidth = sliderWrap.width();
    let slideWidth = (containerWidth / slidesPerView) - ((slidesPerView - 1) * spaceBetween / slidesPerView);

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
      const translateValue = -currentIndex * (slideWidth + spaceBetween);
      sliderWrap.css('transform', `translateX(${translateValue}px)`);
    }

    function updateButtonState() {
      if (currentIndex > 0) {
        sliderParent.find('#previous-arrow').prop('disabled', false);
        sliderParent.find('#svg-prev').css('fill', '#ffffff');
        sliderParent.find('#previous-arrow').css('backgroundColor', '#096761');
        sliderParent.find('#previous-arrow').css('border', 'none');
      } else {
        sliderParent.find('#previous-arrow').prop('disabled', true);
        sliderParent.find('#previous-arrow').css('border', '1px solid #096761');
        sliderParent.find('#previous-arrow').css('backgroundColor', '#ffffff');
        sliderParent.find('#svg-prev').css('fill', '#096761');
      }

      if (window.innerWidth <= 600) {
        if (currentIndex < slideCount - 1) {
          sliderParent.find('#next-arrow').prop('disabled', false);
        } else {
          sliderParent.find('#next-arrow').prop('disabled', true);
        }
      } else {
        if ((slideCount - currentIndex - 1) < slidesPerView) {
          sliderParent.find('#next-arrow').prop('disabled', true);
          sliderParent.find('#next-arrow').css('border', '1px solid #096761');
          sliderParent.find('#next-arrow').css('backgroundColor', '#ffffff');
          sliderParent.find('#svg-next').css('fill', '#096761');
        } else {
          sliderParent.find('#next-arrow').prop('disabled', false);
          sliderParent.find('#next-arrow').css('border', 'none');
          sliderParent.find('#next-arrow').css('backgroundColor', '#096761');
          sliderParent.find('#svg-next').css('fill', '#ffffff');
        }
      }

      if (slideCount <= slidesPerView) {
        sliderParent.find('#next-arrow').prop('disabled', true);
        sliderParent.find('#next-arrow').css('border', '1px solid #096761');
        sliderParent.find('#next-arrow').css('backgroundColor', '#ffffff');
        sliderParent.find('#svg-next').css('fill', '#096761');
      }
    }

    function calculateSlideSize() {
      const slideCards = sliderWrap.find('.slide-card');
      slideCards.css('width', slideWidth + 'px');
      slideCards.css('marginRight', spaceBetween + 'px');
      updateButtonState();
    }

    calculateSlideSize();

    $(window).resize(calculateSlideSize);

    sliderParent.find('#next-arrow').click(function () {
      if (currentIndex < slideCount - 1) {
        goToNextSlide();
      }
    });

    sliderParent.find('#previous-arrow').click(function () {
      if (currentIndex > 0) {
        goToPrevSlide();
      }
    });
  }

  initializeGASlider("wp-rd-product-slider");




  /* top to btn
  ---------------------------------------*/

  $(window).scroll(function () {
    scrollFunction();
  });

  function scrollFunction() {
    if ($(document).scrollTop() > 200) {
      $("#myBtn").css("display", "block");
    } else {
      $("#myBtn").css("display", "none");
    }
  }

  $("#myBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });



});
