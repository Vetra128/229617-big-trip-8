import {
  createElement
} from './utils';
import {
  getOffers,
  getSchedule,
  getIcon
} from './point/index';
import _ from 'lodash';

export default class Point {
  constructor(data) {
    this._type = data.type;
    this._title = data.title;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;

    this._state = {
      isEdit: false
    };
    this._element = null;
    this._onClick = null;

    this._onPointClick = this._onPointClick.bind(this);
  }

  get element() {
    return this._element;
  }

  _onPointClick(evt) {
    evt.preventDefault();
    return _.isFunction(this._onClick) && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
  <article class="trip-point">
    ${getIcon(this._type)}
    <h3 class="trip-point__title">${this._title}</h3>
    ${getSchedule(this._time)}
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    ${this._offers.length > 0 ? getOffers(this._offers) : ``}
  </article>`.trim();
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._element
      .addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
