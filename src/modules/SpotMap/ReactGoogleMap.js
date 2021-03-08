import React from 'react';

import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const ReactGoogleMap = ({
  options,
  zoom,
  center,
  onDragEnd,
  onCenterChanged,
  onZoomChanged,
  children
}) => {
  let map;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  const getMapProperties = () => {
    return map ? {
      center: map.getCenter().toJSON(),
      bounds: map.getBounds().toJSON(),
      zoom: map.getZoom()
    } : {
      center: { latitude: 0, longitude: 0},
      bounds: { east: 0, west: 0, north: 0, south: 0},
      zoom: 5
    };
  };

  return isLoaded ? (
    <GoogleMap
      className="Map"
      options={options}
      zoom={zoom}
      center={center}
      mapContainerStyle={{
        width: '100%',
        height: '20em'
      }}
      onDragEnd={onDragEnd(getMapProperties())}
      onCenterChanged={onCenterChanged(getMapProperties())}
      onZoomChanged={onZoomChanged(getMapProperties())}
    >
      {children}
    </GoogleMap>
  ) : null;
};

const emptyCallback = () => {};

ReactGoogleMap.defaultProps = {
  zoom: 5,
  center: { lat: 51, lng: 0 },
  onDragEnd: emptyCallback,
  onBoundsChanged: emptyCallback,
  onCenterChanged: emptyCallback,
  onZoomChanged: emptyCallback
};

ReactGoogleMap.propTypes = {
  options: PropTypes.object,
  zoom: PropTypes.number,
  center: PropTypes.object,
  onDragEnd: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,
  onMapReady: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default ReactGoogleMap;
