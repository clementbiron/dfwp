"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * DOMReadyObject
 * abstract class
 */
var DOMReadyFactory = function () {
    function DOMReadyFactory() {
        _classCallCheck(this, DOMReadyFactory);

        //On ne peut pas instancier la class directement
        if (this.constructor === DOMReadyFactory) {
            throw new TypeError("Cannot construct DOMReadyFactory instances directly");
        }

        //Dom ready
        if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
            this.isDOMReady();
        } else {
            document.addEventListener("DOMContentLoaded", this.isDOMReady.bind(this));
        }
    }

    _createClass(DOMReadyFactory, [{
        key: "isDOMReady",
        value: function isDOMReady() {}
    }]);

    return DOMReadyFactory;
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
var General = function (_DOMReadyFactory) {
    _inherits(General, _DOMReadyFactory);

    function General() {
        _classCallCheck(this, General);

        console.log('General.constructor()');
        return _possibleConstructorReturn(this, (General.__proto__ || Object.getPrototypeOf(General)).call(this));
    }

    _createClass(General, [{
        key: 'isDOMReady',
        value: function isDOMReady() {
            console.log('General.isDOMReady()');
            _get(General.prototype.__proto__ || Object.getPrototypeOf(General.prototype), 'isDOMReady', this).call(this);
        }
    }]);

    return General;
}(DOMReadyFactory);

var generalLayout = new General();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Exemple compoenent
 */
var Exemple = function (_DOMReadyFactory) {
	_inherits(Exemple, _DOMReadyFactory);

	function Exemple() {
		_classCallCheck(this, Exemple);

		console.log('Exemple.constructor()');

		var _this = _possibleConstructorReturn(this, (Exemple.__proto__ || Object.getPrototypeOf(Exemple)).call(this));

		_this.domTargetClass = '.exemple';
		return _this;
	}

	_createClass(Exemple, [{
		key: 'isDOMReady',
		value: function isDOMReady() {
			console.log('Exemple.isDOMReady()');
			_get(Exemple.prototype.__proto__ || Object.getPrototypeOf(Exemple.prototype), 'isDOMReady', this).call(this);
			this.$domTarget = document.querySelector(this.domTargetClass);
			if (this.$domTarget != null) {
				//console.log(this.$domTarget);
			}
		}
	}]);

	return Exemple;
}(DOMReadyFactory);

var exempleComponent = new Exemple();