import { DBSchema, openDB } from "idb";
import {
  useReducer,
  useContext,
  createContext,
} from "react";
import { FilterSize } from "../lib/mapUtils";

console.log("Initiate Settings");

export interface SettingsState {
  fetching: boolean;
  bikes: Bike[];
  radius: FilterSize;
}

export interface Bike {
  id: string;
  show: boolean;
}

// fetch from persitent storage
// export const initialSettingsState: SettingsState = {
//   fetching: false,
//   bikes: [
//     { id: "WIND", show: true },
//     { id: "HOPP", show: false },
//   ],
// };

// const dbPromise = openDB("yallayallaDB", 1, {
//   upgrade(db) {
//     db.createObjectStore("settings");
//   },

export const initialSettingsState = (): SettingsState => {
  // fetch from persistent storage
  // check if query parameters are included
  // setDefault if not found

  // interface Settings {
  //   locations: {
  //       home: Location,
  //       work: Location,
  //       custom: Locations[]
  //   },
  //   filter: {
  //       range: small | medium | large, //polygon map/search
  //       bikes: {
  //           visability: boolean
  //           battery: number
  //           operators: Vendor[]
  //       }
  //       bus: {
  //           visability: boolean
  //           routes: bus[]
  //           stations: {
  //               home: Stop,
  //               work: Stop,
  //               custom: Stop[]
  //           }
  //       }
  //   }

  // needs to be async
  // move this to worker
  // let's move to preact and get those freakin 100 score

  // console.log("Start: check if ");
  // updateDB();
  // console.log("Done");
  // console.log(getSettingsFromDB("HOPP"));

  return {
    fetching: true,
    radius: FilterSize.MEDIUM,
    bikes: [
      { id: "WIND", show: true },
      { id: "HOPP", show: true },
    ],
  };
};

interface YallaYallaDB extends DBSchema {
  settings: {
    key: string;
    value: boolean;
  };
}

// export async function get(key) {
//   return (await dbPromise).get('keyval', key);
// },
// export async function set(key, val) {
//   return (await dbPromise).put('keyval', val, key);
// },

async function getSettingsFromDB(key: string) {
  const db = await openDB("yallayallaDB", 1, {
    upgrade(db) {
      db.createObjectStore("settings");
    },
  });
  return await db.get("settings", key);
}

async function updateDB() {
  const db = await openDB("yallayallaDB", 1, {
    upgrade(db) {
      db.createObjectStore("settings");
      db.put("settings", true, "WIND");
      db.put("settings", false, "HOPP");
    },
  });
  const hopp = await db.get("settings", "HOPP");
  console.log("Hopp: " + hopp);
}

export enum ActionType {
  ToggleBike,
}

export interface ToggleBike {
  type: ActionType.ToggleBike;
  payload: { id: string };
}

export type SettingsActions = ToggleBike;

export const toggleBike = (id: string): ToggleBike => ({
  type: ActionType.ToggleBike,
  payload: { id },
});

export function settingsReducer(
  state: SettingsState,
  action: SettingsActions
): SettingsState {
  switch (action.type) {
    case ActionType.ToggleBike:
      let newState = {
        ...state,
        bikes: state.bikes.map((bike: Bike) =>
          bike.id === action.payload.id
            ? {
                ...bike,
                show: !bike.show,
              }
            : bike
        ),
      };

      return newState;

    default:
      return state;
  }
}

export const SettingsContext = createContext<{
  state: SettingsState;
  dispatch: React.Dispatch<SettingsActions>;
}>({
  state: initialSettingsState(),
  dispatch: () => undefined,
});
