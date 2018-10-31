import './../scss/index.scss';
import $ from 'jquery';
import Common from './common';
// import './css-polyfill';

export class App {
  constructor () {
    this.initEls();
    this.launchPage();
  }

  initEls () {
    this.$els = {
      $homepage: $('.js-homepage') || null,
    };
  }

  launchPage () {
    require('es6-promise').polyfill();

    // Everytime, import Common js (menu, etc.)
    new Common();
    // Import the right file according to the current page
    if (this.$els.$homepage.length > 0) {
      import(/* webpackChunkName: "homepage" */ './homepage.js').then(module => {
        const Homepage = module.default;
        new Homepage();
      }).catch((e) => {
        console.log(e);
      });
    }
  }
}

new App();
