import { SEARCH_DISCIPLINES } from "../constants";

const initialState = {
  disciplines: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DISCIPLINES:
      return Object.assign({}, state, {disciplines: action.disciplines});
    default:
      return state;
  }
};