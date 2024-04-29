// reducers/index.js
import { combineReducers } from 'redux';
// reducers/authReducer.js
import { SET_SIDEBAR_OPEN, SET_EVENT_NAME ,SET_EVENT_INPUTS,SET_EVENT_PRICE,SET_THEME} from './action';

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


const initialState = {
  isOpen: false, // Set initial state value for isOpen
  isLoggedIn: !!localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  isSubAdmin: localStorage.getItem("isSubAdmin") === "true",
  eventName: null, // Initialize eventName
  maxparticipent:null,
  price:null,
  newTheme :  prefersDarkMode ? "dark" : "light",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        isSubAdmin: false,
      };
    case SET_SIDEBAR_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
      case SET_EVENT_NAME: // Handle setting event name
      return {
        ...state,
        eventName: action.payload,
      };
      case SET_EVENT_INPUTS: // Handle setting event name
      return {
        ...state,
        maxparticipent: action.payload,
      };
      case SET_EVENT_PRICE: // Handle setting event name
      return {
        ...state,
        price: action.payload,
      };
      case SET_THEME: // Handle setting event name
      return {
        ...state,
        newTheme: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
