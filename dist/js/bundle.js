(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";function t(t,e,n){var o=e._settings;!n&&f(t)||(C(o.callback_enter,t),R.indexOf(t.tagName)>-1&&(N(t,e),I(t,o.class_loading)),E(t,e),d(t),C(o.callback_set,t))}var e=function(t,e){return e?t.replace(/\.(jpe?g|png)/gi,".webp"):t},n="undefined"!=typeof window,o=n&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),r=n&&"IntersectionObserver"in window,a=n&&"classList"in document.createElement("p"),i=n&&function(){var t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))&&0===t.toDataURL("image/webp").indexOf("data:image/webp")}(),s={elements_selector:"img",container:o||n?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,callback_finish:null,to_webp:!1},c=function(t){return _extends({},s,t)},l=function(t,e){return t.getAttribute("data-"+e)},u=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},d=function(t){return u(t,"was-processed","true")},f=function(t){return"true"===l(t,"was-processed")},_=function(t,e){return u(t,"ll-timeout",e)},v=function(t){return l(t,"ll-timeout")},g=function(t){return t.filter(function(t){return!f(t)})},h=function(t,e){return t.filter(function(t){return t!==e})},b=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)},m=function(t,e,n,o){for(var r,a=0;r=t.children[a];a+=1)if("SOURCE"===r.tagName){var i=l(r,n);p(r,e,i,o)}},p=function(t,n,o,r){o&&t.setAttribute(n,e(o,r))},y=function(t,n){var o=i&&n.to_webp,r=l(t,n.data_src),a=l(t,n.data_bg);if(r){var s=e(r,o);t.style.backgroundImage='url("'+s+'")'}if(a){var c=e(a,o);t.style.backgroundImage=c}},w={IMG:function(t,e){var n=i&&e.to_webp,o=e.data_srcset,r=t.parentNode;r&&"PICTURE"===r.tagName&&m(r,"srcset",o,n);var a=l(t,e.data_sizes);p(t,"sizes",a);var s=l(t,o);p(t,"srcset",s,n);var c=l(t,e.data_src);p(t,"src",c,n)},IFRAME:function(t,e){var n=l(t,e.data_src);p(t,"src",n)},VIDEO:function(t,e){var n=e.data_src,o=l(t,n);m(t,"src",n),p(t,"src",o),t.load()}},E=function(t,e){var n=e._settings,o=t.tagName,r=w[o];if(r)return r(t,n),e._updateLoadingCount(1),void(e._elements=h(e._elements,t));y(t,n)},I=function(t,e){a?t.classList.add(e):t.className+=(t.className?" ":"")+e},L=function(t,e){a?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},C=function(t,e){t&&t(e)},O=function(t,e,n){t.addEventListener(e,n)},k=function(t,e,n){t.removeEventListener(e,n)},x=function(t,e,n){O(t,"load",e),O(t,"loadeddata",e),O(t,"error",n)},A=function(t,e,n){k(t,"load",e),k(t,"loadeddata",e),k(t,"error",n)},z=function(t,e,n){var o=n._settings,r=e?o.class_loaded:o.class_error,a=e?o.callback_load:o.callback_error,i=t.target;L(i,o.class_loading),I(i,r),C(a,i),n._updateLoadingCount(-1)},N=function(t,e){var n=function n(r){z(r,!0,e),A(t,n,o)},o=function o(r){z(r,!1,e),A(t,n,o)};x(t,n,o)},R=["IMG","IFRAME","VIDEO"],S=function(e,n,o){t(e,o),n.unobserve(e)},M=function(t){var e=v(t);e&&(clearTimeout(e),_(t,null))},j=function(t,e,n){var o=n._settings.load_delay,r=v(t);r||(r=setTimeout(function(){S(t,e,n),M(t)},o),_(t,r))},D=function(t){return t.isIntersecting||t.intersectionRatio>0},T=function(t){return{root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}},U=function(t,e){this._settings=c(t),this._setObserver(),this._loadingCount=0,this.update(e)};return U.prototype={_manageIntersection:function(t){var e=this._observer,n=this._settings.load_delay,o=t.target;n?D(t)?j(o,e,this):M(o):D(t)&&S(o,e,this)},_onIntersection:function(t){t.forEach(this._manageIntersection.bind(this))},_setObserver:function(){r&&(this._observer=new IntersectionObserver(this._onIntersection.bind(this),T(this._settings)))},_updateLoadingCount:function(t){this._loadingCount+=t,0===this._elements.length&&0===this._loadingCount&&C(this._settings.callback_finish)},update:function(t){var e=this,n=this._settings,r=t||n.container.querySelectorAll(n.elements_selector);this._elements=g(Array.prototype.slice.call(r)),!o&&this._observer?this._elements.forEach(function(t){e._observer.observe(t)}):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,n){t(e,this,n)},loadAll:function(){var t=this;this._elements.forEach(function(e){t.load(e)})}},n&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)b(t,n);else b(t,e)}(U,window.lazyLoadOptions),U});


},{}],2:[function(require,module,exports){
"use strict";

var _General = _interopRequireDefault(require("../layout/General.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../layout/General.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalLayout = void 0;

var _lazyloadMin = _interopRequireDefault(require("../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js"));

var _DOMReadyObject2 = require("../utils/DOMReadyObject.js");

require("../utils/VHMobile.js");

var _ScrollDirection = require("../utils/ScrollDirection.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Layout general
 */
var General =
/*#__PURE__*/
function (_DOMReadyObject) {
  _inherits(General, _DOMReadyObject);

  function General() {
    var _this;

    _classCallCheck(this, General);

    console.log('General.constructor()');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(General).call(this)); //IE 11

    _this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode; //ladyload

    _this.lazyload === undefined ? _this.lazyload = new _lazyloadMin.default({
      elements_selector: ".lazy"
    }) : _this.lazyload.update(); //Create component

    return _this;
  }

  _createClass(General, [{
    key: "isDOMReady",
    value: function isDOMReady() {
      console.log('General.isDOMReady()');

      _get(_getPrototypeOf(General.prototype), "isDOMReady", this).call(this);
    }
  }]);

  return General;
}(_DOMReadyObject2.DOMReadyObject);

var generalLayout = new General();
exports.generalLayout = generalLayout;

},{"../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js":1,"../utils/DOMReadyObject.js":4,"../utils/ScrollDirection.js":5,"../utils/VHMobile.js":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMReadyObject = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Document ready Promise
document.ready = function () {
  return new Promise(function (resolve) {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
};
/**
 * DOMReadyObject
 * abstract class
 */


var DOMReadyObject =
/*#__PURE__*/
function () {
  function DOMReadyObject() {
    var _this = this;

    _classCallCheck(this, DOMReadyObject);

    //On ne peut pas instancier la class directement
    if (this.constructor === DOMReadyObject) {
      throw new Error('Cannot construct DOMReadyObject instances directly');
    }

    document.ready().then(function () {
      _this.isDOMReady();
    }).catch(function (err) {
      return console.warn(err);
    });
  }

  _createClass(DOMReadyObject, [{
    key: "isDOMReady",
    value: function isDOMReady() {}
  }]);

  return DOMReadyObject;
}();

exports.DOMReadyObject = DOMReadyObject;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollDirection = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollDirection =
/*#__PURE__*/
function () {
  function ScrollDirection() {
    var _this = this;

    _classCallCheck(this, ScrollDirection);

    this.scrollData = {
      position: null,
      direction: null,
      hasDirectionChange: false
    };
    window.addEventListener('scroll', function (e) {
      return _this.setScrollDirection(e);
    });
  }

  _createClass(ScrollDirection, [{
    key: "setScrollDirection",
    value: function setScrollDirection(e) {
      var newScrollData = {};
      newScrollData.position = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0); //On stocke la direction

      if (newScrollData.position > this.scrollData.position) {
        newScrollData.direction = 'down';
      } else {
        newScrollData.direction = 'up';
      } //Si on change de direction


      if (this.scrollData.direction != newScrollData.direction) {
        newScrollData.hasDirectionChange = true;
      } //On dispatch un event


      window.dispatchEvent(new CustomEvent('ScrollDirection_scrollchange', {
        detail: newScrollData
      })); //On stocke les données

      this.scrollData = newScrollData;
    }
  }]);

  return ScrollDirection;
}();

exports.ScrollDirection = ScrollDirection;

},{}],6:[function(require,module,exports){
/**
 * From https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

window.addEventListener('resize', function () {
  // We execute the same script as before
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
});

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qcyIsIi4uL3NyYy9jb25maWcvbWFpbi5qcyIsIi4uL3NyYy9sYXlvdXQvR2VuZXJhbC5qcyIsIi4uL3NyYy91dGlscy9ET01SZWFkeU9iamVjdC5qcyIsIi4uL3NyYy91dGlscy9TY3JvbGxEaXJlY3Rpb24uanMiLCIuLi9zcmMvdXRpbHMvVkhNb2JpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7Ozs7QUNGQTs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNLE87Ozs7O0FBRUYscUJBQWM7QUFBQTs7QUFBQTs7QUFDVixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksdUJBQVo7QUFDQSxrRkFGVSxDQUlWOztBQUNBLFVBQUssTUFBTCxHQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQVQsSUFBaUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUExRCxDQUxVLENBT1Y7O0FBQ0MsVUFBSyxRQUFMLEtBQWtCLFNBQW5CLEdBQWdDLE1BQUssUUFBTCxHQUFnQixJQUFJLG9CQUFKLENBQWE7QUFBRSxNQUFBLGlCQUFpQixFQUFFO0FBQXJCLEtBQWIsQ0FBaEQsR0FBK0YsTUFBSyxRQUFMLENBQWMsTUFBZCxFQUEvRixDQVJVLENBVVY7O0FBVlU7QUFXYjs7OztpQ0FFWTtBQUNULE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWjs7QUFDQTtBQUNIOzs7O0VBbEJpQiwrQjs7QUFxQmYsSUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFKLEVBQXRCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCUDtBQUNBLFFBQVEsQ0FBQyxLQUFULEdBQWlCLFlBQU07QUFDbkIsU0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFBLE9BQU8sRUFBSTtBQUMxQixRQUFJLFFBQVEsQ0FBQyxVQUFULEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3BDLE1BQUEsT0FBTztBQUNWLEtBRkQsTUFFTztBQUNILE1BQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxPQUE5QztBQUNIO0FBQ0osR0FOTSxDQUFQO0FBT0gsQ0FSRDtBQVVBOzs7Ozs7SUFJYSxjOzs7QUFDVCw0QkFBYztBQUFBOztBQUFBOztBQUNWO0FBQ0EsUUFBSSxLQUFLLFdBQUwsS0FBcUIsY0FBekIsRUFBeUM7QUFDckMsWUFBTSxJQUFJLEtBQUosQ0FDRixvREFERSxDQUFOO0FBR0g7O0FBRUQsSUFBQSxRQUFRLENBQUMsS0FBVCxHQUFpQixJQUFqQixDQUFzQixZQUFNO0FBQ3hCLE1BQUEsS0FBSSxDQUFDLFVBQUw7QUFDSCxLQUZELEVBRUcsS0FGSCxDQUVTLFVBQUEsR0FBRztBQUFBLGFBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFiLENBQUo7QUFBQSxLQUZaO0FBR0g7Ozs7aUNBRVksQ0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdCUCxlOzs7QUFFVCw2QkFBYztBQUFBOztBQUFBOztBQUNWLFNBQUssVUFBTCxHQUFrQjtBQUNkLE1BQUEsUUFBUSxFQUFFLElBREk7QUFFZCxNQUFBLFNBQVMsRUFBRSxJQUZHO0FBR2QsTUFBQSxrQkFBa0IsRUFBRTtBQUhOLEtBQWxCO0FBTUEsSUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO0FBQUEsYUFBTyxLQUFJLENBQUMsa0JBQUwsQ0FBd0IsQ0FBeEIsQ0FBUDtBQUFBLEtBQWxDO0FBQ0g7Ozs7dUNBRWtCLEMsRUFBRztBQUNsQixVQUFJLGFBQWEsR0FBRyxFQUFwQjtBQUNBLE1BQUEsYUFBYSxDQUFDLFFBQWQsR0FBeUIsQ0FBQyxNQUFNLENBQUMsV0FBUCxJQUFzQixRQUFRLENBQUMsZUFBVCxDQUF5QixTQUFoRCxLQUE4RCxRQUFRLENBQUMsZUFBVCxDQUF5QixTQUF6QixJQUFzQyxDQUFwRyxDQUF6QixDQUZrQixDQUlsQjs7QUFDQSxVQUFJLGFBQWEsQ0FBQyxRQUFkLEdBQXlCLEtBQUssVUFBTCxDQUFnQixRQUE3QyxFQUF1RDtBQUNuRCxRQUFBLGFBQWEsQ0FBQyxTQUFkLEdBQTBCLE1BQTFCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsUUFBQSxhQUFhLENBQUMsU0FBZCxHQUEwQixJQUExQjtBQUNILE9BVGlCLENBV2xCOzs7QUFDQSxVQUFJLEtBQUssVUFBTCxDQUFnQixTQUFoQixJQUE2QixhQUFhLENBQUMsU0FBL0MsRUFBMEQ7QUFDdEQsUUFBQSxhQUFhLENBQUMsa0JBQWQsR0FBbUMsSUFBbkM7QUFDSCxPQWRpQixDQWdCbEI7OztBQUNBLE1BQUEsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsSUFBSSxXQUFKLENBQWdCLDhCQUFoQixFQUFnRDtBQUFFLFFBQUEsTUFBTSxFQUFFO0FBQVYsT0FBaEQsQ0FBckIsRUFqQmtCLENBbUJsQjs7QUFDQSxXQUFLLFVBQUwsR0FBa0IsYUFBbEI7QUFDSDs7Ozs7Ozs7O0FDakNMOzs7QUFJQSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBUCxHQUFxQixJQUE5QixDLENBQ0E7O0FBQ0EsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsS0FBekIsQ0FBK0IsV0FBL0IsQ0FBMkMsTUFBM0MsWUFBc0QsRUFBdEQsUyxDQUVBOztBQUNBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0FBQ3BDO0FBQ0EsTUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsSUFBOUI7QUFDQSxFQUFBLFFBQVEsQ0FBQyxlQUFULENBQXlCLEtBQXpCLENBQStCLFdBQS9CLENBQTJDLE1BQTNDLFlBQXNELEVBQXREO0FBQ0gsQ0FKRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciBvIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4sbykmJih0W29dPW5bb10pfXJldHVybiB0fSxfdHlwZW9mPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9OyFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHM/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKTp0LkxhenlMb2FkPWUoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxlLG4pe3ZhciBvPWUuX3NldHRpbmdzOyFuJiZmKHQpfHwoQyhvLmNhbGxiYWNrX2VudGVyLHQpLFIuaW5kZXhPZih0LnRhZ05hbWUpPi0xJiYoTih0LGUpLEkodCxvLmNsYXNzX2xvYWRpbmcpKSxFKHQsZSksZCh0KSxDKG8uY2FsbGJhY2tfc2V0LHQpKX12YXIgZT1mdW5jdGlvbih0LGUpe3JldHVybiBlP3QucmVwbGFjZSgvXFwuKGpwZT9nfHBuZykvZ2ksXCIud2VicFwiKTp0fSxuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3csbz1uJiYhKFwib25zY3JvbGxcImluIHdpbmRvdyl8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBuYXZpZ2F0b3ImJi8oZ2xlfGluZ3xybylib3R8Y3Jhd2x8c3BpZGVyL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxyPW4mJlwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcImluIHdpbmRvdyxhPW4mJlwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSxpPW4mJmZ1bmN0aW9uKCl7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtyZXR1cm4hKCF0LmdldENvbnRleHR8fCF0LmdldENvbnRleHQoXCIyZFwiKSkmJjA9PT10LnRvRGF0YVVSTChcImltYWdlL3dlYnBcIikuaW5kZXhPZihcImRhdGE6aW1hZ2Uvd2VicFwiKX0oKSxzPXtlbGVtZW50c19zZWxlY3RvcjpcImltZ1wiLGNvbnRhaW5lcjpvfHxuP2RvY3VtZW50Om51bGwsdGhyZXNob2xkOjMwMCx0aHJlc2hvbGRzOm51bGwsZGF0YV9zcmM6XCJzcmNcIixkYXRhX3NyY3NldDpcInNyY3NldFwiLGRhdGFfc2l6ZXM6XCJzaXplc1wiLGRhdGFfYmc6XCJiZ1wiLGNsYXNzX2xvYWRpbmc6XCJsb2FkaW5nXCIsY2xhc3NfbG9hZGVkOlwibG9hZGVkXCIsY2xhc3NfZXJyb3I6XCJlcnJvclwiLGxvYWRfZGVsYXk6MCxjYWxsYmFja19sb2FkOm51bGwsY2FsbGJhY2tfZXJyb3I6bnVsbCxjYWxsYmFja19zZXQ6bnVsbCxjYWxsYmFja19lbnRlcjpudWxsLGNhbGxiYWNrX2ZpbmlzaDpudWxsLHRvX3dlYnA6ITF9LGM9ZnVuY3Rpb24odCl7cmV0dXJuIF9leHRlbmRzKHt9LHMsdCl9LGw9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK2UpfSx1PWZ1bmN0aW9uKHQsZSxuKXt2YXIgbz1cImRhdGEtXCIrZTtudWxsIT09bj90LnNldEF0dHJpYnV0ZShvLG4pOnQucmVtb3ZlQXR0cmlidXRlKG8pfSxkPWZ1bmN0aW9uKHQpe3JldHVybiB1KHQsXCJ3YXMtcHJvY2Vzc2VkXCIsXCJ0cnVlXCIpfSxmPWZ1bmN0aW9uKHQpe3JldHVyblwidHJ1ZVwiPT09bCh0LFwid2FzLXByb2Nlc3NlZFwiKX0sXz1mdW5jdGlvbih0LGUpe3JldHVybiB1KHQsXCJsbC10aW1lb3V0XCIsZSl9LHY9ZnVuY3Rpb24odCl7cmV0dXJuIGwodCxcImxsLXRpbWVvdXRcIil9LGc9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiFmKHQpfSl9LGg9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1lfSl9LGI9ZnVuY3Rpb24odCxlKXt2YXIgbixvPW5ldyB0KGUpO3RyeXtuPW5ldyBDdXN0b21FdmVudChcIkxhenlMb2FkOjpJbml0aWFsaXplZFwiLHtkZXRhaWw6e2luc3RhbmNlOm99fSl9Y2F0Y2godCl7KG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKSkuaW5pdEN1c3RvbUV2ZW50KFwiTGF6eUxvYWQ6OkluaXRpYWxpemVkXCIsITEsITEse2luc3RhbmNlOm99KX13aW5kb3cuZGlzcGF0Y2hFdmVudChuKX0sbT1mdW5jdGlvbih0LGUsbixvKXtmb3IodmFyIHIsYT0wO3I9dC5jaGlsZHJlblthXTthKz0xKWlmKFwiU09VUkNFXCI9PT1yLnRhZ05hbWUpe3ZhciBpPWwocixuKTtwKHIsZSxpLG8pfX0scD1mdW5jdGlvbih0LG4sbyxyKXtvJiZ0LnNldEF0dHJpYnV0ZShuLGUobyxyKSl9LHk9ZnVuY3Rpb24odCxuKXt2YXIgbz1pJiZuLnRvX3dlYnAscj1sKHQsbi5kYXRhX3NyYyksYT1sKHQsbi5kYXRhX2JnKTtpZihyKXt2YXIgcz1lKHIsbyk7dC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9J3VybChcIicrcysnXCIpJ31pZihhKXt2YXIgYz1lKGEsbyk7dC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9Y319LHc9e0lNRzpmdW5jdGlvbih0LGUpe3ZhciBuPWkmJmUudG9fd2VicCxvPWUuZGF0YV9zcmNzZXQscj10LnBhcmVudE5vZGU7ciYmXCJQSUNUVVJFXCI9PT1yLnRhZ05hbWUmJm0ocixcInNyY3NldFwiLG8sbik7dmFyIGE9bCh0LGUuZGF0YV9zaXplcyk7cCh0LFwic2l6ZXNcIixhKTt2YXIgcz1sKHQsbyk7cCh0LFwic3Jjc2V0XCIscyxuKTt2YXIgYz1sKHQsZS5kYXRhX3NyYyk7cCh0LFwic3JjXCIsYyxuKX0sSUZSQU1FOmZ1bmN0aW9uKHQsZSl7dmFyIG49bCh0LGUuZGF0YV9zcmMpO3AodCxcInNyY1wiLG4pfSxWSURFTzpmdW5jdGlvbih0LGUpe3ZhciBuPWUuZGF0YV9zcmMsbz1sKHQsbik7bSh0LFwic3JjXCIsbikscCh0LFwic3JjXCIsbyksdC5sb2FkKCl9fSxFPWZ1bmN0aW9uKHQsZSl7dmFyIG49ZS5fc2V0dGluZ3Msbz10LnRhZ05hbWUscj13W29dO2lmKHIpcmV0dXJuIHIodCxuKSxlLl91cGRhdGVMb2FkaW5nQ291bnQoMSksdm9pZChlLl9lbGVtZW50cz1oKGUuX2VsZW1lbnRzLHQpKTt5KHQsbil9LEk9ZnVuY3Rpb24odCxlKXthP3QuY2xhc3NMaXN0LmFkZChlKTp0LmNsYXNzTmFtZSs9KHQuY2xhc3NOYW1lP1wiIFwiOlwiXCIpK2V9LEw9ZnVuY3Rpb24odCxlKXthP3QuY2xhc3NMaXN0LnJlbW92ZShlKTp0LmNsYXNzTmFtZT10LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxccyspXCIrZStcIihcXFxccyt8JClcIiksXCIgXCIpLnJlcGxhY2UoL15cXHMrLyxcIlwiKS5yZXBsYWNlKC9cXHMrJC8sXCJcIil9LEM9ZnVuY3Rpb24odCxlKXt0JiZ0KGUpfSxPPWZ1bmN0aW9uKHQsZSxuKXt0LmFkZEV2ZW50TGlzdGVuZXIoZSxuKX0saz1mdW5jdGlvbih0LGUsbil7dC5yZW1vdmVFdmVudExpc3RlbmVyKGUsbil9LHg9ZnVuY3Rpb24odCxlLG4pe08odCxcImxvYWRcIixlKSxPKHQsXCJsb2FkZWRkYXRhXCIsZSksTyh0LFwiZXJyb3JcIixuKX0sQT1mdW5jdGlvbih0LGUsbil7ayh0LFwibG9hZFwiLGUpLGsodCxcImxvYWRlZGRhdGFcIixlKSxrKHQsXCJlcnJvclwiLG4pfSx6PWZ1bmN0aW9uKHQsZSxuKXt2YXIgbz1uLl9zZXR0aW5ncyxyPWU/by5jbGFzc19sb2FkZWQ6by5jbGFzc19lcnJvcixhPWU/by5jYWxsYmFja19sb2FkOm8uY2FsbGJhY2tfZXJyb3IsaT10LnRhcmdldDtMKGksby5jbGFzc19sb2FkaW5nKSxJKGksciksQyhhLGkpLG4uX3VwZGF0ZUxvYWRpbmdDb3VudCgtMSl9LE49ZnVuY3Rpb24odCxlKXt2YXIgbj1mdW5jdGlvbiBuKHIpe3oociwhMCxlKSxBKHQsbixvKX0sbz1mdW5jdGlvbiBvKHIpe3oociwhMSxlKSxBKHQsbixvKX07eCh0LG4sbyl9LFI9W1wiSU1HXCIsXCJJRlJBTUVcIixcIlZJREVPXCJdLFM9ZnVuY3Rpb24oZSxuLG8pe3QoZSxvKSxuLnVub2JzZXJ2ZShlKX0sTT1mdW5jdGlvbih0KXt2YXIgZT12KHQpO2UmJihjbGVhclRpbWVvdXQoZSksXyh0LG51bGwpKX0saj1mdW5jdGlvbih0LGUsbil7dmFyIG89bi5fc2V0dGluZ3MubG9hZF9kZWxheSxyPXYodCk7cnx8KHI9c2V0VGltZW91dChmdW5jdGlvbigpe1ModCxlLG4pLE0odCl9LG8pLF8odCxyKSl9LEQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQuaXNJbnRlcnNlY3Rpbmd8fHQuaW50ZXJzZWN0aW9uUmF0aW8+MH0sVD1mdW5jdGlvbih0KXtyZXR1cm57cm9vdDp0LmNvbnRhaW5lcj09PWRvY3VtZW50P251bGw6dC5jb250YWluZXIscm9vdE1hcmdpbjp0LnRocmVzaG9sZHN8fHQudGhyZXNob2xkK1wicHhcIn19LFU9ZnVuY3Rpb24odCxlKXt0aGlzLl9zZXR0aW5ncz1jKHQpLHRoaXMuX3NldE9ic2VydmVyKCksdGhpcy5fbG9hZGluZ0NvdW50PTAsdGhpcy51cGRhdGUoZSl9O3JldHVybiBVLnByb3RvdHlwZT17X21hbmFnZUludGVyc2VjdGlvbjpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9vYnNlcnZlcixuPXRoaXMuX3NldHRpbmdzLmxvYWRfZGVsYXksbz10LnRhcmdldDtuP0QodCk/aihvLGUsdGhpcyk6TShvKTpEKHQpJiZTKG8sZSx0aGlzKX0sX29uSW50ZXJzZWN0aW9uOmZ1bmN0aW9uKHQpe3QuZm9yRWFjaCh0aGlzLl9tYW5hZ2VJbnRlcnNlY3Rpb24uYmluZCh0aGlzKSl9LF9zZXRPYnNlcnZlcjpmdW5jdGlvbigpe3ImJih0aGlzLl9vYnNlcnZlcj1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5fb25JbnRlcnNlY3Rpb24uYmluZCh0aGlzKSxUKHRoaXMuX3NldHRpbmdzKSkpfSxfdXBkYXRlTG9hZGluZ0NvdW50OmZ1bmN0aW9uKHQpe3RoaXMuX2xvYWRpbmdDb3VudCs9dCwwPT09dGhpcy5fZWxlbWVudHMubGVuZ3RoJiYwPT09dGhpcy5fbG9hZGluZ0NvdW50JiZDKHRoaXMuX3NldHRpbmdzLmNhbGxiYWNrX2ZpbmlzaCl9LHVwZGF0ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy5fc2V0dGluZ3Mscj10fHxuLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKG4uZWxlbWVudHNfc2VsZWN0b3IpO3RoaXMuX2VsZW1lbnRzPWcoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocikpLCFvJiZ0aGlzLl9vYnNlcnZlcj90aGlzLl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UuX29ic2VydmVyLm9ic2VydmUodCl9KTp0aGlzLmxvYWRBbGwoKX0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5fb2JzZXJ2ZXImJih0aGlzLl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuX29ic2VydmVyLnVub2JzZXJ2ZShlKX0pLHRoaXMuX29ic2VydmVyPW51bGwpLHRoaXMuX2VsZW1lbnRzPW51bGwsdGhpcy5fc2V0dGluZ3M9bnVsbH0sbG9hZDpmdW5jdGlvbihlLG4pe3QoZSx0aGlzLG4pfSxsb2FkQWxsOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QubG9hZChlKX0pfX0sbiYmZnVuY3Rpb24odCxlKXtpZihlKWlmKGUubGVuZ3RoKWZvcih2YXIgbixvPTA7bj1lW29dO28rPTEpYih0LG4pO2Vsc2UgYih0LGUpfShVLHdpbmRvdy5sYXp5TG9hZE9wdGlvbnMpLFV9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhenlsb2FkLm1pbi5qcy5tYXBcbiIsImltcG9ydCBnZW5lcmFsTGF5b3V0IGZyb20gXCIuLi9sYXlvdXQvR2VuZXJhbC5qc1wiOyIsImltcG9ydCBMYXp5bG9hZCBmcm9tIFwiLi4vLi4vYnVpbGQvbm9kZV9tb2R1bGVzL3ZhbmlsbGEtbGF6eWxvYWQvZGlzdC9sYXp5bG9hZC5taW4uanNcIjtcclxuaW1wb3J0IHsgRE9NUmVhZHlPYmplY3QgfSBmcm9tIFwiLi4vdXRpbHMvRE9NUmVhZHlPYmplY3QuanNcIjtcclxuaW1wb3J0IFwiLi4vdXRpbHMvVkhNb2JpbGUuanNcIjtcclxuaW1wb3J0IHsgU2Nyb2xsRGlyZWN0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL1Njcm9sbERpcmVjdGlvbi5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIExheW91dCBnZW5lcmFsXHJcbiAqL1xyXG5jbGFzcyBHZW5lcmFsIGV4dGVuZHMgRE9NUmVhZHlPYmplY3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHZW5lcmFsLmNvbnN0cnVjdG9yKCknKTtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvL0lFIDExXHJcbiAgICAgICAgdGhpcy5pc0lFMTEgPSAhIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIWRvY3VtZW50LmRvY3VtZW50TW9kZTtcclxuXHJcbiAgICAgICAgLy9sYWR5bG9hZFxyXG4gICAgICAgICh0aGlzLmxhenlsb2FkID09PSB1bmRlZmluZWQpID8gdGhpcy5sYXp5bG9hZCA9IG5ldyBMYXp5bG9hZCh7IGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5XCIgfSkgOiB0aGlzLmxhenlsb2FkLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBjb21wb25lbnRcclxuICAgIH1cclxuXHJcbiAgICBpc0RPTVJlYWR5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHZW5lcmFsLmlzRE9NUmVhZHkoKScpO1xyXG4gICAgICAgIHN1cGVyLmlzRE9NUmVhZHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdlbmVyYWxMYXlvdXQgPSBuZXcgR2VuZXJhbCgpOyIsIi8vRG9jdW1lbnQgcmVhZHkgUHJvbWlzZVxyXG5kb2N1bWVudC5yZWFkeSA9ICgpID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlc29sdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERPTVJlYWR5T2JqZWN0XHJcbiAqIGFic3RyYWN0IGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE9NUmVhZHlPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy9PbiBuZSBwZXV0IHBhcyBpbnN0YW5jaWVyIGxhIGNsYXNzIGRpcmVjdGVtZW50XHJcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IERPTVJlYWR5T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICdDYW5ub3QgY29uc3RydWN0IERPTVJlYWR5T2JqZWN0IGluc3RhbmNlcyBkaXJlY3RseSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNET01SZWFkeSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLndhcm4oZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNET01SZWFkeSgpIHsgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3Rpb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRGF0YSA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IG51bGwsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgaGFzRGlyZWN0aW9uQ2hhbmdlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLnNldFNjcm9sbERpcmVjdGlvbihlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2Nyb2xsRGlyZWN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgbmV3U2Nyb2xsRGF0YSA9IHt9O1xyXG4gICAgICAgIG5ld1Njcm9sbERhdGEucG9zaXRpb24gPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApIC0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3AgfHwgMCk7XHJcblxyXG4gICAgICAgIC8vT24gc3RvY2tlIGxhIGRpcmVjdGlvblxyXG4gICAgICAgIGlmIChuZXdTY3JvbGxEYXRhLnBvc2l0aW9uID4gdGhpcy5zY3JvbGxEYXRhLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIG5ld1Njcm9sbERhdGEuZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1Njcm9sbERhdGEuZGlyZWN0aW9uID0gJ3VwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU2kgb24gY2hhbmdlIGRlIGRpcmVjdGlvblxyXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbERhdGEuZGlyZWN0aW9uICE9IG5ld1Njcm9sbERhdGEuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIG5ld1Njcm9sbERhdGEuaGFzRGlyZWN0aW9uQ2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vT24gZGlzcGF0Y2ggdW4gZXZlbnRcclxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1Njcm9sbERpcmVjdGlvbl9zY3JvbGxjaGFuZ2UnLCB7IGRldGFpbDogbmV3U2Nyb2xsRGF0YSB9KSk7XHJcblxyXG4gICAgICAgIC8vT24gc3RvY2tlIGxlcyBkb25uw6llc1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRGF0YSA9IG5ld1Njcm9sbERhdGE7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogRnJvbSBodHRwczovL2Nzcy10cmlja3MuY29tL3RoZS10cmljay10by12aWV3cG9ydC11bml0cy1vbi1tb2JpbGUvXHJcbiAqL1xyXG5cclxubGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcclxuLy8gVGhlbiB3ZSBzZXQgdGhlIHZhbHVlIGluIHRoZSAtLXZoIGN1c3RvbSBwcm9wZXJ0eSB0byB0aGUgcm9vdCBvZiB0aGUgZG9jdW1lbnRcclxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKTtcclxuXHJcbi8vIFdlIGxpc3RlbiB0byB0aGUgcmVzaXplIGV2ZW50XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAvLyBXZSBleGVjdXRlIHRoZSBzYW1lIHNjcmlwdCBhcyBiZWZvcmVcclxuICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmgnLCBgJHt2aH1weGApO1xyXG59KTtcclxuIl19
