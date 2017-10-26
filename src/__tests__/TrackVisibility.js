import React from 'react';
import sinon from 'sinon';
import TrackVisibility from './../TrackVisibility';


const hasProp = (Component, prop) => {
 return {}.hasOwnProperty.call(Component, prop);
};

const Dumb = props => <div>Plop</div>;

describe('<TrackVisibility />', () => {

  describe('When rendering the component', ()=> {
    it('Can be rendered without children', () => {
      const wrapper = mount(<TrackVisibility />);
      expect(wrapper).toMatchSnapshot();
    });

    it('Should bind event to window on mount', () => {
      window.addEventListener = jest.fn();    
      mount(<TrackVisibility />);
      expect(window.addEventListener).toHaveBeenCalled();
    });

    it('Should remove event from window on unmount', () => {
      window.removeEventListener = jest.fn();    
      const wrapper = mount(<TrackVisibility />);
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalled();
    });

    it('Allows us to set props', () => {
      const wrapper = mount(<TrackVisibility bar="baz" />);
      expect(wrapper.props().bar).toBe("baz");
      wrapper.setProps({ bar: "foo" });
      expect(wrapper.props().bar).toBe("foo");
    });

    it('Throws an error if throttleInterval is not a valid integer >= 0', () => {
      const stub = sinon.stub(console, 'error');
      [-1, 'dsqdqsqs', 1.10].forEach((v) => {
        mount(<TrackVisibility throttleInterval={v}/>);
        expect(stub.calledOnce).toBe(true);
      });
      console.error.restore();
    });

    it('Should pass isVisible to children as prop', () => {
      const wrapper = mount(
        <TrackVisibility>
          <Dumb />
        </TrackVisibility>
      );
      expect(hasProp(wrapper.find('Dumb').props(), 'isVisible')).toBe(true);
    });

    it('Should transfer all the props provided to children but omit own props [once, throttleInterval, className, style]', () => {
      const wrapper = mount(
        <TrackVisibility foo="bar" baz="foobar">
          <Dumb />
        </TrackVisibility>
      );
      const props = wrapper.find('Dumb').props();
      
      expect(hasProp(props, 'foo')).toBe(true);
      expect(hasProp(props, 'baz')).toBe(true);
      expect(hasProp(props, 'isVisible')).toBe(true);

      expect(hasProp(props, 'className')).toBe(false);
      expect(hasProp(props, 'style')).toBe(false);
      expect(hasProp(props, 'once')).toBe(false);
      expect(hasProp(props, 'throttleInterval')).toBe(false);
    });

    it('Can update state', () => {
      const wrapper = mount(<TrackVisibility />);
      wrapper.setState({isVisible: true});
      expect(wrapper.state('isVisible')).toBe(true);
      wrapper.setState({isVisible: false});
      expect(wrapper.state('isVisible')).toBe(false);
    });

    // it('Should have offset prop if set', () => {
    //   const wrapper = shallow(<TrackVisibility offset={500} />);
    //   const props = wrapper.props();
    //   expect(hasProp(props, 'offset')).to.equal(true);
    //   expect(props.offset).to.equal(500);
    // });
  });
});
