import {
  formatTime,
  createElement
} from './utils';

import {Icons} from './const';

export default class FullPoint {
  constructor(data) {
    this._type = data.type;
    this._title = data.title;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
    this._pictures = data.pictures;
    this._description = data.description;

    this._state = {
      isEdit: false
    };

    this._element = null;
    this._onSave = null;
    this._onDelete = null;
    this._onEsc = null;

    this._onSaveButtonClick = this._onSaveButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onKeyEsc = this._onKeyEsc.bind(this);
  }

  get element() {
    return this._element;
  }

  _onSaveButtonClick(evt) {
    evt.preventDefault();
    return (typeof this._onSave === `function`) && this._onSave();
  }

  set onSave(fn) {
    this._onSave = fn;
  }

  _onDeleteButtonClick() {
    return (typeof this._onDelete === `function`) && this._onDelete();
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onKeyEsc(evt) {
    return (typeof this._onEsc === `function`) && (evt.keyCode === 27) && this._onEsc();
  }

  set onEsc(fn) {
    this._onEsc = fn;
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

  _getImg() {
    return `${this._pictures.map((picture)=>`
      <img src="http:${picture}" alt="picture from place" class="point__destination-image">`).join(``)}`;
  }


  get template() {
    return `<article class="point">
                <form action="" method="get">
                  <header class="point__header">
                    <label class="point__date">
                      choose day
                      <input class="point__input" type="text" placeholder="MAR 18" name="day">
                    </label>
                    <div class="travel-way">
                      <label class="travel-way__label" for="travel-way__toggle">${Icons.get(this._type)}</label>
                      <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
                      <div class="travel-way__select">
                        <div class="travel-way__select-group">
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                          <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                          <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                          <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train">
                          <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                        </div>
                        <div class="travel-way__select-group">
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                          <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                          <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                        </div>
                      </div>
                    </div>
                    <div class="point__destination-wrap">
                      <label class="point__destination-label" for="destination">${this._type}</label>
                      <input class="point__destination-input" list="destination-select" id="destination" value="${this._title}" name="destination">
                      <datalist id="destination-select">
                        <option value="airport"></option>
                        <option value="Geneva"></option>
                        <option value="Chamonix"></option>
                        <option value="hotel"></option>
                      </datalist>
                    </div>
                    <label class="point__time">
                      choose time
                      <input class="point__input" type="text" value="${formatTime(this._time.start)}&nbsp;&mdash; ${formatTime(this._time.end)}" name="time" placeholder="00:00 — 00:00">
                    </label>
                    <label class="point__price">
                      write price
                      <span class="point__price-currency">€</span>
                      <input class="point__input" type="text" value="${this._price}" name="price">
                    </label>
                    <div class="point__buttons">
                      <button class="point__button point__button--save point__button-save" type="submit">Save</button>
                      <button class="point__button point__button-delete" type="reset">Delete</button>
                    </div>
                    <div class="paint__favorite-wrap">
                      <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
                      <label class="point__favorite" for="favorite">favorite</label>
                    </div>
                  </header>
                  <section class="point__details">
                    <section class="point__offers">
                      <h3 class="point__details-title">offers</h3>
                      <div class="point__offers-wrap">
                        ${this._getOffers()}
                      </div>
                    </section>
                    <section class="point__destination">
                      <h3 class="point__details-title">Destination</h3>
                      <p class="point__destination-text">${this._description}</p>
                      <div class="point__destination-images">
                        ${this._getImg()}
                      </div>
                    </section>
                    <input type="hidden" class="point__total-price" name="total-price" value="">
                  </section>
                </form>
              </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.point__button-save`)
      .addEventListener(`click`, this._onSaveButtonClick);
    this._element.querySelector(`.point__button-delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);
    document.addEventListener(`keydown`, this._onKeyEsc);
  }

  unbind() {
    this._element.querySelector(`.point__button-save`)
      .removeEventListener(`click`, this._onSaveButtonClick);
    this._element.querySelector(`.point__button-delete`)
      .removeEventListener(`click`, this._onDeleteButtonClick);
    document.removeEventListener(`keydown`, this._onKeyEsc);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;

  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
