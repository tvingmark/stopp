import Head from 'next/head'
import { useEffect, useState } from 'react' 
import Layout, { siteTitle } from '../components/layout'
import Map from '../components/map'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
    const [isLoading, setLoading] = useState<boolean>(false);
    useEffect(() => {
      let timer = setTimeout(() => setLoading(true), 1 * 300);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer);
      };
    }, []);
  if(!isLoading){
      return (
          <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
          </Layout>
      )
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Map>
      </Map> 
    </Layout>
  )
}

export const getStaticProps : GetStaticProps = async () =>
{
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
} 
