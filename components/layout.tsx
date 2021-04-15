import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Mi Tvingmark";
export const siteTitle = "GO GO";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #ebb5a7 , #6670CC 100%)" }}
      className="relative flex flex-col flex-1 w-full overflow-hidden bg-white sm:max-w-xl mx-auto"
    >
      <main className="flex flex-col flex-grow p-5 justify-end sm:justify-center">
        {children}
      </main>
    </div>
  );
}
