$(window).scroll(function () {
  let scroll = $(window).scrollTop();
  if (scroll > 60) {
    $(".navigation.home").css({
      "background-color": "rgb(250 250 250 / 50%)",
      "backdrop-filter": "blur(10px)",
    });
    //$(".navigation-home .navbar-brand, .navigation .navbar-brand").css({"margin-left": "calc(50% - 74px)"});
    //$(".navigation-home .navbar-brand img, .navigation .navbar-brand img").css({"height": "16px"});
    // HEADER PAGES
    //$(".navigation .navbar-brand img").css({"filter": "invert(1)"});
    // $(".navigation .icon-bar").css({"background-color": "#fff"});
  } else {
    $(".navigation.home").css({
      "background-color": "transparent",
      "backdrop-filter": "blur(0)",
    });
    //$(".navigation-home .navbar-brand, .navigation .navbar-brand").css({"margin-left": "calc(50% - 100px)"});
    //$(".navigation-home .navbar-brand img, .navigation .navbar-brand img").css({"height": "21px"});
    // HEADER PAGES
    //$(".navigation .navbar-brand img").css({"filter": "invert(0)"});
    //$(".navigation .icon-bar").css({"background-color": "#000"});

    // if (!$(".navbar-toggler").hasClass('collapsed')) {
    //     $(".navigation.home .navbar-brand img").css({
    //         "opacity": "1",
    //         "filter": "invert(1)",
    //         "pointer-events": "all"
    //     });
    //     $(".navigation .navbar-brand img").css({
    //         "opacity": "1",
    //         "filter": "invert(1)",
    //         "pointer-events": "all"
    //     });
    // }
  }
});

$(window).ready(function () {
  if ($(".tabs-section").length) {
    const pills = $("#pills-tab .nav-link");
    const tabs = $("#pills-tabContent .tab-pane");

    function getActiveIndex() {
      return pills.index($("#pills-tab .nav-link.active"));
    }

    function showTab(index) {
      const pill = pills.eq(index)[0];
      const tab = new bootstrap.Tab(pill);

      tab.show();

      if (index === pills.length - 1) {
        $("#btnNextTabs span").html("Back To Beginning");
      } else {
        $("#btnNextTabs span").html("Next");
      }
    }

    function nextTab() {
      let index = getActiveIndex();
      let nextIndex = index + 1;

      if (nextIndex >= pills.length) {
        nextIndex = 0;
      }

      showTab(nextIndex);
    }

    function prevTab() {
      let index = getActiveIndex();
      let prevIndex = index - 1;

      if (prevIndex < 0) {
        prevIndex = pills.length - 1;
      }

      showTab(prevIndex);
    }

    $("#btnNextTabs").on("click", function () {
      nextTab();
    });

    $("#btnNextMobileTab").on("click", function () {
      nextTab();
    });

    $("#btnPrevMobileTab").on("click", function () {
      prevTab();
    });

    pills.on("click", function () {
      const index = pills.index($(this));

      if (index === pills.length - 1) {
        $("#btnNextTabs span").html("Back To Beginning");
      } else {
        $("#btnNextTabs span").html("Next");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBreakpoint = 1200;

  // NAVBAR + FULLSCREEN MENU
  // Navbar dropdown clickable functionality
  document
    .querySelectorAll(
      ".navbar .dropdown > .nav-link.dropdown-toggle, .fullscreen-nav > .dropdown > .nav-link.dropdown-toggle",
    )
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth > mobileMenuBreakpoint) {
          window.location.href = this.href;
          return;
        }

        if (typeof bootstrap === "undefined" || !bootstrap.Dropdown) {
          return;
        }

        e.preventDefault();
        bootstrap.Dropdown.getOrCreateInstance(this).toggle();
      });
    });

  // Hamburger icon click -> Fullscreen menu
  const toggleBtns = document.querySelectorAll(".menuToggle");
  const sidebar = document.getElementById("navSidebar");
  const logo = document.querySelector(".navbar-brand");

  toggleBtns.forEach((btn) => {
    const icon = btn.querySelector("i");
    const iconBars = btn.querySelectorAll(".icon-bar");

    btn.addEventListener("click", function () {
      // toggle menu (jouw bestaande code)
      logo.classList.toggle("d-none");
      btn.classList.toggle("collapsed");
      document.getElementById("fullscreenMenu").classList.toggle("active");
      iconBars.forEach((bar) => {
        bar.classList.toggle("bg-dark");
      });

      // toggle icon
      // icon.classList.toggle('fa-bars');
      // icon.classList.toggle('fa-xmark');

      //sidebar.classList.toggle('bg-transparent');
      // sidebar.classList.toggle('menu-open');
    });
  });

  // Close fullscreen menu by clicking on link
  document.querySelectorAll(".fullscreen-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth <= mobileMenuBreakpoint &&
        link.classList.contains("dropdown-toggle")
      ) {
        return;
      }

      document.getElementById("fullscreenMenu").classList.remove("active");
    });
  });

  document.querySelectorAll(".dropdown-back").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (window.innerWidth > mobileMenuBreakpoint) {
        return;
      }

      if (typeof bootstrap === "undefined" || !bootstrap.Dropdown) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const dropdownMenu = button.closest(".dropdown-menu");
      const parentDropdown = dropdownMenu?.closest(".dropdown");
      const dropdownToggle = parentDropdown?.querySelector(
        ":scope > .dropdown-toggle",
      );

      if (!dropdownToggle) {
        return;
      }

      bootstrap.Dropdown.getOrCreateInstance(dropdownToggle).hide();
    });
  });

  // SWIPER SLIDER
  if (document.querySelector(".inspireSwiper")) {
    var inspireSwiper = new Swiper(".inspireSwiper", {
      slidesPerView: "auto",
      spaceBetween: 60,
      freeMode: true,
      watchOverflow: false,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 40,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
        dragSize: 200,
      },
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      breakpoints: {
        576: {
          slidesOffsetBefore: 80,
          slidesOffsetAfter: 80,
          spaceBetween: 100,
        },
      },
    });
  }

  if (document.querySelector(".optionsSwiper")) {
    var optionsSwiper = new Swiper(".optionsSwiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      freeMode: true,
      slidesOffsetBefore: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
        dragSize: 200,
      },
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 3.2,
          slidesOffsetBefore: 80,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4.2,
          slidesOffsetBefore: 80,
          spaceBetween: 20,
        },
        1800: {
          slidesPerView: 5.1,
          slidesOffsetBefore: 80,
          spaceBetween: 20,
        },
      },
    });
  }

  var swiperCarousel = new Swiper(".swiperCarousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const modelDropdown = document.querySelector(".megamenu");
  const megaMenu = document.querySelector(".megamenu .dropdown-menu");
  // modelDropdown.addEventListener('shown.bs.dropdown', event => {
  //     megaMenu.style.opacity = 1;
  //     console.log('test!');
  // });

  let videowrappers = document.querySelectorAll(".video-pp");

  videowrappers.forEach((wrapper) => {
    let playPauseBtn = wrapper.querySelector(".play-pause-btn");
    let btnIcon = playPauseBtn.querySelector("i");
    let video = wrapper.querySelector("video");

    playPauseBtn.addEventListener("click", () => {
      if (video.paused) {
        btnIcon.classList.remove("fa-play");
        btnIcon.classList.add("fa-pause");
        video.play();

        return;
      }

      btnIcon.classList.remove("fa-pause");
      btnIcon.classList.add("fa-play");
      video.pause();
    });
  });
});

// ---****---- GSAP ----****---

function initGsapAnimations() {
  // GSAP - Navbar color change on scroll
  const navbar = document.querySelector(".navigation");
  let logo = navbar.querySelector(".navbar-brand img");
  let iconBars = navbar.querySelectorAll(".icon-bar");
  let btnWhite = navbar.querySelector("#buttonContact");
  let btnLink = navbar.querySelector("#buttonDealer");
  let btnLinkArrow = btnLink.querySelector("i");

  function changeNav(section) {
    if (section.classList.contains("bg-dark")) {
      navbar.classList.add("darkmode");
      btnWhite.classList.remove("btn-primary");
      btnWhite.classList.add("btn-white");

      btnLink.classList.remove("text-dark");
      btnLink.classList.add("text-white");
      btnLinkArrow.classList.remove("text-dark");
      btnLinkArrow.classList.add("text-white");

      logo.style.filter = "invert(1)";

      iconBars.forEach((bar) => {
        bar.style.backgroundColor = "#fff";
      });
    } else {
      navbar.classList.remove("darkmode");
      btnWhite.classList.remove("btn-white");
      btnWhite.classList.add("btn-primary");

      btnLink.classList.remove("text-white");
      btnLink.classList.add("text-dark");
      btnLinkArrow.classList.remove("text-white");
      btnLinkArrow.classList.add("text-dark");

      logo.style.filter = "invert(0)";

      iconBars.forEach((bar) => {
        bar.style.backgroundColor = "#000";
      });
    }
  }

  let currentSection = null;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      // Y-positie net onder je navbar
      const navbarRect = navbar.getBoundingClientRect();
      const y = navbarRect.bottom + 1;
      const x = window.innerWidth / 2;

      // element onder de navbar
      const el = document.elementFromPoint(x, y);
      if (!el) return;

      // dichtstbijzijnde section zoeken
      const section = el.closest("section");
      if (!section || section === currentSection) return;

      currentSection = section;
      changeNav(section);
    },
  });

  // GSAP - Fixed text on scroll
  if (document.querySelector(".stepped-animation")) {
    const pinDistance = 1500;
    const stepHeight =
      document.querySelector(".stepped-animation").offsetHeight;

    gsap.set(".single-step", { autoAlpha: 0 });

    // Section
    ScrollTrigger.create({
      trigger: ".pinned",
      start: "center center",
      end: "+=" + pinDistance,
      pin: ".pinned",
      markers: false,
      id: "pinned",
    });

    // Texts inside section
    const stepsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".pinned .stepped-animation",
        start: "top center",
        end: "+=" + pinDistance,
        scrub: 2,
        markers: false,
      },
    });

    const steps = gsap.utils.toArray(".pinned .single-step");

    let split, animation;

    const stepDuration = 2.5;

    steps.forEach((step, i) => {
      const textEl = step.querySelector("p"); // optie A: p targeten
      const split = new SplitText(textEl, { type: "lines" });

      // mini-timeline voor deze step
      const stepTl = gsap.timeline();

      // eerst: step zelf zichtbaar maken
      stepTl
        .fromTo(
          step,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, overwrite: true },
        )

        // daarna: de lijnen animeren
        .from(
          split.lines,
          {
            duration: 0.8,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          },
          "<",
        )

        .to(step, { autoAlpha: 0, duration: 0.8 });

      // deze step-timeline op de juiste positie in de hoofd-timeline
      stepsTimeline.add(stepTl, i * stepDuration);
    });
    // add blank space to the end of the timeline so that the last element stays for a bit before unpinning.
    stepsTimeline.to({}, { duration: 0 });
  }

  // GSAP - Pin a section
  let pinnedSections = gsap.utils.toArray(".pinned-section");

  ScrollTrigger.matchMedia({
    "(min-width: 991px)": function () {
      pinnedSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "center center",
          end: "+=600",
          pin: section,
          markers: false,
          id: "pinnedSection",
        });
      });
    },

    "(max-width: 990px)": function () {
      pinnedSections.forEach((section) => {
        // Alleen pinnen op mobiel als .depin-mobile NIET aanwezig is
        if (!section.classList.contains("depin-mobile")) {
          ScrollTrigger.create({
            trigger: section,
            start: "center center",
            end: "+=600",
            pin: section,
            markers: false,
            id: "pinnedSection",
          });
        }
      });
    },
  });

  // GSAP - Pin a section with layer effect
  let pinnedLayerSections = gsap.utils.toArray(".pinned-layer-section");

  pinnedLayerSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  });

  // GSAP - Fade-in a section
  let fadeInSections = gsap.utils.toArray(".fade-in-section");

  fadeInSections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "30% bottom",
        scrub: true,
      },
    });
  });

  // GSAP - curtain effect on a section
  let staticTransitionSections = gsap.utils.toArray(".static-transition");

  staticTransitionSections.forEach((section) => {
    gsap.set(section, {
      clipPath: "inset(0% 0% 0% 0%)",
      //y: -500
    });

    gsap.to(section, {
      clipPath: "inset(0% 0% 100% 0%)",
      //y: -500,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        //markers: true,
        pinSpacing: false,
      },
    });
  });
  // let staticTransitionSections = gsap.utils.toArray(".static-transition");

  // staticTransitionSections.forEach((section) => {
  //     gsap.set(section, {
  //       clipPath: "inset(100% 0% 0% 0%)",
  //       //y: -500
  //     });

  //     gsap.to(section, {
  //       clipPath: "inset(0% 0% 0% 0%)",
  //       //y: -500,
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         end: "bottom+=100vh top",
  //         scrub: true,
  //         markers: true
  //       }
  //     });
  // });

  // GSAP - Content animation on scroll

  // Hero section
  if (document.querySelector(".hero")) {
    let heroTitle = document.querySelector(".hero h1");
    let heroButton = document.querySelector(".hero #heroButton");
    const splitHero = new SplitText(heroTitle, { type: "lines" });

    let tlContentAnimation = gsap.timeline();

    tlContentAnimation
      .from(navbar, { autoAlpha: 0, duration: 2 }, 0)
      .from(
        splitHero.lines,
        {
          duration: 4,
          yPercent: 100,
          opacity: 0,
          stagger: 0.3,
          ease: "expo.out",
        },
        "-=1",
      )
      .fromTo(
        heroButton,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1 },
        "-=4",
      );
  }

  // Tabs section
  if (document.querySelector(".tabs-section")) {
    let tabs = gsap.utils.toArray(".tabs-section .nav-pills .nav-item");

    let tlTabs = gsap.timeline({
      scrollTrigger: {
        trigger: ".tabs-section",
        start: "top 50%",
        end: "top top", // 'top top-=200px',
        scrub: 3,
      },
    });

    tlTabs
      .from(tabs, {
        duration: 0.8,
        opacity: 0,
        yPercent: 100,
        stagger: 0.3,
      })
      .from(
        ".content-img",
        {
          duration: 2,
          opacity: 0,
          xPercent: -10,
        },
        1,
      )
      .from(
        ".content-txt",
        {
          duration: 2,
          opacity: 0,
          xPercent: 10,
        },
        "-=2",
      );
  }

  // Carousel (Inspo) section
  if (document.querySelector(".carousel-section")) {
    let carouselTitle = document.querySelector(".carousel-section h2");
    let carouselText = document.querySelector(".carousel-section p");
    let carouselBtn = document.querySelector(".carousel-section .btn");
    let carouselImages = gsap.utils.toArray(".inspo-img");

    let tlCarousel = gsap.timeline({
      scrollTrigger: {
        trigger: ".carousel-section",
        start: "top 50%",
        end: "top top", //'top top-=200px',
        scrub: 3,
      },
    });

    tlCarousel
      .from(carouselTitle, {
        duration: 0.8,
        opacity: 0,
        yPercent: 100,
        stagger: 0.3,
      })
      .from(
        carouselText,
        {
          duration: 2,
          opacity: 0,
          xPercent: -10,
        },
        1,
      )
      .fromTo(
        carouselBtn,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1 },
        "-=1.5",
      )
      .from(
        carouselImages,
        {
          duration: 1,
          scale: 0.6,
          opacity: 0,
          //y: 40,
          ease: "sine",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        "-=1",
      )
      .from(
        ".carousel-section .swiper-scrollbar",
        {
          duration: 1,
          opacity: 0,
          yPercent: 100,
        },
        "-=1",
      );
  }

  // Vehicle section
  if (document.querySelector(".vehicle-section")) {
    let vehicleSection = document.querySelector(".vehicle-section");
    let vehicleTitle = vehicleSection.querySelector("h2");
    let vehicleCar = vehicleSection.querySelector("#pills-tabContent");
    let vehicleTabs = vehicleSection.querySelector("#pills-tab");
    let vehicleMetricsWrapper = vehicleSection.querySelector(".metrics");

    let vehicleMetrics = gsap.utils.toArray(
      vehicleMetricsWrapper.querySelectorAll("*"),
    );

    let tlVehicle = gsap.timeline({
      scrollTrigger: {
        trigger: ".vehicle-section",
        start: "top 40%",
        end: "top top", // 'top top-=200px',
        scrub: 2,
      },
    });

    tlVehicle
      .from(vehicleTitle, {
        duration: 1,
        opacity: 0,
        yPercent: -60,
      })
      .from(
        vehicleCar,
        {
          duration: 20,
          opacity: 0,
        },
        "+=10",
      )
      .from(
        vehicleTabs,
        {
          duration: 2,
          opacity: 0,
          yPercent: 50,
        },
        "+=2",
      )
      .from(
        vehicleMetrics,
        {
          duration: 2,
          opacity: 0,
          yPercent: 100,
          stagger: 1,
        },
        "+=3",
      );
  }

  // Vehicle Carousel section
  if (document.querySelector(".vehicle-carousel-section")) {
    let vehicleCarouselSection = document.querySelector(
      ".vehicle-carousel-section",
    );
    let vehicleCarouselTitle = vehicleCarouselSection.querySelector("h2");
    let vehicleCarouselImages = gsap.utils.toArray(
      vehicleCarouselSection.querySelectorAll(".swiper-slide .card-img-top"),
    );
    let vehicleCarouselImagesTitle = gsap.utils.toArray(
      vehicleCarouselSection.querySelectorAll(".swiper-slide .card-body"),
    );
    let vehicleCarouselScrollbar =
      vehicleCarouselSection.querySelector(".swiper-scrollbar");

    let tlVehicleCarousel = gsap.timeline({
      scrollTrigger: {
        trigger: ".vehicle-carousel-section",
        start: "top 30%",
        end: "top top", //'top top-=200px',
        scrub: 3,
      },
    });

    tlVehicleCarousel
      .from(vehicleCarouselTitle, {
        duration: 0.8,
        opacity: 0,
        yPercent: 100,
      })
      .from(
        vehicleCarouselImages,
        {
          duration: 4,
          scale: 0.6,
          opacity: 0,
          //y: 40,
          ease: "sine",
          stagger: {
            each: 4,
            from: "start",
          },
        },
        "+=1",
      )
      .from(
        vehicleCarouselImagesTitle,
        {
          duration: 4,
          opacity: 0,
          xPercent: -10,
          ease: "sine",
          stagger: {
            each: 4,
            from: "start",
          },
        },
        "-=20",
      )
      .from(
        vehicleCarouselScrollbar,
        {
          duration: 1,
          opacity: 0,
          yPercent: 100,
        },
        "-=6",
      );
  }

  // Class effects
  let slideUp = document.querySelectorAll(".slide-up");
  let slideRight = document.querySelectorAll(".slide-right");
  let slideLeft = document.querySelectorAll(".slide-left");
  let fadeIn = document.querySelectorAll(".fade-in");
  let expandVideo = document.querySelectorAll(".expand-video");
  let stagger = document.querySelectorAll(".stagger");
  let staggerText = document.querySelectorAll(".stagger-text");
  let zoomIn = document.querySelectorAll(".zoom-in");

  slideUp.forEach((el) => {
    animationSlideUp(el);
  });

  slideRight.forEach((el) => {
    animationSlideRight(el);
  });

  slideLeft.forEach((el) => {
    animationSlideLeft(el);
  });

  fadeIn.forEach((el) => {
    animationFadeIn(el);
  });

  expandVideo.forEach((el) => {
    animationVideoExpand(el);
  });

  stagger.forEach((el) => {
    animationStaggerElements(el);
  });

  staggerText.forEach((el) => {
    animationStaggerText(el);
  });

  zoomIn.forEach((el) => {
    animationZoomIn(el);
  });

  function animationSlideUp(target) {
    gsap.from(target, {
      duration: 0.8,
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 70%", //'top top-=200px',
        scrub: 2,
        //markers:true,
      },
    });
  }

  function animationSlideRight(target) {
    gsap.from(target, {
      duration: 0.8,
      opacity: 0,
      x: -100,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 70%", //'top top-=200px',
        scrub: 2,
        //markers:true,
      },
    });
  }

  function animationSlideLeft(target) {
    gsap.from(target, {
      duration: 0.8,
      opacity: 0,
      x: 100,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 70%", //'top top-=200px',
        scrub: 2,
        //markers:true,
      },
    });
  }

  function animationFadeIn(target) {
    gsap.from(target, {
      duration: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 70%", //'top top-=200px',
        scrub: 2,
        //markers:true,
      },
    });
  }

  function animationVideoExpand(target) {
    gsap.from(target, {
      duration: 0.8,
      scale: 0.6,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 50%", //'top top-=200px',
        scrub: 1,
        //markers:true,
      },
    });
  }

  function animationStaggerElements(target) {
    let elements = gsap.utils.toArray(target.children);

    gsap.from(elements, {
      duration: 4,
      y: 60,
      opacity: 0,
      ease: "sine",
      stagger: {
        each: 4,
        from: "start",
      },
      scrollTrigger: {
        trigger: target,
        start: "top 80%",
        end: "top 40%", //'top top-=200px',
        scrub: 1,
        //markers:true,
      },
    });
  }

  function animationStaggerText(target) {
    const split = new SplitText(target, { type: "lines" });

    gsap.from(split.lines, {
      duration: 0.8,
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",

      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 50%", //'top top-=200px',
        scrub: 1,
        //markers:true,
      },
    });
  }

  function animationZoomIn(target) {
    gsap.from(target, {
      duration: 0.8,
      opacity: 0,
      scale: 0.6,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        end: "top 70%", //'top top-=200px',
        scrub: 2,
        //markers:true,
      },
    });
  }

  // Sticky nav Process
  const navbarProcess = document.querySelector("#processNavbar");
  const ctaBespoke = document.querySelector("#ctaBespoke");

  if (navbarProcess) {
    const sections = [
      {
        section: document.querySelector("#sectionFirstMeeting"),
        navItem: navbarProcess.querySelector(".row div:nth-child(1)"),
      },
      {
        section: document.querySelector("#sectionConfiguration"),
        navItem: navbarProcess.querySelector(".row div:nth-child(2)"),
      },
      {
        section: document.querySelector("#sectionProduction"),
        navItem: navbarProcess.querySelector(".row div:nth-child(3)"),
      },
      {
        section: document.querySelector("#sectionDelivery"),
        navItem: navbarProcess.querySelector(".row div:nth-child(4)"),
      },
    ];

    // 1. Sticky / pin navbar
    ScrollTrigger.create({
      trigger: navbarProcess,
      start: () => {
        if (window.innerWidth < 768) {
          return "top 48px"; // mobiel
        } else {
          return "top 58px"; // desktop
        }
      },
      endTrigger: ctaBespoke,
      end: () => {
        if (window.innerWidth < 768) {
          return "top 2px"; // mobiel
        } else {
          return "top 170px"; // desktop
        }
      },
      pin: true,
      pinSpacing: false,
      //anticipatePin: 1,
      markers: false,
    });

    // 2. Active state per section
    sections.forEach((item) => {
      ScrollTrigger.create({
        trigger: item.section,
        start: "top 170px",
        end: "bottom+=128px 170px",
        markers: false,
        onEnter: () => {
          item.navItem.classList.add("active");
        },
        onLeave: () => {
          item.navItem.classList.remove("active");
        },
        onEnterBack: () => {
          item.navItem.classList.add("active");
        },
        onLeaveBack: () => {
          item.navItem.classList.remove("active");
        },
      });
    });
  }
}

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
  initGsapAnimations();
  ScrollTrigger.refresh(); // extra zekerheid
});

let resizeTimer;
let lastViewportWidth = window.innerWidth;
window.addEventListener("resize", () => {
  const viewportWidth = window.innerWidth;
  const viewportWidthChanged = Math.abs(viewportWidth - lastViewportWidth) > 2;
  const isMobileViewport = window.matchMedia("(max-width: 991px)").matches;

  lastViewportWidth = viewportWidth;

  // Mobile browsers fire resize while the address bar collapses/expands.
  // Refreshing ScrollTrigger during that momentum scroll can abruptly stop it.
  if (isMobileViewport && !viewportWidthChanged) {
    return;
  }

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
