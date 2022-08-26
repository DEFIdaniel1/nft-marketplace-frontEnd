import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Home() {
    return (
        // Will index events off-chain and read from our database
        // Setup a server and add to a DB query (Moralis is centralized / GraphQL is decentralized)

        //#1 Connect moralis to blockchain
        //#2 Have moralis listen to events

        <div>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="NFT Marketplace" content="Fully decentralized NFT marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Home Page.</h1>
        </div>
    )
}
