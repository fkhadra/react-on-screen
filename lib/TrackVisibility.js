"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TrackVisibility =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TrackVisibility, _PureComponent);

  function TrackVisibility(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _this.isVisible = function (_ref, windowWidth, windowHeight) {
      var top = _ref.top,
          left = _ref.left,
          bottom = _ref.bottom,
          right = _ref.right,
          width = _ref.width,
          height = _ref.height;
      var _this$props = _this.props,
          offset = _this$props.offset,
          partialVisibility = _this$props.partialVisibility;

      if (top + right + bottom + left === 0) {
        return false;
      }

      var topThreshold = 0 - offset;
      var leftThreshold = 0 - offset;
      var widthCheck = windowWidth + offset;
      var heightCheck = windowHeight + offset;
      return partialVisibility ? top + height >= topThreshold && left + width >= leftThreshold && bottom - height <= heightCheck && right - width <= widthCheck : top >= topThreshold && left >= leftThreshold && bottom <= heightCheck && right <= widthCheck;
    };

    _this.isComponentVisible = function () {
      setTimeout(function () {
        console.log("IS COMPONENT VISIBLE!?"); // isComponentVisible might be called from componentDidMount, before component ref is assigned

        if (!_this.nodeRef || !_this.nodeRef.getBoundingClientRect) return;
        var html = document.documentElement;
        var once = _this.props.once;

        var boundingClientRect = _this.nodeRef.getBoundingClientRect();

        var windowWidth = _this.props.body ? document.getElementById(_this.props.body).innerWidth : window.innerWidth || html.clientWidth;
        var windowHeight = _this.props.body ? document.getElementById(_this.props.body).innerHeight : window.innerHeight || html.clientHeight;

        var isVisible = _this.isVisible(boundingClientRect, windowWidth, windowHeight);

        if (isVisible && once) {
          _this.removeListener();
        }

        _this.setState({
          isVisible: isVisible
        });
      }, 0);
    };

    _this.setNodeRef = function (ref) {
      return _this.nodeRef = ref;
    };

    _this.ownProps = Object.keys(TrackVisibility.propTypes);
    _this.state = {
      isVisible: false
    };
    _this.throttleCb = (0, _lodash["default"])(_this.isComponentVisible, _this.props.throttleInterval);
    props.nodeRef && _this.setNodeRef(props.nodeRef);
    return _this;
  }

  var _proto = TrackVisibility.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.attachListener();
    this.isComponentVisible();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!(0, _shallowequal["default"])(this.getChildProps(this.props), this.getChildProps(prevProps))) {
      this.isComponentVisible();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeListener();
  };

  _proto.attachListener = function attachListener() {
    this.props.body ? document.getElementById(this.props.body).addEventListener('scroll', this.throttleCb) : window.addEventListener('scroll', this.throttleCb);
    this.props.body ? document.getElementById(this.props.body).addEventListener('resize', this.throttleCb) : window.addEventListener('resize', this.throttleCb);
  };

  _proto.removeListener = function removeListener() {
    this.props.body ? document.getElementById(this.props.body).removeEventListener('scroll', this.throttleCb) : window.removeEventListener('scroll', this.throttleCb);
    this.props.body ? document.getElementById(this.props.body).removeEventListener('resize', this.throttleCb) : window.removeEventListener('resize', this.throttleCb);
  };

  _proto.getChildProps = function getChildProps(props) {
    var _this2 = this;

    if (props === void 0) {
      props = this.props;
    }

    var childProps = {};
    Object.keys(props).forEach(function (key) {
      if (_this2.ownProps.indexOf(key) === -1) {
        childProps[key] = props[key];
      }
    });
    return childProps;
  };

  _proto.getChildren = function getChildren() {
    var _this3 = this;

    if (typeof this.props.children === 'function') {
      return this.props.children(_extends({}, this.getChildProps(), {
        isVisible: this.state.isVisible
      }));
    }

    return _react["default"].Children.map(this.props.children, function (child) {
      return _react["default"].cloneElement(child, _extends({}, _this3.getChildProps(), {
        isVisible: _this3.state.isVisible
      }));
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        style = _this$props2.style,
        nodeRef = _this$props2.nodeRef,
        Tag = _this$props2.tag;

    var props = _extends({}, className && {
      className: className
    }, {}, style && {
      style: style
    });

    return _react["default"].createElement(Tag, _extends({
      ref: !nodeRef && this.setNodeRef
    }, props), this.getChildren());
  };

  return TrackVisibility;
}(_react.PureComponent);

exports["default"] = TrackVisibility;
TrackVisibility.propTypes = {
  /**
   * Define if the visibility need to be tracked once
   */
  once: _propTypes["default"].bool,

  /**
   * Tweak the throttle interval
   * Check https://css-tricks.com/debouncing-throttling-explained-examples/ for more details
   */
  throttleInterval: function throttleInterval(props, propName, component) {
    var currentProp = props[propName];

    if (!Number.isInteger(currentProp) || currentProp < 0) {
      return new Error("The " + propName + " prop you provided to " + component + " is not a valid integer >= 0.");
    }

    return null;
  },

  /**
   * Pass one or more children to track
   */
  children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element, _propTypes["default"].arrayOf(_propTypes["default"].element)]),

  /**
   * Additional style to apply
   */
  style: _propTypes["default"].object,

  /**
   * Additional className to apply
   */
  className: _propTypes["default"].string,

  /**
   * Define an offset. Can be useful for lazy loading
   */
  offset: _propTypes["default"].number,

  /**
   * Update the visibility state as soon as a part of the tracked component is visible
   */
  partialVisibility: _propTypes["default"].bool,

  /**
   * Exposed for testing but allows node other than internal wrapping <div /> to be tracked
   * for visibility
   */
  nodeRef: _propTypes["default"].object,

  /**
   * Define a custom tag
   */
  tag: _propTypes["default"].string,

  /**
   * what to attach scroll listeners to
   */
  body: _propTypes["default"].string
};
TrackVisibility.defaultProps = {
  once: false,
  throttleInterval: 150,
  offset: 0,
  partialVisibility: false,
  tag: 'div'
};