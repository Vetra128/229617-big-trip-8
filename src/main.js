import Point from './point';
import {getFilter} from './filter';

import {getPointData} from './mock/data';

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const generateFilters = () => filterNames.map(getFilter).join(``);
// const generatePoints = (num = 3) => [...Array(num)]
//   .map(getPointData)
//   .map(Point)
//   .join(``);

const filterForm = document.querySelector(`.trip-filter`);
const dayItems = document.querySelector(`.trip-day__items`);

const renderElements = (container) => {
  const elem = new Point(getPointData());
  container.innerHTML = elem.render();
};

// filterForm.addEventListener(`change`, () => {
//   renderElements(dayItems, generatePoints());
// });

renderElements(dayItems);
// renderElements(filterForm, generateFilters());

// const pointContainer = document.querySelector(`.trip-day__items`);
// const firstTask = new Point(getPointData());
// firstTask.render(pointContainer);


