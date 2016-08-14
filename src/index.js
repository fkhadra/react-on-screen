import React from 'react';
import ReactDOM from 'react-dom';
import TrackVisibility from 'react-on-screen';



const PlaceHolder = (props) => {
  const style = {
    background: 'blue',
    width: '300px',
    height: '300px'
  };
  return <div style={style}></div>
}


const App = () => {
  return (
    <div>
      <TrackVisibility style={{display: 'block'}}>
        <PlaceHolder />
      </TrackVisibility>
      <TrackVisibility>
        <PlaceHolder />
      </TrackVisibility>
      <TrackVisibility>
        <PlaceHolder />
      </TrackVisibility>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));