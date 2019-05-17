/**
 * Pan the map so that it is continually in motion
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function panTheMap(map) {
  var viewPort,
      incX = 1,
      incY = 2,
      x = 100,
      y = 100;

  // Obtain the view port object of the map to manipulate its screen coordinates
  var viewPort = map.getViewPort(),
      // function calculates new screen coordinates and calls
      // viewport's interaction method with them
      pan = function() {
        x = x + incX;
        if (Math.abs(x) > 100) {
          incX = -incX;
        }

        y = y + incY;
        if (Math.abs(y) > 100) {
          incY = -incY;
        }

        viewPort.interaction(x, y);
      };

  // set interaction modifier that provides information which map properties
  // change with each "interact" call
  viewPort.startInteraction(H.map.render.RenderEngine.InteractionModifiers.COORD);
  // set up simple animation loop
  setInterval(pan, 15);
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
    panTheMap(map);
  }