import {
  makeTime,
  formatTime
} from './utils';

import {Icons} from './const';

import {createElement} from './create-element';

// export const getPoint = ({type, title, time, price, offers}) => `
//   <article class="trip-point">
//     ${getIcon(type)}
//     <h3 class="trip-point__title">${title}</h3>
//     ${getSchedule(time)}
//     <p class="trip-point__price">&euro;&nbsp;${price}</p>
//     ${offers.length > 0 ? getOffers(offers) : ``}
//   </article>`;

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
  </article>`;
  }

  render() {
    this._element = this.template;
    return this._element;
  }

}
