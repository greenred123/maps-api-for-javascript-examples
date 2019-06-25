/**
 *  Renders specified a KML file on the map
 *
 *  Note that the maps data module https://js.api.here.com/v3/3.1/mapsjs-data.js
 *  must be loaded for KML parsing to occcur
 *
 * @param {H.Map} map A HERE Map instance within the application
 */
function renderKML(map) {
  // // Center map on New York
  // map.setCenter({lat: 37.4602, lng: -95.7475});
  // map.setZoom(4);

  // // Create a reader object passing in the URL of our KML file
  // var reader = new H.data.kml.Reader('data/us-states.kml');

  // // Parse the document
  // reader.parse();

  // // Get KML layer from the reader object and add it to the map
  // map.addLayer(reader.getLayer());

  kmlReader = new H.data.kml.Reader('data/us-states.kml');
  kmlReader.addEventListener("statechange", function(evt){
    if(evt.state === 2) {
      kmlLayer = kmlReader.getLayer();
      kmlProvider = kmlLayer.getProvider();
      kmlRG = kmlProvider.getRootGroup();
      map.addLayer(kmlLayer);
      map.getViewModel().setLookAtData({bounds: kmlRG.getBoundingBox()});
      kmlProvider.addEventListener("tap",kmlListenerFunc);
      kmlIsParsed = true;
    }
  });
  kmlReader.parse();




}


/**
 * Boilerplate map initialization code starts below:
 */

// Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

// Step 2: initialize a map
var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  zoom: 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: create the default UI component, for displaying bubbles
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Step 5: main logic goes here
// renderKML(map);