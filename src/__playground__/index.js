import React from 'react';
import { render } from 'react-dom';

import TrackVisibility from '../index';
import './index.css';


const Settings = ({ once, partialVisibility, offset, throttleInterval, handleCheckbox, handleInput }) => (
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
    partialVisibility: false
  };

  handleCheckbox = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  };

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
        />
        <div>{list}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
