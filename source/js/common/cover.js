'use strict';

module.exports = function (element, target, callback) {
  element = element instanceof jQuery ? element : $(element);

  var elementHeight = element.height();

  element.css('margin-top', '-' + elementHeight + 'px');

  if (target) {
    target = target instanceof jQuery ? target : $(target);
    target.css('padding-bottom', elementHeight + 'px');
  }

  if (callback)
    callback(elementHeight);
};