'use strict';

module.exports = function () {
  var
    navItems = $('.admin-navigation__item'),
    tabs = $('.js-tab');

  function changeTab() {
    var
      hash = location.hash,
      activeTab = tabs.filter(hash),
      activeNavItem = navItems.find('a').filter('[href="' + hash + '"]').parent();

    tabs.filter(':not(' + hash + ')').removeClass('active');

    if (activeTab.length) {
      activeTab.addClass('active');
      navItems.removeClass('active');
      activeNavItem.addClass('active');
    } else {
      navItems.eq(0).addClass('active');
      tabs.eq(0).addClass('active');
    }
  }

  $(window).on('hashchange', changeTab);
  $(changeTab);
};