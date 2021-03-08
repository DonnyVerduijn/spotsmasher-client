import React from 'react';
import { Marker } from '@react-google-maps/api';
// import markerIcon from './Marker.png';
import PropTypes from 'prop-types';

export const SpotMarker = ({
  spot,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children
}) => {
  
  return (
    <Marker
      position={spot && spot.location.coordinates ? {
        lat: spot.location.coordinates[1],
        lng: spot.location.coordinates[0]
      } : { lat: 0, lng: 0}}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      onClick={onClick}
      // icon={{ url: markerIcon, scaledSize: { height: 40, width: 40 } }}
      noRedraw={false}
    >
      {children}
    </Marker>
  );
};

SpotMarker.propTypes = {
  spot: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
