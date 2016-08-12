import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import TrackVisibility from './../src/TrackVisibility';

describe('<TrackVisibility />', () => {

  describe('When rendering the component', ()=> {
    it('Can be rendered without children', () => {
      const wrapper = shallow(<TrackVisibility />);
      expect(wrapper.equals(<div></div>)).to.equal(true);
    });

    it('Calls componentDidMount', () => {
      sinon.spy(TrackVisibility.prototype, 'componentDidMount');
      mount(<TrackVisibility />);
      expect(TrackVisibility.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    it('Allows us to set props', () => {
      const wrapper = mount(<TrackVisibility bar="baz" />);
      expect(wrapper.props().bar).to.equal("baz");
      wrapper.setProps({ bar: "foo" });
      expect(wrapper.props().bar).to.equal("foo");
    });

    it('Throws an error if throttleInterval is not a valid integer >= 0', () => {
      const stub = sinon.stub(console, 'error');
      [-1, 'dsqdqsqs', 1.10].forEach((v) => {
        shallow(<TrackVisibility throttleInterval={v}/>);
        expect(stub.calledOnce).to.equal(true);
        expect(stub
          .firstCall
          .args
          .includes('Warning: Failed prop type: The throttleInterval prop you provided to TrackVisibility is not a valid integer >= 0.\n    in TrackVisibility'))
          .to
          .equal(true);
      });
      console.error.restore();
    });

    it('Should have isVisible state set to false', () => {
      const wrapper = shallow(<TrackVisibility />);
      expect(wrapper.state('isVisible')).to.equal(false);
    });

    it('Should pass isVisible state to children as prop', () => {
      const wrapper = shallow(
        <TrackVisibility>
          <div />
        </TrackVisibility>
      );
      expect(wrapper.contains(<div isVisible={false}/>)).to.equal(true);
    });

    it('Should transfer all the props provided to children but omit own props [once, throttleInterval]', () => {
      const wrapper = shallow(
        <TrackVisibility foo="bar" baz="foobar">
          <div />
        </TrackVisibility>
      );
      expect(wrapper.contains(<div isVisible={false} foo="bar" baz="foobar"/>)).to.equal(true);
    });

    it('Store the result of the ref callback into this.nodeRef', () => {
      const wrapper = mount(<TrackVisibility />);
      expect(wrapper.instance().nodeRef).to.be.object;
    });

    it('Can update state', () => {
      const wrapper = mount(<TrackVisibility />);
      wrapper.setState({isVisible: true});
      expect(wrapper.state('isVisible')).to.equal(true);
      wrapper.setState({isVisible: false});
      expect(wrapper.state('isVisible')).to.equal(false);

    })

  });

});
