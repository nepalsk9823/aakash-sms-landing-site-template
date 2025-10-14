/* ####### FIXED NAVBAR EFFECT AFTER SCROLL ####### */
const navbar = document.querySelector(".asms-header");
const scrollThreshold = 20;

const handleScroll = () => {
  const isScrolled = window.scrollY > scrollThreshold;
  navbar.classList.toggle("asms-header-fixed", isScrolled);
  navbar.classList.toggle("shadow-default", isScrolled);
};

handleScroll();
window.addEventListener("scroll", handleScroll);
/* ####### EOF FIXED NAVBAR EFFECT AFTER SCROLL ####### */

// Prevent browser from restoring scroll position until layout stabilizes
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* ####### MOBILE SCREEN SIDEBAR ####### */
const navbarOverlay = document.querySelector('.asms-navbar-overlay');
const navbarOpenBtn = document.querySelector('.asms-navbar-open-btn');
const navbarCloseBtn = document.querySelector('.asms-navbar-close-btn');
const navbarMenuWrapper = document.querySelector('.asms-navbar-menu-wrapper');

navbarOpenBtn.addEventListener("click", () => {
  navbarMenuWrapper.classList.add("show");
  navbarOverlay.classList.add("show");
});

navbarCloseBtn.addEventListener('click', () => {
  navbarMenuWrapper.classList.remove("show");
  navbarOverlay.classList.remove("show");
});

navbarOverlay.addEventListener('click', () => {
  navbarOverlay.classList.remove("show");
  navbarMenuWrapper.classList.remove("show");
});

/* ####### EOF MOBILE SCREEN SIDEBAR ####### */

// Helper: safely init Swiper only when container is visible
const initSwiperWhenVisible = (container, options) => {
  if (!container) return;
  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        new Swiper(container, options);
        obs.disconnect(); // init only once
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(container);
}

// Helper: safely get Swiper child element
const safeSwiperEl = (parent, selector) => {
  if (!parent) return undefined;
  const el = parent.querySelector(selector);
  return el || undefined;
}

window.addEventListener("load", () => {
  const industriesSwiperContainer = document.querySelector(".industries-slider");

  /* ===== SWIPER INITIALIZATIONS ===== */

  // INDUSTRIES SLIDER
  initSwiperWhenVisible(industriesSwiperContainer, {
    loop: true,
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 20,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      576: {
        spaceBetween: 14,
      },
      768: {
        spaceBetween: 16,
      },
      1400: {
        spaceBetween: 18,
      }
    },
  })
});

/* ===== RESIZE OPTIMIZATION ===== */
let resizeTimer;
let resizeScheduled = false;
window.addEventListener("resize", () => {
  if (!resizeScheduled) {
    resizeScheduled = true;
    requestAnimationFrame(() => {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
      resizeScheduled = false;
    });
  }
}, { passive: true });