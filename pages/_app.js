import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import Header from '../components/Header'

const APP_ID = process.env.NEXT_PUBLIC_moralisAppId
const SERVER_URL = process.env.NEXT_PUBLIC_moralisDappURL
console.log(APP_ID)

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
            <Header />
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp
