import {
  useReducer,
  useContext,
  createContext,
} from "react";

console.log("Initiate Settings");

export interface SettingsState {
  fetching: boolean;
  bikes: Bike[];
}

export interface Bike {
  id: string;
  show: boolean;
}

// fetch from persitent storage
export const initialSettingsState: SettingsState = {
  fetching: false,
  bikes: [
    { id: "WIND", show: true },
    { id: "HOPP", show: false },
  ],
};

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
  state: initialSettingsState,
  dispatch: () => undefined,
});
