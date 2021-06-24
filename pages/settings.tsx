import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Switch from "../components/switch";
import React, { useContext, useEffect } from "react";
import {
  SettingsContext,
  toggleBike,
} from "../components/settings";

export default function Settings({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { state, dispatch } = useContext(SettingsContext);
  console.log("Settings: ");
  console.dir(state);

  // use state for buttons
  return (
    <Layout home>
      <Head>
        <title>Settings | YallaYalla</title>
      </Head>
      <div className="flex-grow flex flex-col justify-end sm:justify-center">
        <div className="text-xs font-extrabold mb-6">
          <Link href="/">GO BACK</Link>
        </div>
        <div className="text-xs font-extrabold mb-2">
          Operators
        </div>
        <div
          onClick={() =>
            dispatch(toggleBike(state.bikes[1].id))
          }
          className="w-full rounded-xl p-2 mb-2 bg-red-100 flex overflow-hidden"
        >
          <div className="flex flex-row px-2 items-center justify-center">
            <svg
              className="mr-2"
              width="30"
              height="30"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="25.5"
                stroke="black"
                strokeWidth="5"
              />
              <circle
                cx="28"
                cy="28"
                r="20"
                fill="#1CE5BE"
              />
              <path
                d="M21.2109 37H25.0781V30.5703H31.3828V37H35.2422V21H31.3828V27.4219H25.0781V21H21.2109V37Z"
                fill="black"
              />
            </svg>
            <div className="text-sm font-extrabold">
              Hopp
            </div>
          </div>
          <div className="flex-grow flex items-center justify-end">
            <Switch checked={state.bikes[1].show} />
          </div>
        </div>
        <div
          onClick={() =>
            dispatch(toggleBike(state.bikes[0].id))
          }
          className="w-full rounded-xl p-2 mb-2 bg-red-100 flex overflow-hidden cursor-pointer"
        >
          <div className="flex flex-row px-2 items-center justify-center">
            <svg
              className="mr-2"
              width="30"
              height="30"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="25"
                stroke="black"
                strokeWidth="5"
              />
              <circle
                cx="28"
                cy="28"
                r="20"
                fill="#FFFA00"
              />
              <path
                d="M21.0469 37H24.7656L27.6484 27.2969H27.7734L30.6563 37H34.3828L39.0312 21H34.7656L32.3438 31.5078H32.2109L29.4531 21H25.9688L23.2109 31.4844H23.0781L20.6641 21H16.3906L21.0469 37Z"
                fill="black"
              />
            </svg>
            <div className="text-sm font-extrabold">
              Wind
            </div>
          </div>
          <div className="flex-grow flex items-center justify-end">
            <Switch checked={state.bikes[0].show} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
