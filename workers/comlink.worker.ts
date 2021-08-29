import * as Comlink from "comlink";
import inside from "../lib/mapUtils";
import { Location } from "../components/map";
import {
  filterByArea,
  FilterConfig,
  FilterSize,
} from "../lib/mapUtils";
import { getAllPostIds } from "../lib/posts";
import { Bike, SettingsState } from "../components/settings";

export interface WorkerApi {
  getHopp: typeof getHopp;
  getWind: typeof getWind;
  getBus: typeof getBus;
  getAll: typeof getAll;
}

export interface BikeStatus {
  lat: number;
  lon: number;
  batt: number;
  id: string;
  vendor: "hopp" | "wind";
}

export interface BusStatus {
  routeNumber: number,
  route: String,
  lon: number,
  lat: number,
  heading: number,
  gpsTime: number,
  lastStop: number,
  nextStop: number,
  speed: number  
}

const workerApi: WorkerApi = {
  getHopp,
  getWind,
  getBus,
  getAll,
};

const config: FilterConfig = {
  RADIUS: FilterSize.MEDIUM,
  BATTERY_LEVEL: 30,
};
const BATTERY_LEVEL = 30;

let url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
console.log("URL: ", process.env.NEXT_PUBLIC_HOSTNAME);
if (process.env.NODE_ENV === "development") {
  url = "https://" + process.env.NEXT_PUBLIC_HOSTNAME;
}

async function getHopp(location: Location) {
  // const res = await fetch(url + "/data/hopp.json");
  const res = await fetch(process.env.NEXT_PUBLIC_HOPP_URL);
  const json = await res.json();
  const polygon = filterByArea(location, config);
  console.log("Hopp: Polygon");
  console.dir(polygon);
  const sum = json.data.bikes.reduce(function (
    accumulator,
    bike
  ) {
    if (
      bike.hopp_battery_level > config.BATTERY_LEVEL &&
      inside([bike.lon, bike.lat], polygon)
    ) {
      const stoppBike: BikeStatus = {
        batt: bike.hopp_battery_level,
        lat: bike.lat,
        lon: bike.lon,
        id: bike.bike_id,
        vendor: "hopp",
      };
      accumulator.push(stoppBike);
    }
    return accumulator;
  },
  []);
  console.log("Hopp:");
  console.dir(sum);
  return sum;
}

async function getWind(location: Location) {
  const paramURL =
    "latitude=" +
    location.lat +
    "&longitude=" +
    location.lon;
  // const res = await fetch(url + "/data/wind.json");
  console.log("Wind credentials");
  console.log(process.env.NEXT_PUBLIC_WIND_URL + paramURL);
  // console.log(process.env.NEXT_PUBLIC_WIND_ID);
  const res = await fetch(
    process.env.NEXT_PUBLIC_WIND_URL + paramURL,
    {
      headers: {
        authentication: process.env.NEXT_PUBLIC_WIND_ID,
        "x-app-version": "4.35.0",
      },
    }
  );
  const json = await res.json();
  const polygon = filterByArea(location, config);
  console.log("Wind: Polygon");
  console.dir(polygon);
  const sum = json.items.reduce(function (
    accumulator,
    bike
  ) {
    if (
      bike.vol > config.BATTERY_LEVEL &&
      inside([bike.longitude, bike.latitude], polygon)
    ) {
      const stoppBike: BikeStatus = {
        batt: bike.vol,
        lat: bike.latitude,
        lon: bike.longitude,
        id: bike.boardId,
        vendor: "wind",
      };
      accumulator.push(stoppBike);
    }
    return accumulator;
  },
  []);
  console.log("Wind:");
  console.dir(sum);
  return sum;
}

async function getAll(location: Location, settings: SettingsState) {
  // check localstorage for settings
  let showBikes = [];
  console.log("Bike settings");
  console.dir(settings.bikes);
  settings.bikes.map((bike) => {
    if (bike.show) {
      switch (bike.id) {
        case "HOPP":
          showBikes.push(getHopp(location));
          break;
        case "WIND":
          showBikes.push(getWind(location));
          break;
        default:
          console.log("No Operator");
      }
    }
  });
  const result = await Promise.all(showBikes);
  return result.flat();
}

// deviceNumber: 36
// gpsFix: 2
// gpsTime: "210622114546"
// heading: 100.55
// lastStop: 90000727
// lat: 64.0981381333333
// lon: -21.8232623333333
// nextStop: 10000955
// pingCode: 6
// route: "2-A"
// routeNumber: "2"
// speed: 35.72



async function getBus(route: number[]) {
  // https://app.straeto.is/pele/api/v1/positions/filter/6,11
  const baseURL = "https://app.straeto.is/pele/api/v1/positions/filter/"
  const param = route.join()
  const res = await fetch(baseURL+param);
  const json = await res.json();
  console.dir(json.positions)
  console.log("URL: " + baseURL+param)
  return json.positions
}

Comlink.expose(workerApi);
