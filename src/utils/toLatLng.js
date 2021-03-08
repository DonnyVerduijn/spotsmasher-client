const toLatLng = (coordinate = [null, null]) => {
  return { lat: coordinate[1], lng: coordinate[0] };
};

export default toLatLng;
