import {
  makeTime,
  formatTime,
  createElement
} from './utils';

import {Icons} from './const';

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
    return (typeof this._onClick === `function`) && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }
  _getIcon() {
    return `<i class="trip-icon">${Icons.get(this._type)}</i>`;
  }

  _getSchedule() {
    const getDuration = (dateStart, dateEnd) => dateEnd - dateStart;

    const hasTimeValue = ([, value]) => value !== 0;
    const formatTimeValue = ([format, value]) => `${value}${format}`;

    const formatDuration = (ms) =>
      Object.entries(makeTime(ms))
        .filter(hasTimeValue)
        .map(formatTimeValue)
        .join(` `);
    return `
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${formatTime(this._time.start)}&nbsp;&mdash; ${formatTime(this._time.end)}</span>
        <span class="trip-point__duration">${formatDuration(getDuration(this._time.start, this._time.end))}</span>
      </p>`;
  }

  _getOffers() {
    return `
  <ul class="trip-point__offers">
  ${this._offers.map(({name, price}) => `
    <li>
      <button class="trip-point__offer">${name} +&euro;&nbsp;${price}
      </button>
    </li>`
  ).join(``)}
  </ul>`;
  }

  get template() {
    return `
  <article class="trip-point">
    ${this._getIcon(this._type)}
    <h3 class="trip-point__title">${this._title}</h3>
    ${this._getSchedule(this._time)}
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    ${this._offers.length > 0 ? this._getOffers() : ``}
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
