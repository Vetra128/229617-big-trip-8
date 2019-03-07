const getEventElement = (icon = ``, title = ``, timetable = ``, duration = ``, offers = []) => {
  const list = offers.map((item) => `<li>
        <button class="trip-point__offer">${item}</button>
      </li>`);
  console.log(list);
  return `<article class="trip-point">
    <i class="trip-icon">🚕</i>
    <h3 class="trip-point__title">Taxi to Airport</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">€&nbsp;20</p>
    <ul class="trip-point__offers">
      ${list}
    </ul>
  </article>`;
};

export default getEventElement;
