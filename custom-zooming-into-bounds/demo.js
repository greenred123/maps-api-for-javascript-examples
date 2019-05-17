/**
 * Shows how to create a custom zooming strategy,
 * using getCameraDataForBounds method for precomputing best zoom level and position.
 *
 * @param {H.Map} map A HERE Map instance within the application
 */
function setUpCustomZooming(map) {
  // create several circles to denote cities' population
  var clevelandCircle = new H.map.Circle(
    new H.geo.Point(41.4822, -81.6697), //center
    11703, // Radius proportional to 390,113 population
    {style: {fillColor: 'rgba(0, 255, 221, 0.66)'}}
  );
  var torontoCircle = new H.map.Circle(
    new H.geo.Point(43.7000, -79.4000), //center
    75090, // Radius proportional to 2.503 million population
    {style: {fillColor: 'rgba(0, 255, 221, 0.66)'}}
  );
  var chicagoCircle = new H.map.Circle(
    new H.geo.Point(41.8369, -87.6847), //center
    81570, // Radius proportional to 2.719 million population
    {style: {fillColor: 'rgba(0, 221, 255, 0.66)'}}
  );
  var newYorkCircle = new H.map.Circle(
    new H.geo.Point(40.7127, -74.0059), //center
    252180, // Radius proportional to 8.406 million population
    {style: {fillColor: 'rgba(221, 0, 255, 0.66)'}}
  );
  // define maximum zoom level for each circle
  clevelandCircle.setData({maxZoom: 7});
  torontoCircle.setData({maxZoom: 5});
  chicagoCircle.setData({maxZoom: 5});
  newYorkCircle.setData({maxZoom: 4});

  // create container for objects
  var container = new H.map.Group({
    objects: [clevelandCircle, torontoCircle, chicagoCircle, newYorkCircle]
  });

  // use the event delegation to handle 'tap' events on objects
  container.addEventListener('tap', function (evt) {
    var target = evt.target;
    // retrieve maximum zoom level
    var maxZoom = target.getData().maxZoom;
    // calculate best camera data to fit object's bounds
    var cameraData = map.getCameraDataForBounds(target.getBounds());

    // we set new zoom level taking into acount 'maxZoom' value
    map.setZoom(Math.min(cameraData.zoom, maxZoom), true);
    map.setCenter(cameraData.position, true);
  });

  // add objects to the map
  map.addObject(container);
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
    setUpCustomZooming(map);
  }