"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * DOMReadyObject
 * abstract class
 */
var DOMReadyObject = function () {
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
        return _this;
    }

    _createClass(General, [{
        key: 'isDOMReady',
        value: function isDOMReady() {
            console.log('General.isDOMReady()');
            _get(General.prototype.__proto__ || Object.getPrototypeOf(General.prototype), 'isDOMReady', this).call(this);
        }
    }]);

    return General;
}(DOMReadyObject);

var generalLayout = new General();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Exemple compoenent
 */
var Exemple = function Exemple($dom) {
	_classCallCheck(this, Exemple);

	console.log('Exemple.constructor()');
	this.$dom = $dom;
	if (this.$dom != null) {
		//console.log(this.$dom);
	}
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
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
        key: 'isDOMReady',
        value: function isDOMReady() {
            console.log('ExempleCollection.isDOMReady()');
            _get(ExempleCollection.prototype.__proto__ || Object.getPrototypeOf(ExempleCollection.prototype), 'isDOMReady', this).call(this);
            this.$exemples = document.querySelectorAll(this.class);
            if (this.$exemples.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.$exemples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var $exemple = _step.value;
                        ;
                        this.exemples.add(new Exemple($exemple));
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
}(DOMReadyObject);

var exempleCollection = new ExempleCollection();
//# sourceMappingURL=index.js.map
