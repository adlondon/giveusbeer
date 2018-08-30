import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'; // let's give it a shot
import { tag } from '../helpers/taggedTemplateLiteral';

import { searchForBreweries, setSelectedBrewery } from '../actions/Breweries.Actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchStr: '' };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.debouncedSearch = _.debounce(this.debouncedSearch, 300).bind(this);
  }

  debouncedSearch() {
    if (this.state.searchStr !== '') {
      this.props.searchForBreweries(this.state.searchStr);
    }
  }

  handleOnChange(e) {
    this.setState({ searchStr: e.target.value });
    this.debouncedSearch();
  }

  handleSelect(brewery) {
    this.setState({ searchStr: brewery.name });
    this.props.setSelectedBrewery(brewery);
  }

  renderSearchResults() {
    return this.props.breweriesList.map(brewery => (
      <div
        key={brewery.id}
        role="button"
        onKeyPress={(e) => { if (e.keyCode === 13) this.handleSelect(brewery); }}
        onClick={() => this.handleSelect(brewery)}>
        {brewery.name}
      </div>
    ));
  }

  renderGoogleMapsLink(brewerySelected) {
    const {
      name,
      street,
      city,
      state,
      latitude,
      longitude
    } = brewerySelected;
    const concatonatedStr = `${name}, ${street}, ${city}, ${state}/@${latitude},${longitude}`;
    const splitJoinStr = concatonatedStr.split(' ').join('+');
    const googleUrl = `https://www.google.com/maps/search/${splitJoinStr}`;
    return <a href={googleUrl} rel="noopener noreferrer" target="_blank">Google Map</a>;
  }


  render() {
    const { brewerySelected, breweriesList } = this.props;
    const shouldRenderSearchResults = breweriesList && this.state.searchStr;
    console.log(brewerySelected);
    return (
      <div>
        <input
          value={this.state.searchStr}
          placeholder="Type a brewery name"
          onChange={this.handleOnChange} />
        {shouldRenderSearchResults && this.renderSearchResults()}
        <div>
          {brewerySelected ?
            <div>
              <div className="flex">
                <div className="bold ">{brewerySelected.name}</div>
                <div>{tag`(${brewerySelected.brewery_type})`}</div>
              </div>
              <div>{brewerySelected.street}</div>
              <div className="flex">
                <div>{tag`${brewerySelected.city},\u00A0`}</div>
                <div>{tag`${brewerySelected.state},\u00A0`}</div>
                <div>{tag`${brewerySelected.postal_code},\u00A0`}</div>
                <div>{brewerySelected.country}}</div>
              </div>
              <div>{tag`Geo Coordinates: ${brewerySelected.latitude}/${brewerySelected.longitude}`}</div>
              {this.renderGoogleMapsLink(brewerySelected)}
            </div> :
            <div>No brewery selected.</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ BreweriesReducer }) => {
  const { breweriesList, loading, brewerySelected } = BreweriesReducer;
  return {
    breweriesList,
    loading,
    brewerySelected
  };
};

export default connect(mapStateToProps, {
  searchForBreweries,
  setSelectedBrewery
})(App);
