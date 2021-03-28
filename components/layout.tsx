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
    <div className="relative flex flex-col flex-1 w-full overflow-hidden bg-white shadow sm:max-w-xl mx-auto">
      <nav className="relative z-10 flex-none py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4">
            <Image
              priority
              src="/images/egg_profile.png"
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
            />
            <h1 className="font-bold text-3xl">{name}</h1>
      </nav>
      <main className="flex-grow p-5">
          {children}
      </main>
    </div>
  )
}
