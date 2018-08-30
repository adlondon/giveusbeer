import axios from 'axios';
import { BASE_URL } from '../config';

import {
  BREWERIES_LIST,
  BREWERY_SELECTED,
  BREWERIES_LOADING
} from '../types/Breweries.Types';

export const searchForBreweries = searchStr => (dispatch) => {
  dispatch(_loading(true));
  axios.get(`${BASE_URL.concat(searchStr)}`)
    .then((res) => {
      dispatch(_breweryList(res.data));
    })
    .catch(e => console.log("ERROR searching for breweries: ", e));
};

export const setSelectedBrewery = brewery => (dispatch) => {
  dispatch(_breweryList());
  dispatch(_brewerySelected(brewery));
};

function _loading(value) {
  return {
    type: BREWERIES_LOADING,
    payload: value
  };
}

function _breweryList(value) {
  return {
    type: BREWERIES_LIST,
    payload: value
  };
}

function _brewerySelected(brewery) {
  return {
    type: BREWERY_SELECTED,
    payload: brewery
  };
}
