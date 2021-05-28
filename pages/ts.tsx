import { Location } from "../components/map";
import {
  filterByArea,
  FilterConfig,
} from "../lib/mapUtils";

export default function TS() {
  const point: Location = {
    lat: 64.1448,
    lon: -21.9204,
  };

  // const config: FilterConfig = {
  //   : 200,
  // };

  // const box = filterByArea(point, config);
  // console.dir(box)
  return <h1>Test</h1>;
}
