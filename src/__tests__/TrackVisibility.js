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
      // Second render yields isVisible false as top, right, bottom, left are all 0
      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false })
    });
  });

  describe("when partially visible", () => {
    beforeEach(() => {
      window.innerHeight = 768;
      window.innerWidth = 1024;
    });
    afterEach(() => {
      window.innerHeight = null;
      window.innerWidth = null;
    });

    it('Can check partial visibilty', () => {
      const wrapper = renderComponent(<TrackVisibility partialVisibility/>);
      expect(wrapper).toMatchSnapshot();
    });

    it("shouldn't render components off the top", () => {
      const renderProp = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: -2000, right: 100, bottom: -1900, left: 0, width: 100, height: 100
        })
      }
      const wrapper = renderComponent(
        <TrackVisibility partialVisibility nodeRef={nodeRef}>
          {renderProp}
        </TrackVisibility>
      );

      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false });
    });

    it("shouldn't render components off the bottom", () => {
      const renderProp = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: 1900, right: 100, bottom: 2000, left: 0, width: 100, height: 100
        })
      }
      const wrapper = renderComponent(
        <TrackVisibility partialVisibility nodeRef={nodeRef}>
          {renderProp}
        </TrackVisibility>
      );

      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false });
    });

    it("should render components partially visible at the top", () => {
      const renderProp = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: -50, right: 100, bottom: 50, left: 0, width: 100, height: 100
        })
      }
      const wrapper = renderComponent(
        <TrackVisibility partialVisibility nodeRef={nodeRef}>
          {renderProp}
        </TrackVisibility>
      );

      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: true });
    });

    it("should render components partially visible at the bottom", () => {
      const renderProp = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: 758, right: 100, bottom: 858, left: 0, width: 100, height: 100
        })
      }
      const wrapper = renderComponent(
        <TrackVisibility partialVisibility nodeRef={nodeRef}>
          {renderProp}
        </TrackVisibility>
      );

      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: true });
    });

    it('Should remove event from window when visibility is tracked once', () => {
      window.removeEventListener = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: 758, right: 100, bottom: 858, left: 0, width: 100, height: 100
        })
      }
      const wrapper = renderComponent(<TrackVisibility once={true} nodeRef={nodeRef} />);
      
      expect(window.removeEventListener).toHaveBeenCalled();
    });

    describe("with an offset", () => {
      const offset = 100;

      it("shouldn't render components off the top by more than the offset", () => {
        const renderProp = jest.fn();
        const nodeRef = {
          getBoundingClientRect: () => ({
            top: -300, right: 100, bottom: -200, left: 0, width: 100, height: 100
          })
        }
        const wrapper = renderComponent(
          <TrackVisibility partialVisibility nodeRef={nodeRef} offset={offset}>
            {renderProp}
          </TrackVisibility>
        );

        expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false });
      });

      it("shouldn't render components off the bottom by more than the offset", () => {
        const renderProp = jest.fn();
        const nodeRef = {
          getBoundingClientRect: () => ({
            top: 968, right: 100, bottom: 1068, left: 0, width: 100, height: 100
          })
        }
        const wrapper = renderComponent(
          <TrackVisibility partialVisibility nodeRef={nodeRef} offset={offset}>
            {renderProp}
          </TrackVisibility>
        );

        expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false });
      });

      it("should render components partially visible at the top when within offset", () => {
        const renderProp = jest.fn();
        const nodeRef = {
          getBoundingClientRect: () => ({
            top: -150, right: 100, bottom: -50, left: 0, width: 100, height: 100
          })
        }
        const wrapper = renderComponent(
          <TrackVisibility partialVisibility nodeRef={nodeRef} offset={offset}>
            {renderProp}
          </TrackVisibility>
        );

        expect(renderProp).toHaveBeenLastCalledWith({ isVisible: true });
      });

      it("should render components partially visible at the bottom when within offset", () => {
        const renderProp = jest.fn();
        const nodeRef = {
          getBoundingClientRect: () => ({
            top: 818, right: 100, bottom: 918, left: 0, width: 100, height: 100
          })
        }
        const wrapper = renderComponent(
          <TrackVisibility partialVisibility nodeRef={nodeRef} offset={offset}>
            {renderProp}
          </TrackVisibility>
        );

        expect(renderProp).toHaveBeenLastCalledWith({ isVisible: true });
      });
    });
  });

  describe("when component has no size, i.e. display: none", () => {
    it("shouldn't call the render prop with isVisible: false", () => {
      const renderProp = jest.fn();
      const nodeRef = {
        getBoundingClientRect: () => ({
          top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
        })
      }
      const wrapper = mount(
        <TrackVisibility nodeRef={nodeRef}>
          {renderProp}
        </TrackVisibility>
      );

      expect(renderProp).toHaveBeenLastCalledWith({ isVisible: false });
    });
  });

  describe('When rendering the component', ()=> {
    let nodeRef;
    beforeEach(() => {
      window.innerHeight = 768;
      window.innerWidth = 1024;
      nodeRef = {
        getBoundingClientRect: () => ({
          top: 80, right: 100, bottom: 180, left: 0, width: 100, height: 100
        })
      }
    });

    it('Can be rendered without children', () => {
      const wrapper = renderComponent(<TrackVisibility />);
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
      const wrapper = renderComponent(<TrackVisibility once={true} nodeRef={nodeRef} />);
      
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
