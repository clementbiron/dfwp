(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";function t(t,e,n){var o=e._settings;!n&&f(t)||(C(o.callback_enter,t),R.indexOf(t.tagName)>-1&&(N(t,e),I(t,o.class_loading)),E(t,e),d(t),C(o.callback_set,t))}var e=function(t,e){return e?t.replace(/\.(jpe?g|png)/gi,".webp"):t},n="undefined"!=typeof window,o=n&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),r=n&&"IntersectionObserver"in window,a=n&&"classList"in document.createElement("p"),i=n&&function(){var t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))&&0===t.toDataURL("image/webp").indexOf("data:image/webp")}(),s={elements_selector:"img",container:o||n?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,callback_finish:null,to_webp:!1},c=function(t){return _extends({},s,t)},l=function(t,e){return t.getAttribute("data-"+e)},u=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},d=function(t){return u(t,"was-processed","true")},f=function(t){return"true"===l(t,"was-processed")},_=function(t,e){return u(t,"ll-timeout",e)},v=function(t){return l(t,"ll-timeout")},g=function(t){return t.filter(function(t){return!f(t)})},h=function(t,e){return t.filter(function(t){return t!==e})},b=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)},m=function(t,e,n,o){for(var r,a=0;r=t.children[a];a+=1)if("SOURCE"===r.tagName){var i=l(r,n);p(r,e,i,o)}},p=function(t,n,o,r){o&&t.setAttribute(n,e(o,r))},y=function(t,n){var o=i&&n.to_webp,r=l(t,n.data_src),a=l(t,n.data_bg);if(r){var s=e(r,o);t.style.backgroundImage='url("'+s+'")'}if(a){var c=e(a,o);t.style.backgroundImage=c}},w={IMG:function(t,e){var n=i&&e.to_webp,o=e.data_srcset,r=t.parentNode;r&&"PICTURE"===r.tagName&&m(r,"srcset",o,n);var a=l(t,e.data_sizes);p(t,"sizes",a);var s=l(t,o);p(t,"srcset",s,n);var c=l(t,e.data_src);p(t,"src",c,n)},IFRAME:function(t,e){var n=l(t,e.data_src);p(t,"src",n)},VIDEO:function(t,e){var n=e.data_src,o=l(t,n);m(t,"src",n),p(t,"src",o),t.load()}},E=function(t,e){var n=e._settings,o=t.tagName,r=w[o];if(r)return r(t,n),e._updateLoadingCount(1),void(e._elements=h(e._elements,t));y(t,n)},I=function(t,e){a?t.classList.add(e):t.className+=(t.className?" ":"")+e},L=function(t,e){a?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},C=function(t,e){t&&t(e)},O=function(t,e,n){t.addEventListener(e,n)},k=function(t,e,n){t.removeEventListener(e,n)},x=function(t,e,n){O(t,"load",e),O(t,"loadeddata",e),O(t,"error",n)},A=function(t,e,n){k(t,"load",e),k(t,"loadeddata",e),k(t,"error",n)},z=function(t,e,n){var o=n._settings,r=e?o.class_loaded:o.class_error,a=e?o.callback_load:o.callback_error,i=t.target;L(i,o.class_loading),I(i,r),C(a,i),n._updateLoadingCount(-1)},N=function(t,e){var n=function n(r){z(r,!0,e),A(t,n,o)},o=function o(r){z(r,!1,e),A(t,n,o)};x(t,n,o)},R=["IMG","IFRAME","VIDEO"],S=function(e,n,o){t(e,o),n.unobserve(e)},M=function(t){var e=v(t);e&&(clearTimeout(e),_(t,null))},j=function(t,e,n){var o=n._settings.load_delay,r=v(t);r||(r=setTimeout(function(){S(t,e,n),M(t)},o),_(t,r))},D=function(t){return t.isIntersecting||t.intersectionRatio>0},T=function(t){return{root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}},U=function(t,e){this._settings=c(t),this._setObserver(),this._loadingCount=0,this.update(e)};return U.prototype={_manageIntersection:function(t){var e=this._observer,n=this._settings.load_delay,o=t.target;n?D(t)?j(o,e,this):M(o):D(t)&&S(o,e,this)},_onIntersection:function(t){t.forEach(this._manageIntersection.bind(this))},_setObserver:function(){r&&(this._observer=new IntersectionObserver(this._onIntersection.bind(this),T(this._settings)))},_updateLoadingCount:function(t){this._loadingCount+=t,0===this._elements.length&&0===this._loadingCount&&C(this._settings.callback_finish)},update:function(t){var e=this,n=this._settings,r=t||n.container.querySelectorAll(n.elements_selector);this._elements=g(Array.prototype.slice.call(r)),!o&&this._observer?this._elements.forEach(function(t){e._observer.observe(t)}):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,n){t(e,this,n)},loadAll:function(){var t=this;this._elements.forEach(function(e){t.load(e)})}},n&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)b(t,n);else b(t,e)}(U,window.lazyLoadOptions),U});


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var _lazyloadMin = _interopRequireDefault(require("../../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js"));

var _DOMReadyObject2 = require("../../utils/DOMReadyObject.js");

require("../../utils/VHMobile.js");

var _ScrollDirection = require("../../utils/ScrollDirection.js");

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
 * Index
 */
var Index =
/*#__PURE__*/
function (_DOMReadyObject) {
  _inherits(Index, _DOMReadyObject);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    console.log('Index.constructor()');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this)); //IE 11

    _this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode; //ladyload

    _this.lazyload === undefined ? _this.lazyload = new _lazyloadMin.default({
      elements_selector: ".lazy"
    }) : _this.lazyload.update(); //Create component

    return _this;
  }

  _createClass(Index, [{
    key: "isDOMReady",
    value: function isDOMReady() {
      console.log('Index.isDOMReady()');

      _get(_getPrototypeOf(Index.prototype), "isDOMReady", this).call(this);
    }
  }]);

  return Index;
}(_DOMReadyObject2.DOMReadyObject);

var index = new Index();
exports.index = index;

},{"../../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js":1,"../../utils/DOMReadyObject.js":4,"../../utils/ScrollDirection.js":5,"../../utils/VHMobile.js":6}],3:[function(require,module,exports){
"use strict";

var _Index = _interopRequireDefault(require("../layout/default/Index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../layout/default/Index.js":2}],4:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qcyIsIi4uL3NyYy9sYXlvdXQvZGVmYXVsdC9JbmRleC5qcyIsIi4uL3NyYy9sb2FkZXIvbWFpbi5qcyIsIi4uL3NyYy91dGlscy9ET01SZWFkeU9iamVjdC5qcyIsIi4uL3NyYy91dGlscy9TY3JvbGxEaXJlY3Rpb24uanMiLCIuLi9zcmMvdXRpbHMvVkhNb2JpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0ZBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTSxLOzs7OztBQUVGLG1CQUFjO0FBQUE7O0FBQUE7O0FBQ1YsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHFCQUFaO0FBQ0EsZ0ZBRlUsQ0FJVjs7QUFDQSxVQUFLLE1BQUwsR0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLG9CQUFULElBQWlDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBMUQsQ0FMVSxDQU9WOztBQUNDLFVBQUssUUFBTCxLQUFrQixTQUFuQixHQUFnQyxNQUFLLFFBQUwsR0FBZ0IsSUFBSSxvQkFBSixDQUFhO0FBQUUsTUFBQSxpQkFBaUIsRUFBRTtBQUFyQixLQUFiLENBQWhELEdBQStGLE1BQUssUUFBTCxDQUFjLE1BQWQsRUFBL0YsQ0FSVSxDQVVWOztBQVZVO0FBV2I7Ozs7aUNBRVk7QUFDZixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVo7O0FBQ007QUFDSDs7OztFQWxCZSwrQjs7QUFxQmIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFKLEVBQWQ7Ozs7OztBQzdCUDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxRQUFRLENBQUMsS0FBVCxHQUFpQixZQUFNO0FBQ25CLFNBQU8sSUFBSSxPQUFKLENBQVksVUFBQSxPQUFPLEVBQUk7QUFDMUIsUUFBSSxRQUFRLENBQUMsVUFBVCxLQUF3QixVQUE1QixFQUF3QztBQUNwQyxNQUFBLE9BQU87QUFDVixLQUZELE1BRU87QUFDSCxNQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsT0FBOUM7QUFDSDtBQUNKLEdBTk0sQ0FBUDtBQU9ILENBUkQ7QUFVQTs7Ozs7O0lBSWEsYzs7O0FBQ1QsNEJBQWM7QUFBQTs7QUFBQTs7QUFDVjtBQUNBLFFBQUksS0FBSyxXQUFMLEtBQXFCLGNBQXpCLEVBQXlDO0FBQ3JDLFlBQU0sSUFBSSxLQUFKLENBQ0Ysb0RBREUsQ0FBTjtBQUdIOztBQUVELElBQUEsUUFBUSxDQUFDLEtBQVQsR0FBaUIsSUFBakIsQ0FBc0IsWUFBTTtBQUN4QixNQUFBLEtBQUksQ0FBQyxVQUFMO0FBQ0gsS0FGRCxFQUVHLEtBRkgsQ0FFUyxVQUFBLEdBQUc7QUFBQSxhQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsR0FBYixDQUFKO0FBQUEsS0FGWjtBQUdIOzs7O2lDQUVZLENBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3QlAsZTs7O0FBRVQsNkJBQWM7QUFBQTs7QUFBQTs7QUFDVixTQUFLLFVBQUwsR0FBa0I7QUFDZCxNQUFBLFFBQVEsRUFBRSxJQURJO0FBRWQsTUFBQSxTQUFTLEVBQUUsSUFGRztBQUdkLE1BQUEsa0JBQWtCLEVBQUU7QUFITixLQUFsQjtBQU1BLElBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtBQUFBLGFBQU8sS0FBSSxDQUFDLGtCQUFMLENBQXdCLENBQXhCLENBQVA7QUFBQSxLQUFsQztBQUNIOzs7O3VDQUVrQixDLEVBQUc7QUFDbEIsVUFBSSxhQUFhLEdBQUcsRUFBcEI7QUFDQSxNQUFBLGFBQWEsQ0FBQyxRQUFkLEdBQXlCLENBQUMsTUFBTSxDQUFDLFdBQVAsSUFBc0IsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsU0FBaEQsS0FBOEQsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsU0FBekIsSUFBc0MsQ0FBcEcsQ0FBekIsQ0FGa0IsQ0FJbEI7O0FBQ0EsVUFBSSxhQUFhLENBQUMsUUFBZCxHQUF5QixLQUFLLFVBQUwsQ0FBZ0IsUUFBN0MsRUFBdUQ7QUFDbkQsUUFBQSxhQUFhLENBQUMsU0FBZCxHQUEwQixNQUExQjtBQUNILE9BRkQsTUFFTztBQUNILFFBQUEsYUFBYSxDQUFDLFNBQWQsR0FBMEIsSUFBMUI7QUFDSCxPQVRpQixDQVdsQjs7O0FBQ0EsVUFBSSxLQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsSUFBNkIsYUFBYSxDQUFDLFNBQS9DLEVBQTBEO0FBQ3RELFFBQUEsYUFBYSxDQUFDLGtCQUFkLEdBQW1DLElBQW5DO0FBQ0gsT0FkaUIsQ0FnQmxCOzs7QUFDQSxNQUFBLE1BQU0sQ0FBQyxhQUFQLENBQXFCLElBQUksV0FBSixDQUFnQiw4QkFBaEIsRUFBZ0Q7QUFBRSxRQUFBLE1BQU0sRUFBRTtBQUFWLE9BQWhELENBQXJCLEVBakJrQixDQW1CbEI7O0FBQ0EsV0FBSyxVQUFMLEdBQWtCLGFBQWxCO0FBQ0g7Ozs7Ozs7OztBQ2pDTDs7O0FBSUEsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsSUFBOUIsQyxDQUNBOztBQUNBLFFBQVEsQ0FBQyxlQUFULENBQXlCLEtBQXpCLENBQStCLFdBQS9CLENBQTJDLE1BQTNDLFlBQXNELEVBQXRELFMsQ0FFQTs7QUFDQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtBQUNwQztBQUNBLE1BQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLElBQTlCO0FBQ0EsRUFBQSxRQUFRLENBQUMsZUFBVCxDQUF5QixLQUF6QixDQUErQixXQUEvQixDQUEyQyxNQUEzQyxZQUFzRCxFQUF0RDtBQUNILENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTE7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl7dmFyIG49YXJndW1lbnRzW2VdO2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYodFtvXT1uW29dKX1yZXR1cm4gdH0sX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fTshZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzP1widW5kZWZpbmVkXCI6X3R5cGVvZihleHBvcnRzKSkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6dC5MYXp5TG9hZD1lKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsZSxuKXt2YXIgbz1lLl9zZXR0aW5nczshbiYmZih0KXx8KEMoby5jYWxsYmFja19lbnRlcix0KSxSLmluZGV4T2YodC50YWdOYW1lKT4tMSYmKE4odCxlKSxJKHQsby5jbGFzc19sb2FkaW5nKSksRSh0LGUpLGQodCksQyhvLmNhbGxiYWNrX3NldCx0KSl9dmFyIGU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZT90LnJlcGxhY2UoL1xcLihqcGU/Z3xwbmcpL2dpLFwiLndlYnBcIik6dH0sbj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93LG89biYmIShcIm9uc2Nyb2xsXCJpbiB3aW5kb3cpfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiYvKGdsZXxpbmd8cm8pYm90fGNyYXdsfHNwaWRlci9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkscj1uJiZcIkludGVyc2VjdGlvbk9ic2VydmVyXCJpbiB3aW5kb3csYT1uJiZcImNsYXNzTGlzdFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIiksaT1uJiZmdW5jdGlvbigpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7cmV0dXJuISghdC5nZXRDb250ZXh0fHwhdC5nZXRDb250ZXh0KFwiMmRcIikpJiYwPT09dC50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLmluZGV4T2YoXCJkYXRhOmltYWdlL3dlYnBcIil9KCkscz17ZWxlbWVudHNfc2VsZWN0b3I6XCJpbWdcIixjb250YWluZXI6b3x8bj9kb2N1bWVudDpudWxsLHRocmVzaG9sZDozMDAsdGhyZXNob2xkczpudWxsLGRhdGFfc3JjOlwic3JjXCIsZGF0YV9zcmNzZXQ6XCJzcmNzZXRcIixkYXRhX3NpemVzOlwic2l6ZXNcIixkYXRhX2JnOlwiYmdcIixjbGFzc19sb2FkaW5nOlwibG9hZGluZ1wiLGNsYXNzX2xvYWRlZDpcImxvYWRlZFwiLGNsYXNzX2Vycm9yOlwiZXJyb3JcIixsb2FkX2RlbGF5OjAsY2FsbGJhY2tfbG9hZDpudWxsLGNhbGxiYWNrX2Vycm9yOm51bGwsY2FsbGJhY2tfc2V0Om51bGwsY2FsbGJhY2tfZW50ZXI6bnVsbCxjYWxsYmFja19maW5pc2g6bnVsbCx0b193ZWJwOiExfSxjPWZ1bmN0aW9uKHQpe3JldHVybiBfZXh0ZW5kcyh7fSxzLHQpfSxsPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitlKX0sdT1mdW5jdGlvbih0LGUsbil7dmFyIG89XCJkYXRhLVwiK2U7bnVsbCE9PW4/dC5zZXRBdHRyaWJ1dGUobyxuKTp0LnJlbW92ZUF0dHJpYnV0ZShvKX0sZD1mdW5jdGlvbih0KXtyZXR1cm4gdSh0LFwid2FzLXByb2Nlc3NlZFwiLFwidHJ1ZVwiKX0sZj1mdW5jdGlvbih0KXtyZXR1cm5cInRydWVcIj09PWwodCxcIndhcy1wcm9jZXNzZWRcIil9LF89ZnVuY3Rpb24odCxlKXtyZXR1cm4gdSh0LFwibGwtdGltZW91dFwiLGUpfSx2PWZ1bmN0aW9uKHQpe3JldHVybiBsKHQsXCJsbC10aW1lb3V0XCIpfSxnPWZ1bmN0aW9uKHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hZih0KX0pfSxoPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0IT09ZX0pfSxiPWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz1uZXcgdChlKTt0cnl7bj1uZXcgQ3VzdG9tRXZlbnQoXCJMYXp5TG9hZDo6SW5pdGlhbGl6ZWRcIix7ZGV0YWlsOntpbnN0YW5jZTpvfX0pfWNhdGNoKHQpeyhuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIikpLmluaXRDdXN0b21FdmVudChcIkxhenlMb2FkOjpJbml0aWFsaXplZFwiLCExLCExLHtpbnN0YW5jZTpvfSl9d2luZG93LmRpc3BhdGNoRXZlbnQobil9LG09ZnVuY3Rpb24odCxlLG4sbyl7Zm9yKHZhciByLGE9MDtyPXQuY2hpbGRyZW5bYV07YSs9MSlpZihcIlNPVVJDRVwiPT09ci50YWdOYW1lKXt2YXIgaT1sKHIsbik7cChyLGUsaSxvKX19LHA9ZnVuY3Rpb24odCxuLG8scil7byYmdC5zZXRBdHRyaWJ1dGUobixlKG8scikpfSx5PWZ1bmN0aW9uKHQsbil7dmFyIG89aSYmbi50b193ZWJwLHI9bCh0LG4uZGF0YV9zcmMpLGE9bCh0LG4uZGF0YV9iZyk7aWYocil7dmFyIHM9ZShyLG8pO3Quc3R5bGUuYmFja2dyb3VuZEltYWdlPSd1cmwoXCInK3MrJ1wiKSd9aWYoYSl7dmFyIGM9ZShhLG8pO3Quc3R5bGUuYmFja2dyb3VuZEltYWdlPWN9fSx3PXtJTUc6ZnVuY3Rpb24odCxlKXt2YXIgbj1pJiZlLnRvX3dlYnAsbz1lLmRhdGFfc3Jjc2V0LHI9dC5wYXJlbnROb2RlO3ImJlwiUElDVFVSRVwiPT09ci50YWdOYW1lJiZtKHIsXCJzcmNzZXRcIixvLG4pO3ZhciBhPWwodCxlLmRhdGFfc2l6ZXMpO3AodCxcInNpemVzXCIsYSk7dmFyIHM9bCh0LG8pO3AodCxcInNyY3NldFwiLHMsbik7dmFyIGM9bCh0LGUuZGF0YV9zcmMpO3AodCxcInNyY1wiLGMsbil9LElGUkFNRTpmdW5jdGlvbih0LGUpe3ZhciBuPWwodCxlLmRhdGFfc3JjKTtwKHQsXCJzcmNcIixuKX0sVklERU86ZnVuY3Rpb24odCxlKXt2YXIgbj1lLmRhdGFfc3JjLG89bCh0LG4pO20odCxcInNyY1wiLG4pLHAodCxcInNyY1wiLG8pLHQubG9hZCgpfX0sRT1mdW5jdGlvbih0LGUpe3ZhciBuPWUuX3NldHRpbmdzLG89dC50YWdOYW1lLHI9d1tvXTtpZihyKXJldHVybiByKHQsbiksZS5fdXBkYXRlTG9hZGluZ0NvdW50KDEpLHZvaWQoZS5fZWxlbWVudHM9aChlLl9lbGVtZW50cyx0KSk7eSh0LG4pfSxJPWZ1bmN0aW9uKHQsZSl7YT90LmNsYXNzTGlzdC5hZGQoZSk6dC5jbGFzc05hbWUrPSh0LmNsYXNzTmFtZT9cIiBcIjpcIlwiKStlfSxMPWZ1bmN0aW9uKHQsZSl7YT90LmNsYXNzTGlzdC5yZW1vdmUoZSk6dC5jbGFzc05hbWU9dC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58XFxcXHMrKVwiK2UrXCIoXFxcXHMrfCQpXCIpLFwiIFwiKS5yZXBsYWNlKC9eXFxzKy8sXCJcIikucmVwbGFjZSgvXFxzKyQvLFwiXCIpfSxDPWZ1bmN0aW9uKHQsZSl7dCYmdChlKX0sTz1mdW5jdGlvbih0LGUsbil7dC5hZGRFdmVudExpc3RlbmVyKGUsbil9LGs9ZnVuY3Rpb24odCxlLG4pe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLG4pfSx4PWZ1bmN0aW9uKHQsZSxuKXtPKHQsXCJsb2FkXCIsZSksTyh0LFwibG9hZGVkZGF0YVwiLGUpLE8odCxcImVycm9yXCIsbil9LEE9ZnVuY3Rpb24odCxlLG4pe2sodCxcImxvYWRcIixlKSxrKHQsXCJsb2FkZWRkYXRhXCIsZSksayh0LFwiZXJyb3JcIixuKX0sej1mdW5jdGlvbih0LGUsbil7dmFyIG89bi5fc2V0dGluZ3Mscj1lP28uY2xhc3NfbG9hZGVkOm8uY2xhc3NfZXJyb3IsYT1lP28uY2FsbGJhY2tfbG9hZDpvLmNhbGxiYWNrX2Vycm9yLGk9dC50YXJnZXQ7TChpLG8uY2xhc3NfbG9hZGluZyksSShpLHIpLEMoYSxpKSxuLl91cGRhdGVMb2FkaW5nQ291bnQoLTEpfSxOPWZ1bmN0aW9uKHQsZSl7dmFyIG49ZnVuY3Rpb24gbihyKXt6KHIsITAsZSksQSh0LG4sbyl9LG89ZnVuY3Rpb24gbyhyKXt6KHIsITEsZSksQSh0LG4sbyl9O3godCxuLG8pfSxSPVtcIklNR1wiLFwiSUZSQU1FXCIsXCJWSURFT1wiXSxTPWZ1bmN0aW9uKGUsbixvKXt0KGUsbyksbi51bm9ic2VydmUoZSl9LE09ZnVuY3Rpb24odCl7dmFyIGU9dih0KTtlJiYoY2xlYXJUaW1lb3V0KGUpLF8odCxudWxsKSl9LGo9ZnVuY3Rpb24odCxlLG4pe3ZhciBvPW4uX3NldHRpbmdzLmxvYWRfZGVsYXkscj12KHQpO3J8fChyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtTKHQsZSxuKSxNKHQpfSxvKSxfKHQscikpfSxEPWZ1bmN0aW9uKHQpe3JldHVybiB0LmlzSW50ZXJzZWN0aW5nfHx0LmludGVyc2VjdGlvblJhdGlvPjB9LFQ9ZnVuY3Rpb24odCl7cmV0dXJue3Jvb3Q6dC5jb250YWluZXI9PT1kb2N1bWVudD9udWxsOnQuY29udGFpbmVyLHJvb3RNYXJnaW46dC50aHJlc2hvbGRzfHx0LnRocmVzaG9sZCtcInB4XCJ9fSxVPWZ1bmN0aW9uKHQsZSl7dGhpcy5fc2V0dGluZ3M9Yyh0KSx0aGlzLl9zZXRPYnNlcnZlcigpLHRoaXMuX2xvYWRpbmdDb3VudD0wLHRoaXMudXBkYXRlKGUpfTtyZXR1cm4gVS5wcm90b3R5cGU9e19tYW5hZ2VJbnRlcnNlY3Rpb246ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fb2JzZXJ2ZXIsbj10aGlzLl9zZXR0aW5ncy5sb2FkX2RlbGF5LG89dC50YXJnZXQ7bj9EKHQpP2oobyxlLHRoaXMpOk0obyk6RCh0KSYmUyhvLGUsdGhpcyl9LF9vbkludGVyc2VjdGlvbjpmdW5jdGlvbih0KXt0LmZvckVhY2godGhpcy5fbWFuYWdlSW50ZXJzZWN0aW9uLmJpbmQodGhpcykpfSxfc2V0T2JzZXJ2ZXI6ZnVuY3Rpb24oKXtyJiYodGhpcy5fb2JzZXJ2ZXI9bmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuX29uSW50ZXJzZWN0aW9uLmJpbmQodGhpcyksVCh0aGlzLl9zZXR0aW5ncykpKX0sX3VwZGF0ZUxvYWRpbmdDb3VudDpmdW5jdGlvbih0KXt0aGlzLl9sb2FkaW5nQ291bnQrPXQsMD09PXRoaXMuX2VsZW1lbnRzLmxlbmd0aCYmMD09PXRoaXMuX2xvYWRpbmdDb3VudCYmQyh0aGlzLl9zZXR0aW5ncy5jYWxsYmFja19maW5pc2gpfSx1cGRhdGU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPXRoaXMuX3NldHRpbmdzLHI9dHx8bi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChuLmVsZW1lbnRzX3NlbGVjdG9yKTt0aGlzLl9lbGVtZW50cz1nKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHIpKSwhbyYmdGhpcy5fb2JzZXJ2ZXI/dGhpcy5fZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbih0KXtlLl9vYnNlcnZlci5vYnNlcnZlKHQpfSk6dGhpcy5sb2FkQWxsKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMuX29ic2VydmVyJiYodGhpcy5fZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlKXt0Ll9vYnNlcnZlci51bm9ic2VydmUoZSl9KSx0aGlzLl9vYnNlcnZlcj1udWxsKSx0aGlzLl9lbGVtZW50cz1udWxsLHRoaXMuX3NldHRpbmdzPW51bGx9LGxvYWQ6ZnVuY3Rpb24oZSxuKXt0KGUsdGhpcyxuKX0sbG9hZEFsbDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5fZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlKXt0LmxvYWQoZSl9KX19LG4mJmZ1bmN0aW9uKHQsZSl7aWYoZSlpZihlLmxlbmd0aClmb3IodmFyIG4sbz0wO249ZVtvXTtvKz0xKWIodCxuKTtlbHNlIGIodCxlKX0oVSx3aW5kb3cubGF6eUxvYWRPcHRpb25zKSxVfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXp5bG9hZC5taW4uanMubWFwXG4iLCJpbXBvcnQgTGF6eWxvYWQgZnJvbSBcIi4uLy4uLy4uL2J1aWxkL25vZGVfbW9kdWxlcy92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQubWluLmpzXCI7XHJcbmltcG9ydCB7IERPTVJlYWR5T2JqZWN0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RPTVJlYWR5T2JqZWN0LmpzXCI7XHJcbmltcG9ydCBcIi4uLy4uL3V0aWxzL1ZITW9iaWxlLmpzXCI7XHJcbmltcG9ydCB7IFNjcm9sbERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9TY3JvbGxEaXJlY3Rpb24uanNcIjtcclxuXHJcbi8qKlxyXG4gKiBJbmRleFxyXG4gKi9cclxuY2xhc3MgSW5kZXggZXh0ZW5kcyBET01SZWFkeU9iamVjdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luZGV4LmNvbnN0cnVjdG9yKCknKTtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvL0lFIDExXHJcbiAgICAgICAgdGhpcy5pc0lFMTEgPSAhIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIWRvY3VtZW50LmRvY3VtZW50TW9kZTtcclxuXHJcbiAgICAgICAgLy9sYWR5bG9hZFxyXG4gICAgICAgICh0aGlzLmxhenlsb2FkID09PSB1bmRlZmluZWQpID8gdGhpcy5sYXp5bG9hZCA9IG5ldyBMYXp5bG9hZCh7IGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5XCIgfSkgOiB0aGlzLmxhenlsb2FkLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBjb21wb25lbnRcclxuICAgIH1cclxuXHJcbiAgICBpc0RPTVJlYWR5KCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0luZGV4LmlzRE9NUmVhZHkoKScpO1xyXG4gICAgICAgIHN1cGVyLmlzRE9NUmVhZHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluZGV4ID0gbmV3IEluZGV4KCk7IiwiaW1wb3J0IGdlbmVyYWxMYXlvdXQgZnJvbSBcIi4uL2xheW91dC9kZWZhdWx0L0luZGV4LmpzXCI7IiwiLy9Eb2N1bWVudCByZWFkeSBQcm9taXNlXHJcbmRvY3VtZW50LnJlYWR5ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzb2x2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRE9NUmVhZHlPYmplY3RcclxuICogYWJzdHJhY3QgY2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBET01SZWFkeU9iamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL09uIG5lIHBldXQgcGFzIGluc3RhbmNpZXIgbGEgY2xhc3MgZGlyZWN0ZW1lbnRcclxuICAgICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gRE9NUmVhZHlPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgJ0Nhbm5vdCBjb25zdHJ1Y3QgRE9NUmVhZHlPYmplY3QgaW5zdGFuY2VzIGRpcmVjdGx5J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQucmVhZHkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0RPTVJlYWR5KCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUud2FybihlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RPTVJlYWR5KCkgeyB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFNjcm9sbERpcmVjdGlvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEYXRhID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBoYXNEaXJlY3Rpb25DaGFuZ2U6IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMuc2V0U2Nyb2xsRGlyZWN0aW9uKGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY3JvbGxEaXJlY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBuZXdTY3JvbGxEYXRhID0ge307XHJcbiAgICAgICAgbmV3U2Nyb2xsRGF0YS5wb3NpdGlvbiA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgLSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCB8fCAwKTtcclxuXHJcbiAgICAgICAgLy9PbiBzdG9ja2UgbGEgZGlyZWN0aW9uXHJcbiAgICAgICAgaWYgKG5ld1Njcm9sbERhdGEucG9zaXRpb24gPiB0aGlzLnNjcm9sbERhdGEucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgbmV3U2Nyb2xsRGF0YS5kaXJlY3Rpb24gPSAnZG93bic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3U2Nyb2xsRGF0YS5kaXJlY3Rpb24gPSAndXAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9TaSBvbiBjaGFuZ2UgZGUgZGlyZWN0aW9uXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRGF0YS5kaXJlY3Rpb24gIT0gbmV3U2Nyb2xsRGF0YS5kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgbmV3U2Nyb2xsRGF0YS5oYXNEaXJlY3Rpb25DaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9PbiBkaXNwYXRjaCB1biBldmVudFxyXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2Nyb2xsRGlyZWN0aW9uX3Njcm9sbGNoYW5nZScsIHsgZGV0YWlsOiBuZXdTY3JvbGxEYXRhIH0pKTtcclxuXHJcbiAgICAgICAgLy9PbiBzdG9ja2UgbGVzIGRvbm7DqWVzXHJcbiAgICAgICAgdGhpcy5zY3JvbGxEYXRhID0gbmV3U2Nyb2xsRGF0YTtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBGcm9tIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vdGhlLXRyaWNrLXRvLXZpZXdwb3J0LXVuaXRzLW9uLW1vYmlsZS9cclxuICovXHJcblxyXG5sZXQgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjAxO1xyXG4vLyBUaGVuIHdlIHNldCB0aGUgdmFsdWUgaW4gdGhlIC0tdmggY3VzdG9tIHByb3BlcnR5IHRvIHRoZSByb290IG9mIHRoZSBkb2N1bWVudFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmgnLCBgJHt2aH1weGApO1xyXG5cclxuLy8gV2UgbGlzdGVuIHRvIHRoZSByZXNpemUgZXZlbnRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8vIFdlIGV4ZWN1dGUgdGhlIHNhbWUgc2NyaXB0IGFzIGJlZm9yZVxyXG4gICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YCk7XHJcbn0pO1xyXG4iXX0=
