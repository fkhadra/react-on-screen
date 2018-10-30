# React on screen [![npm](https://img.shields.io/npm/dt/react-on-screen.svg)]() [![npm](https://img.shields.io/npm/v/react-on-screen.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-on-screen.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/github/fkhadra/react-on-screen/badge.svg?branch=master)](https://coveralls.io/github/fkhadra/react-on-screen?branch=master)

😎 Check if your react component are visible on the screen without pain and with performance in mind 😎!

![react-on-screen-demo](https://user-images.githubusercontent.com/5574267/32147681-74918d80-bceb-11e7-98d4-1cbc04b29eb4.gif)

- [React on screen ![npm]() ![npm]() ![license]() ![Coverage Status](https://coveralls.io/github/fkhadra/react-on-screen?branch=master)](#react-on-screen-npm-npm-license-coverage-statushttpscoverallsiogithubfkhadrareact-on-screenbranchmaster)
    - [Demo](#demo)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Simple](#simple)
        - [Using a render props](#using-a-render-props)
        - [Track the visibility only once](#track-the-visibility-only-once)
        - [Defining offset](#defining-offset)
        - [Partial visibility](#partial-visibility)
        - [Use the html tag of your choice](#use-the-html-tag-of-your-choice)
    - [Api](#api)
    - [Contributions](#contributions)
    - [License](#license)

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

## Usage

### Simple

```javascript
import React from 'react';
import TrackVisibility from 'react-on-screen';

const ComponentToTrack = ({ isVisible }) => {
    const style = {
        background: isVisible ? 'red' : 'blue'
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

### Using a render props

You can use a render props is you want to !

```js
const YourApp = () => {
    return (
        <TrackVisibility>
            {({ isVisible }) => isVisible && <ComponentToTrack />}
        </TrackVisibility>
    );
}
```

### Track the visibility only once

For many cases you may want to track the visibility only once. This can be done simply as follow :

```js
const YourApp = () => {
    return (
        <TrackVisibility once>
            <ComponentToTrack />
        </TrackVisibility>
    );
}
```

### Defining offset

Using `offset` props can be usefull if you want to lazy load an image for instance.

```js
const YourApp = () => {
    return (
        <TrackVisibility offset={1000}>
            {({ isVisible }) => isVisible ? <ComponentToTrack /> : <Loading />}
        </TrackVisibility>
    );
}
```

### Partial visibility

You may want to consider that a component is visible as soon as a part of the component is visible on screen. You can use the `partialVisibility` props for that.

```js
const YourApp = () => {
    return (
        <TrackVisibility partialVisibility>
            {({ isVisible }) => <ComponentToTrack />}
        </TrackVisibility>
    );
}
```

### Use the html tag of your choice

```js
const YourApp = () => {
    return (
        <TrackVisibility partialVisibility tag="h1">
            {({ isVisible }) => <ComponentToTrack />}
        </TrackVisibility>
    );
}
```

## Api

|props           |type            |default|description|
|----------------|----------------|-------|-----------|
|once            |bool            |false|If set to true track the visibility only once and remove the event listeners|
|throttleInterval|int             |150|Tweak the event listeners. See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)|
|children        |React Components|  -  |Can be one or many react components|
|style           |object          |  -  |Style attributes|
|className       |string          |  -  |Css classes|
|offset          |number          |  0  |Allows you to specify how far left or above of the viewport you want to set isVisible to `true`|
|partialVisibility|bool           |false|Set isVisible to true on element as soon as any part is in the viewport|
|tag             |string|div  |Allows specifying html tag of your choice|

## Contributions

Any contributions is welcome !

- Develop: ``` $ yarn start ```
- Lint : ``` $ yarn lint ```
- Test : ``` $ yarn test ```
- Build : ``` $ yarn build // will lint and run test before ```

## License

Licensed under MIT
