import { ConnectButton } from 'web3uikit'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <nav>
                <Link href="/">NFT Marketplace</Link>
                <Link href="/mint-nft">Mint NFT</Link>
                <Link href="/sell-nft">List NFT</Link>
                <ConnectButton moralisAuth={false} />
            </nav>
        </>
    )
}
