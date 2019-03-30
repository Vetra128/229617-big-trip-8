import isFunction from 'lodash/isFunction';

const getTrue = () => true;

// Capability (handler)
export const makeHandler = ({target, handle, condition = getTrue} = {}) => {
  const handleEvent = `_on${target}${handle}`;
  const onEvent = `_on${handle}`;

  return (Component) => class extends Component {
    constructor() {
      super();

      this[onEvent] = null;
      this[handleEvent] = this[handleEvent].bind(this);
    }

    set [`on${handle}`](fn) {
      this[onEvent] = fn;
    }

    [handleEvent](evt) {
      return isFunction(this[onEvent])
        && condition(evt)
        && this[onEvent](evt);
    }
  };
};

export const withCapability = (...capabilities) =>
  (WrappedComponent = class {}) =>
    capabilities.reduce((base, capability) => {
      return ((base = capability(base)), base);
    }, WrappedComponent);
