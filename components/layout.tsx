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
    <div className="relative flex-1 flex flex-col sm:max-w-xl sm:mx-auto">
      <nav className="relative z-10 flex-none py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4">
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
      <main className=" bg-red-300 flex-grow p-5">
          {children}
      </main>
    </div>
  )
}
