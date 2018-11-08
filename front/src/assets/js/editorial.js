import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import ScrollMagic from 'scrollmagic';
import 'animation.gsap';
import 'debug.addIndicators';
import Plyr from 'plyr';

export default class Editorial {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      body: $('body'),
      header: $('header'),
      blocks: $('.js-layout-blocks .block'),
      overflowButton: $('.js-overflow-button'),
    };
    this.gallerySlider = null;
    this.sidebarSlider = null;
    this.gallerySliderId = '#gallery_slider';
    this.sidebarSliderId = '#sidebar_slider';
    this.videoPlayer = null;
    this.videoPlayerId = '#player';
    this.scrollController = new ScrollMagic.Controller();
  };

  initEvents () {
    this.initSliders();
    this.initScrollMagic();
    this.initPlayer();
    if (this.$els.blocks.length) {
      this.checkBlocks();
      this.$els.overflowButton.on('click', this.toggleBlock.bind(this));
    }
  }

  initSliders () {
    this.gallerySlider = new Swiper(this.gallerySliderId, {
      watchOverflow: true,
      pagination: {
        el: `#gallery_slider_pagination`,
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
        nextEl: `#gallery_slider_navigation .swiper-button-next`,
        prevEl: `#gallery_slider_navigation  .swiper-button-prev`,
      },
    });
    this.sidebarSlider = new Swiper(this.sidebarSliderId, {
      watchOverflow: true,
      pagination: {
        el: `${this.sidebarSliderId} .swiper-pagination`,
        type: 'bullets'
      },
    });
  }

  initScrollMagic () {
    this.scene = new ScrollMagic.Scene({
      triggerElement: this.gallerySliderId,
    }).on('start', () => {
      this.gallerySlider.params.autoplay.delay = 7000;
      this.gallerySlider.autoplay.start();
    }).addTo(this.scrollController);
  }

  initPlayer () {
    this.videoPlayer = new Plyr(this.videoPlayerId);
  }

  checkBlocks () {
    const blocksArray = this.$els.blocks;
    for (let i = 0, len = blocksArray.length; i < len; i++) {
      const block = blocksArray[i];
      if ($(block).height() > 550) {
        $(block).addClass('overflow');
      }
    }
  }

  toggleBlock (e) {
    const $currentButton = $(e.currentTarget);
    const $block = $currentButton.closest('.block');
    $block.toggleClass('opened');
  }
}
