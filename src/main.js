import {getRandomInteger} from './utils';
import getFilterElement from './filter-element';
import getEventElement from './event-element';
import {filterList, eventList} from './data';

const NUMBER_OF_EVENTS = 7;

const filterWrapper = document.querySelector(`.trip-filter`);
const eventWrapper = document.querySelector(`.trip-day__items`);

let fragment = ``;

const renderFilters = (filters) => {
  filters.map((item) => {
    fragment += getFilterElement(item.name, item.isChecked);
  });
  filterWrapper.innerHTML = ``;

  filterWrapper.insertAdjacentHTML(`beforeend`, fragment);
};

const renderTasks = (num = getRandomInteger()) => {
  fragment = ``;
  eventWrapper.innerHTML = ``;
  while (num > 0) {
    num -= 1;
    fragment += getEventElement(eventList);
  }

  eventWrapper.insertAdjacentHTML(`beforeend`, fragment);
};

renderFilters(filterList);

renderTasks(NUMBER_OF_EVENTS);

filterWrapper.addEventListener(`change`, () => {
  renderTasks();
});
