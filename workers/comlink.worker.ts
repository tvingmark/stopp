import { data } from "autoprefixer";
import * as Comlink from "comlink";
import inside from "../lib/mapUtils";

export interface WorkerApi {
  getName: typeof getName;
  getWind: typeof getWind;
}

const workerApi: WorkerApi = {
  getName,
  getWind,
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

async function getName() {
  console.log("Hallo getName");
  const res = await fetch(
    "https://3000-gold-coyote-u4ogxg7s.ws-eu03.gitpod.io/data/hopp.json"
  );
  const json = await res.json();
  const sum = json.data.bikes.reduce(function (accumulator, bike) {
    var polygon = LARGE;
    if (
      bike.hopp_battery_level > BATTERY_LEVEL &&
      inside([bike.lon, bike.lat], polygon)
    ) {
      accumulator.push(bike);
    }
    return accumulator;
  }, []);
  console.log("Hopp: ");
  console.dir(sum);
  return sum.length;
}

async function getWind() {
  console.log("Get Wind");
  const res = await fetch(
    "https://3000-gold-coyote-u4ogxg7s.ws-eu03.gitpod.io/data/wind.json"
  );
  const json = await res.json();
  const sum = json.items.reduce(function (accumulator, bike) {
    var polygon = LARGE;
    if (
      bike.vol > BATTERY_LEVEL &&
      inside([bike.longitude, bike.latitude], polygon)
    ) {
      accumulator.push(bike);
    }
    return accumulator;
  }, []);
  console.log("Wind:");
  console.dir(sum);
  return sum.length;
}

Comlink.expose(workerApi);
