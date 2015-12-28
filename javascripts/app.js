(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("initialize", function(exports, require, module) {
var carwashes__iPadScrollInit, carwashes__onResize, carwashes__scrollMagicInit, carwashes__scrollMagicUpdate, carwashes__videoResize;

carwashes__videoResize = function() {
  var video_height, video_width;
  video_width = 917;
  video_height = 516;
  if (window.carwashes__screen_w * 9 > window.carwashes__screen_h * 16) {
    if (window.carwashes__screen_h < video_height) {
      video_height = window.carwashes__screen_h;
    }
    video_width = video_height * 16 / 9;
  } else {
    if (window.carwashes__screen_w < video_width) {
      video_width = window.carwashes__screen_w;
      video_height = $('.carwashes__section.carwashes__video .carwashes__container').css('text-align', 'left');
    } else {
      video_height = $('.carwashes__section.carwashes__video .carwashes__container').css('text-align', 'center');
    }
    video_height = video_width * 9 / 16;
  }
  $('.carwashes__section.carwashes__video iframe').width(video_width);
  return $('.carwashes__section.carwashes__video iframe').height(video_height);
};

carwashes__scrollMagicInit = function() {
  var back_color, captionEase, captionOffset;
  window.controller = new ScrollMagic.Controller;
  window.carwashes__scene_car_pin = new ScrollMagic.Scene({
    triggerElement: '#carwashes__car-screen',
    triggerHook: 'onLeave',
    duration: '401%',
    tweenChanges: true
  }).setPin('#carwashes__car-screen').addTo(window.controller);
  captionEase = SlowMo.ease.config(0.2, 0.3, false);
  captionOffset = window.carwashes__screen_w * 1.1;
  window.carwashes__captionTween1 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_1'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween2 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_2'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween3 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_3'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween4 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_4'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTimeline = new TimelineMax();
  window.carwashes__captionTimeline.add(window.carwashes__captionTween1);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween2);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween3);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween4);
  window.carwashes__scene_car_caption_move = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(window.carwashes__captionTimeline).addTo(window.controller);
  back_color = new TimelineMax().to($('.carwashes__section.carwashes__main_car_animation'), 1, {
    backgroundColor: "#97e5ec",
    ease: Power0.easeNone
  }).to($('.carwashes__section.carwashes__main_car_animation'), 1, {
    backgroundColor: "#97d9ec",
    ease: Power0.easeNone
  }).to($('.carwashes__section.carwashes__main_car_animation'), 1, {
    backgroundColor: "#97c1ec",
    ease: Power0.easeNone
  }).to($('.carwashes__section.carwashes__main_car_animation'), 1, {
    backgroundColor: "#82bcf8",
    ease: Power0.easeNone
  });
  window.carwashes__scene_car_back_color = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(back_color).addTo(window.controller);
  window.carwashes__scene_car_1_to_2 = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '100%',
    triggerHook: 0
  }).on("start end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-1').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-2').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-1').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-2').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_1').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_1').addClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1').addClass("carwashes__car-element-active");
  }).on("start", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').removeClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').removeClass("carwashes__car-element-passive-r");
  }).on("end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').removeClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').removeClass("carwashes__car-element-active");
  }).addTo(window.controller);
  window.carwashes__scene_car_2_to_3 = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '100%',
    offset: window.carwashes__screen_h,
    triggerHook: 0
  }).on("start end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-1').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-2').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-3').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-1').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-2').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-3').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').addClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').addClass("carwashes__car-element-active");
  }).on("start", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_1').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').addClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_1').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').addClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').addClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').removeClass("carwashes__car-element-passive-r");
  }).on("end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').removeClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').removeClass("carwashes__car-element-active");
  }).addTo(window.controller);
  window.carwashes__scene_car_3_to_4 = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '100%',
    offset: window.carwashes__screen_h * 2,
    triggerHook: 0
  }).on("start end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-2').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-3').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-2').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-3').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-4').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').addClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').addClass("carwashes__car-element-active");
  }).on("start", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_2').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').addClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_2').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').addClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_2').removeClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').addClass("carwashes__car-element-passive-r");
  }).on("end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_4').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_4').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_4').removeClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-left').removeClass("carwashes__car-element-active");
  }).addTo(window.controller);
  window.carwashes__scene_car_4_to_null = new ScrollMagic.Scene({
    triggerElement: "#carwashes__car-screen",
    duration: '100%',
    offset: window.carwashes__screen_h * 3,
    triggerHook: 0
  }).on("start end", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-3').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-3').removeClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-4').addClass("carwashes__car-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_4').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_4').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_4').addClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-left').addClass("carwashes__car-element-active");
  }).on("start", function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__program_3').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__info_3').removeClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_3').removeClass("carwashes__car-element-active");
  }).addTo(window.controller);
  window.carwashes__scene_slides_pin = new ScrollMagic.Scene({
    triggerElement: '#carwashes__slideshow',
    triggerHook: 'onLeave',
    duration: window.carwashes__screen_h / 2
  }).setPin('.carwashes__section.carwashes__slideshow .carwashes__block.carwashes__pinned').addTo(window.controller);
  window.carwashes__scene_slides_lens_show = new ScrollMagic.Scene({
    triggerElement: '#carwashes__slideshow',
    triggerHook: 'onLeave',
    duration: window.carwashes__screen_h / 2
  }).setPin('#carwashes__slideshow img.carwashes__pinned').on("end", function() {
    $('.carwashes__section.carwashes__slideshow .carwashes__lens').css('display', 'block');
    $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__prev').removeClass('carwashes__btn-active');
    return $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__next').removeClass('carwashes__btn-active');
  }).addTo(window.controller);
  window.carwashes__scene_slides_lens_hide = new ScrollMagic.Scene({
    triggerElement: '#carwashes__after-show',
    triggerHook: 1,
    duration: window.carwashes__screen_h / 2
  }).on("start", function() {
    $('.carwashes__section.carwashes__slideshow .carwashes__lens').css('display', 'none');
    $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__prev').addClass('carwashes__btn-active');
    return $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__next').addClass('carwashes__btn-active');
  }).addTo(window.controller);
  return window.carwashes__sm_inited = 1;
};


/*
  lens_opacity = new TimelineMax()
  .to($('.carwashes__section.carwashes__slideshow .carwashes__lens'), 1, {opacity: 0, ease: Power0.easeNone})

  window.carwashes__scene_slides_lens_opacity = new ScrollMagic.Scene
    triggerElement: '#carwashes__slideshow'
    triggerHook: 'onLeave'
    duration: window.carwashes__screen_h / 4
    offset: window.carwashes__screen_h / 4
  .setTween(lens_opacity)
  .addTo(window.controller)


  slider_opacity = new TimelineMax()
  .to($('.carwashes__section.carwashes__slideshow .carwashes__slider .carwashes__pic'), 1, {opacity: 1, ease: Power0.easeNone})

  window.carwashes__scene_slides_slider_opacity = new ScrollMagic.Scene
    triggerElement: '#carwashes__slideshow'
    triggerHook: 'onLeave'
    duration: window.carwashes__screen_h / 4
    offset: window.carwashes__screen_h / 4
  .setTween(slider_opacity)
  .addTo(window.controller)
 */

carwashes__scrollMagicUpdate = function() {
  var captionEase, captionOffset;
  window.carwashes__scene_car_pin.duration('401%');
  window.carwashes__scene_car_caption_move.duration('400%');
  window.carwashes__scene_car_back_color.duration('400%');
  window.carwashes__scene_car_1_to_2.duration('100%');
  window.carwashes__scene_car_2_to_3.duration('100%');
  window.carwashes__scene_car_2_to_3.offset(window.carwashes__screen_h);
  window.carwashes__scene_car_3_to_4.duration('100%');
  window.carwashes__scene_car_3_to_4.offset(window.carwashes__screen_h * 2);
  window.carwashes__scene_car_4_to_null.duration('100%');
  window.carwashes__scene_car_4_to_null.offset(window.carwashes__screen_h * 3);
  window.carwashes__scene_slides_pin.duration(window.carwashes__screen_h / 2);
  window.carwashes__scene_slides_lens_show.duration(window.carwashes__screen_h / 2);
  window.carwashes__scene_slides_lens_hide.duration(window.carwashes__screen_h / 2);
  captionOffset = window.carwashes__screen_w * 1.1;
  captionEase = SlowMo.ease.config(0.2, 0.3, false);
  window.carwashes__captionTween1.progress(0);
  window.carwashes__captionTween2.progress(0);
  window.carwashes__captionTween3.progress(0);
  window.carwashes__captionTween4.progress(0);
  window.carwashes__captionTween1.kill;
  window.carwashes__captionTween2.kill;
  window.carwashes__captionTween3.kill;
  window.carwashes__captionTween4.kill;
  window.carwashes__captionTimeline.kill;
  window.carwashes__captionTween1 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_1'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween2 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_2'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween3 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_3'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTween4 = TweenMax.to($('.carwashes__section.carwashes__main_car_animation .carwashes__caption_4'), 1, {
    'transform': 'translate3D(' + captionOffset + 'px, 0, 0)',
    ease: captionEase
  });
  window.carwashes__captionTimeline = new TimelineMax();
  window.carwashes__captionTimeline.add(window.carwashes__captionTween1);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween2);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween3);
  window.carwashes__captionTimeline.add(window.carwashes__captionTween4);
  return window.carwashes__scene_car_caption_move.setTween(window.carwashes__captionTimeline);
};

carwashes__iPadScrollInit = function() {
  var ipadPageChange, ipadPageChange1_2, ipadPageChange2_1, ipadPageChange2_3, ipadPageChange3_2, ipadPageChange3_4, ipadPageChange4_3;
  $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__prev').addClass('carwashes__btn-active');
  $('.carwashes__section.carwashes__slideshow .carwashes__btn.carwashes__next').addClass('carwashes__btn-active');
  $('.carwashes__section.carwashes__main_car_animation .carwashes__ipad-scroll').css('display', 'block');
  $('.carwashes__section.carwashes__main_car_animation .carwashes__caption').each(function(i, elem) {
    $(elem).addClass('carwashes__caption-iPad');
    $(elem).addClass('carwashes__car-element-passive');
    if (i === 0) {
      $(elem).addClass('carwashes__car-element-active');
    }
    if (i === 3) {
      return $(elem).addClass('carwashes__car-element-passive-r');
    }
  });
  ipadPageChange = function(pageFrom, pageTo) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__car-' + pageTo).addClass("carwashes__car-active");
    if (pageFrom !== 4) {
      $('.carwashes__section.carwashes__main_car_animation .carwashes__car-' + pageFrom).removeClass("carwashes__car-active");
    }
    $('.carwashes__section.carwashes__main_car_animation .carwashes__round-' + pageTo).addClass("carwashes__car-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__round-' + pageFrom).removeClass("carwashes__car-active");
  };
  ipadPageChange1_2 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_1').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').addClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-passive-r");
  };
  ipadPageChange2_3 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').addClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').addClass("carwashes__car-element-passive-r");
  };
  ipadPageChange3_4 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_4').addClass("carwashes__car-element-active");
  };
  ipadPageChange4_3 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_4').removeClass("carwashes__car-element-active");
  };
  ipadPageChange3_2 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').removeClass("carwashes__car-element-passive-r");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-active");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').addClass("carwashes__car-element-passive-r");
  };
  ipadPageChange2_1 = function(page) {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_1').addClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').removeClass("carwashes__car-element-active");
    $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_2').addClass("carwashes__car-element-passive-r");
    return $('.carwashes__section.carwashes__main_car_animation .carwashes__' + page + '_3').removeClass("carwashes__car-element-passive-r");
  };
  $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-next').click(function() {
    switch (window.carwashes__iPadPage) {
      case 1:
        ipadPageChange(1, 2);
        ipadPageChange1_2('program');
        ipadPageChange1_2('info');
        ipadPageChange1_2('bottom-right');
        ipadPageChange1_2('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#97d9ec",
          ease: Power0.easeNone
        });
        $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-prev').removeClass('carwashes__scroll-btn-inactive');
        break;
      case 2:
        ipadPageChange(2, 3);
        ipadPageChange2_3('program');
        ipadPageChange2_3('info');
        ipadPageChange2_3('bottom-right');
        ipadPageChange2_3('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#97c1ec",
          ease: Power0.easeNone
        });
        break;
      case 3:
        ipadPageChange(3, 4);
        ipadPageChange3_4('program');
        ipadPageChange3_4('info');
        ipadPageChange3_4('bottom-right');
        ipadPageChange3_4('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#82bcf8",
          ease: Power0.easeNone
        });
        break;
      default:
        window.carwashes__iPadPage--;
    }
    window.carwashes__iPadPage++;
    if (window.carwashes__iPadPage > 3) {
      return $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-next').addClass('carwashes__scroll-btn-inactive');
    }
  });
  $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-prev').click(function() {
    switch (window.carwashes__iPadPage) {
      case 2:
        ipadPageChange(2, 1);
        ipadPageChange2_1('program');
        ipadPageChange2_1('info');
        ipadPageChange2_1('bottom-right');
        ipadPageChange2_1('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#97e5ec",
          ease: Power0.easeNone
        });
        break;
      case 3:
        ipadPageChange(3, 2);
        ipadPageChange3_2('program');
        ipadPageChange3_2('info');
        ipadPageChange3_2('bottom-right');
        ipadPageChange3_2('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#97d9ec",
          ease: Power0.easeNone
        });
        break;
      case 4:
        ipadPageChange(4, 3);
        ipadPageChange4_3('program');
        ipadPageChange4_3('info');
        ipadPageChange4_3('bottom-right');
        ipadPageChange4_3('caption');
        TweenMax.to($('.carwashes__section.carwashes__main_car_animation'), 0.5, {
          backgroundColor: "#82bcf8",
          ease: Power0.easeNone
        });
        $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-next').removeClass('carwashes__scroll-btn-inactive');
        break;
      default:
        window.carwashes__iPadPage++;
    }
    window.carwashes__iPadPage--;
    if (window.carwashes__iPadPage < 2) {
      return $('.carwashes__section.carwashes__main_car_animation .carwashes__scroll-btn-prev').addClass('carwashes__scroll-btn-inactive');
    }
  });
  $('.carwashes__section.carwashes__slideshow').css('min-height', '100vh');
  return $('.carwashes__section.carwashes__slideshow .carwashes__lens').css('display', 'none');
};

carwashes__onResize = function() {
  var btnScale, captSize, carScale, cleanerRight, cleanerScale, commonScale, containerPadding, screen_min, slide_size, textWidth;
  window.carwashes__screen_w = document.documentElement.clientWidth;
  window.carwashes__screen_h = document.documentElement.clientHeight;
  carwashes__videoResize();
  screen_min = window.carwashes__screen_w > window.carwashes__screen_h ? window.carwashes__screen_h : window.carwashes__screen_w;
  slide_size = screen_min * 0.55;
  $('.carwashes__section.carwashes__slideshow .carwashes__circle-int').height(slide_size);
  $('.carwashes__section.carwashes__slideshow .carwashes__circle-int').width(slide_size);
  $('.carwashes__section.carwashes__slideshow .carwashes__slider .carwashes__pic').height(slide_size);
  $('.carwashes__section.carwashes__slideshow .carwashes__slider .carwashes__pic').width(slide_size);
  if (window.carwashes__screen_w < 1140) {
    commonScale = window.carwashes__screen_w / 1140;
    cleanerScale = commonScale / 3 + 0.66;
    cleanerRight = commonScale * 2 * 3.5 - 3.5;
    containerPadding = commonScale * 100;
    textWidth = commonScale * 65 / 2 + 32.5;
    $('.carwashes__section.carwashes__new_level .carwashes__cleaner-pic').css('transform', 'scale(' + cleanerScale + ')');
    $('.carwashes__section.carwashes__new_level .carwashes__cleaner-pic').css('right', cleanerRight + '%');
    $('.carwashes__section.carwashes__new_level .carwashes__container').css('padding-top', containerPadding + 'px');
    $('.carwashes__section.carwashes__new_level .carwashes__container').css('padding-bottom', containerPadding + 'px');
    $('.carwashes__section.carwashes__new_level .carwashes__block-text').css('width', textWidth + '%');
  } else {
    $('.carwashes__section.carwashes__new_level .carwashes__cleaner-pic').css('transform', 'scale(1)');
    $('.carwashes__section.carwashes__new_level .carwashes__cleaner-pic').css('right', '3.5%');
    $('.carwashes__section.carwashes__new_level .carwashes__container').css('padding-top', '100px');
    $('.carwashes__section.carwashes__new_level .carwashes__container').css('padding-bottom', '100px');
    $('.carwashes__section.carwashes__new_level .carwashes__block-text').css('width', '65%');
  }
  if (window.carwashes__screen_w < 810) {
    btnScale = window.carwashes__screen_w / 810 / 1.5 + 0.25;
    $('.carwashes__section.carwashes__main_car_animation .carwashes__button').each(function(i, elem) {
      return $(elem).css('transform', 'scale(' + btnScale + ')');
    });
  } else {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__button').each(function(i, elem) {
      return $(elem).css('transform', 'scale(1)');
    });
  }
  if (window.carwashes__screen_w < 1250 && window.carwashes__isiPad) {
    captSize = window.carwashes__screen_w / 1250 * 120;
    $('.carwashes__section.carwashes__main_car_animation .carwashes__caption').each(function(i, elem) {
      return $(elem).css('font-size', captSize + 'px');
    });
  } else {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__caption').each(function(i, elem) {
      return $(elem).css('font-size', '120px');
    });
  }
  $('.carwashes__section.carwashes__main_car_animation .carwashes__info-bottom-cont').height($('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right').height());
  if (window.carwashes__screen_h < 650) {
    carScale = window.carwashes__screen_h / 650;
    $('.carwashes__section.carwashes__main_car_animation .carwashes__content-container').css('transform', 'scale(' + carScale + ') translateX(-50%) translateY(-50%)');
  } else {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__content-container').css('transform', 'scale(1) translateX(-50%) translateY(-50%)');
  }
  if (window.carwashes__sm_inited) {
    carwashes__scrollMagicUpdate();
  }
  return $('.carwashes__slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
};

window.carwashes__sm_inited = 0;

window.carwashes__pult_elem = 0;

window.carwashes__isiPad = false;

window.carwashes__iPadPage = 1;

$(function() {
  window.carwashes__isiPad = navigator.userAgent.match(/iPad/i) !== null;
  carwashes__onResize();
  $('.carwashes__section.carwashes__slideshow .carwashes__prev.carwashes__btn').click(function() {
    return $('.carwashes__slider').slick('slickPrev');
  });
  $('.carwashes__section.carwashes__slideshow .carwashes__next.carwashes__btn').click(function() {
    return $('.carwashes__slider').slick('slickNext');
  });
  $('.carwashes__section.carwashes__pults td').each(function(i, elem) {
    return $(elem).hover(function(e) {
      $(elem).find('.carwashes__caption').addClass('carwashes__pult-td-active');
      $(elem).find('p').addClass('carwashes__pult-td-active');
      return window.carwashes__pult_elem = i;
    }, function(e) {
      $(elem).find('.carwashes__caption').removeClass('carwashes__pult-td-active');
      $(elem).find('p').removeClass('carwashes__pult-td-active');
      return window.carwashes__pult_elem = 0;
    });
  });
  window.carwashes__car_btn_active = 1;
  $('.carwashes__section.carwashes__main_car_animation .carwashes__btn1').addClass('carwashes__button-active');
  $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').addClass('carwashes__bottom-right_1');
  $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').addClass('carwashes__car-element-active');
  $('.carwashes__section.carwashes__main_car_animation .carwashes__btn1').click(function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__btn1').addClass('carwashes__button-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__btn2').removeClass('carwashes__button-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').addClass('carwashes__bottom-right_1');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_2').removeClass('carwashes__bottom-right_1');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').addClass('carwashes__car-element-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_2').removeClass('carwashes__car-element-active');
    return window.carwashes__car_btn_active = 1;
  });
  $('.carwashes__section.carwashes__main_car_animation .carwashes__btn2').click(function() {
    $('.carwashes__section.carwashes__main_car_animation .carwashes__btn1').removeClass('carwashes__button-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__btn2').addClass('carwashes__button-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').removeClass('carwashes__bottom-right_1');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_2').addClass('carwashes__bottom-right_1');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_1').removeClass('carwashes__car-element-active');
    $('.carwashes__section.carwashes__main_car_animation .carwashes__bottom-right_1_2').addClass('carwashes__car-element-active');
    return window.carwashes__car_btn_active = 2;
  });
  if (window.carwashes__isiPad) {
    return carwashes__iPadScrollInit();
  } else {
    return carwashes__scrollMagicInit();
  }
});

$(window).on('resize', debounce(carwashes__onResize, 150, false));
});

;
//# sourceMappingURL=app.js.map