import {
  BREWERIES_LIST,
  BREWERY_SELECTED,
  BREWERIES_LOADING
} from '../types/Breweries.Types';

const INITIAL_STATE = {
  loading: false,
  breweriesList: undefined,
  brewerySelected: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BREWERIES_LIST:
      return { ...state, breweriesList: action.payload };
    case BREWERIES_LOADING:
      return { ...state, loading: action.payload };
    case BREWERY_SELECTED:
      return { ...state, brewerySelected: action.payload };
    default:
      return state;
  }
};
