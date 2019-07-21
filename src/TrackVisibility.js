/* global window, document */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import shallowequal from 'shallowequal';

export default class TrackVisibility extends PureComponent {
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
    nodeRef: PropTypes.object,

    /**
     * Define a custom tag
     */
    tag: PropTypes.string,

    /**
     * what to attach scroll listeners to
     */
    body: PropTypes.string
  };

  static defaultProps = {
    once: false,
    throttleInterval: 150,
    offset: 0,
    partialVisibility: false,
    tag: 'div'
  };

  constructor(props) {
    super(props);
    this.ownProps = Object.keys(TrackVisibility.propTypes);
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
    this.isComponentVisible();
  }

  componentDidUpdate(prevProps) {
    if (
      !shallowequal(
        this.getChildProps(this.props),
        this.getChildProps(prevProps)
      )
    ) {
      this.isComponentVisible();
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  attachListener() {
    this.props.body ? document.getElementById(this.props.body).addEventListener('scroll', this.throttleCb) : window.addEventListener('scroll', this.throttleCb);
    this.props.body ? document.getElementById(this.props.body).addEventListener('resize', this.throttleCb) : window.addEventListener('resize', this.throttleCb)
  }

  removeListener() {
    this.props.body ? document.getElementById(this.props.body).removeEventListener('scroll', this.throttleCb) : window.removeEventListener('scroll', this.throttleCb);
    this.props.body ? document.getElementById(this.props.body).removeEventListener('resize', this.throttleCb) : window.removeEventListener('resize', this.throttleCb);
  }

  getChildProps(props = this.props) {
    const childProps = {};
    Object.keys(props).forEach(key => {
      if (this.ownProps.indexOf(key) === -1) {
        childProps[key] = props[key];
      }
    });
    return childProps;
  }

  isVisible = (
    { top, left, bottom, right, width, height },
    windowWidth,
    windowHeight
  ) => {
    const { offset, partialVisibility } = this.props;

    if (top + right + bottom + left === 0) {
      return false;
    }

    const topThreshold = 0 - offset;
    const leftThreshold = 0 - offset;
    const widthCheck = windowWidth + offset;
    const heightCheck = windowHeight + offset;

    return partialVisibility
      ? top + height >= topThreshold &&
          left + width >= leftThreshold &&
          bottom - height <= heightCheck &&
          right - width <= widthCheck
      : top >= topThreshold &&
          left >= leftThreshold &&
          bottom <= heightCheck &&
          right <= widthCheck;
  };

  isComponentVisible = () => {
    setTimeout(() => {
      console.log("IS COMPONENT VISIBLE!?")
      // isComponentVisible might be called from componentDidMount, before component ref is assigned
      if (!this.nodeRef || !this.nodeRef.getBoundingClientRect) return;

      const html = document.documentElement;
      const { once } = this.props;
      const boundingClientRect = this.nodeRef.getBoundingClientRect();
      const windowWidth = window.innerWidth || html.clientWidth;
      const windowHeight = window.innerHeight || html.clientHeight;

      const isVisible = this.isVisible(
        boundingClientRect,
        windowWidth,
        windowHeight
      );

      if (isVisible && once) {
        this.removeListener();
      }

      this.setState({ isVisible });
    }, 0);
  };

  setNodeRef = ref => (this.nodeRef = ref);

  getChildren() {
    if (typeof this.props.children === 'function') {
      return this.props.children({
        ...this.getChildProps(),
        isVisible: this.state.isVisible
      });
    }

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...this.getChildProps(),
        isVisible: this.state.isVisible
      })
    );
  }

  render() {
    const { className, style, nodeRef, tag: Tag } = this.props;
    const props = {
      ...(className && { className }),
      ...(style && { style })
    };

    return (
      <Tag ref={!nodeRef && this.setNodeRef} {...props}>
        {this.getChildren()}
      </Tag>
    );
  }
}
