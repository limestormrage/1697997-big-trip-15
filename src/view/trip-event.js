import dayjs from 'dayjs';

export const createTripEventTemplate = (task) => {
  const {type, basePrice, dateFrom, dateTo, destination, isFavorite, offer} = task;

  const dateToInHours = dayjs(dateTo).format('HH:mm');
  const dateFromInHours = dayjs(dateFrom).format('HH:mm');
  const dateToInMonthAndDay = dayjs(dateTo).format('MMM D');
  const dateToInDatetime = dayjs(dateTo).format('YYYY-MM-DDTHH:mm');
  const dateFromInDatetime = dayjs(dateFrom).format('YYYY-MM-DDTHH:mm');

  const test = (date1, date2) => {
    const date11 = dayjs(date1);
    const date22 = dayjs(date2);
    const daysDiff = date11.diff(date22, 'd');
    const hoursDiff = date11.diff(date22, 'h');
    const minutesDiff = date11.diff(date22, 'm');

    const renderDiffTime = (time, text) => time !== 0 ? `${time}${text}` : '';

    return `${renderDiffTime(daysDiff, 'D')} ${renderDiffTime(hoursDiff, 'H')} ${renderDiffTime(minutesDiff, 'M')}`;
  };

  const getTimeWay = test(dateTo, dateFrom);

  //проверка на фаворитность
  const checkFavorite = () => isFavorite ? 'event__favorite-btn--active' : '';

  //генерация дополнительных опций
  const offersPoint = offer.map(({title, price}) => (
    `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
  )).join('');

  return  `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dateToInMonthAndDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} to ${destination.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFromInDatetime}">${dateFromInHours}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateToInDatetime}">${dateToInHours}</time>
      </p>
      <p class="event__duration">${getTimeWay}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersPoint}
    </ul>
    <button class="event__favorite-btn ${checkFavorite()}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
