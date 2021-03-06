import {getRandomDates, getRandomInteger} from './randomizes';
import {
  getRandomDescription,
  getRandomOffers,
  getRandomPictures,
  getRandomTitle,
  getRandomType,
} from './data-point';

export const getPointData = () => ({
  title: getRandomTitle(),
  type: getRandomType(),
  pictures: getRandomPictures(),
  description: getRandomDescription(3),
  price: getRandomInteger(10, 100),
  time: getRandomDates({
    hours: getRandomInteger(1, 3),
    minutes: getRandomInteger(0, 20),
  }),
  offers: getRandomOffers({
    num: 3,
    price: {min: 10, max: 100},
  }),
});
