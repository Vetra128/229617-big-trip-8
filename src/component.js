import {createElement} from './utils';

const _element = Symbol(`element`);

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this[_element] = null;
  }

  get element() {
    return this[_element];
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this[_element] = createElement(this.template);
    this._bind();
    return this[_element];
  }

  unrender() {
    this._unbind();
    this[_element].remove();
    this[_element] = null;
  }

  _bind() {}

  _unbind() {}
}

export default Component;
