import Point from './point';
import FullPoint from './full-point';
import {getFilter} from './filter';
import {getRandomInteger} from './mock/randomizes';

import {getPointData} from './mock/data';

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const generateFilters = () => filterNames.map(getFilter).join(``);

const filterForm = document.querySelector(`.trip-filter`);
const dayItems = document.querySelector(`.trip-day__items`);

const renderPointElements = (container, num = 3) => {
  let isFullPointOpen = false;
  container.innerHTML = ``;
  while (num > 0) {
    num -= 1;
    let point = new Point(getPointData());
    let fullPoint = new FullPoint(getPointData());
    container.appendChild(point.render());
    point.onClick = () => {
      if (!isFullPointOpen) {
        fullPoint.render();
        container.replaceChild(fullPoint.element, point.element);
        point.unrender();
        isFullPointOpen = true;
      }
    };
    fullPoint.onSave = () => {
      point.render();
      container.replaceChild(point.element, fullPoint.element);
      fullPoint.unrender();
      isFullPointOpen = false;
    };
    fullPoint.onDelete = () => {
      fullPoint.unrender();
      isFullPointOpen = false;
    };
    fullPoint.onEscPress = () => {
      point.render();
      container.replaceChild(point.element, fullPoint.element);
      fullPoint.unrender();
      isFullPointOpen = false;
    };
  }
};

filterForm.addEventListener(`change`, () => {
  renderPointElements(dayItems, getRandomInteger());
});

renderPointElements(dayItems, getRandomInteger());
const renderElements = (container, element) => {
  container.innerHTML = element;
};
renderElements(filterForm, generateFilters());


