const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 1000,
  debug: false
};

const log = pos => {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

const success = callback => position => {
  return options.debug
    ? log(position) && callback(position)
    : callback({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
};

const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

export const getCurrentPosition = callback => {
  return navigator.geolocation.getCurrentPosition(
    success(callback),
    error,
    options
  );
};

export const watchPosition = callback => {
  return navigator.geolocation.watchPosition(success(callback), error, options);
};
