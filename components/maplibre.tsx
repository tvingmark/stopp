import React, { useRef, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import maplibregl from "maplibre-gl";
import MapContainer from "./mapContainer";
import { Bike } from "../workers/comlink.worker";

import CustomMarker, {
  HomeMarker,
} from "./maps/customMarker";

interface location {
  lat: number;
  lng: number;
  zoom: number;
}

export default function MapLibre({
  children,
  home,
  hoppMarkers,
}: {
  children?: React.ReactNode;
  home: location;
  hoppMarkers: Array<Bike>;
}) {
  const mapContainer = useRef();
  let map = useRef<maplibregl.Map>();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [lng, setLng] = useState(home.lng);
  const [lat, setLat] = useState(home.lat);
  const [zoom, setZoom] = useState(home.zoom);
  //   lat: 64.1448,
  //   lng: -21.9204,
  function addMarkers() {
    console.log("Add Markers");
    console.dir(hoppMarkers);
    hoppMarkers.map((bike) => {
      // const markerRef = React.useRef<HTMLDivElement>();
      // const customMarker = <CustomMarker type={"hopp"} />;

      const el = document.createElement("div");

      const marker = new maplibregl.Marker(el)
        .setLngLat([bike.lon, home.lat])
        .addTo(map.current);
    });
  }

  useEffect(() => {
    if (!map.current?.loaded) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/pastel/style.json?key=I5JyAqVoKa0bzAa97qBl",
        center: [-21.9204, 64.1448],
        zoom: zoom,
      });
    } else {
      const el = HomeMarker();
      const marker = new maplibregl.Marker(el)
        .setLngLat([home.lng, home.lat])
        .addTo(map.current);
      map.current.flyTo({
        center: [home.lng, home.lat],
      });
      hoppMarkers.map((bike) => {
        // const markerRef = React.useRef<HTMLDivElement>();
        // const customMarker = <CustomMarker ref={markerRef} type={"hopp"} />;
        const el = CustomMarker(bike);
        const marker = new maplibregl.Marker(el)
          .setLngLat([bike.lon, bike.lat])
          .addTo(map.current);
      });
    }
  }, [hoppMarkers, home]);
  return (
    <>
      <MapContainer ref={mapContainer} />
    </>
  );
}

// import ReactDOM from 'react-dom';
// // import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// // import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

// mapboxgl.workerClass = MapboxWorker;
// mapboxgl.accessToken = 'pk.eyJ1IjoidGlja29uaSIsImEiOiJja25laGF2OWYwN2JhMnVrYmRnenE2cWFiIn0.6frVOwqQG-Yvpitu80PNcg';

// const Map = () => {
// const mapContainer = useRef();
// const [lng, setLng] = useState(-70.9);
// const [lat, setLat] = useState(42.35);
// const [zoom, setZoom] = useState(9);

// useEffect(() => {
// const map = new mapboxgl.Map({
// container: mapContainer.current,
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [lng, lat],
// zoom: zoom
// });

// map.on('move', () => {
// setLng(map.getCenter().lng.toFixed(4));
// setLat(map.getCenter().lat.toFixed(4));
// setZoom(map.getZoom().toFixed(2));
// });

// return () => map.remove();
// }, []);

// return (
// <div>
// <div className="sidebar">
// Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
// </div>
// <div className="map-container" ref={mapContainer} />
// </div>
// );
// };
