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
var onResize, scrollMagicInit, scrollMagicUpdate, videoResize;

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

scrollMagicInit = function() {
  var back_color, caption, process2Obj, process3Obj;
  window.controller = new ScrollMagic.Controller;
  window.scene_car_pin = new ScrollMagic.Scene({
    triggerElement: '#car-screen',
    triggerHook: 'onLeave',
    duration: '401%',
    tweenChanges: true
  }).setPin('#car-screen').addTo(window.controller);
  caption = new TimelineMax().to($('.section.main_car_animation .caption1'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption2'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption3'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  }).to($('.section.main_car_animation .caption4'), 1, {
    'left': '100%',
    'transform': 'translateX(100%)',
    ease: Power0.easeNone
  });
  window.scene_car_caption_move = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(caption).addTo(window.controller);
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
  window.scene_car_back_color = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '400%',
    triggerHook: 0
  }).setTween(back_color).addTo(window.controller);
  process2Obj = function(obj_1, obj_2) {
    if ($(obj_1).hasClass("car-active")) {
      new TweenMax.to($(obj_1), 1, {
        'top': '-100px',
        onComplete: function() {
          return $(obj_1).css('top', '0');
        }
      });
    }
    $(obj_1).removeClass("car-active");
    $(obj_2).addClass("car-active");
    return console.log('2');
  };
  process3Obj = function(obj_1, obj_2, obj_3) {
    if ($(obj_1).hasClass("car-active")) {
      new TweenMax.to($(obj_1), 1, {
        'top': '-100px',
        onComplete: function() {
          return $(obj_1).css('top', '0');
        }
      });
    }
    if ($(obj_3).hasClass("car-active")) {
      new TweenMax.to($(obj_3), 1, {
        'top': '-100px',
        onComplete: function() {
          return $(obj_3).css('top', '0');
        }
      });
    }
    $(obj_1).removeClass("car-active");
    $(obj_2).addClass("car-active");
    $(obj_3).removeClass("car-active");
    return console.log('3');
  };
  window.scene_car_1_to_2 = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    triggerHook: 0
  }).on("start end", function() {
    var ob_1, ob_2;
    ob_1 = '.section.main_car_animation .program1';
    ob_2 = '.section.main_car_animation .program2';
    process2Obj(ob_2, ob_1);
    ob_1 = '.section.main_car_animation .info-1';
    ob_2 = '.section.main_car_animation .info-2';
    process2Obj(ob_2, ob_1);
    ob_1 = '.section.main_car_animation .bottom-right-1-' + window.car_btn_active;
    ob_2 = '.section.main_car_animation .bottom-right-2';
    process2Obj(ob_2, ob_1);
    $('.section.main_car_animation .car-1').addClass("car-active");
    $('.section.main_car_animation .car-2').removeClass("car-active");
    $('.section.main_car_animation .round-1').addClass("car-active");
    return $('.section.main_car_animation .round-2').removeClass("car-active");
  }).addTo(window.controller).addIndicators();
  window.scene_car_2_to_3 = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: window.screen_h,
    triggerHook: 0
  }).on("start end", function() {
    var ob_1, ob_2, ob_3;
    ob_1 = '.section.main_car_animation .program1';
    ob_2 = '.section.main_car_animation .program2';
    ob_3 = '.section.main_car_animation .program3';
    process3Obj(ob_1, ob_2, ob_3);
    ob_1 = '.section.main_car_animation .info-1';
    ob_2 = '.section.main_car_animation .info-2';
    ob_3 = '.section.main_car_animation .info-3';
    process3Obj(ob_1, ob_2, ob_3);
    ob_1 = '.section.main_car_animation .bottom-right-1-' + window.car_btn_active;
    ob_2 = '.section.main_car_animation .bottom-right-2';
    ob_3 = '.section.main_car_animation .bottom-right-3';
    process3Obj(ob_1, ob_2, ob_3);
    $('.section.main_car_animation .car-1').removeClass("car-active");
    $('.section.main_car_animation .car-2').addClass("car-active");
    $('.section.main_car_animation .car-3').removeClass("car-active");
    $('.section.main_car_animation .round-1').removeClass("car-active");
    $('.section.main_car_animation .round-2').addClass("car-active");
    return $('.section.main_car_animation .round-3').removeClass("car-active");
  }).addTo(window.controller);
  window.scene_car_3_to_4 = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: window.screen_h * 2,
    triggerHook: 0
  }).on("start end", function() {
    var ob_1, ob_2, ob_3, ob_4;
    ob_2 = '.section.main_car_animation .program2';
    ob_3 = '.section.main_car_animation .program3';
    ob_4 = '.section.main_car_animation .program4';
    process3Obj(ob_2, ob_3, ob_4);
    ob_2 = '.section.main_car_animation .info-2';
    ob_3 = '.section.main_car_animation .info-3';
    ob_4 = '.section.main_car_animation .info-4';
    process3Obj(ob_2, ob_3, ob_4);
    ob_2 = '.section.main_car_animation .bottom-right-2';
    ob_3 = '.section.main_car_animation .bottom-right-3';
    ob_4 = '.section.main_car_animation .bottom-right-4';
    process3Obj(ob_2, ob_3, ob_4);
    ob_1 = '.section.main_car_animation .bottom-left';
    if ($(ob_1).hasClass("car-active")) {
      new TweenMax.to($(ob_1), 1, {
        'top': '-100px',
        onComplete: function() {
          return $(ob_1).css('top', '0');
        }
      });
    }
    $(ob_1).removeClass("car-active");
    $('.section.main_car_animation .car-2').removeClass("car-active");
    $('.section.main_car_animation .car-3').addClass("car-active");
    $('.section.main_car_animation .round-2').removeClass("car-active");
    $('.section.main_car_animation .round-3').addClass("car-active");
    return $('.section.main_car_animation .round-4').removeClass("car-active");
  }).addTo(window.controller);
  window.scene_car_4_to_null = new ScrollMagic.Scene({
    triggerElement: "#car-screen",
    duration: '100%',
    offset: window.screen_h * 3,
    triggerHook: 0
  }).on("start end", function() {
    var ob_3, ob_4;
    ob_3 = '.section.main_car_animation .program3';
    ob_4 = '.section.main_car_animation .program4';
    process2Obj(ob_3, ob_4);
    ob_3 = '.section.main_car_animation .info-3';
    ob_4 = '.section.main_car_animation .info-4';
    process3Obj(ob_3, ob_4);
    ob_3 = '.section.main_car_animation .bottom-right-3';
    ob_4 = '.section.main_car_animation .bottom-right-4';
    process3Obj(ob_3, ob_4);
    $('.section.main_car_animation .bottom-left').addClass("car-active");
    $('.section.main_car_animation .car-3').removeClass("car-active");
    $('.section.main_car_animation .round-3').removeClass("car-active");
    return $('.section.main_car_animation .round-4').addClass("car-active");
  }).addTo(window.controller);
  window.scene_slides_pin = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: window.screen_h / 2
  }).setPin('.section.slideshow .block.pinned').addTo(window.controller);
  window.scene_slides_lens_show = new ScrollMagic.Scene({
    triggerElement: '#slideshow',
    triggerHook: 'onLeave',
    duration: window.screen_h / 2
  }).setPin('#slideshow img.pinned').on("end", function() {
    return $('.section.slideshow .lens').css('display', 'block');
  }).addTo(window.controller);
  window.scene_slides_lens_hide = new ScrollMagic.Scene({
    triggerElement: '#after-show',
    triggerHook: 1,
    duration: window.screen_h / 2
  }).on("start", function() {
    return $('.section.slideshow .lens').css('display', 'none');
  }).addTo(window.controller);
  return window.sm_inited = 1;
};


/*
  lens_opacity = new TimelineMax()
  .to($('.section.slideshow .lens'), 1, {opacity: 0, ease: Power0.easeNone})

  window.scene_slides_lens_opacity = new ScrollMagic.Scene
    triggerElement: '#slideshow'
    triggerHook: 'onLeave'
    duration: window.screen_h / 4
    offset: window.screen_h / 4
  .setTween(lens_opacity)
  .addTo(window.controller)


  slider_opacity = new TimelineMax()
  .to($('.section.slideshow .slider .pic'), 1, {opacity: 1, ease: Power0.easeNone})

  window.scene_slides_slider_opacity = new ScrollMagic.Scene
    triggerElement: '#slideshow'
    triggerHook: 'onLeave'
    duration: window.screen_h / 4
    offset: window.screen_h / 4
  .setTween(slider_opacity)
  .addTo(window.controller)
 */

scrollMagicUpdate = function() {
  window.scene_car_pin.duration('401%');
  window.scene_car_caption_move.duration('400%');
  window.scene_car_back_color.duration('400%');
  window.scene_car_1_to_2.duration('100%');
  window.scene_car_2_to_3.duration('100%');
  window.scene_car_2_to_3.offset(window.screen_h);
  window.scene_car_3_to_4.duration('100%');
  window.scene_car_3_to_4.offset(window.screen_h * 2);
  window.scene_car_4_to_null.duration('100%');
  window.scene_car_4_to_null.offset(window.screen_h * 3);
  window.scene_slides_pin.duration(window.screen_h / 2);
  window.scene_slides_lens_show.duration(window.screen_h / 2);
  window.scene_slides_lens_hide.duration(window.screen_h / 2);
  window.scene_slides_lens_opacity.duration(window.screen_h / 4);
  window.scene_slides_lens_opacity.offset(window.screen_h / 4);
  window.scene_slides_slider_opacity.duration(window.screen_h / 4);
  return window.scene_slides_slider_opacity.offset(window.screen_h / 4);
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
  $('.section.slideshow .slider .pic').width(slide_size);
  if (window.sm_inited) {
    return scrollMagicUpdate();
  }
};

window.screen_w = 0;

window.screen_h = 0;

window.sm_inited = 0;

window.pult_elem = 0;

$(function() {
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
  $('.section.pults td').each(function(i, elem) {
    return $(elem).hover(function(e) {
      $(elem).find('.caption').addClass('pult-td-active');
      $(elem).find('p').addClass('pult-td-active');
      return window.pult_elem = i;
    }, function(e) {
      $(elem).find('.caption').removeClass('pult-td-active');
      $(elem).find('p').removeClass('pult-td-active');
      return window.pult_elem = 0;
    });
  });
  window.car_btn_active = 1;
  $('.section.main_car_animation .btn1').click(function() {
    $('.section.main_car_animation .btn1').addClass('button-active');
    $('.section.main_car_animation .btn2').removeClass('button-active');
    $('.section.main_car_animation .bottom-right-1-1').addClass('car-active');
    $('.section.main_car_animation .bottom-right-1-2').removeClass('car-active');
    return window.car_btn_active = 1;
  });
  $('.section.main_car_animation .btn2').click(function() {
    $('.section.main_car_animation .btn1').removeClass('button-active');
    $('.section.main_car_animation .btn2').addClass('button-active');
    $('.section.main_car_animation .bottom-right-1-1').removeClass('car-active');
    $('.section.main_car_animation .bottom-right-1-2').addClass('car-active');
    return window.car_btn_active = 2;
  });
  return scrollMagicInit();
});

$(window).on('resize', debounce(onResize, 150, false));
});

;
//# sourceMappingURL=app.js.map