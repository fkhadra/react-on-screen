/* global window, document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import shallowequal from "shallowequal";

export default class TrackVisibility extends Component {
  static propTypes = {
    /**
     * Define if the visibility need to be tracked once
     */
    once: PropTypes.bool,

    /**
     * Tweak the throttle interval
     * Check https://css-tricks.com/debouncing-throttling-explained-examples/ for more details
     */
    throttleInterval(props, propName, component) {
      const currentProp = props[propName];
      if (!Number.isInteger(currentProp) || currentProp < 0) {
        return new Error(
          `The ${propName} prop you provided to ${component} is not a valid integer >= 0.`
        );
      }
      return null;
    },
    /**
     * Pass one or more children to track
     */
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    /**
     * Additional style to apply
     */
    style: PropTypes.object,

    /**
     * Additional className to apply
     */
    className: PropTypes.string,

    /**
     * Define an offset. Can be useful for lazy loading
     */
    offset: PropTypes.number,

    /**
     * Update the visibility state as soon as a part of the tracked component is visible
     */
    partialVisibility: PropTypes.bool,

    /**
     * Exposed for testing but allows node other than internal wrapping <div /> to be tracked
     * for visibility
     */
    nodeRef: PropTypes.object
  };

  static defaultProps = {
    once: false,
    throttleInterval: 150,
    children: null,
    style: null,
    className: null,
    offset: 0,
    partialVisibility: false,
    nodeRef: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false
    };
    this.throttleCb = throttle(
      this.isComponentVisible,
      this.props.throttleInterval
    );

    props.nodeRef && this.setNodeRef(props.nodeRef);
  }

  componentDidMount() {
    this.attachListener();
    setTimeout(this.isComponentVisible, 0);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  /**
   * Only update (call render) if the state has changed or one of the components configured props
   * (something in defaultProps) has been changed. This allows recalculation of visibility on prop
   * change (using componentWillReceiveProps) without vDOM diff'ing by React.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowequal(this.state, nextState)
      || !shallowequal(this.getOwnProps(this.props), this.getOwnProps(nextProps));
  }
  
  /**
   * Trigger visibility calculation only when non-own props change
   */
  componentWillReceiveProps(nextProps) {
    if (!shallowequal(this.getChildProps(this.props), this.getChildProps(nextProps))) {
      setTimeout(this.isComponentVisible, 0)
    }
  }

  attachListener() {
    window.addEventListener("scroll", this.throttleCb);
    window.addEventListener("resize", this.throttleCb);
  }

  removeListener() {
    window.removeEventListener("scroll", this.throttleCb);
    window.removeEventListener("resize", this.throttleCb);
  }

  getOwnProps(props = this.props) {
    const ownProps = {};
    Object.keys(TrackVisibility.defaultProps).forEach(key => {
      ownProps[key] = props[key];
    });
    return ownProps;
  }

  getChildProps(props = this.props) {
    const childProps = {};
    Object.keys(props).forEach(key => {
      if (!{}.hasOwnProperty.call(TrackVisibility.defaultProps, key)) {
        childProps[key] = props[key];
      }
    });
    return childProps;
  }

  isVisible = ({ top, left, bottom, right, width, height }, windowWidth, windowHeight) => {
    const { offset, partialVisibility } = this.props;

    if (top + right + bottom + left === 0) {
      return false;
    }

    const topThreshold = 0 - offset;
    const leftThreshold = 0 - offset;
    const widthCheck = windowWidth + offset;
    const heightCheck = windowHeight + offset;

    return partialVisibility
      ? top + height >= topThreshold
        && left + width >= leftThreshold
        && bottom - height <= heightCheck
        && right - width <= widthCheck
      : top >= topThreshold
        && left >= leftThreshold
        && bottom <= heightCheck
        && right <= widthCheck;
  }
  
  isComponentVisible = () => {
    const html = document.documentElement;
    const { once } = this.props;
    const boundingClientRect = this.nodeRef.getBoundingClientRect();
    const windowWidth = window.innerWidth || html.clientWidth;
    const windowHeight = window.innerHeight || html.clientHeight;
    
    const isVisible = this.isVisible(boundingClientRect, windowWidth, windowHeight);
    
    if (isVisible && once) {
      this.removeListener();
    }
    
    this.setState({ isVisible });
  }
  
  setNodeRef = ref => this.nodeRef = ref;
  
  getChildren() {
    if(typeof this.props.children === "function") {
      return this.props.children({
        ...this.getChildProps(),
        isVisible: this.state.isVisible
      })
    }

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...this.getChildProps(),
        isVisible: this.state.isVisible
      })
    );
  }

  render() {
    const { className, style, nodeRef } = this.props;
    const props = {
      ...(className !== null && { className }),
      ...(style !== null && { style }),
    };

    return (
      <div ref={!nodeRef && this.setNodeRef} {...props}>
        {this.getChildren()}
      </div>
    );
  }
}
