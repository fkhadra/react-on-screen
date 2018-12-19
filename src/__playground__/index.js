import React from 'react';
import { render } from 'react-dom';

import TrackVisibility from '../index';
import './index.css';

const Settings = ({
  once,
  partialVisibility,
  offset,
  throttleInterval,
  handleCheckbox,
  handleInput,
  handleCallbackChange,
  callbackEnabled
}) => (
  <ul className="settings">
    <li>
      <label htmlFor="once">Once</label>
      <input
        id="once"
        name="once"
        type="checkbox"
        onChange={handleCheckbox}
        value={once}
      />
    </li>
    <li>
      <label htmlFor="partialVisibility">Partial Visibility</label>
      <input
        id="partialVisibility"
        name="partialVisibility"
        type="checkbox"
        onChange={handleCheckbox}
        value={partialVisibility}
      />
    </li>
    <li>
      <label htmlFor="offset">Offset</label>
      <input
        id="offset"
        name="offset"
        type="number"
        onChange={handleInput}
        value={offset}
      />
    </li>
    <li>
      <label htmlFor="throttleInterval">Throttle Interval</label>
      <input
        id="throttleInterval"
        name="throttleInterval"
        type="number"
        onChange={handleInput}
        value={throttleInterval}
      />
    </li>
    <li>
      <label htmlFor="callbackEnabled">Callback Function</label>
      <input
        id="callbackEnabled"
        name="callbackEnabled"
        type="checkbox"
        onChange={handleCallbackChange}
        value={callbackEnabled}
      />
    </li>    
  </ul>
);

const Square = ({ isVisible }) => (
  <div className={`square ${isVisible ? 'is-visible' : ''}`} />
);

class App extends React.Component {
  state = {
    once: false,
    throttleInterval: 150,
    offset: 0,
    partialVisibility: false,
    callbackEnabled: false,
    callback: undefined
  };

  handleCheckbox = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  handleCallbackChange = e => {
    this.setState({
      callbackEnabled: !this.state[e.target.name],
      callback: !this.state[e.target.name] ? this.callbackFunction : undefined
    })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  };

  callbackFunction = isVisible => {
    console.log(`is visible ${isVisible}`)
  }

  render() {
    const list = [];
    for (let i = 0; i < 5; i++) {
      list.push(
        <React.Fragment key={i}>
          <TrackVisibility {...this.state}>
            <Square />
          </TrackVisibility>
          <hr />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Settings
          {...this.state}
          handleCheckbox={this.handleCheckbox}
          handleInput={this.handleInput}
          handleCallbackChange={this.handleCallbackChange}
        />
        <div>{list}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
