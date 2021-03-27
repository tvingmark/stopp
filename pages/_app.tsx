import { AppProps } from 'next/app'
import '../styles/global.css'
import 'tailwindcss/tailwind.css'

function App({ Component, pageProps}: AppProps ){
    return <Component {...pageProps}/>
}


export default App