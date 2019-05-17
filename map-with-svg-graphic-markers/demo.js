/**
 * Adds two SVG markers over the homes of the Chicago Bears and Chicago Cubs
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addSVGMarkers(map){
  //Create the svg mark-up
  var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="${STROKE}" >C</text></svg>';

  // Add the first marker
  var bearsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'blue').replace('${STROKE}', 'red')),
    bearsMarker = new H.map.Marker({lat: 41.8625, lng: -87.6166 },
      {icon: bearsIcon});

  map.addObject(bearsMarker);

  // Add the second marker.
  var cubsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'white').replace('${STROKE}', 'orange')),
    cubsMarker = new H.map.Marker({lat: 41.9483, lng: -87.6555 },
      {icon: cubsIcon});

  map.addObject(cubsMarker);
}
  
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  // In your own code, replace variable app_id with your own app_id
  // and app_code with your own app_code
  var platform = new H.service.Platform({
    app_id: app_id,
    app_code: app_code,
    useCIT: true,
    useHTTPS: true
  });
  var defaultLayers = platform.createDefaultLayers();
  
  //Step 2: initialize a map - this map is centered over Europe
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map,{
    center: {lat:50, lng:5},
    zoom: 4
  });
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Now use the map as required...
  window.onload = function () {
    addSVGMarkers(map);
  }