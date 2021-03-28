import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Mi Tvingmark'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({
    children,
    home 
}: {
 children: React.ReactNode
 home?: boolean   
}) {
  return (
    <>
      <nav className="w-full bg-yellow-300 flex-shrink-0 py-7 flex justify-around items-center">
            <Image
              priority
              src="/images/egg_profile.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </nav>
      <main className=" bg-red-300 flex-grow">
          {children}
      </main>
    </>
  )
}
