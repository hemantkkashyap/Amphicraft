// actions.js
export const SET_SIDEBAR_OPEN = 'SET_SIDEBAR_OPEN';

export const setSidebarOpen = (isOpen) => ({
  type: SET_SIDEBAR_OPEN,
  payload: isOpen,
});

export const SET_EVENT_NAME = 'SET_EVENT_NAME';

export const setEventName = (eventName) => ({
  type: SET_EVENT_NAME,
  payload: eventName,
});

export const SET_EVENT_INPUTS = 'SET_EVENT_INPUTS';

export const setEventinputs = (maxparticipent) => ({
  type: SET_EVENT_INPUTS,
  payload: maxparticipent,
});

export const SET_EVENT_PRICE = 'SET_EVENT_PRICE';

export const setEventprice = (price) => ({
  type: SET_EVENT_PRICE,
  payload: price,
});

export const SET_THEME = 'SET_THEME';

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});