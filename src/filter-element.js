const getFilterElement = (caption, isChecked = false) =>
  `<input type="radio" id="filter-${caption}" name="filter" value="${caption}" ${isChecked ? ` checked` : ``}>
   <label class="trip-filter__item" for="filter-${caption}">${caption}</label>`;
export default getFilterElement;
