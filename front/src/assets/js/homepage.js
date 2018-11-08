import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

export default class Homepage {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      body: $('body'),
      header: $('header'),
    };
    this.logoSlider = null;
    this.heroSlider = null;
    this.offersSlider = null;
    this.logoSliderId = '#homepage_logo';
    this.heroSliderId = '#homepage_hero';
    this.offersSliderId = '#homepage_offers';
    this.scrollController = new ScrollMagic.Controller();
  };

  initEvents () {
    this.initSliders();
    this.initScrollMagic();
  }

  initSliders () {
    this.offersSlider = new Swiper(this.offersSliderId, {
      watchOverflow: true,
      pagination: {
        el: `${this.offersSliderId} .swiper-pagination`,
        type: 'fraction',
        formatFractionCurrent: (number) => {
          if (number < 10) {
            return `0${number}`;
          } else {
            return number;
          }
        },
        formatFractionTotal: (number) => {
          if (number < 10) {
            return `0${number}`;
          } else {
            return number;
          }
        },
      },
      speed: 600,
      // Navigation arrows
      navigation: {
        nextEl: `${this.offersSliderId} .swiper-button-next`,
        prevEl: `${this.offersSliderId} .swiper-button-prev`,
      },

    });
    this.heroSlider = new Swiper(this.heroSliderId, {
      watchOverflow: true,
      slidesPerView: 1,
      speed: 1000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      on: {
        'slideChange': () => {
          console.log('slideChange');
          const $prev = $(`${this.logoSliderId} .swiper-slide`);
          $prev.off('mouseover');
          this.sliderTimeout = setTimeout(() => {
            console.log('call Slide');
            this.slideOnHover();
          }, 1000);
        }
      }
    });
    this.logoSlider = new Swiper(this.logoSliderId, {
      watchOverflow: true,
      slidesPerView: 2,
      centeredSlides: true,
      speed: 800,
      breakpoints: {
        768: {
          slidesPerView: 1.5,
        },
        640: {
          slidesPerView: 1,
        }
      },
    });

    this.heroSlider.controller.control = this.logoSlider;
    this.logoSlider.controller.control = this.heroSlider;
    this.slideOnHover();
  }

  slideOnHover () {
    // Animation to slide hero slider
    const $prev = $(`${this.logoSliderId} .swiper-slide-prev`);
    const $next = $(`${this.logoSliderId} .swiper-slide-next`);
    $next.on('mouseover', () => {
      console.log('hovered');
      this.heroSlider.slideNext(1500);
    });
    $prev.on('mouseover', () => {
      console.log('hovered prev');
      this.heroSlider.slidePrev(1500);
    });
    clearTimeout(this.sliderTimeout);
  }

  initScrollMagic () {
    this.scene = new ScrollMagic.Scene({
      triggerElement: this.offersSliderId,
    }).on('start', () => {
      this.offersSlider.params.autoplay.delay = 7000;
      this.offersSlider.autoplay.start();
    }).addTo(this.scrollController);
  }
}
