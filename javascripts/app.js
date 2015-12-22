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
var onResize, videoResize;

videoResize = function() {
  var video_height, video_width;
  video_width = 917;
  video_height = 516;
  if (window.screen_w * 9 > window.screen_h * 16) {
    if (window.screen_h < video_height) {
      video_height = window.screen_h;
    }
    video_width = video_height * 16 / 9;
  } else {
    if (window.screen_w < video_width) {
      video_width = window.screen_w;
      video_height = $('.section.video .container').css('text-align', 'left');
    } else {
      video_height = $('.section.video .container').css('text-align', 'center');
    }
    video_height = video_width * 9 / 16;
  }
  $('.section.video iframe').width(video_width);
  return $('.section.video iframe').height(video_height);
};

onResize = function() {
  var screen_min, slide_size;
  window.screen_w = document.documentElement.clientWidth;
  window.screen_h = document.documentElement.clientHeight;
  videoResize();
  screen_min = window.screen_w > window.screen_h ? window.screen_h : window.screen_w;
  slide_size = screen_min * 0.55;
  $('.section.slideshow .circle-int').height(slide_size);
  $('.section.slideshow .circle-int').width(slide_size);
  $('.section.slideshow .slider .pic').height(slide_size);
  return $('.section.slideshow .slider .pic').width(slide_size);
};

window.screen_w = 0;

window.screen_h = 0;

$(function() {
  var back_color, caption, car_anim, controller, scene_car_1_hide, scene_car_1_to_2, scene_car_2_hide, scene_car_2_show, scene_car_2_to_3, scene_car_3_hide, scene_car_3_show, scene_car_3_to_4, scene_car_4_to_null, scene_car_back_color, scene_car_caption_move, scene_car_pin, scene_slides_lens_hide, scene_slides_lens_show, scene_slides_pin;
  onResize();
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
  $('.section.main_car_animation .btn1').click(function() {
    $('.section.main_car_animation .btn1').addClass('button-active');
    $('.section.main_car_animation .btn2').removeClass('button-active');
    $('.section.main_car_animation .block-bottom-var1').css({
      'display': 'block'
    });
    return $('.section.main_car_animation .block-bottom-var2').css({
      'display': 'none'
    });
  });
  $('.section.main_car_animation .btn2').click(function() {
    $('.section.main_car_animation .btn1').removeClass('button-active');
    $('.section.main_car_animation .btn2').addClass('button-active');
    $('.section.main_car_animation .block-bottom-var1').css({
      'display': 'none'
    });
    return $('.section.main_car_animation .block-bottom-var2').css({
      'display': 'block'
    });
  });
  controller = new ScrollMagic.Controller;
  scene_car_pin = new ScrollMagic.Scene({
    triggerElement: '#car-screen',
    triggerHook: 'onLeave',
    duration: '401%',
    tweenChanges: true
  }).setPin('#car-screen').addTo(controller);
  caption = new TimelineMax().to($('#car-screen .caption1'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('#car-screen .caption2'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('#car-screen .caption3'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('#car-screen .caption4'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  });
  scene_car_caption_move = new ScrollMagic.Scene({
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
  scene_car_back_color = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(back_color).addTo(controller);
  scene_car_1_to_2 = new ScrollMagic.Scene({
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
  scene_car_2_to_3 = new ScrollMagic.Scene({
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
  scene_car_3_to_4 = new ScrollMagic.Scene({
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
  scene_car_4_to_null = new ScrollMagic.Scene({
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
  }).addTo(controller).addIndicators();
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-1'), 1, {
    opacity: 0
  });
  scene_car_1_hide = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 0.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-2'), 1, {
    opacity: 1
  });
  scene_car_2_show = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 0.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-2'), 1, {
    opacity: 0
  });
  scene_car_2_hide = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 1.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-3'), 1, {
    opacity: 1
  });
  scene_car_3_show = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 1.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  car_anim = new TimelineMax().to($('.section.main_car_animation .car-3'), 1, {
    opacity: 0
  });
  scene_car_3_hide = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '20%',
    offset: document.documentElement.clientHeight * 2.8,
    triggerHook: 0
  }).setTween(car_anim).addTo(controller);
  scene_slides_pin = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: document.documentElement.clientHeight / 2
  }).setPin('#slideshow .block.pinned').addTo(controller);
  scene_slides_lens_show = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: document.documentElement.clientHeight / 2
  }).setPin('#slideshow img.pinned').on("end", function() {
    return $('#slideshow .lens').css('display', 'block');
  }).addTo(controller);
  scene_slides_lens_hide = new ScrollMagic.Scene({
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

$(window).resize(function() {
  return onResize();
});
});

;
//# sourceMappingURL=app.js.map