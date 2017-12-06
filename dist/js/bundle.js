(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Exemple component
 */
var Exemple = exports.Exemple = function Exemple($dom) {
	_classCallCheck(this, Exemple);

	console.log('Exemple.constructor()');
	this.$dom = $dom;
	if (this.$dom != null) {
		//console.log(this.$dom);
	}
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exempleCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMReadyObject2 = require("../../utils/DOMReadyObject.js");

var _Exemple = require("./Exemple.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Exemple collections
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ExempleCollection = function (_DOMReadyObject) {
    _inherits(ExempleCollection, _DOMReadyObject);

    function ExempleCollection() {
        _classCallCheck(this, ExempleCollection);

        console.log('ExempleCollection.constructor()');

        var _this = _possibleConstructorReturn(this, (ExempleCollection.__proto__ || Object.getPrototypeOf(ExempleCollection)).call(this));

        _this.class = '.exemple';
        _this.exemples = new Set();
        return _this;
    }

    _createClass(ExempleCollection, [{
        key: "isDOMReady",
        value: function isDOMReady() {
            console.log('ExempleCollection.isDOMReady()');
            _get(ExempleCollection.prototype.__proto__ || Object.getPrototypeOf(ExempleCollection.prototype), "isDOMReady", this).call(this);
            this.$exemples = document.querySelectorAll(this.class);
            if (this.$exemples.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.$exemples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var $exemple = _step.value;
                        ;
                        this.exemples.add(new _Exemple.Exemple($exemple));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                console.log('ExempleCollection exemples', this.exemples);
            }
        }
    }]);

    return ExempleCollection;
}(_DOMReadyObject2.DOMReadyObject);

var exempleCollection = exports.exempleCollection = new ExempleCollection();

},{"../../utils/DOMReadyObject.js":5,"./Exemple.js":1}],3:[function(require,module,exports){
"use strict";

var _General = require("../layout/General.js");

var _General2 = _interopRequireDefault(_General);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../layout/General.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generalLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMReadyObject2 = require("../utils/DOMReadyObject.js");

var _ExempleCollection = require("../components/exemple/ExempleCollection.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Layout general
 */
var General = function (_DOMReadyObject) {
    _inherits(General, _DOMReadyObject);

    function General() {
        _classCallCheck(this, General);

        console.log('General.constructor()');

        var _this = _possibleConstructorReturn(this, (General.__proto__ || Object.getPrototypeOf(General)).call(this));

        svg4everybody();
        console.log('exempleCollection : ', _ExempleCollection.exempleCollection);
        return _this;
    }

    _createClass(General, [{
        key: "isDOMReady",
        value: function isDOMReady() {
            console.log('General.isDOMReady()');
            _get(General.prototype.__proto__ || Object.getPrototypeOf(General.prototype), "isDOMReady", this).call(this);
        }
    }]);

    return General;
}(_DOMReadyObject2.DOMReadyObject);

var generalLayout = exports.generalLayout = new General();

},{"../components/exemple/ExempleCollection.js":2,"../utils/DOMReadyObject.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * DOMReadyObject
 * abstract class
 */
var DOMReadyObject = exports.DOMReadyObject = function () {
    function DOMReadyObject() {
        var _this = this;

        _classCallCheck(this, DOMReadyObject);

        //On ne peut pas instancier la class directement
        if (this.constructor === DOMReadyObject) {
            throw new Error("Cannot construct DOMReadyObject instances directly");
        }

        //Dom ready
        if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
            this.isDOMReady();
        } else {
            document.addEventListener("DOMContentLoaded", function () {
                _this.isDOMReady();
            });
        }
    }

    _createClass(DOMReadyObject, [{
        key: "isDOMReady",
        value: function isDOMReady() {}
    }]);

    return DOMReadyObject;
}();

},{}]},{},[3])

//# sourceMappingURL=bundle.js.map
