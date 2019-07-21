!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("prop-types"),require("react"),require("lodash.throttle"),require("shallowequal")):"function"==typeof define&&define.amd?define(["prop-types","react","lodash.throttle","shallowequal"],t):"object"==typeof exports?exports.ReactOnScreen=t(require("prop-types"),require("react"),require("lodash.throttle"),require("shallowequal")):e.ReactOnScreen=t(e["prop-types"],e.react,e["lodash.throttle"],e.shallowequal)}(window,function(e,t,o,r){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=4)}([function(t,o){t.exports=e},function(e,o){e.exports=t},function(e,t){e.exports=o},function(e,t){e.exports=r},function(e,t,o){"use strict";o.r(t);var r=o(1),n=o.n(r),i=o(0),s=o.n(i),l=o(2),p=o.n(l),a=o(3),u=o.n(a);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e}).apply(this,arguments)}var d=function(e){var t,o;function r(t){var o;return(o=e.call(this,t)||this).isVisible=function(e,t,r){var n=e.top,i=e.left,s=e.bottom,l=e.right,p=e.width,a=e.height,u=o.props,c=u.offset,d=u.partialVisibility;if(n+l+s+i===0)return!1;var f=0-c,h=0-c,b=t+c,y=r+c;return d?n+a>=f&&i+p>=h&&s-a<=y&&l-p<=b:n>=f&&i>=h&&s<=y&&l<=b},o.isComponentVisible=function(){setTimeout(function(){if(console.log("IS COMPONENT VISIBLE!?"),o.nodeRef&&o.nodeRef.getBoundingClientRect){var e=document.documentElement,t=o.props.once,r=o.nodeRef.getBoundingClientRect(),n=o.props.body?document.getElementById(o.props.body).innerWidth:window.innerWidth||e.clientWidth,i=o.props.body?document.getElementById(o.props.body).innerHeight:window.innerHeight||e.clientHeight,s=o.isVisible(r,n,i);s&&t&&o.removeListener(),o.setState({isVisible:s})}},0)},o.setNodeRef=function(e){return o.nodeRef=e},o.ownProps=Object.keys(r.propTypes),o.state={isVisible:!1},o.throttleCb=p()(o.isComponentVisible,o.props.throttleInterval),t.nodeRef&&o.setNodeRef(t.nodeRef),o}o=e,(t=r).prototype=Object.create(o.prototype),t.prototype.constructor=t,t.__proto__=o;var i=r.prototype;return i.componentDidMount=function(){this.attachListener(),this.isComponentVisible()},i.componentDidUpdate=function(e){u()(this.getChildProps(this.props),this.getChildProps(e))||this.isComponentVisible()},i.componentWillUnmount=function(){this.removeListener()},i.attachListener=function(){this.props.body?document.getElementById(this.props.body).addEventListener("scroll",this.throttleCb):window.addEventListener("scroll",this.throttleCb),this.props.body?document.getElementById(this.props.body).addEventListener("resize",this.throttleCb):window.addEventListener("resize",this.throttleCb)},i.removeListener=function(){this.props.body?document.getElementById(this.props.body).removeEventListener("scroll",this.throttleCb):window.removeEventListener("scroll",this.throttleCb),this.props.body?document.getElementById(this.props.body).removeEventListener("resize",this.throttleCb):window.removeEventListener("resize",this.throttleCb)},i.getChildProps=function(e){var t=this;void 0===e&&(e=this.props);var o={};return Object.keys(e).forEach(function(r){-1===t.ownProps.indexOf(r)&&(o[r]=e[r])}),o},i.getChildren=function(){var e=this;return"function"==typeof this.props.children?this.props.children(c({},this.getChildProps(),{isVisible:this.state.isVisible})):n.a.Children.map(this.props.children,function(t){return n.a.cloneElement(t,c({},e.getChildProps(),{isVisible:e.state.isVisible}))})},i.render=function(){var e=this.props,t=e.className,o=e.style,r=e.nodeRef,i=e.tag,s=c({},t&&{className:t},{},o&&{style:o});return n.a.createElement(i,c({ref:!r&&this.setNodeRef},s),this.getChildren())},r}(r.PureComponent);d.propTypes={once:s.a.bool,throttleInterval:function(e,t,o){var r=e[t];return!Number.isInteger(r)||r<0?new Error("The "+t+" prop you provided to "+o+" is not a valid integer >= 0."):null},children:s.a.oneOfType([s.a.func,s.a.element,s.a.arrayOf(s.a.element)]),style:s.a.object,className:s.a.string,offset:s.a.number,partialVisibility:s.a.bool,nodeRef:s.a.object,tag:s.a.string,body:s.a.string},d.defaultProps={once:!1,throttleInterval:150,offset:0,partialVisibility:!1,tag:"div"};t.default=d}])});
//# sourceMappingURL=ReactOnScreen.js.map