(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
},{}],2:[function(require,module,exports){
var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";function t(t,e,n){return!(u(t,e,n)||_(t,e,n)||f(t,e,n)||h(t,e,n))}function e(t,e,n){var o=e._settings;!n&&r(t)||(C(o.callback_enter,t),R.indexOf(t.tagName)>-1&&(x(t,e),y(t,o.class_loading)),H(t,e),s(t),C(o.callback_set,t))}var n=function(){return{elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,callback_finish:null,to_webp:!1}},o=function(t,e){return t.getAttribute("data-"+e)},i=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},s=function(t){return i(t,"was-processed","true")},r=function(t){return"true"===o(t,"was-processed")},l=function(t){return t.filter(function(t){return!r(t)})},a=function(t,e){return t.filter(function(t){return t!==e})},c=function(t){return t.getBoundingClientRect().top+window.pageYOffset-t.ownerDocument.documentElement.clientTop},u=function(t,e,n){return(e===window?window.innerHeight+window.pageYOffset:c(e)+e.offsetHeight)<=c(t)-n},d=function(t){return t.getBoundingClientRect().left+window.pageXOffset-t.ownerDocument.documentElement.clientLeft},f=function(t,e,n){var o=window.innerWidth;return(e===window?o+window.pageXOffset:d(e)+o)<=d(t)-n},_=function(t,e,n){return(e===window?window.pageYOffset:c(e))>=c(t)+n+t.offsetHeight},h=function(t,e,n){return(e===window?window.pageXOffset:d(e))>=d(t)+n+t.offsetWidth},p=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)},g=function(t,e){return e?t.replace(/\.(jpe?g|png)/gi,".webp"):t},m="undefined"!=typeof window,w=m&&!("onscroll"in window)||/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),v=m&&"classList"in document.createElement("p"),b=m&&function(){var t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))&&0===t.toDataURL("image/webp").indexOf("data:image/webp")}(),y=function(t,e){v?t.classList.add(e):t.className+=(t.className?" ":"")+e},E=function(t,e){v?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},L=function(t,e,n,i){for(var s,r=0;s=t.children[r];r+=1)if("SOURCE"===s.tagName){var l=o(s,n);T(s,e,l,i)}},T=function(t,e,n,o){n&&t.setAttribute(e,g(n,o))},S=function(t,e){var n=b&&e.to_webp,i=o(t,e.data_src),s=o(t,e.data_bg);if(i){var r=g(i,n);t.style.backgroundImage='url("'+r+'")'}if(s){var l=g(s,n);t.style.backgroundImage=l}},O={IMG:function(t,e){var n=b&&e.to_webp,i=e.data_srcset,s=t.parentNode;s&&"PICTURE"===s.tagName&&L(s,"srcset",i,n);var r=o(t,e.data_sizes);T(t,"sizes",r);var l=o(t,i);T(t,"srcset",l,n);var a=o(t,e.data_src);T(t,"src",a,n)},IFRAME:function(t,e){var n=o(t,e.data_src);T(t,"src",n)},VIDEO:function(t,e){var n=e.data_src,i=o(t,n);L(t,"src",n),T(t,"src",i),t.load()}},H=function(t,e){var n=e._settings,o=t.tagName,i=O[o];if(i)return i(t,n),e._updateLoadingCount(1),void(e._elements=a(e._elements,t));S(t,n)},C=function(t,e){t&&t(e)},k=function(t,e,n){t.addEventListener(e,n)},z=function(t,e,n){t.removeEventListener(e,n)},N=function(t,e,n){k(t,"load",e),k(t,"loadeddata",e),k(t,"error",n)},A=function(t,e,n){z(t,"load",e),z(t,"loadeddata",e),z(t,"error",n)},I=function(t,e,n){var o=n._settings,i=e?o.class_loaded:o.class_error,s=e?o.callback_load:o.callback_error,r=t.target;E(r,o.class_loading),y(r,i),C(s,r),n._updateLoadingCount(-1)},x=function(t,e){var n=function n(i){I(i,!0,e),A(t,n,o)},o=function o(i){I(i,!1,e),A(t,n,o)};N(t,n,o)},R=["IMG","IFRAME","VIDEO"],D=function(t,e){for(;e.length;)t.splice(e.pop(),1)},F=function(t){this._settings=_extends({},n(),t),this._loadingCount=0,this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};return F.prototype={_loopThroughElements:function(e){var n=this._settings,o=this._elements,i=o?o.length:0,s=void 0,r=[],l=this._isFirstLoop;if(l&&(this._isFirstLoop=!1),0!==i){for(s=0;s<i;s++){var a=o[s];n.skip_invisible&&null===a.offsetParent||(e||t(a,n.container,n.threshold))&&(l&&y(a,n.class_initial),this.load(a),r.push(s))}D(o,r)}else this._stopScrollHandler()},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},_updateLoadingCount:function(t){this._loadingCount+=t,0===this._elements.length&&0===this._loadingCount&&C(this._settings.callback_finish)},handleScroll:function(){var t=this._settings.throttle;if(0!==t){var e=Date.now(),n=t-(e-this._previousLoopTime);n<=0||n>t?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=Date.now(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),n))}else this._loopThroughElements()},loadAll:function(){this._loopThroughElements(!0)},update:function(t){var e=this._settings,n=t||this._queryOriginNode.querySelectorAll(e.elements_selector);this._elements=l(Array.prototype.slice.call(n)),w?this.loadAll():(this._loopThroughElements(),this._startScrollHandler())},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},load:function(t,n){e(t,this,n)}},m&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)p(t,n);else p(t,e)}(F,window.lazyLoadOptions),F});


},{}],3:[function(require,module,exports){
"use strict";

var _General = _interopRequireDefault(require("../layout/General.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../layout/General.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalLayout = void 0;

var _svg4everybodyMin = _interopRequireDefault(require("../../build/node_modules/svg4everybody/dist/svg4everybody.min.js"));

var _lazyloadMin = _interopRequireDefault(require("../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js"));

var _DOMReadyObject2 = require("../utils/DOMReadyObject.js");

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
    _this = _possibleConstructorReturn(this, _getPrototypeOf(General).call(this)); //SVG for everybody

    _this.svg4everybody = new _svg4everybodyMin.default(); //Lazyload

    _this.lazyload = new _lazyloadMin.default({
      elements_selector: ".lazy"
    }); //DOM ready 

    Promise.all([document.ready()]).then(function () {});
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

},{"../../build/node_modules/svg4everybody/dist/svg4everybody.min.js":1,"../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js":2,"../utils/DOMReadyObject.js":5}],5:[function(require,module,exports){
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
    });
  }

  _createClass(DOMReadyObject, [{
    key: "isDOMReady",
    value: function isDOMReady() {}
  }]);

  return DOMReadyObject;
}();

exports.DOMReadyObject = DOMReadyObject;

},{}]},{},[3])

//# sourceMappingURL=bundle.js.map
