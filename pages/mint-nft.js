import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="Mint New NFT Page" content="Fully decentralized NFT marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Minting Page.</h1>
        </div>
    )
}
