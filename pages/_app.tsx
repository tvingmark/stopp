import { AppProps } from "next/app";
import {
  initialSettingsState,
  SettingsContext,
  settingsReducer,
} from "../components/settings";
import "../styles/global.css";
import "tailwindcss/tailwind.css";
import { useReducer } from "react";

function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(
    settingsReducer,
    initialSettingsState
  );
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </SettingsContext.Provider>
  );
}

export default App;
