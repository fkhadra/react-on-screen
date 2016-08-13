/* global window, document */
import React, { Component, PropTypes } from 'react';
import throttle from 'lodash.throttle';

const propTypes = {
  once: PropTypes.bool,
  throttleInterval(props, propName, component) {
    const currentProp = props[propName];
    if (!Number.isInteger(currentProp) || currentProp < 0) {
      return new Error(`The ${propName} prop you provided to ${component} is not a valid integer >= 0.`);
    }
  },
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: PropTypes.object,
  className: PropTypes.string
};

const defaultProps = {
  once: false,
  throttleInterval: 150,
  style: null,
  className: null
};

export default class TrackVisibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.isComponentVisible = this.isComponentVisible.bind(this);
    /* Store reference to be able to remove the event listener */
    this.throttleCb = throttle(this.isComponentVisible, this.props.throttleInterval);
    this.setNodeRef = ref => { this.nodeRef = ref; };
  }

  componentDidMount() {
    this.attachListener();
    this.isComponentVisible();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getPropsToRender() {
    const props = {};

    this.props.className !== null && (props.className = this.props.className);
    this.props.style !== null && (props.style = this.props.style);

    return props;
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
    return React.Children.map(
      this.props.children,
      child => React.cloneElement(child, { ...this.getChildProps(), isVisible: this.state.isVisible })
    );
  }

  isComponentVisible() {
    const rect = this.nodeRef.getBoundingClientRect();
    const html = document.documentElement;

    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    ) {
      this.props.once && this.removeListener();
      !this.state.isVisible && this.setState({ isVisible: true });
    } else {
      this.state.isVisible && this.setState({ isVisible: false });
    }
  }

  attachListener() {
    window.addEventListener('scroll', this.throttleCb);
    window.addEventListener('resize', this.throttleCb);
  }

  removeListener() {
    window.removeEventListener('scroll', this.throttleCb);
    window.removeEventListener('resize', this.throttleCb);
  }

  render() {
    return (
      <div ref={this.setNodeRef} {...this.getPropsToRender()}>
        {this.getChildren()}
      </div>
    );
  }
}

TrackVisibility.propTypes = propTypes;
TrackVisibility.defaultProps = defaultProps;
