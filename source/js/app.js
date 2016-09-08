(function () {
  'use strict';
  // Общие
  var pin = require('./common/pin');
  var initMenu = require('./common/menu');
  var cover = require('./common/cover');
  var scrollTo = require('./common/scroll-to');
  var preloader = require('./common/preloader');
  var parallax = require('./common/header-parallax');
  var validate = require('./common/validate');
  // Welcome
  var flip = require('./welcome/flip');
  var auth = require('./welcome/auth');
  // Works
  var slider = require('./works/slider');
  var worksParallax = require('./works/works-parallax');
  var blur = require('./works/blur');
  // About
  var mapInit = require('./about/map-init');
  var skillsAnimation = require('./about/skills-animation');
  // Blog
  var initSidebar = require('./blog/sidebar');
  var initSwipeSidebar = require('./blog/swipe-sidebar');
  // Admin
  var tabs = require('./admin/tabs');
  var skillsSave = require('./admin/skills-save');
  var postAdd = require('./admin/post-add');
  var workAdd = require('./admin/work-add');

  function isCurrent(page) {
    return $(page).length;
  }

  // Общие
  $.extend($.fancybox.defaults, {
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  if (!isCurrent('#page-welcome')) {
    initMenu();
  }

  preloader();

  svg4everybody();

  parallax();

  scrollTo('.js-scrollto', 500);

  // Welcome
  if (isCurrent('#page-welcome')) {
    flip();
    validate();
    auth();
  }

  // Works
  if (isCurrent('#page-works')) {
    window.onload = window.onresize = function () {
      cover('#footer', '#js-cover-target', blur);
    };
    slider();
    worksParallax();
    validate();
  }

  // About
  if (isCurrent('#page-about')) {
    window.onload = window.onresize = function () {
      cover('#footer');
    };
    skillsAnimation();
    google.maps.event.addDomListener(window, 'load', mapInit);
  }

  // Blog
  if (isCurrent('#page-blog')) {
    initSidebar();
    initSwipeSidebar();
  }

  // Admin
  if (isCurrent('#page-admin')) {
    tabs();
    skillsSave();
    postAdd();
    workAdd();
  }
})();
