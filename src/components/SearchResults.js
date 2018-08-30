import React from 'react';

const SearchResults = props => (
  <div className="mw-32">
    <div className="search-results-wrapper mw-32">
      {props.breweriesList.map(brewery => (
        <div
          className="search-results"
          key={brewery.id}
          role="button"
          onKeyPress={(e) => { if (e.keyCode === 13) props.handleSelect(brewery); }}
          onClick={() => props.handleSelect(brewery)}>
          {brewery.name}
        </div>
      ))}
    </div>
  </div>);

export default SearchResults;
