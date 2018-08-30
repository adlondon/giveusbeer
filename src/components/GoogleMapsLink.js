import React from 'react';

const GoogleMapsLink = (props) => {
  const {
    name,
    street,
    city,
    state,
    latitude,
    longitude
  } = props.brewerySelected;
  const concatonatedStr = `${name}, ${street}, ${city}, ${state}/@${latitude},${longitude}`;
  const splitJoinStr = concatonatedStr.split(' ').join('+');
  const googleUrl = `https://www.google.com/maps/search/${splitJoinStr}`;
  return <a href={googleUrl} rel="noopener noreferrer" target="_blank">Google Map</a>;
};

export default GoogleMapsLink;
