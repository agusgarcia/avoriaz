import $ from 'jquery';

export default class Common {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      html: $('html, body'),
      header: $('header'),
      menu: $('.main-menu'),
      toggleMenuButton: $('.js-toggle-menu'),
      menuContainer: $('.js-menu-container'),
      menuLinks: $('.js-menu-link'),
      anchors: $('a[href^="#"]'),
    };
  }

  initEvents () {
    this.$els.toggleMenuButton.on('click', this.toggleMenu.bind(this));
    this.$els.menuLinks.on('click', this.toggleMenu.bind(this));
    this.$els.anchors.on('click', this.smoothScroll.bind(this));
  }

  toggleMenu () {
    this.$els.menuContainer.toggleClass('active');
    this.$els.toggleMenuButton.toggleClass('active');
    this.$els.menu.toggleClass('active');
    this.$els.header.toggleClass('active');
  }

  smoothScroll (e) {
    e.preventDefault();
    const target = $(e.currentTarget.hash);
    if (target) {
      this.$els.html.animate({scrollTop: target.offset().top}, 500);
      return false;
    }
  }
}
