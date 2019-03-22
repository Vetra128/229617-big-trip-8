import {formatTime, makeTime} from '../utils';

const getDuration = (dateStart, dateEnd) => dateEnd - dateStart;

const hasTimeValue = ([, value]) => value !== 0;
const formatTimeValue = ([format, value]) => `${value}${format}`;

const formatDuration = (ms) =>
  Object.entries(makeTime(ms))
    .filter(hasTimeValue)
    .map(formatTimeValue)
    .join(` `);

export const getSchedule = ({start, end}) => `
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}</span>
    <span class="trip-point__duration">${formatDuration(getDuration(start, end))}</span>
  </p>`;
