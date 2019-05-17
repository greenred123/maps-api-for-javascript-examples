
/**
 * Alters the UI to use imperial measurements.
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {Object.<string, H.service.MapType>} defaultLayers
 *         an object holding the three default HERE Map types
 */
function useImperialMeasurements(map, defaultLayers){
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Set the UI unit system to imperial measurement
  ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
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
    useImperialMeasurements(map);
  }