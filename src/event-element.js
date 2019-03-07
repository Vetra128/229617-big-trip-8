const getEventElement = (event = {icon: `🚕`, title: ``, timetable: ``, duration: ``, price: ``, offers: []}) => {
  return `<article class="trip-point">
    <i class="trip-icon">${event.icon}</i>
    <h3 class="trip-point__title">${event.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${event.timetable}</span>
      <span class="trip-point__duration">${event.duration}</span>
    </p>
    <p class="trip-point__price">${event.price}</p>
    <ul class="trip-point__offers">
      ${ event.offers.map((item) => {
    return `<li> 
<button class="trip-point__offer">${item}</button>
</li>`;
  }).join(``)
}
    </ul>
  </article>`;
};

export default getEventElement;
