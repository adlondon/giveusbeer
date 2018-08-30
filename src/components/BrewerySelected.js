import React from 'react';
import { tag } from '../helpers/taggedTemplateLiteral';
import GoogleMapsLink from './GoogleMapsLink';

const BrewerySelected = (props) => {
  const { brewerySelected } = props;
  return (
    <div className="mw-32">
      {brewerySelected ?
        <div className="brewery-selected">
          <div className="flex">
            <div className="brewery-name">{`${brewerySelected.name}\u00A0`}</div>
            <div>{tag`(${brewerySelected.brewery_type})`}</div>
          </div>
          <div>{brewerySelected.street}</div>
          <div className="flex flex-wrap">
            <div>{tag`${brewerySelected.city},\u00A0`}</div>
            <div>{tag`${brewerySelected.state},\u00A0`}</div>
            <div>{tag`${brewerySelected.postal_code},\u00A0`}</div>
            <div>{brewerySelected.country}</div>
          </div>
          <div>{tag`Geo Coordinates: ${brewerySelected.latitude}/${brewerySelected.longitude}`}</div>
          <GoogleMapsLink brewerySelected={brewerySelected} />
        </div> :
        <div className="no-brewery-selected">No brewery selected.</div>
            }
    </div>);
};

export default BrewerySelected;
