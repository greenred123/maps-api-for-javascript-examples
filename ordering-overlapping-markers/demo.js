    
function orderMarkers() {
  var zIndex = 1,
      // create a set of markers
      marker = new mapsjs.map.Marker(
        {lat: 52.508249, lng: 13.338931}
      ),
      marker2 = new mapsjs.map.Marker(
        {lat: 52.506682, lng: 13.332107}
      ),
      marker3 = new mapsjs.map.Marker(
        {lat: 52.503730, lng: 13.331678}
      ),
      marker4 = new mapsjs.map.Marker(
        {lat: 52.531, lng: 13.380}
      );

  // add markers to the map
  map.addObjects([marker, marker2, marker3, marker4]);

  map.addEventListener('tap', function (evt) {
    if (evt.target instanceof mapsjs.map.Marker) {
      // increase z-index of the marker that was tapped
      evt.target.setZIndex(zIndex++);
    }
  });
}

/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
var platform = new H.service.Platform({
  app_id: window.app_id,
  app_code: window.app_code,
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat: 52.5, lng: 13.4},
  zoom: 10,
  pixelRatio: pixelRatio
});


// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


// Now use the map as required...
orderMarkers();