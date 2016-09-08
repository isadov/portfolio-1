'use strict';

module.exports = {
  pin: function (element, position) {
    element = element instanceof jQuery ? element : $(element);
    position = position ? position : element.offset();

    element.addClass('pinned').css({
      position: 'fixed',
      top: position.top + 'px',
      left: position.left + 'px'
    });
  },
  unpin: function (element) {
    element = element instanceof jQuery ? element : $(element);

    element.removeClass('pinned').css({
      position: '',
      top: '',
      right: '',
      bottom: '',
      left: ''
    });
  },
  isPinned: function (element) {
    element = element instanceof jQuery ? element : $(element);

    return element.hasClass('pinned');
  }
};