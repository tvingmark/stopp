import Head from 'next/head'
import { useEffect, useState } from 'react' 
import Layout, { siteTitle } from '../components/layout'
import Map from '../components/map'


export default function Home() {
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
  // This is the Coordinator. Home of data. Do you want map or list ?.
  // Create three rectangles around your location that you define your searching area according to distance to your home.
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