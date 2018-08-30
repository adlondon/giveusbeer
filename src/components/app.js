import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'; // let's give it a shot
import Input from './Input';
import SearchResults from './SearchResults';
import BrewerySelected from './BrewerySelected';
import { searchForBreweries, setSelectedBrewery } from '../actions/Breweries.Actions';

console.log('🍻 Cheers!');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchStr: '' };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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


  render() {
    const { brewerySelected, breweriesList } = this.props;
    const shouldRenderSearchResults = breweriesList && this.state.searchStr;
    return (
      <div className="flex column items-center">
        <Input
          value={this.state.searchStr}
          placeholder="Type a brewery name"
          onChange={this.handleOnChange} />
        {shouldRenderSearchResults && <SearchResults handleSelect={this.handleSelect} breweriesList={breweriesList} />}
        <BrewerySelected brewerySelected={brewerySelected} />
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
