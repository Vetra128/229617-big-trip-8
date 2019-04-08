import Component from './component';
import {withCapability, makeHandler} from './capability';
import {
  getOffers,
  getSchedule,
  getIcon,
} from './point/index';

// better create the factory once
// const canOnPointClick = makeHandler({target: 'Point', handle: 'Click'});

class Point extends withCapability(
    makeHandler({target: `Point`, handle: `Click`})
)(Component) {
  constructor(data) {
    super();

    this._type = data.type;
    this._title = data.title;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
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

  _bind() {
    this.element.addEventListener(`click`, this._onPointClick);
  }

  _unbind() {
    this.element.removeEventListener(`click`, this._onPointClick);
  }
}

export default Point;
