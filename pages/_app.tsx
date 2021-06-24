import { AppProps } from "next/app";
import {
  initialSettingsState,
  SettingsContext,
  settingsReducer,
} from "../components/settings";
import "../styles/global.css";
import "tailwindcss/tailwind.css";
import { useEffect, useReducer } from "react";

function App({ Component, pageProps }: AppProps) {
  const initialState = initialSettingsState();
  console.log("Update");
  const [state, dispatch] = useReducer(
    settingsReducer,
    initialState
  );

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </SettingsContext.Provider>
  );
}

export default App;
