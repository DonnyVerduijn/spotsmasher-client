import supercluster from 'supercluster';
import bbox from 'geojson-bbox';

const MarkerClusterer = (data, config) => {
  let index;
  let result;

  const generateClusters = (bounds = null, zoom = null) => {
    var clusters = [];
    if (bounds && zoom) {
      clusters = index.getClusters(
        [bounds.west, bounds.south, bounds.east, bounds.north],
        zoom
      );
    }
    return clusters;
  };

  const includeProperties = cluster => {
    // array of features
    const leaves = index.getLeaves(cluster.properties.cluster_id, Infinity);
    const bounds = bbox({
      type: 'FeatureCollection',
      features: leaves
    });

    return Object.assign(cluster, {
      properties: Object.assign(cluster.properties, {
        leaves,
        bounds: {
          south: bounds[1],
          west: bounds[0],
          north: bounds[3],
          east: bounds[2]
        },
        expansionZoom: index.getClusterExpansionZoom(
          cluster.properties.cluster_id
        )
      })
    });
  };

  const filterClustersFromMarkers = result => {
    return result.reduce(
      (previous, next) => {
        return next.properties.cluster
          ? {
            markers: previous.markers,
            clusters: [...previous.clusters, includeProperties(next)]
          }
          : {
            markers: [...previous.markers, next],
            clusters: previous.clusters
          };
      },
      { markers: [], clusters: [] }
    );
  };

  // initialize clustering engine
  (function constructor() {
    index = supercluster(
      Object.assign(
        {
          radius: 80,
          maxZoom: 24
        },
        config
      )
    );

    index.load(data.features);
    result = filterClustersFromMarkers(
      generateClusters(config.bounds, config.zoom)
    );
  })();

  return {
    getMarkers() {
      return result.markers;
    },
    getClusters() {
      return result.clusters;
    }
  };
};

export default MarkerClusterer;
