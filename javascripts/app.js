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
$(function() {
  var back_color, caption, caption1_w, caption1_width, caption2_w, caption2_width, caption3_w, caption3_width, caption4_w, caption4_width, car_anim, controller, scene;
  $('.slider').slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true
  });
  $('.prev.btn').click(function() {
    return $('.slider').slick('slickPrev');
  });
  $('.next.btn').click(function() {
    return $('.slider').slick('slickNext');
  });
  controller = new ScrollMagic.Controller;
  scene = new ScrollMagic.Scene({
    triggerElement: '#car-screen',
    triggerHook: 'onLeave',
    duration: '401%',
    tweenChanges: true
  }).setPin('#car-screen').addTo(controller);
  caption1_width = document.getElementById('car_caption1').offsetWidth;
  caption1_width = caption1_width / document.documentElement.clientWidth * 100 + 100;
  caption1_w = caption1_width + '%';
  caption2_width = document.getElementById('car_caption2').offsetWidth;
  caption2_width = caption2_width / document.documentElement.clientWidth * 100 + 100;
  caption2_w = caption2_width + '%';
  caption3_width = document.getElementById('car_caption3').offsetWidth;
  caption3_width = caption3_width / document.documentElement.clientWidth * 100 + 100;
  caption3_w = caption3_width + '%';
  caption4_width = document.getElementById('car_caption4').offsetWidth;
  caption4_width = caption4_width / document.documentElement.clientWidth * 100 + 100;
  caption4_w = caption4_width + '%';
  caption = new TimelineMax().to($('.section.main_car_animation .caption1'), 1, {
    'left': caption1_w,
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption2'), 1, {
    'left': caption2_w,
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption3'), 1, {
    'left': caption3_w,
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption4'), 1, {
    'left': caption4_w,
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption1'), 0, {
    'left': '0%',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption2'), 0, {
    'left': '0%',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption3'), 0, {
    'left': '0%',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption4'), 0, {
    'left': '0%',
    ease: Power0.easeNone
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(caption).addTo(controller);
  back_color = new TimelineMax().to($('.section.main_car_animation'), 1, {
    backgroundColor: "#97e5ec",
    ease: Power0.easeNone
  }).to($('.section.main_car_animation'), 1, {
    backgroundColor: "#97d9ec",
    ease: Power0.easeNone
  }).to($('.section.main_car_animation'), 1, {
    backgroundColor: "#97c1ec",
    ease: Power0.easeNone
  }).to($('.section.main_car_animation'), 1, {
    backgroundColor: "#82bcf8",
    ease: Power0.easeNone
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(back_color).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    triggerHook: 0
  }).on("start end", function() {
    $('.program1').css("display", "block");
    $('.program2').css("display", "none");
    $('.block-top-1').css("display", "block");
    $('.block-top-2').css("display", "none");
    $('.block-bottom-1').css("display", "block");
    $('.block-bottom-2').css("display", "none");
    $('.round-1').css("display", "block");
    return $('.round-2').css("display", "none");
  }).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: document.documentElement.clientHeight,
    triggerHook: 0
  }).on("start end", function() {
    $('.program1').css("display", "none");
    $('.program2').css("display", "block");
    $('.program3').css("display", "none");
    $('.block-top-1').css("display", "none");
    $('.block-top-2').css("display", "block");
    $('.block-top-3').css("display", "none");
    $('.block-bottom-1').css("display", "none");
    $('.block-bottom-2').css("display", "block");
    $('.block-bottom-3').css("display", "none");
    $('.round-1').css("display", "none");
    $('.round-2').css("display", "block");
    return $('.round-3').css("display", "none");
  }).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: document.documentElement.clientHeight * 2,
    triggerHook: 0
  }).on("start end", function() {
    $('.program2').css("display", "none");
    $('.program3').css("display", "block");
    $('.program4').css("display", "none");
    $('.block-top-2').css("display", "none");
    $('.block-top-3').css("display", "block");
    $('.block-top-4').css("display", "none");
    $('.block-bottom-2').css("display", "none");
    $('.block-bottom-3').css("display", "block");
    $('.block-bottom-4').css("display", "none");
    $('.block-bottom-left').css("display", "none");
    $('.round-2').css("display", "none");
    return $('.round-3').css("display", "block");
  }).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: document.documentElement.clientHeight * 3,
    triggerHook: 0
  }).on("start end", function() {
    $('.program3').css("display", "none");
    $('.program4').css("display", "block");
    $('.block-top-3').css("display", "none");
    $('.block-top-4').css("display", "block");
    $('.block-bottom-3').css("display", "none");
    $('.block-bottom-4').css("display", "block");
    $('.block-bottom-left').css("display", "block");
    $('.round-3').css("display", "none");
    return $('.round-2').css("display", "block");
  }).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-1'), 1, {
    opacity: 0
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 0.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-2'), 1, {
    opacity: 1
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 0.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-2'), 1, {
    opacity: 0
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 1.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-3'), 1, {
    opacity: 1
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 1.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-3'), 1, {
    opacity: 0
  });
  scene = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 2.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: document.documentElement.clientHeight / 2
  }).setPin('#slideshow .block.pinned').addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: document.documentElement.clientHeight / 2
  }).setPin('#slideshow img.pinned').on("end", function() {
    return $('#slideshow .lens').css('display', 'block');
  }).addTo(controller);
  scene = new ScrollMagic.Scene({
    triggerElement: '#after-show',
    triggerHook: 1,
    duration: document.documentElement.clientHeight / 2
  }).on("start", function() {
    return $('#slideshow .lens').css('display', 'none');
  }).addTo(controller);
  $('.block-top-1 .btn1').click(function() {
    $('.block-top-1 .btn1').addClass('.button-active');
    return $('.block-top-1 .btn2').removeClass('.button-active');
  });
  return $('.block-top-1 .btn2').click(function() {
    $('.block-top-1 .btn1').removeClass('.button-active');
    return $('.block-top-1 .btn2').addClass('.button-active');
  });
});
});

;
//# sourceMappingURL=app.js.map