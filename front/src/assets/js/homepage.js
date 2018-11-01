import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

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
  };

  initEvents () {
    this.initSliders();
    document.addEventListener('scroll', () => {
      // console.log(window.scrollY)
      if (window.scrollY > 70 && !this.$els.header.hasClass('sticky')) {
        this.$els.header.addClass('sticky');
      } else if (window.scrollY < 70 && this.$els.header.hasClass('sticky')) {
        this.$els.header.removeClass('sticky');
      }
    }, true);
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
      // Navigation arrows
      navigation: {
        nextEl: `${this.offersSliderId} .swiper-button-next`,
        prevEl: `${this.offersSliderId} .swiper-button-prev`,
      },

    });
    this.heroSlider = new Swiper(this.heroSliderId, {
      watchOverflow: true,
      slidesPerView: 1,
    });
    this.logoSlider = new Swiper(this.logoSliderId, {
      watchOverflow: true,
      slidesPerView: 2,
      centeredSlides: true,
      speed: 600,
    });

    this.heroSlider.controller.control = this.logoSlider;
    this.logoSlider.controller.control = this.heroSlider;
  }
}
