import React from 'react';
import sinon from 'sinon';
import TrackVisibility from './../TrackVisibility';


const hasProp = (Component, prop) => {
 return {}.hasOwnProperty.call(Component, prop);
};

const Dumb = props => <div>Plop</div>;

const renderComponent = Comp => {
  // Fake timers used to skip through setTimeout in componentDidMount
  jest.useFakeTimers();
  const wrapper = mount(Comp);
  jest.runAllTimers();
  return wrapper;
}

describe('<TrackVisibility />', () => {

  describe("When mounting the component", () => {
    it("should call the child component with the visibility", () => {
      const renderProp = jest.fn();
      const wrapper = renderComponent(
        <TrackVisibility>
          {renderProp}
        </TrackVisibility>
      );
      // Called twice, on initial render then mounting which triggers setState
      expect(renderProp).toHaveBeenCalledTimes(2)
      // first call sets isVisible to false as this is the default state
      // Second render yields isVisible true as top, right, bottom, left are all 0
      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: true })
    });
  });

  describe('When rendering the component', ()=> {
    it('Can be rendered without children', () => {
      const wrapper = renderComponent(<TrackVisibility />);
      expect(wrapper).toMatchSnapshot();
    });

    it('Can check partial visibilty', () => {
      const wrapper = renderComponent(<TrackVisibility partialVisibility/>);
      expect(wrapper).toMatchSnapshot();
    });

    it("Should be able to use a render props", () => {
      const wrapper = renderComponent(
        <TrackVisibility>
          {({ isVisible }) => <Dumb />}
        </TrackVisibility>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('Should fallback clientHeight when window propeties are not defined', () => {
      const wrapper = renderComponent(<TrackVisibility />);
      window.innerHeight = null;
      window.innerWidth = null;
      expect(wrapper).toMatchSnapshot();
    });

    it('Should bind event to window on mount', () => {
      window.addEventListener = jest.fn();    
      renderComponent(<TrackVisibility />);
      expect(window.addEventListener).toHaveBeenCalled();
    });

    it('Should remove event from window on unmount', () => {
      window.removeEventListener = jest.fn();    
      const wrapper = renderComponent(<TrackVisibility />);
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalled();
    });

    it('Should remove event from window when visibility is tracked once', () => {
      window.removeEventListener = jest.fn();    
      const wrapper = renderComponent(<TrackVisibility once={true} />);
      
      expect(window.removeEventListener).toHaveBeenCalled();
    });

    it('Should merge className and style', () => {
      const wrapper = renderComponent(<TrackVisibility className="plop" style={{ background: 'red' }} />);
      
      expect(wrapper.props().hasOwnProperty("className")).toBe(true);
      expect(wrapper.props().hasOwnProperty("style")).toBe(true);
    });

    it('Should use', () => {
      const wrapper = renderComponent(<TrackVisibility className="plop" style={{ background: 'red' }} />);
      
      expect(wrapper.props().hasOwnProperty("className")).toBe(true);
      expect(wrapper.props().hasOwnProperty("style")).toBe(true);
    });

    it('Should merge any props passed down', () => {
      const wrapper = renderComponent(<TrackVisibility bar="baz" />);
      expect(wrapper.props().bar).toBe("baz");
      wrapper.setProps({ bar: "foo" });
      expect(wrapper.props().bar).toBe("foo");
    });

    it('Throws an error if throttleInterval is not a valid integer >= 0', () => {
      const stub = sinon.stub(console, 'error');
      [-1, 'dsqdqsqs', 1.10].forEach((v) => {
        renderComponent(<TrackVisibility throttleInterval={v}/>);
        expect(stub.calledOnce).toBe(true);
      });
      console.error.restore();
    });

    it('Should pass isVisible to children as prop', () => {
      const wrapper = renderComponent(
        <TrackVisibility>
          <Dumb />
        </TrackVisibility>
      );
      expect(hasProp(wrapper.find('Dumb').props(), 'isVisible')).toBe(true);
    });

    it('Should transfer all the props provided to children but omit own props [once, throttleInterval, className, style]', () => {
      const wrapper = renderComponent(
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
  });
});
