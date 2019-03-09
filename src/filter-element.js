const getFilterElement = (name, isChecked = false) => {
  const nameLowerCase = name.toLowerCase();
  return `<input 
     type="radio" 
     id="filter-${nameLowerCase}"
      name="filter" 
      value="${nameLowerCase}"
     ${isChecked ? ` checked` : ``}
  >
  <label 
  class="trip-filter__item"
   for="filter-${nameLowerCase}"
   >
     ${nameLowerCase}
   </label>`;
};
export default getFilterElement;
