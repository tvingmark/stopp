import React, { useContext } from "react";
// import Here from './here'
import MapLibre from "./maplibre";
import Remote from "./remote";
import Banner from "./banner";
import WW from "./ww";
import * as Comlink from "comlink";
import { BusStatus, WorkerApi } from "../workers/comlink.worker";
import { BikeStatus } from "../workers/comlink.worker";
import YallaYallaSVG from "./svg/yallayalla";

import { SettingsContext } from "../components/settings";

export interface Location {
  lat: number;
  lon: number;
}

export default function Map({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  let emptyStoppBikes: Array<BikeStatus> = [];
  let emptyBus: Array<BusStatus> = [];

  const { state } = useContext(SettingsContext);
  const [userLocation, setUserLocation] =
    React.useState<Location>({
      lat: 64.1448,
      lon: -21.9204,
    });
  const [hoppMarkers, setHoppMarkers] =
    React.useState(emptyStoppBikes);
    const [busMarkers, setBusMarkers] =
    React.useState(emptyBus);
  const [buses, setBuses] =  React.useState([6,11,13,15])
  const comlinkWorkerRef = React.useRef<Worker>();
  const comlinkWorkerApiRef =
    React.useRef<Comlink.Remote<WorkerApi>>();

  function updateLocation(pos) {
    console.log("Got location");
    setUserLocation({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log(
          "User denied the request for Geolocation."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log(
          "The request to get user location timed out."
        );
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }
 
  React.useEffect(() => {
    if(userLocation.lat != 64.1448) {
      updateHopp();
    }
  }, [userLocation])


  React.useEffect(() => {
    comlinkWorkerRef.current = new Worker(
      new URL("../workers/comlink.worker", import.meta.url)
    );
    comlinkWorkerApiRef.current = Comlink.wrap<WorkerApi>(
      comlinkWorkerRef.current
    );

    if (navigator.geolocation) {
      let pos = navigator.geolocation.getCurrentPosition(
        updateLocation,
        showError
      );
    } else {
      alert("ERROR");
    }
    // updateHopp();
    return () => {
      comlinkWorkerRef.current?.terminate();
    };
  }, []);
  
  React.useEffect(() => {
    // run once
    updateBus()
  }, []);

  React.useEffect(() => {
    if(buses.length === 0) return
    const id = setInterval(() => (
        updateBus()
        // console.log("Update bus")
    ), 6000);
    return () => clearInterval(id);  
  }, [buses]);


  const updateBus = async () => {
    console.log("Get Buses Comlink");
    const result = await comlinkWorkerApiRef.current?.getBus(buses)
    setBusMarkers(result);
  }
  const updateHopp = async () => {
    console.log("HOPP COMLINK");
    const result =
      await comlinkWorkerApiRef.current?.getAll(
        userLocation,
        state
      );
    setHoppMarkers(result);
  };

  // let myHome = {
  //   lat: 64.1448,
  //   lng: -21.9204,
  //   zoom: 14.2,
  // };

  let myHome = {
    lat: userLocation.lat ?? 0,
    lng: userLocation.lon ?? 0,
    zoom: 14.2,
  };

  return (
    <>
      <div className="my-3 flex justify-center">
        <div className="w-full text-5xl opacity-40 font-extrabold whitespace-nowrap">
          <YallaYallaSVG />
        </div>
      </div>
      <div className="my-3 flex">
        <Banner getHopp={updateHopp} />
      </div>
      <div className="relative w-full h-52 sm:h-64">
        <MapLibre home={myHome} hoppMarkers={hoppMarkers} busMarkers={busMarkers} />
      </div>
      <div className="my-3">
        <Remote getHopp={updateBus} />
      </div>
      <div className="sm:h-32"></div>
    </>
  );
}
