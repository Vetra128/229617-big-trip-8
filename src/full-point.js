import {
  formatTime,
  isEscapeKey
} from './utils';
import {Icons} from './const';
import {getOffers, getImages} from './point/index';
import {makeHandler, withCapability} from './capability';
import Component from './component';

const canOnEsc = makeHandler({
  target: `Btn`,
  handle: `EscPress`,
  condition: isEscapeKey,
});
const canOnSaveBtnClick = makeHandler({target: `FullPoint`, handle: `Save`});
const canOnDeleteBtnClick = makeHandler({target: `FullPoint`, handle: `Delete`});

class FullPoint extends withCapability(
    canOnSaveBtnClick,
    canOnDeleteBtnClick,
    canOnEsc
)(Component) {
  constructor(data) {
    super();
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
                        ${this._offers.length > 0 ? getOffers(this._offers) : ``}
                      </div>                      
                      </section>
                      <section class="point__destination">
                        <h3 class="point__details-title">Destination</h3>
                        <p class="point__destination-text">${this._description}</p>
                      <div class="point__destination-images">
                        ${this._pictures.length > 0 ? getImages(this._pictures) : ``}
                        </div>
                      </section>
                      <input type="hidden" class="point__total-price" name="total-price" value="">
                    </section>
                  </form>
                </article>`.trim();
  }

  _bind() {
    this.element.querySelector(`.point__button-save`)
      .addEventListener(`click`, this._onFullPointSave);
    this.element.querySelector(`.point__button-delete`)
      .addEventListener(`click`, this._onFullPointDelete);
    document.addEventListener(`keydown`, this._onBtnEscPress);
  }

  _unbind() {
    this.element.querySelector(`.point__button-save`)
      .removeEventListener(`click`, this._onSaveBtnClick);
    this.element.querySelector(`.point__button-delete`)
      .removeEventListener(`click`, this._onDeleteBtnClick);
    document.removeEventListener(`keydown`, this._onBtnEscPress);
  }
}

export default FullPoint;
