import Head from "next/head";
import { useEffect, useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import Map from "../components/map";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Location({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [address, setAddress] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const coords = await getLngLat(address);
    console.dir(coords);
  };

  async function getLngLat(address: string) {
    const res = await fetch(
      "https://" +
        process.env.NEXT_PUBLIC_HOSTNAME +
        "/data/nom.json"
    );
    const json = await res.json();
    const result = json[0];

    return {
      lon: result.lon,
      lat: result.lat,
    };
  }

  useEffect(() => {}, [address]);
  // This is the Coordinator. Home of data. Do you want map or list ?.
  // Create three rectangles around your location that you define according to distance to your home.

  return (
    <Layout home>
      <Head>
        <title>Add Your Locations</title>
      </Head>
      <div className="flex-grow flex flex-col">
        <div className="my-2 border-black flex-grow rounded-xl">
          <div className="text-2xl font-extrabold text-center">
            Locations
          </div>
          <div className="text-large font-medium text-center">
            Add locations for more speed 🚀
          </div>
          <div className="h-14 rounded-xl my-4">
            <form
              className="relative cursor-pointer"
              onSubmit={onSubmit}
            >
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <input
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full  text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-10 "
                type="text"
                placeholder="Street name and number"
                onChange={handleChange}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </form>
            <form
              className="relative mt-2"
              onSubmit={onSubmit}
            >
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
              <input
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full  text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-10 "
                type="text"
                placeholder="Street name and number"
                onChange={handleChange}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
