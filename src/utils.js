import {Time} from "./const";

export const makeTime = (ms) => ({
  D: Math.floor(ms / Time.DAY),
  H: Math.floor(ms / Time.HOUR) % 24,
  M: Math.floor(ms / Time.MINUTE) % 60,
});

export const formatTime = (date) => date.toTimeString().slice(0, 5);
