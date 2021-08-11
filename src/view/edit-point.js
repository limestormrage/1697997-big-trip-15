import dayjs from 'dayjs';
import { CITIES, TYPE } from '../mock/task-mock';

//генерация дополнительных опций
const createAdditionalOffer = (offers) => {
  if (offers.length) {
    return  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${offers.map(({title, price}) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').pop()}-1" type="checkbox" name="event-offer-${title.split(' ').pop()}" checked>
    <label class="event__offer-label" for="event-offer-${title.split(' ').pop()}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`)}
    </div>
  </section>`;
  }
  return '';
};

//генерация опций города
const createCityList = () => (
  CITIES.map((cityName) => (
    `<option value="${cityName}"></option>`
  )).join('')
);

//генерация тайп-листа
const createEventTypeList = () => (
  TYPE.map((typeEvent) => (
    `<div class="event__type-item">
      <input id="event-type-${typeEvent.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeEvent.toLowerCase()}">
      <label class="event__type-label  event__type-label--${typeEvent.toLowerCase()}" for="event-type-taxi-1">${typeEvent}</label>
    </div>`
  )).join('')
);

export const createEditPointForm = (task) => {
  const {type, basePrice, dateFrom, dateTo, destination, offer} = task;

  const dateToInDateValue = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const dateFromInDateValue = dayjs(dateFrom).format('DD/MM/YY HH:mm');

  //генерация опций города
  const cityList = createCityList();

  //генерация тайп-листа
  const eventTypeList = createEventTypeList();

  //генерация дополнительных опций
  const additionalOffers = createAdditionalOffer(offer);

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${eventTypeList}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${cityList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromInDateValue}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToInDateValue}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${additionalOffers}

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
    </section>
  </section>
</form>`;
};
