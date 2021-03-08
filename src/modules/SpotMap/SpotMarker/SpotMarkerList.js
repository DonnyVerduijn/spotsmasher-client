// Defines SpotList presentational component

import React from 'react';
import { SpotMarker } from './SpotMarker';
import PropTypes from 'prop-types';

export const SpotMarkerList = ({ spots }) => {
  return [
    ...spots.map(spot => <SpotMarker key={spot.id} spot={spot} />)
  ];
};

SpotMarkerList.propTypes = {
  spots: PropTypes.array
};

SpotMarkerList.defaultProps = {
  spots: []
};
