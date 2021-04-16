import React from "react";
// import Here from './here'
import MapLibre from "./maplibre";
import Remote from "./remote";
import Banner from "./banner";
import WW from "./ww";
import * as Comlink from "comlink";
import { WorkerApi } from "../workers/comlink.worker";

import { Bike } from "../workers/comlink.worker";

export default function Map({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  let emptyStoppBikes: Array<Bike> = [];

  const [hoppMarkers, setHoppMarkers] = React.useState(emptyStoppBikes);
  const comlinkWorkerRef = React.useRef<Worker>();
  const comlinkWorkerApiRef = React.useRef<Comlink.Remote<WorkerApi>>();

  React.useEffect(() => {
    comlinkWorkerRef.current = new Worker(
      new URL("../workers/comlink.worker", import.meta.url)
    );
    comlinkWorkerApiRef.current = Comlink.wrap<WorkerApi>(
      comlinkWorkerRef.current
    );
    // updateHopp();
    return () => {
      comlinkWorkerRef.current?.terminate();
    };
  }, []);

  const updateHopp = async () => {
    console.log("HOPP COMLINK");
    const result = await comlinkWorkerApiRef.current?.getAll();
    setHoppMarkers(result);
  };

  let myHome = {
    lat: 64.1448,
    lng: -21.9204,
    zoom: 14.2,
  };

  console.log("HoppMarkers: ", hoppMarkers.length);
  console.dir();
  return (
    <>
      <div className="my-3 flex justify-center">
        <div className="text-5xl opacity-40 font-extrabold whitespace-nowrap">
          TIL B TIL B TIL B TIL B TIL B TIL B TIL B
        </div>
      </div>
      <div className="my-3 flex">
        <Banner getHopp={updateHopp} />
      </div>
      <div className="relative w-full h-52 sm:h-64">
        <MapLibre home={myHome} hoppMarkers={hoppMarkers} />
      </div>
      <div className="my-3">
        <Remote getHopp={updateHopp} />
      </div>
      <div className="sm:h-32"></div>
    </>
  );
}
