import { Location } from "../components/map";

export default function inside(
  point: Array<number>,
  vs: Array<Array<number>>
) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

  var x = point[0],
    y = point[1];

  var inside = false;
  for (
    var i = 0, j = vs.length - 1;
    i < vs.length;
    j = i++
  ) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

export enum FilterSize {
  SMALL = 100,
  MEDIUM = 200,
  LARGE = 400,
}

export interface FilterConfig {
  RADIUS: FilterSize;
  BATTERY_LEVEL: number;
}

export interface Polygon {
  area: Array<Array<number>>;
}

export function filterByArea(
  point: Location,
  filter: FilterConfig
) {
  //   10001.965729km = 90 degrees
  // 1km = 90/10001.965729 degrees = 0.0089982311916 degrees
  // 10km = 0.089982311915998 degrees
  // short 200m box, large 400m
  const meterDEG = 0.000008998231192;

  // a^2 + b^2 = c^2 if rectangle
  // const cSquared = Math.sqrt(Math.pow(filter.size,2) * 2);
  // const cSquaredDeg = cSquared * meterDEG
  const filterSizeDEG = filter.RADIUS * meterDEG;
  // calculate corners
  // [ a/e d ]
  // [ b   c ]
  const a: Location = {
    lat: point.lat - filterSizeDEG,
    lon: point.lon + filterSizeDEG * 2,
  };
  const b: Location = {
    lat: point.lat - filterSizeDEG,
    lon: point.lon - filterSizeDEG * 2,
  };
  const c: Location = {
    lat: point.lat + filterSizeDEG,
    lon: point.lon - filterSizeDEG * 2,
  };
  const d: Location = {
    lat: point.lat + filterSizeDEG,
    lon: point.lon + filterSizeDEG * 2,
  };
  const boundingBox = [
    [a.lon, a.lat],
    [b.lon, b.lat],
    [c.lon, c.lat],
    [d.lon, d.lat],
    [a.lon, a.lat],
  ];
  return boundingBox;
}
