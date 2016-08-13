# React on screen

Provide a component to wrap your react component and check if there are visible on the screen.
You can use this component to trigger an entrance animation for instance !

## How it works ?

The component simply passes a ```isVisible``` props to your component.
 
## Features
 
- Don't rely on [findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode). So it can be used with a stateless component.
- Transfer all the props to the wrapped component
- Visibility can be tracked only once
- Event listeners are implemented with throttle to avoid  memory leaks or performance issues

## Installation

Using [npm](https://www.npmjs.com/) :

```
$ npm install --save react-on-screen
```

A UMD build is also available :

```
<script src="./dist/ReactOnScreen.min.js"></script>
```

## What's it looks like?

```
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
|-----------------------------------------------------
|once            |bool            |false|If set to true the visibility will be checked only once and the event listeners will be removed| 
|throttleInterval|int             |150  |Tweak the event listeners. See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)|
|children        |React Components|  -  |Can be on or many react components|
|style           |object          |  -  |Style attributes|
|className       |string          |  -  |Css classes|

## TODO

- [ ] Check for partial visibility

## Contributions 

Any contributions is welcome !

- Lint : ``` $ npm run lint ```
- Test : ``` $ npm run test ```
- Build : ``` $ npm run build // will lint and run test before ```

## License

Licensed under MIT