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
    };
    this.offersSlider = null;
    this.offersSliderId = '#homepage_offers';
  };

  initEvents () {
    this.initSliders();
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
  }
}
