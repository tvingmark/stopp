import * as React from 'react';
import restrictMap from '../lib/heremap';

declare global {
  interface Window {
    H: any;
  }
}

export default class Map extends React.Component {

    componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "wNOs3Zoj-2I0hB2CdcH4KnZD7ON27Id89AJ0BKJuxls"
    });

    const defaultLayers = platform.createDefaultLayers();
    defaultLayers.vector.normal.map.setMin(11);

    const map = new H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 64.14475780741687, lng: -21.920529621931507 },
        zoom: 16,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    // console.dir(mapSettings)
    // ui.getControl('zoom').setDisabled(false)
	restrictMap(map);
  }

  render() {
    return <div className="h-full w-full map overflow-hidden rounded-xl" id="map"></div>;
  }
}