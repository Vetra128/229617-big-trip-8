export const getEventElement = ({
  icon,
  title,
  timetable,
  duration,
  price,
  offers
} = {}
) =>
  `<article class="trip-point">
    <i class="trip-icon">${icon}</i>
    <h3 class="trip-point__title">${title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${timetable}</span>
      <span class="trip-point__duration">${duration}</span>
    </p>
    <p class="trip-point__price">${price}</p>
    ${offers.length > 0 ? getOffersElement(offers) : ``}
  </article>`;

export const getOffersElement = (offers) => `
  <ul class="trip-point__offers">
  ${offers.map((name) => `
    <li>
      <button class="trip-point__offer">${name}</button>
    </li>`
  ).join(``)}
  </ul>`;
