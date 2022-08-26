import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import Header from '../components/Header'

const APP_ID = process.env.MORALIS_APPLICATION_ID
const SERVER_URL = process.env.MORALIS_DAPP_URL

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
            <Header />
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp
