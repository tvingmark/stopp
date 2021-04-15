import * as Comlink from "comlink";
import inside from "../lib/mapUtils";

export interface WorkerApi {
  getHopp: typeof getHopp;
  getWind: typeof getWind;
  getAll: typeof getAll;
}

export interface Bike {
  lat: number;
  lon: number;
  batt: number;
  id: string;
  vendor: "hopp" | "wind";
}

const workerApi: WorkerApi = {
  getHopp,
  getWind,
  getAll,
};

const BATTERY_LEVEL = 30;

const SHORT = [
  [-21.92097544670105, 64.14539629578222],
  [-21.92223072052002, 64.14423126843914],
  [-21.919044256210327, 64.14358323006506],
  [-21.91796064376831, 64.14467342312615],
  [-21.92097544670105, 64.14539629578222],
];

const LARGE = [
  [-21.939611434936523, 64.14558344421198],
  [-21.91875457763672, 64.14075461114092],
  [-21.913089752197266, 64.14558344421198],
  [-21.933002471923828, 64.15041143760895],
  [-21.939611434936523, 64.14558344421198],
];

let url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
console.log("URL: ", process.env.NEXT_PUBLIC_HOSTNAME);
if (process.env.NODE_ENV === "development") {
  url = "https://" + process.env.NEXT_PUBLIC_HOSTNAME;
}

async function getHopp() {
  const res = await fetch(url + "/data/hopp.json");
  const json = await res.json();
  const sum = json.data.bikes.reduce(function (accumulator, bike) {
    var polygon = LARGE;
    if (
      bike.hopp_battery_level > BATTERY_LEVEL &&
      inside([bike.lon, bike.lat], polygon)
    ) {
      const stoppBike: Bike = {
        batt: bike.hopp_battery_level,
        lat: bike.lat,
        lon: bike.lon,
        id: bike.bike_id,
        vendor: "hopp",
      };
      accumulator.push(stoppBike);
    }
    return accumulator;
  }, []);
  return sum;
}

async function getWind() {
  const res = await fetch(url + "/data/wind.json");
  const json = await res.json();
  const sum = json.items.reduce(function (accumulator, bike) {
    var polygon = LARGE;
    if (
      bike.vol > BATTERY_LEVEL &&
      inside([bike.longitude, bike.latitude], polygon)
    ) {
      console.dir(bike);
      const stoppBike: Bike = {
        batt: bike.vol,
        lat: bike.latitude,
        lon: bike.longitude,
        id: bike.boardId,
        vendor: "wind",
      };
      accumulator.push(stoppBike);
    }
    return accumulator;
  }, []);
  return sum;
}

async function getAll() {
  const hoppResult = await getHopp();
  const windResult = await getWind();
  return hoppResult.concat(windResult);
}

Comlink.expose(workerApi);
