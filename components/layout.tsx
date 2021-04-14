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
    <div className="relative flex flex-col flex-1 w-full overflow-hidden bg-white shadow sm:max-w-xl mx-auto">
      <main className="flex-grow p-5">{children}</main>
    </div>
  );
}
