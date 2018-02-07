import * as React from "react";

interface TrackVisibilityProps {
  /**
  * Define if the visibility need to be tracked once
  */
  once?: boolean;

  /**
  * Tweak the throttle interval
  * Check https://css-tricks.com/debouncing-throttling-explained-examples/ for more details
  */
  throttleInterval?: number;

  /**
  * Additional style to apply
  */
  style?: object;

  /**
  * Additional className to apply
  */
  className?: string;

  /**
  * Define an offset. Can be useful for lazy loading
  */
  offset?: number;

  /**
  * Update the visibility state as soon as a part of the tracked component is visible
  */
  partialVisibility?: boolean;
}

export default class TrackVisibility extends React.Component<TrackVisibilityProps> {}
