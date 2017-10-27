/* global window, document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";

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
    partialVisibility: PropTypes.bool
  };

  static defaultProps = {
    once: false,
    throttleInterval: 150,
    style: null,
    className: null,
    offset: 0,
    children: null,
    partialVisibility: false
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
  }

  componentDidMount() {
    this.attachListener();
    this.isComponentVisible();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  attachListener() {
    window.addEventListener("scroll", this.throttleCb);
    window.addEventListener("resize", this.throttleCb);
  }

  removeListener() {
    window.removeEventListener("scroll", this.throttleCb);
    window.removeEventListener("resize", this.throttleCb);
  }

  getPropsToRender() {
    const { className, style, offset } = this.props;

    return {
      ...(className !== null && { className }),
      ...(style !== null && { style }),
      ...(offset !== 0 && { offset })
    };
  }

  getChildProps() {
    const props = {};
    Object.keys(this.props).forEach(key => {
      if (!{}.hasOwnProperty.call(TrackVisibility.defaultProps, key)) {
        props[key] = this.props[key];
      }
    });
    return props;
  }

  getChildren() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...this.getChildProps(),
        isVisible: this.state.isVisible
      })
    );
  }

  isComponentVisible = () => {
    const html = document.documentElement;
    const { offset, partialVisibility, once } = this.props;
    const { top, left, bottom, right, width, height } = this.nodeRef.getBoundingClientRect();
    const heightCheck = window.innerHeight + offset || html.clientHeight + offset;
    const widthCheck = window.innerWidth + offset || html.clientWidth + offset;

    const isVisible = partialVisibility
      ? top + height >= 0 && left + width >= 0 && right - width <= widthCheck
      : top >= 0 && left >= 0 && bottom <= heightCheck && right <= widthCheck;

    if (isVisible) {
      once && this.removeListener();
      !this.state.isVisible && this.setState({ isVisible });
    } else {
      this.state.isVisible && this.setState({ isVisible });
    }
  }

  setNodeRef = ref => this.nodeRef = ref;

  render() {
    return (
      <div ref={this.setNodeRef} {...this.getPropsToRender()}>
        {this.getChildren()}
      </div>
    );
  }
}
