"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _index = _interopRequireDefault(require("../index"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Settings = function Settings(_ref) {
  var once = _ref.once,
      partialVisibility = _ref.partialVisibility,
      offset = _ref.offset,
      throttleInterval = _ref.throttleInterval,
      handleCheckbox = _ref.handleCheckbox,
      handleInput = _ref.handleInput;
  return _react["default"].createElement("ul", {
    className: "settings"
  }, _react["default"].createElement("li", null, _react["default"].createElement("label", {
    htmlFor: "once"
  }, "Once"), _react["default"].createElement("input", {
    id: "once",
    name: "once",
    type: "checkbox",
    onChange: handleCheckbox,
    value: once
  })), _react["default"].createElement("li", null, _react["default"].createElement("label", {
    htmlFor: "partialVisibility"
  }, "Partial Visibility"), _react["default"].createElement("input", {
    id: "partialVisibility",
    name: "partialVisibility",
    type: "checkbox",
    onChange: handleCheckbox,
    value: partialVisibility
  })), _react["default"].createElement("li", null, _react["default"].createElement("label", {
    htmlFor: "offset"
  }, "Offset"), _react["default"].createElement("input", {
    id: "offset",
    name: "offset",
    type: "number",
    onChange: handleInput,
    value: offset
  })), _react["default"].createElement("li", null, _react["default"].createElement("label", {
    htmlFor: "throttleInterval"
  }, "Throttle Interval"), _react["default"].createElement("input", {
    id: "throttleInterval",
    name: "throttleInterval",
    type: "number",
    onChange: handleInput,
    value: throttleInterval
  })));
};

var Square = function Square(_ref2) {
  var isVisible = _ref2.isVisible;
  return _react["default"].createElement("div", {
    className: "square " + (isVisible ? 'is-visible' : '')
  });
};

var App =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(App, _React$Component);

  function App() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      once: false,
      throttleInterval: 150,
      offset: 0,
      partialVisibility: false
    };

    _this.handleCheckbox = function (e) {
      var _this$setState;

      _this.setState((_this$setState = {}, _this$setState[e.target.name] = !_this.state[e.target.name], _this$setState));
    };

    _this.handleInput = function (e) {
      var _this$setState2;

      _this.setState((_this$setState2 = {}, _this$setState2[e.target.name] = Number(e.target.value), _this$setState2));
    };

    return _this;
  }

  var _proto = App.prototype;

  _proto.render = function render() {
    var list = [];

    for (var i = 0; i < 5; i++) {
      list.push(_react["default"].createElement(_react["default"].Fragment, {
        key: i
      }, _react["default"].createElement(_index["default"], this.state, _react["default"].createElement(Square, null)), _react["default"].createElement("hr", null)));
    }

    return _react["default"].createElement("div", null, _react["default"].createElement(Settings, _extends({}, this.state, {
      handleCheckbox: this.handleCheckbox,
      handleInput: this.handleInput
    })), _react["default"].createElement("div", null, list));
  };

  return App;
}(_react["default"].Component);

(0, _reactDom.render)(_react["default"].createElement(App, null), document.getElementById('root'));