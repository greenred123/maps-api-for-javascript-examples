/**
 * Switches the map language to simplified Chinese
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @pama   {H.service.Platform} platform    A stub class to access HERE services
 */
function switchMapLanguage(map, platform){
  var mapTileService = platform.getMapTileService({
      type: 'base'
    }),
    // Our layer will load tiles from the HERE Map Tile API
    chineseMapLayer = mapTileService.createTileLayer(
      'maptile',
      'normal.day',
      pixelRatio === 1 ? 256 : 512,
      'png8',
      {lg: 'CHI', ppi: pixelRatio === 1 ? undefined : 320}
    );
  map.setBaseLayer(chineseMapLayer);

  // Display default UI components on the map and change default
  // language to simplified Chinese.
  // Besides supported language codes you can also specify your custom translation
  // using H.ui.i18n.Localization.
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'zh-CN');

  // Remove not needed settings control
  ui.removeControl('mapsettings');
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
    switchMapLanguage(map);
  }