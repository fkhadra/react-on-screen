# React on screen [![npm](https://img.shields.io/npm/dt/react-on-screen.svg)]() [![npm](https://img.shields.io/npm/v/react-on-screen.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-on-screen.svg?maxAge=2592000)]()

😎 Check if your react component are visible on the screen without pain and with performance in mind 😎!

## Demo

View the [demo](https://fkhadra.github.io/react-on-screen/demo-react-on-screen.html).

## Installation

```
$ npm install --save react-on-screen
$ yarn add react-on-screen
```

A UMD build is also available :

```html
<script src="./dist/ReactOnScreen.min.js"></script>
```

## What's it looks like?

```javascript
import React from 'react';
import TrackVisibility from 'react-on-screen'; // CommonJs : require('react-on-screen').default


const ComponentToTrack = (props) => {
    const style = {
        background: props.isVisible ? 'red' : 'blue'
    };

    return <div style={style}>Hello</div>;
}

const YourApp = () => {
    return (
       {/* Some Stuff */}
        <TrackVisibility>
            <ComponentToTrack />
        </TrackVisibility>
       {/* Some Stuff */}
    );
}

```

## Api

|props           |type            |default|description|
|----------------|----------------|-------|-----------|
|once            |bool            |false|If set to true track the visibility only once and remove the event listeners|
|throttleInterval|int             |150|Tweak the event listeners. See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)|
|children        |React Components|  -  |Can be on or many react components|
|style           |object          |  -  |Style attributes|
|className       |string          |  -  |Css classes|
|offset          |number          |  0  |Allows you to specify how far left or above of the viewport you want to set isVisible to `true`|
|partialVisibility|bool           |false|Set isVisible to true on element as soon as any part is in the viewport|

## Contributions

Any contributions is welcome !

- Lint : ``` $ npm run lint ```
- Test : ``` $ npm run test ```
- Build : ``` $ npm run build // will lint and run test before ```

## Release Notes

## v2.0.0

- Added support for partial visibility
- Internal rewrite
- CI intregration
- Better Test suite

### v1.1.4

- React and react-dom are now peer dependencies

### v1.1.1

- switched to webpack2
- Upgraded to stand alone prop-types


## License

Licensed under MIT
