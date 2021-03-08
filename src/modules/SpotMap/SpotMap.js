// Defines SpotMap presentational component

import React from 'react';
import ReactGoogleMap from './ReactGoogleMap';
import mapStyle from './SpotMap.style.json';
import { SpotMarker } from './SpotMarker/SpotMarker';
import PropTypes from 'prop-types';

const SpotMap = ({ spot }) => {
  // console.log(spot);

  return (
    <ReactGoogleMap
      zoom={12}
      center={{
        lat: spot.location.coordinates[1],
        lng: spot.location.coordinates[0]
      }}
      options={{
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }}
    >
      <SpotMarker spot={spot} />
    </ReactGoogleMap>
  );
};

SpotMap.propTypes = {
  spot: PropTypes.object,
  updateSpotMap: PropTypes.func,
};

export default SpotMap;
