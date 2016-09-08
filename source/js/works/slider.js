'use strict';

module.exports = function () {
  //noinspection JSDuplicatedDeclaration
  var
    slider = $('.js-slider'),
  // Инфа
    image = slider.find('.js-slider__slide-image'),
    name = slider.find('.js-slider__slide-name'),
    description = slider.find('.js-slider__slide-description'),
    link = slider.find('.js-slider__slide-link'),
  // Кнопки
    prevButton = slider.find('.js-slider__prev'),
    prevButtonImageCurrent = prevButton.find('.js-slider__control-image_current'),
    prevButtonImageNext = prevButton.find('.js-slider__control-image_next'),
    nextButton = slider.find('.js-slider__next'),
    nextButtonImageCurrent = nextButton.find('.js-slider__control-image_current'),
    nextButtonImageNext = nextButton.find('.js-slider__control-image_next'),
  // Слайды
    items = slider.find('.js-slider__item'),
    current = 0,
    currentSlideItem,
    prevSlideItem,
    nextSlideItem;

  function validate(num) {
    var result;

    if (num < 0)
      result = items.length - 1;
    else if (num > items.length - 1)
      result = 0;
    else
      result = num;

    return result;
  }

  function calcSlides() {
    var
      prev = validate(current - 1),
      next = validate(current + 1);

    currentSlideItem = items.eq(current);
    prevSlideItem = items.eq(prev);
    nextSlideItem = items.eq(next);
  }

  function init() {
    calcSlides();

    changeSlide();
  }

  function changeBackground(elem, background) {
    elem.css('background-image', 'url("' + background + '")');

    return elem;
  }

  function changeSlideControl(next, current, background, direction) {
    if (direction) {
      next.css('top', '100%')
    }

    changeBackground(next, background).animate({
      top: '0%'
    }, function () {
      $(this).css('top', direction ? '100%' : '-100%');
    });

    current.animate({
      top: direction ? '-100%' : '100%'
    }, function () {
      changeBackground($(this), background).css('top', '0');
    });
  }

  function textChange(elem, text, animationName) {
    text = '' + text;
    var letters = text.split('');
    var str = '<span style="display: inline-block;">';
    var animationDelay = 0;

    letters.forEach(function (letter, id) {
      animationDelay++;

      if (letter === ' ') {
        str += '&nbsp;</span><span style="display: inline-block;">';
      } else {
        str += '<span id="letter-' + id + '" class="' + animationName
          + '" style="display: inline-block; animation-delay:'
          + animationDelay / 20
          + 's">'
          + letter
          + '</span>';
      }

    });
    str += '</span>';
    elem.html(str);
  }

  function changeSlide() {
    // Смена главного изображения
    image.fadeOut(300, function () {
      changeBackground($(this), currentSlideItem.data('img')).fadeIn();
    });

    // Смена текста
    textChange(name, currentSlideItem.data('name'), 'bounceIn');
    textChange(description, currentSlideItem.data('description'), 'bounceIn');
    link.attr('href', currentSlideItem.data('link'));

    // Смена слайдов в контролах
    changeSlideControl(prevButtonImageNext, prevButtonImageCurrent, prevSlideItem.data('img'));
    changeSlideControl(nextButtonImageNext, nextButtonImageCurrent, nextSlideItem.data('img'), true);
  }

  function nextSlide() {
    current = validate(++current);
    calcSlides();
    slider.trigger('changeSlide');
  }

  function prevSlide() {
    current = validate(--current);
    calcSlides();
    slider.trigger('changeSlide');
  }

  $(window).load(init);
  slider.on('changeSlide', changeSlide);
  nextButton.click(nextSlide);
  prevButton.click(prevSlide);
};