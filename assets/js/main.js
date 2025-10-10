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