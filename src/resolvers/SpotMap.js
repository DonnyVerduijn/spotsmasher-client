
export const update = (_, { center, bounds, zoom }, { cache }) => {
  const newSpotMap = {
    __typename: 'SpotMap',
    lastChangedAt: new Date().getTime(),
    center: { ...center, __typename: 'LatLng' },
    bounds: { ...bounds, __typename: 'LatLngBounds' },
    zoom
  };
  cache.writeData({ data: { SpotMap: newSpotMap } });
  return { SpotMap: newSpotMap, __typename: 'SpotMap' };
};
